import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Heart, Stethoscope, UserCheck } from 'lucide-react';

// 로컬 의료진 일러스트레이션 이미지
import medicalTeamImage from '../assets/images/Pasted Graphic.png';
const MEDICAL_TEAM_IMAGE = medicalTeamImage;

interface LoginPageProps {
  onLogin: (success: boolean) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [credentials, setCredentials] = useState({ id: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate login delay
    setTimeout(() => {
      if (credentials.id === 'alvin' && credentials.password === '1234') {
        onLogin(true);
      } else {
        setError('아이디 또는 비밀번호가 올바르지 않습니다.');
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Medical image and branding */}
        <div className="hidden lg:block space-y-6">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Heart className="w-8 h-8 text-red-500" />
              <h1 className="text-3xl font-semibold text-gray-800">MediCare Pro</h1>
              <Stethoscope className="w-8 h-8 text-blue-500" />
            </div>
            <p className="text-lg text-gray-600">
              의료진을 위한 AI 상담 요약 시스템
            </p>
          </div>
          
          <div className="relative rounded-2xl overflow-hidden shadow-lg">
            <img
              src={MEDICAL_TEAM_IMAGE}
              alt="Medical Team Illustration"
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent" />
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-2">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <UserCheck className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-sm text-gray-600">안전한 로그인</p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Heart className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-sm text-gray-600">환자 중심</p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <Stethoscope className="w-6 h-6 text-red-600" />
              </div>
              <p className="text-sm text-gray-600">전문의 도구</p>
            </div>
          </div>
        </div>

        {/* Right side - Login form */}
        <div className="flex items-center justify-center">
          <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 backdrop-blur">
            <CardHeader className="space-y-4 text-center">
              <div className="flex items-center justify-center lg:hidden space-x-2 mb-4">
                <Heart className="w-6 h-6 text-red-500" />
                <h1 className="text-2xl font-semibold text-gray-800">MediCare Pro</h1>
              </div>
              <CardTitle className="text-2xl text-gray-800">의료진 로그인</CardTitle>
              <CardDescription className="text-gray-600">
                AI 기반 상담 요약으로 효율적인 진료를 시작하세요
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="id" className="text-gray-700">아이디</Label>
                  <Input
                    id="id"
                    type="text"
                    placeholder="의료진 아이디를 입력하세요"
                    value={credentials.id}
                    onChange={(e) => setCredentials({ ...credentials, id: e.target.value })}
                    className="h-12 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700">비밀번호</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    className="h-12 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20"
                    required
                  />
                </div>

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white transition-all duration-200"
                  disabled={isLoading}
                >
                  {isLoading ? '로그인 중...' : '로그인'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="text-center text-sm text-gray-600">
            <p>© 2025 (주)MAiN. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}