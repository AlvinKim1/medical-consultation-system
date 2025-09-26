import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Avatar,
  AvatarFallback,
} from "./ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Heart,
  LogOut,
  Search,
  Calendar,
  Clock,
  Phone,
  Mail,
  CheckCircle2,
  Users,
  FileAudio,
  Activity,
  Mic,
} from "lucide-react";
import { Input } from "./ui/input";
import { Patient } from "../types";
import { PatientDetail } from "./patient-detail";

interface DashboardProps {
  user: { id: string; name: string } | null;
  onLogout: () => void;
}

const mockPatients: Patient[] = [
  {
    id: "P001",
    name: "김영희",
    age: 45,
    gender: "여성",
    phone: "010-1234-5678",
    email: "kim.younghee@email.com",
    lastConsultation: "2024-01-20",
    consultationCount: 3,
    recentConditions: ["고혈압", "두통"],
    consultations: [
      {
        id: "C001",
        patientId: "P001",
        date: "2024-01-20",
        status: "completed",
        duration: "15:30",
      },
      {
        id: "C002",
        patientId: "P001",
        date: "2024-01-15",
        status: "completed",
        duration: "12:45",
      },
    ],
  },
  {
    id: "P002",
    name: "박철수",
    age: 62,
    gender: "남성",
    phone: "010-2345-6789",
    email: "park.cs@email.com",
    lastConsultation: "2024-01-18",
    consultationCount: 5,
    recentConditions: ["당뇨병", "혈압관리"],
    consultations: [
      {
        id: "C003",
        patientId: "P002",
        date: "2024-01-18",
        status: "completed",
        duration: "18:20",
      },
    ],
  },
  {
    id: "P003",
    name: "이수진",
    age: 34,
    gender: "여성",
    phone: "010-3456-7890",
    email: "lee.sujin@email.com",
    lastConsultation: "2024-01-22",
    consultationCount: 2,
    recentConditions: ["갑상선 기능항진증"],
    consultations: [
      {
        id: "C004",
        patientId: "P003",
        date: "2024-01-22",
        status: "completed",
        duration: "20:15",
      },
    ],
  },
  {
    id: "P004",
    name: "최민호",
    age: 28,
    gender: "남성",
    phone: "010-4567-8901",
    email: "choi.minho@email.com",
    lastConsultation: "2024-01-19",
    consultationCount: 1,
    recentConditions: ["알레르기성 비염"],
    consultations: [
      {
        id: "C005",
        patientId: "P004",
        date: "2024-01-19",
        status: "completed",
        duration: "10:30",
      },
    ],
  },
  {
    id: "P005",
    name: "정미선",
    age: 56,
    gender: "여성",
    phone: "010-5678-9012",
    email: "jung.misun@email.com",
    lastConsultation: "2024-01-21",
    consultationCount: 4,
    recentConditions: ["골다공증", "관절염"],
    consultations: [
      {
        id: "C006",
        patientId: "P005",
        date: "2024-01-21",
        status: "completed",
        duration: "16:45",
      },
    ],
  },
];

