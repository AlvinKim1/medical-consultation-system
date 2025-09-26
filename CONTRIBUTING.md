# 기여 가이드 (Contributing Guide)

## 🚀 개발 환경 설정

### 1. 프로젝트 클론
```bash
git clone https://github.com/[username]/medical-consultation-system.git
cd medical-consultation-system
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 개발 서버 실행
```bash
npm run dev
```

## 📝 개발 워크플로우

### 1. 브랜치 생성
```bash
# 새 기능 개발
git checkout -b feature/새기능명

# 버그 수정
git checkout -b fix/버그수정명
```

### 2. 변경사항 커밋
```bash
git add .
git commit -m "feat: 새 기능 추가"
# 또는
git commit -m "fix: 버그 수정"
```

### 3. 푸시 및 Pull Request
```bash
git push origin feature/새기능명
```

## 🎯 커밋 메시지 규칙

- `feat:` 새로운 기능 추가
- `fix:` 버그 수정
- `docs:` 문서 수정
- `style:` 코드 포맷팅, 세미콜론 누락 등
- `refactor:` 코드 리팩토링
- `test:` 테스트 코드 추가
- `chore:` 빌드 과정 또는 보조 도구 변경

## 📁 프로젝트 구조

```
src/
├── components/          # React 컴포넌트
│   ├── ui/             # UI 기본 컴포넌트
│   ├── login-page-standalone.tsx
│   ├── dashboard.tsx
│   └── patient-detail.tsx
├── types/              # TypeScript 타입 정의
├── services/           # API 서비스
├── utils/              # 유틸리티 함수
├── styles/             # 스타일 파일
└── assets/             # 정적 리소스
```

## 🔧 개발 가이드라인

### 코드 스타일
- ESLint + Prettier 사용
- TypeScript strict 모드 준수
- 컴포넌트 기반 아키텍처

### 컴포넌트 작성 규칙
- 함수형 컴포넌트 사용
- TypeScript 타입 정의 필수
- Props 인터페이스 명시

### 스타일링
- Tailwind CSS 클래스 사용
- 반응형 디자인 적용
- 일관된 색상 테마 사용

## 🐛 버그 리포트

버그를 발견하셨다면 다음 정보를 포함해주세요:
- 버그 설명
- 재현 단계
- 예상 결과 vs 실제 결과
- 스크린샷 (필요시)

## 💡 기능 제안

새로운 기능을 제안하시려면:
- 기능 설명
- 사용 사례
- 구현 방법 (선택사항)

## 📞 문의

개발 관련 문의사항이 있으시면 이슈를 생성해주세요.
