# VibeCodeZero Design System

기획자/디자이너를 위한 교육용 디자인시스템입니다.

## 🎨 프로젝트 소개

VibeCodeZero Design System은 학생들이 실무에서 사용하는 디자인시스템의 구조와 특징을 직접 체험하고 학습할 수 있도록 제작된 교육용 디자인시스템입니다.

### 주요 특징

- **디자인 토큰 시스템**: 색상, 타이포그래피, 스페이싱, 그림자 등 체계적인 토큰 관리
- **핵심 컴포넌트 라이브러리**: Button, Card, Input, Badge, Alert 등 기본 컴포넌트
- **Bolt.new 최적화**: AI 프롬프트와 코드 복사 기능으로 쉬운 활용
- **접근성 준수**: WCAG 2.1 AA 기준 준수
- **반응형 디자인**: 모든 디바이스에서 최적화된 경험

## 🚀 시작하기

### 설치

```bash
# 저장소 클론
git clone https://github.com/YOUR_USERNAME/vibecodezero-design-system.git

# 디렉토리 이동
cd vibecodezero-design-system

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

### 빌드

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

## 📚 사용법

### 컴포넌트 사용

```tsx
import { Button, Card, CardHeader, CardTitle, CardContent } from './design-system';

function App() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>안녕하세요!</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="primary">클릭하세요</Button>
      </CardContent>
    </Card>
  );
}
```

### 디자인 토큰 활용

```tsx
import { colors, spacing, typography } from './design-system/tokens';

// CSS-in-JS에서 사용
const styles = {
  backgroundColor: colors.primary[500],
  padding: spacing[4],
  fontSize: typography.fontSize.lg,
};
```

## 🛠️ 기술 스택

- **React** 18.3.1 - UI 라이브러리
- **TypeScript** 5.5.3 - 타입 시스템
- **Tailwind CSS** 3.4.13 - CSS 프레임워크
- **Vite** 5.4.8 - 빌드 도구
- **Lucide React** 0.446.0 - 아이콘 라이브러리

## 📖 문서

- [컴포넌트 가이드](./docs/components.md) - 각 컴포넌트의 상세 사용법
- [디자인 토큰](./docs/tokens.md) - 디자인 토큰 시스템 가이드
- [Bolt.new 활용법](./docs/bolt-integration.md) - AI와 함께 개발하는 방법

## 🎯 학습 목표

이 프로젝트를 통해 다음을 학습할 수 있습니다:

1. **디자인 시스템 구조 이해**
   - 디자인 토큰의 개념과 활용
   - 컴포넌트 라이브러리 구조
   - 일관성 있는 디자인 원칙

2. **실무 개발 프로세스**
   - TypeScript를 활용한 타입 안전성
   - 컴포넌트 기반 개발
   - 접근성 고려사항

3. **AI 도구 활용**
   - Bolt.new와 같은 AI 개발 도구 사용법
   - 효과적인 프롬프트 작성
   - 코드 재사용과 커스터마이징

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 👥 제작팀

- **EduDesignSystem Team** - 교육용 디자인시스템 개발팀

## 📞 문의

프로젝트에 대한 질문이나 제안사항이 있으시면 이슈를 생성해주세요.

---

**VibeCodeZero Design System v1.1.1** | Made with ❤️ for education