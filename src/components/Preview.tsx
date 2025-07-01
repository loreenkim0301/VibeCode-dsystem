/**
 * EduDesignSystem Preview Page
 * 디자인시스템 컴포넌트들을 미리보기할 수 있는 페이지
 */

import React, { useState } from 'react';
import DesignTokens from './DesignTokens';
import ComponentGuide from './ComponentGuide';
import { 
  Button, 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent,
  Input,
  Badge,
  Alert,
  designSystemInfo
} from '../design-system';
import { 
  Heart, 
  Download, 
  Github, 
  Palette, 
  Code, 
  BookOpen, 
  Search,
  Settings,
  Star,
  Copy,
  Check,
  Layers,
  Zap,
  Target,
  Edit3,
  MessageSquare,
  Lightbulb
} from 'lucide-react';

const Preview: React.FC = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Record<string, 'prompt' | 'code'>>({});
  const [currentView, setCurrentView] = useState<'preview' | 'tokens' | 'guide'>('preview');

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const generateBoltPrompt = (componentType: string, currentCode: string) => {
    const prompts = {
      button: `목적: 버튼 컴포넌트의 스타일을 더 현대적이고 접근성이 좋게 개선하고 싶습니다.

ASIS: 현재 버튼은 기본적인 스타일만 적용되어 있습니다.
${currentCode}

TOBE: 
- .btn-primary 클래스에 그라디언트 배경과 부드러운 그림자 효과 추가
- hover 상태에서 transform: translateY(-2px) 효과 적용
- focus 상태에서 접근성을 위한 outline 스타일 개선
- 버튼 내부 텍스트에 font-weight: 600 적용

제약조건:
- 기존 variant prop 구조는 유지
- 색상은 디자인 토큰의 primary 색상 팔레트 사용
- 애니메이션은 200ms 이하로 제한
- WCAG 2.1 AA 접근성 기준 준수`,

      card: `목적: 카드 컴포넌트에 더 세련된 시각적 계층과 인터랙션을 추가하고 싶습니다.

ASIS: 현재 카드는 단순한 테두리와 배경만 있습니다.
${currentCode}

TOBE:
- .card-elevated 클래스에 box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) 적용
- hoverable prop이 true일 때 hover:shadow-lg 효과 추가
- 카드 내부 padding을 24px로 조정
- border-radius를 12px로 변경하여 더 부드러운 모서리 구현

제약조건:
- CardHeader, CardContent 등 하위 컴포넌트 구조 유지
- 기존 variant 시스템과 호환성 보장
- 모바일에서도 적절한 여백 유지
- 성능을 위해 transform 대신 box-shadow 사용`,

      input: `목적: 입력 필드의 사용자 경험을 개선하고 시각적 피드백을 강화하고 싶습니다.

ASIS: 현재 입력 필드는 기본적인 테두리 스타일만 적용되어 있습니다.
${currentCode}

TOBE:
- .input-field 클래스에 focus 상태에서 border-color: #3b82f6, box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) 적용
- error 상태일 때 .input-error 클래스로 border-color: #ef4444, 아이콘 색상 빨간색으로 변경
- placeholder 텍스트 색상을 #9ca3af로 조정
- 라벨에 transition 효과 추가하여 focus 시 색상 변경

제약조건:
- 기존 size prop (sm, md, lg) 구조 유지
- leftIcon, rightIcon 위치 및 크기 보존
- 에러 메시지 표시 방식 변경 금지
- 키보드 네비게이션 접근성 유지`,

      badge: `목적: 배지 컴포넌트의 가독성과 시각적 임팩트를 향상시키고 싶습니다.

ASIS: 현재 배지는 단순한 배경색과 텍스트만 있습니다.
${currentCode}

TOBE:
- .badge-primary 클래스에 background: linear-gradient(135deg, #3b82f6, #1d4ed8) 적용
- 모든 배지에 font-weight: 500, letter-spacing: 0.025em 추가
- dot prop이 있을 때 .badge-dot::before 가상 요소로 8px 크기 점 표시
- removable 배지의 X 버튼에 hover:bg-black/20 효과 추가

제약조건:
- 기존 variant 색상 시스템 유지
- size prop에 따른 padding 비율 보존
- 제거 기능 동작 방식 변경 금지
- 텍스트 대비율 4.5:1 이상 유지`,

      alert: `목적: 알림 컴포넌트의 시각적 구분도를 높이고 사용자 주의를 효과적으로 끌고 싶습니다.

ASIS: 현재 알림은 기본적인 배경색과 아이콘만 있습니다.
${currentCode}

TOBE:
- .alert-warning 클래스에 border-left: 4px solid #f59e0b 추가하여 강조 효과
- 각 variant별로 아이콘 색상을 더 진하게 조정 (warning: #d97706, error: #dc2626)
- dismissible 버튼에 hover:rotate-90 transition 효과 추가
- 알림 전체에 backdrop-filter: blur(8px) 적용하여 배경 흐림 효과

제약조건:
- 기존 variant별 색상 구분 체계 유지
- 아이콘 크기 및 위치 변경 금지
- onDismiss 콜백 함수 동작 방식 보존
- 모바일 환경에서 터치 친화적 버튼 크기 유지`
    };

    const prompt = prompts[componentType as keyof typeof prompts] || '프롬프트를 생성할 수 없습니다.';
    return prompt;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold text-gray-900">
                {designSystemInfo.name}
              </h1>
              <Badge variant="outline" size="sm">
                {designSystemInfo.version}
              </Badge>
            </div>
            
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setCurrentView('preview')}
                className={currentView === 'preview' ? 'bg-blue-50 text-blue-700' : ''}
              >
                <Code className="w-4 h-4 mr-2" />
                미리보기
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setCurrentView('tokens')}
                className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 hover:from-blue-100 hover:to-purple-100"
              >
                <Palette className="w-4 h-4 mr-2" />
                디자인 토큰 보기
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {currentView === 'tokens' ? (
          <DesignTokens />
        ) : currentView === 'guide' ? (
          <ComponentGuide />
        ) : (
          <div>
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                컴포넌트 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  {' '}미리보기
                </span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                EduDesignSystem의 모든 컴포넌트를 실제로 확인하고 코드 예제를 복사할 수 있습니다.
              </p>
            </div>

            {/* Component Sections */}
            <div className="space-y-16">
              {/* ... (각 컴포넌트 섹션) ... */}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t bg-gray-50 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <p className="text-gray-600 mb-2">
              {designSystemInfo.description}
            </p>
            <p className="text-sm text-gray-500">
              {designSystemInfo.name} {designSystemInfo.version} | Made with ❤️ for education
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Preview;