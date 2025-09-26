# 의료진 상담 요약 시스템 - 배포 가이드

이 가이드는 Figma Make에서 개발된 의료진 상담 요약 시스템을 VS Code나 다른 개발 환경에서 실행하는 방법을 설명합니다.

## 📋 시스템 요구사항

- Node.js 18+ 
- npm 또는 yarn
- Git (선택사항)

## 🚀 설치 및 실행 가이드

### 1단계: 새로운 React 프로젝트 생성

```bash
# Vite를 사용한 React TypeScript 프로젝트 생성
npm create vite@latest medical-consultation-system -- --template react-ts
cd medical-consultation-system
```

### 2단계: 필요한 의존성 설치

```bash
# 기본 의존성 설치
npm install

# 프로젝트에 필요한 추가 패키지 설치
npm install lucide-react class-variance-authority clsx tailwind-merge
npm install @radix-ui/react-dialog @radix-ui/react-select @radix-ui/react-scroll-area
npm install @radix-ui/react-separator @radix-ui/react-avatar @radix-ui/react-label
npm install @radix-ui/react-slot

# 개발 의존성 설치
npm install -D tailwindcss@beta @tailwindcss/vite@beta autoprefixer @types/node
```

### 3단계: Tailwind CSS 설정

`tailwind.config.js` 파일 생성:

```javascript
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
```

`vite.config.ts` 수정:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
```

### 4단계: 파일 구조 생성

다음 디렉토리 구조를 생성하세요:

```
src/
├── components/
│   ├── ui/
│   ├── figma/
│   ├── login-page.tsx
│   ├── dashboard.tsx
│   └── patient-detail.tsx
├── types/
│   └── index.ts
├── services/
│   └── medicalAPI.ts
├── utils/
│   └── translations.ts
├── styles/
│   └── globals.css
└── assets/
    └── images/
```

### 5단계: 파일 복사 및 수정

#### 5.1. 스타일 파일 복사
`src/styles/globals.css`에 제공된 CSS 내용을 복사합니다.

#### 5.2. `src/main.tsx` 수정
```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

#### 5.3. 이미지 파일 처리
로그인 페이지의 `figma:asset` 경로를 실제 이미지로 교체:

1. `src/assets/images/` 폴더에 의료진 관련 이미지를 추가
2. `login-page.tsx`에서 import 경로 수정:

```typescript
// 기존
import exampleImage from 'figma:asset/fc6cd40c655e62267e9b2eed444662ef6aaa9c16.png';

// 수정 후
import exampleImage from '../assets/images/medical-team.jpg';
```

3. ImageWithFallback 컴포넌트 제거 또는 일반 img 태그로 교체

#### 5.4. UI 컴포넌트 설치
Shadcn/ui 컴포넌트를 설치하거나 제공된 UI 컴포넌트 파일들을 복사합니다.

자세한 설치 방법:
```bash
# Shadcn/ui 초기화
npx shadcn@latest init

# 필요한 컴포넌트 설치
npx shadcn@latest add button card input label
npx shadcn@latest add dialog table badge avatar
npx shadcn@latest add scroll-area separator select textarea
```

### 6단계: 코드 수정사항

#### 6.1. Import 경로 수정
모든 컴포넌트에서 절대 경로를 상대 경로로 수정:

```typescript
// 기존
import { Button } from "./ui/button";

// 수정 후 (src 폴더 기준)
import { Button } from "./components/ui/button";
```

#### 6.2. Utils 함수 추가
`src/lib/utils.ts` 파일 생성:

```typescript
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### 7단계: 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173`을 열어 애플리케이션을 확인합니다.

## 🔧 커스터마이징

### 로그인 정보 변경
`src/components/login-page.tsx`에서 하드코딩된 계정 정보를 수정할 수 있습니다:

```typescript
if (credentials.id === 'your-id' && credentials.password === 'your-password') {
  onLogin(true);
}
```

### API 연동
`src/services/medicalAPI.ts`에서 Mock API를 실제 API로 교체할 수 있습니다.

### 스타일 수정
`src/styles/globals.css`에서 색상 테마나 폰트를 수정할 수 있습니다.

## 📁 배포

### Vercel 배포
```bash
npm run build
npx vercel --prod
```

### Netlify 배포
```bash
npm run build
# dist 폴더를 Netlify에 드래그 앤 드롭
```

## 🚨 주의사항

1. **이미지 경로**: `figma:asset` 경로를 실제 이미지 경로로 교체해야 합니다.
2. **ImageWithFallback**: Figma 전용 컴포넌트를 일반 `<img>` 태그로 교체하세요.
3. **API 연동**: 실제 환경에서는 Mock API를 실제 백엔드 API로 교체해야 합니다.
4. **보안**: 프로덕션 환경에서는 하드코딩된 로그인 정보를 제거하고 적절한 인증 시스템을 구현하세요.

## 🆘 문제 해결

### 컴포넌트 import 오류
- 모든 UI 컴포넌트가 올바르게 설치되었는지 확인
- import 경로가 올바른지 확인

### 스타일링 문제
- Tailwind CSS가 올바르게 설치되고 설정되었는지 확인
- globals.css가 올바르게 import되었는지 확인

### 빌드 오류
- TypeScript 타입 오류가 없는지 확인
- 모든 의존성이 설치되었는지 확인

## 📞 지원

추가 질문이나 문제가 있으시면 개발팀에 문의하세요.

---
© 2024 (주)MAiN. All rights reserved.