export function Dashboard({ user, onLogout }: DashboardProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [patients] = useState<Patient[]>(mockPatients);
  const [selectedPatient, setSelectedPatient] =
    useState<Patient | null>(null);
  const [consultationModalOpen, setConsultationModalOpen] = useState(false);
  const [modalPatient, setModalPatient] = useState<Patient | null>(null);

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      patient.recentConditions.some((condition) =>
        condition
          .toLowerCase()
          .includes(searchTerm.toLowerCase()),
      ),
  );

  const handleConsultationClick = (patient: Patient) => {
    setModalPatient(patient);
    setConsultationModalOpen(true);
  };

  const handleConsultationSelect = (patient: Patient) => {
    setSelectedPatient(patient);
    setConsultationModalOpen(false);
    setModalPatient(null);
  };

  const handleBackToDashboard = () => {
    setSelectedPatient(null);
  };

  const getConsultationStatusBadge = (
    consultationCount: number,
  ) => {
    if (consultationCount >= 5) {
      return (
        <Badge className="bg-blue-100 text-blue-700 border-blue-200">
          정기 환자
        </Badge>
      );
    } else if (consultationCount >= 2) {
      return (
        <Badge className="bg-green-100 text-green-700 border-green-200">
          관리 중
        </Badge>
      );
    } else {
      return (
        <Badge className="bg-gray-100 text-gray-700 border-gray-200">
          신규 환자
        </Badge>
      );
    }
  };

  const getConsultationIcon = (consultationCount: number) => {
    if (consultationCount >= 5) {
      return <Activity className="w-4 h-4 text-blue-500" />;
    } else if (consultationCount >= 2) {
      return (
        <CheckCircle2 className="w-4 h-4 text-green-500" />
      );
    } else {
      return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  // 환자 상세 페이지가 선택된 경우
  if (selectedPatient) {
    return (
      <PatientDetail
        patient={selectedPatient}
        onBack={handleBackToDashboard}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Heart className="w-8 h-8 text-red-500" />
                <h1 className="text-xl font-semibold text-gray-800">
                  MediCare Pro
                </h1>
              </div>
              <div className="hidden md:block w-px h-6 bg-gray-300" />
              <p className="hidden md:block text-gray-600">
                상담 요약 시스템
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    {user?.name.charAt(0) || "A"}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-700">
                    {user?.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    의료진
                  </p>
                </div>
              </div>
              <Button
                onClick={onLogout}
                variant="outline"
                size="sm"
                className="text-gray-600 hover:text-gray-800"
              >
                <LogOut className="w-4 h-4 mr-2" />
                로그아웃
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    총 환자 수
                  </p>
                  <p className="text-3xl font-semibold text-gray-900">
                    {patients.length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    총 상담 기록
                  </p>
                  <p className="text-3xl font-semibold text-green-600">
                    {patients.reduce(
                      (total, p) => total + p.consultationCount,
                      0,
                    )}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <FileAudio className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    오늘 상담
                  </p>
                  <p className="text-3xl font-semibold text-purple-600">
                    2
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Mic className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Patient List */}
        <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div>
                <CardTitle className="text-xl text-gray-800">
                  환자 목록
                </CardTitle>
                <CardDescription className="text-gray-600">
                  환자를 선택하여 상담 요약을 진행하세요
                </CardDescription>
              </div>
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="환자명 또는 증상으로 검색..."
                  value={searchTerm}
                  onChange={(e) =>
                    setSearchTerm(e.target.value)
                  }
                  className="pl-10 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20"
                />
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>환자</TableHead>
                    <TableHead>나이/성별</TableHead>
                    <TableHead>최근 증상</TableHead>
                    <TableHead>상담 현황</TableHead>
                    <TableHead>마지막 상담</TableHead>
                    <TableHead>연락처</TableHead>
                    <TableHead>상담 확인</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatients.map((patient) => (
                    <TableRow
                      key={patient.id}
                      className="hover:bg-gray-50/50 cursor-pointer"
                    >
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-gray-100 text-gray-600">
                              {patient.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-gray-900">
                              {patient.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {patient.id}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p className="text-gray-900">
                            {patient.age}세
                          </p>
                          <p className="text-gray-500">
                            {patient.gender}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {patient.recentConditions
                            .slice(0, 2)
                            .map((condition, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="text-xs bg-blue-50 text-blue-700"
                              >
                                {condition}
                              </Badge>
                            ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getConsultationIcon(
                            patient.consultationCount,
                          )}
                          {getConsultationStatusBadge(
                            patient.consultationCount,
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {patient.consultationCount}회 상담
                        </p>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm text-gray-900">
                          {patient.lastConsultation}
                        </p>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-1 text-sm text-gray-600">
                            <Phone className="w-3 h-3" />
                            <span>{patient.phone}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-sm text-gray-600">
                            <Mail className="w-3 h-3" />
                            <span className="truncate max-w-32">
                              {patient.email}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() =>
                            handleConsultationClick(patient)
                          }
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          <Mic className="w-4 h-4 mr-1" />
                          상담 확인
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredPatients.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>검색 결과가 없습니다.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 상담 리스트 모달 */}
        <Dialog open={consultationModalOpen} onOpenChange={setConsultationModalOpen}>
          <DialogContent className="max-w-2xl bg-white shadow-xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <FileAudio className="w-5 h-5 text-blue-600" />
                <span>{modalPatient?.name}님의 상담 기록</span>
              </DialogTitle>
              <DialogDescription>
                상담 기록을 선택하여 상세 내용을 확인하세요
              </DialogDescription>
            </DialogHeader>
            
            <div className="mt-4">
              {modalPatient && (
                <div className="space-y-3">
                  {/* 새 상담 시작 버튼 */}
                  <Card className="border-dashed border-2 border-blue-200 hover:border-blue-400 transition-colors cursor-pointer"
                        onClick={() => handleConsultationSelect(modalPatient)}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Mic className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-blue-900">새 상담 시작</h4>
                            <p className="text-sm text-blue-600">오늘 새로운 상담을 시작합니다</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="border-blue-200 text-blue-700">
                          신규
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  {/* 기존 상담 기록들 */}
                  {modalPatient.consultations.map((consultation) => (
                    <Card key={consultation.id} 
                          className="hover:shadow-md transition-shadow cursor-pointer border-gray-200"
                          onClick={() => handleConsultationSelect(modalPatient)}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                              <FileAudio className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">
                                상담 기록 #{consultation.id}
                              </h4>
                              <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <div className="flex items-center space-x-1">
                                  <Calendar className="w-3 h-3" />
                                  <span>{consultation.date}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Clock className="w-3 h-3" />
                                  <span>{consultation.duration}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge 
                              variant={consultation.status === 'completed' ? 'default' : 'secondary'}
                              className={consultation.status === 'completed' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-yellow-100 text-yellow-700'}
                            >
                              {consultation.status === 'completed' ? '완료' : '진행중'}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {modalPatient.consultations.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <FileAudio className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>아직 상담 기록이 없습니다.</p>
                      <p className="text-sm">새 상담을 시작해보세요.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="text-center text-sm text-gray-600">
            <p>© 2024 (주)MAiN. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}