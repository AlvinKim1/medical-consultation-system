#!/bin/bash

# 의료진 상담 요약 시스템 - 빠른 설정 스크립트
# 이 스크립트는 프로젝트를 새로운 환경에서 빠르게 설정하는데 도움을 줍니다.

echo "🏥 의료진 상담 요약 시스템 설정을 시작합니다..."
echo ""

# Node.js 버전 확인
echo "📋 Node.js 버전 확인 중..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js가 설치되지 않았습니다. Node.js 18+ 버전을 설치해주세요."
    echo "다운로드: https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js 18+ 버전이 필요합니다. 현재 버전: $(node -v)"
    exit 1
fi
echo "✅ Node.js 버전: $(node -v)"

# 새 프로젝트 디렉토리 생성
echo ""
echo "📁 새 프로젝트 생성 중..."
PROJECT_NAME="medical-consultation-system"

if [ -d "$PROJECT_NAME" ]; then
    echo "⚠️  '$PROJECT_NAME' 디렉토리가 이미 존재합니다."
    read -p "덮어쓰시겠습니까? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        rm -rf "$PROJECT_NAME"
    else
        echo "설정을 취소합니다."
        exit 1
    fi
fi

# Vite 프로젝트 생성
echo "🚀 React TypeScript 프로젝트 생성 중..."
npm create vite@latest "$PROJECT_NAME" -- --template react-ts

cd "$PROJECT_NAME"

# 기본 의존성 설치
echo ""
echo "📦 기본 의존성 설치 중..."
npm install

# 추가 패키지 설치
echo ""
echo "📦 의료 시스템에 필요한 패키지 설치 중..."
npm install lucide-react class-variance-authority clsx tailwind-merge
npm install @radix-ui/react-dialog @radix-ui/react-select @radix-ui/react-scroll-area
npm install @radix-ui/react-separator @radix-ui/react-avatar @radix-ui/react-label
npm install @radix-ui/react-slot

# 개발 의존성 설치
echo ""
echo "🛠️  개발 도구 설치 중..."
npm install -D tailwindcss@^3.4.0 autoprefixer@^10.4.0 postcss@^8.4.0 @types/node

# 디렉토리 구조 생성
echo ""
echo "📁 프로젝트 구조 생성 중..."
mkdir -p src/components/{ui,figma}
mkdir -p src/{types,services,utils,styles,assets/images}

# 기본 파일 생성 (여기서는 empty 파일만 생성, 실제 내용은 사용자가 복사)
echo ""
echo "📄 기본 파일 구조 생성 중..."

# Tailwind 설정 파일 생성
cat > tailwind.config.js << 'EOF'
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
EOF

# Vite 설정 파일 업데이트
cat > vite.config.ts << 'EOF'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true
  }
})
EOF

# PostCSS 설정 파일 생성
cat > postcss.config.js << 'EOF'
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOF

# main.tsx 수정
cat > src/main.tsx << 'EOF'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
EOF

# 기본 styles/globals.css 파일 생성 (빈 파일)
touch src/styles/globals.css

# types/index.ts 생성
cat > src/types/index.ts << 'EOF'
export interface AudioTranscription {
  id: string;
  filename: string;
  originalText: string;
  duration: number;
  timestamp: Date;
}

export interface SOAPSummary {
  id: string;
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
  timestamp: Date;
  transcriptionId: string;
}

export interface MedicalConsultation {
  id: string;
  patientId: string;
  date: string;
  transcription?: AudioTranscription;
  soapSummary?: SOAPSummary;
  status: 'recording' | 'transcribed' | 'summarized' | 'completed';
  duration?: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
  lastConsultation?: string;
  consultationCount: number;
  recentConditions: string[];
  consultations: MedicalConsultation[];
}
EOF

# utils 함수 생성
cat > src/lib/utils.ts << 'EOF'
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
EOF

# README 파일 생성
cat > README.md << 'EOF'
# 의료진 상담 요약 시스템

## 설정 완료 후 해야 할 일

1. **파일 복사**: Figma Make에서 다음 파일들을 복사하세요:
   - src/styles/globals.css (CSS 변수 및 스타일)
   - src/components/* (모든 컴포넌트 파일)
   - src/services/medicalAPI.ts (API 서비스)

2. **이미지 처리**: 
   - `figma:asset` 경로를 실제 이미지 경로로 변경
   - ImageWithFallback 컴포넌트를 일반 img 태그로 교체

3. **실행**:
   ```bash
   npm run dev
   ```

## 테스트 계정
- 아이디: alvin
- 비밀번호: 1234
EOF

echo ""
echo "✅ 기본 설정이 완료되었습니다!"
echo ""
echo "🔄 다음 단계:"
echo "1. 'cd $PROJECT_NAME' 명령으로 프로젝트 폴더로 이동"
echo "2. Figma Make에서 다음 파일들을 복사:"
echo "   - src/styles/globals.css"
echo "   - src/components/* (모든 컴포넌트)"
echo "   - src/services/medicalAPI.ts"
echo "3. 이미지 경로 수정 (figma:asset → 실제 이미지)"
echo "4. 'npm run dev' 실행"
echo ""
echo "🎯 테스트 계정: alvin / 1234"
echo ""
echo "📖 자세한 가이드는 DEPLOYMENT_GUIDE.md를 참조하세요."

cd ..
echo "🏥 의료진 상담 요약 시스템 설정이 완료되었습니다!"