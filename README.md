# 의료진 상담 요약 시스템 🏥

AI 기반의 의료진 전용 상담 요약 시스템입니다. 환자와의 상담 내용을 자동으로 SOAP 형식으로 요약하여 효율적인 진료를 지원합니다.

## ✨ 주요 기능

- **🔐 의료진 전용 로그인**: 안전한 의료진 인증 시스템
- **👥 환자 관리**: 환자 정보 및 상담 이력 관리
- **📝 상담 녹취록**: 상담 내용의 텍스트 변환 및 관리
- **🎯 SOAP 요약**: AI 기반 자동 의료 요약 생성
- **📱 반응형 디자인**: 데스크톱 및 모바일 지원
- **🎨 의료 테마**: 따뜻하고 전문적인 UI/UX

## 🛠 기술 스택

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI, Lucide React
- **Build Tool**: Vite
- **State Management**: React Hooks

## 🚀 빠른 시작

### 필요 조건
- Node.js 18+
- npm 또는 yarn
- Git

### 설치 및 실행

```bash
# 프로젝트 클론
git clone https://github.com/[username]/medical-consultation-system.git
cd medical-consultation-system

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

### 자동 설정 (추천)
```bash
# 스크립트에 실행 권한 부여
chmod +x quick-setup.sh

# 자동 설정 실행
./quick-setup.sh
```

### 테스트 계정
- **아이디**: `alvin`
- **비밀번호**: `1234`

## 📁 프로젝트 구조

```
src/
├── components/          # React 컴포넌트
│   ├── ui/             # UI 기본 컴포넌트
│   ├── login-page.tsx  # 로그인 페이지
│   ├── dashboard.tsx   # 대시보드
│   └── patient-detail.tsx # 환자 상세 페이지
├── types/              # TypeScript 타입 정의
├── services/           # API 서비스
├── utils/              # 유틸리티 함수
├── styles/             # 스타일 파일
└── assets/             # 정적 리소스
```

## 🔧 주요 컴포넌트

### 로그인 시스템
- 하드코딩된 테스트 계정 지원
- 반응형 로그인 폼
- 의료 테마 디자인

### 환자 관리 대시보드
- 환자 목록 및 검색
- 상담 이력 관리
- 통계 정보 표시

### 상담 상세 페이지
- 상담 녹취록 표시 및 편집
- SOAP 요약 자동 생성
- 대화형 UI (의사-환자 구분)

## 🎨 디자인 시스템

### 색상 팔레트
- **Primary**: 블루 계열 (신뢰감)
- **Secondary**: 그린 계열 (안정감)
- **Accent**: 따뜻한 톤 (친근함)

### 레이아웃
- **헤더**: 고정형 네비게이션
- **메인**: 반응형 그리드 레이아웃
- **푸터**: 회사 정보 표시

## 📱 반응형 지원

- **Desktop**: 1024px 이상
- **Tablet**: 768px - 1023px
- **Mobile**: 767px 이하

## 🔒 보안 고려사항

- 현재 버전은 데모용으로 하드코딩된 인증 사용
- 프로덕션 환경에서는 적절한 인증 시스템 구현 필요
- 개인정보 보호 및 의료정보 보안 준수 필요

## 🚀 배포

### 빌드
```bash
npm run build
```

### 프리뷰
```bash
npm run preview
```

### 배포 옵션
- **Vercel**: `vercel --prod`
- **Netlify**: `netlify deploy --prod`
- **AWS S3**: 정적 웹사이트 호스팅

## 🧪 개발 가이드

### 환경 설정
1. Node.js 설치
2. 프로젝트 클론
3. 의존성 설치
4. 개발 서버 실행

### 코드 스타일
- ESLint + Prettier 사용
- TypeScript strict 모드
- 컴포넌트 기반 아키텍처

### API 통합
- 현재 Mock API 사용
- `src/services/medicalAPI.ts`에서 실제 API로 교체 가능

## 📄 라이선스

© 2024 (주)MAiN. All rights reserved.

## 🆘 지원

기술 지원이나 문의사항이 있으시면 개발팀에 연락주세요.

---

**주의**: 이 시스템은 데모 목적으로 제작되었으며, 실제 의료 환경에서 사용하기 전에 적절한 보안 및 규정 준수 검토가 필요합니다.