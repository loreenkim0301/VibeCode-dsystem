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

  const CodeBlock: React.FC<{ code: string; id: string; componentType?: string }> = ({ code, id, componentType }) => {
    const currentTab = activeTab[id] || 'prompt';
    const prompt = componentType ? generateBoltPrompt(componentType, code) : '';

    const setTab = (tab: 'prompt' | 'code') => {
      setActiveTab(prev => ({ ...prev, [id]: tab }));
    };

    const copyContent = () => {
      const content = currentTab === 'prompt' ? prompt : code;
      copyToClipboard(content, `${id}-${currentTab}`);
    };

    return (
    <div className="relative bg-gray-900 rounded-lg p-4 mt-4">
      {/* 탭 헤더 */}
      <div className="flex items-center justify-between mb-4 border-b border-gray-700 pb-2">
        <div className="flex gap-1">
          <button
            onClick={() => setTab('prompt')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              currentTab === 'prompt'
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            <MessageSquare className="w-4 h-4 inline mr-1" />
            프롬프트 복사
          </button>
          <button
            onClick={() => setTab('code')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              currentTab === 'code'
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            <Code className="w-4 h-4 inline mr-1" />
            코드 복사
          </button>
        </div>
        
        <button
          onClick={copyContent}
          className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-md transition-colors"
          title={`${currentTab === 'prompt' ? '프롬프트' : '코드'} 복사`}
        >
          {copiedCode === `${id}-${currentTab}` ? (
            <>
              <Check className="w-4 h-4" />
              복사됨!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              복사
            </>
          )}
        </button>
      </div>
      
      {/* 탭 콘텐츠 */}
      <div className="min-h-[120px]">
        {currentTab === 'prompt' && componentType ? (
          <div className="space-y-3">
            <div className="text-xs text-blue-400 font-medium">
              💡 Bolt.new에서 이 프롬프트를 사용하여 컴포넌트를 쉽게 수정할 수 있습니다
            </div>
            <pre className="text-sm text-gray-300 overflow-x-auto whitespace-pre-wrap">
              <code>{prompt}</code>
            </pre>
          </div>
        ) : currentTab === 'code' ? (
          <pre className="text-sm text-gray-300 overflow-x-auto">
            <code>{code}</code>
          </pre>
        ) : (
          <div className="flex items-center justify-center h-24 text-gray-500">
            <p>이 컴포넌트에는 프롬프트가 제공되지 않습니다.</p>
          </div>
        )}
      </div>
    </div>
            </div>
          </div>
        </div>
      </header>
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

        {/* 디자인 시스템 소개 섹션 */}
        <div className="mb-16">
          <Card variant="elevated" className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-2xl text-center mb-4">
                🎨 학생들을 위한 디자인시스템 가이드
              </CardTitle>
              <CardDescription className="text-center text-lg">
                실무에서 사용하는 디자인시스템의 구조와 특징을 직접 체험하고 학습할 수 있습니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Layers className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">1. 디자인 토큰 시스템</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 색상 팔레트 (Primary, Secondary, Neutral, Semantic)</li>
                    <li>• 타이포그래피 스케일</li>
                    <li>• 스페이싱 시스템 (4px 기준)</li>
                    <li>• 그림자 및 테두리 스타일</li>
                    <li>• 애니메이션 토큰</li>
                  </ul>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Code className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">2. 핵심 컴포넌트 라이브러리</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 기본 컴포넌트 (Button, Input, Card, Badge 등)</li>
                    <li>• 레이아웃 컴포넌트 (Grid, Flex, Container)</li>
                    <li>• 네비게이션 컴포넌트 (Header, Sidebar, Breadcrumb)</li>
                    <li>• 피드백 컴포넌트 (Alert, Toast, Modal)</li>
                  </ul>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">3. Bolt.new에서 활용하기</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 컴포넌트 코드 복사 후 붙여넣기</li>
                    <li>• 디자인 토큰을 활용한 일관된 스타일링</li>
                    <li>• 반응형 디자인 자동 적용</li>
                    <li>• 접근성 기준 준수된 컴포넌트</li>
                    <li>• AI 프롬프트로 쉬운 커스터마이징</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border border-blue-200">
                <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  Bolt.new 활용 팁
                </h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-gray-800 mb-2">📋 코드 복사하기</p>
                    <p className="text-gray-600">각 컴포넌트 예제 옆의 복사 버튼을 클릭하여 코드를 클립보드에 복사한 후, Bolt.new에서 붙여넣기하세요.</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 mb-2">🎨 AI로 커스터마이징</p>
                    <p className="text-gray-600">수정 버튼(연필 아이콘)을 클릭하면 Bolt.new에서 사용할 수 있는 맞춤형 프롬프트가 생성됩니다.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Button variant="ghost" size="sm" onClick={() => setCurrentView('tokens')}>
            <Palette className="w-4 h-4 mr-2" />
            디자인 토큰 보기
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setCurrentView('guide')}
            className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 hover:from-green-100 hover:to-blue-100"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            컴포넌트 가이드
          </Button>
          
          <div className="w-px h-8 bg-gray-300 mx-2"></div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => scrollToSection('buttons')}
            className={`transition-all duration-200 ${
              activeSection === 'buttons'
                ? 'bg-blue-100 text-blue-900 font-medium border border-blue-300 shadow-sm'
                : 'text-gray-700 hover:bg-gray-100 border border-transparent'
            }`}
          >
            Buttons
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => scrollToSection('cards')}
            className={`transition-all duration-200 ${
              activeSection === 'cards'
                ? 'bg-blue-100 text-blue-900 font-medium border border-blue-300 shadow-sm'
                : 'text-gray-700 hover:bg-gray-100 border border-transparent'
            }`}
          >
            Cards
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => scrollToSection('inputs')}
            className={`transition-all duration-200 ${
              activeSection === 'inputs'
                ? 'bg-blue-100 text-blue-900 font-medium border border-blue-300 shadow-sm'
                : 'text-gray-700 hover:bg-gray-100 border border-transparent'
            }`}
          >
            Inputs
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => scrollToSection('badges')}
            className={`transition-all duration-200 ${
              activeSection === 'badges'
                ? 'bg-blue-100 text-blue-900 font-medium border border-blue-300 shadow-sm'
                : 'text-gray-700 hover:bg-gray-100 border border-transparent'
            }`}
          >
            Badges
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => scrollToSection('alerts')}
            className={`transition-all duration-200 ${
              activeSection === 'alerts'
                ? 'bg-blue-100 text-blue-900 font-medium border border-blue-300 shadow-sm'
                : 'text-gray-700 hover:bg-gray-100 border border-transparent'
            }`}
          >
            Alerts
          </Button>
        </div>

        {/* Component Sections */}
        <div className="space-y-16">
          
          {/* Buttons Section */}
          <section id="buttons">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Buttons
                </CardTitle>
                <CardDescription>
                  다양한 스타일과 크기의 버튼 컴포넌트들
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                
                {/* Button Variants */}
                <div>
                  <h4 className="text-lg font-semibold mb-4">변형 스타일</h4>
                  <div className="flex flex-wrap gap-3 mb-4">
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="destructive">Destructive</Button>
                  </div>
                  <CodeBlock 
                    id="button-variants"
                    componentType="button"
                    code={`<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>`}
                  />
                </div>

                {/* Button Sizes */}
                <div>
                  <h4 className="text-lg font-semibold mb-4">크기</h4>
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <Button size="xs">Extra Small</Button>
                    <Button size="sm">Small</Button>
                    <Button size="md">Medium</Button>
                    <Button size="lg">Large</Button>
                    <Button size="xl">Extra Large</Button>
                  </div>
                  <CodeBlock 
                    id="button-sizes"
                    componentType="button"
                    code={`<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>`}
                  />
                </div>

                {/* Button States */}
                <div>
                  <h4 className="text-lg font-semibold mb-4">상태 및 아이콘</h4>
                  <div className="flex flex-wrap gap-3 mb-4">
                    <Button leftIcon={<Heart className="w-4 h-4" />}>With Icon</Button>
                    <Button loading>Loading</Button>
                    <Button iconOnly>
                      <Settings className="w-4 h-4" />
                    </Button>
                    <Button disabled>Disabled</Button>
                    <Button fullWidth>Full Width</Button>
                  </div>
                  <CodeBlock 
                    id="button-states"
                    componentType="button"
                    code={`<Button leftIcon={<Heart className="w-4 h-4" />}>With Icon</Button>
<Button loading>Loading</Button>
<Button iconOnly><Settings className="w-4 h-4" /></Button>
<Button disabled>Disabled</Button>
<Button fullWidth>Full Width</Button>`}
                  />
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Cards Section */}
          <section id="cards">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Cards
                </CardTitle>
                <CardDescription>
                  콘텐츠를 담는 카드 컴포넌트들
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                
                <div>
                  <h4 className="text-lg font-semibold mb-4">카드 변형</h4>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <Card variant="default">
                      <CardHeader>
                        <CardTitle>Default</CardTitle>
                        <CardDescription>기본 카드</CardDescription>
                      </CardHeader>
                    </Card>
                    
                    <Card variant="outlined">
                      <CardHeader>
                        <CardTitle>Outlined</CardTitle>
                        <CardDescription>테두리 강조</CardDescription>
                      </CardHeader>
                    </Card>
                    
                    <Card variant="elevated">
                      <CardHeader>
                        <CardTitle>Elevated</CardTitle>
                        <CardDescription>그림자 효과</CardDescription>
                      </CardHeader>
                    </Card>
                    
                    <Card variant="filled">
                      <CardHeader>
                        <CardTitle>Filled</CardTitle>
                        <CardDescription>배경 채움</CardDescription>
                      </CardHeader>
                    </Card>
                  </div>
                  <CodeBlock 
                    id="card-variants"
                    componentType="card"
                    code={`<Card variant="default">
  <CardHeader>
    <CardTitle>Default</CardTitle>
    <CardDescription>기본 카드</CardDescription>
  </CardHeader>
</Card>`}
                  />
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4">인터랙티브 카드</h4>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <Card hoverable>
                      <CardHeader>
                        <CardTitle>Hoverable Card</CardTitle>
                        <CardDescription>마우스 호버 시 효과</CardDescription>
                      </CardHeader>
                    </Card>
                    
                    <Card clickable hoverable>
                      <CardHeader>
                        <CardTitle>Clickable Card</CardTitle>
                        <CardDescription>클릭 가능한 카드</CardDescription>
                      </CardHeader>
                    </Card>
                  </div>
                  <CodeBlock 
                    id="card-interactive"
                    componentType="card"
                    code={`<Card hoverable>
  <CardHeader>
    <CardTitle>Hoverable Card</CardTitle>
    <CardDescription>마우스 호버 시 효과</CardDescription>
  </CardHeader>
</Card>`}
                  />
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Inputs Section */}
          <section id="inputs">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Inputs
                </CardTitle>
                <CardDescription>
                  사용자 입력을 받는 다양한 입력 필드들
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                
                <div>
                  <h4 className="text-lg font-semibold mb-4">기본 입력 필드</h4>
                  <div className="grid md:grid-cols-2 gap-6 mb-4">
                    <Input 
                      label="기본 입력"
                      placeholder="텍스트를 입력하세요"
                      helperText="도움말 텍스트"
                    />
                    
                    <Input 
                      label="아이콘 포함"
                      placeholder="검색어 입력"
                      leftIcon={<Search className="w-4 h-4" />}
                    />
                  </div>
                  <CodeBlock 
                    id="input-basic"
                    componentType="input"
                    code={`<Input 
  label="기본 입력"
  placeholder="텍스트를 입력하세요"
  helperText="도움말 텍스트"
/>`}
                  />
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4">상태별 입력 필드</h4>
                  <div className="grid md:grid-cols-3 gap-6 mb-4">
                    <Input 
                      label="에러 상태"
                      placeholder="잘못된 입력"
                      error
                      errorMessage="올바른 형식으로 입력해주세요"
                    />
                    
                    <Input 
                      label="성공 상태"
                      placeholder="올바른 입력"
                      success
                      helperText="입력이 완료되었습니다"
                    />
                    
                    <Input 
                      label="비활성화"
                      placeholder="비활성화된 입력"
                      disabled
                    />
                  </div>
                  <CodeBlock 
                    id="input-states"
                    componentType="input"
                    code={`<Input 
  label="에러 상태"
  error
  errorMessage="올바른 형식으로 입력해주세요"
/>`}
                  />
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4">크기별 입력 필드</h4>
                  <div className="space-y-4 mb-4">
                    <Input size="sm" placeholder="Small 크기" />
                    <Input size="md" placeholder="Medium 크기 (기본)" />
                    <Input size="lg" placeholder="Large 크기" />
                  </div>
                  <CodeBlock 
                    id="input-sizes"
                    componentType="input"
                    code={`<Input size="sm" placeholder="Small 크기" />
<Input size="md" placeholder="Medium 크기 (기본)" />
<Input size="lg" placeholder="Large 크기" />`}
                  />
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Badges Section */}
          <section id="badges">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Badges
                </CardTitle>
                <CardDescription>
                  상태나 카테고리를 표시하는 배지 컴포넌트들
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                
                <div>
                  <h4 className="text-lg font-semibold mb-4">배지 변형</h4>
                  <div className="flex flex-wrap gap-3 mb-4">
                    <Badge variant="default">Default</Badge>
                    <Badge variant="primary">Primary</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="success">Success</Badge>
                    <Badge variant="warning">Warning</Badge>
                    <Badge variant="error">Error</Badge>
                    <Badge variant="outline">Outline</Badge>
                  </div>
                  <CodeBlock 
                    id="badge-variants"
                    componentType="badge"
                    code={`<Badge variant="default">Default</Badge>
<Badge variant="primary">Primary</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="outline">Outline</Badge>`}
                  />
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4">배지 크기</h4>
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <Badge size="sm">Small</Badge>
                    <Badge size="md">Medium</Badge>
                    <Badge size="lg">Large</Badge>
                  </div>
                  <CodeBlock 
                    id="badge-sizes"
                    componentType="badge"
                    code={`<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>`}
                  />
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4">특수 배지</h4>
                  <div className="flex flex-wrap gap-3 mb-4">
                    <Badge dot variant="success">온라인</Badge>
                    <Badge dot variant="error">오프라인</Badge>
                    <Badge removable onRemove={() => alert('제거됨!')}>제거 가능</Badge>
                  </div>
                  <CodeBlock 
                    id="badge-special"
                    componentType="badge"
                    code={`<Badge dot variant="success">온라인</Badge>
<Badge dot variant="error">오프라인</Badge>
<Badge removable onRemove={() => alert('제거됨!')}>제거 가능</Badge>`}
                  />
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Alerts Section */}
          <section id="alerts">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Alerts
                </CardTitle>
                <CardDescription>
                  사용자에게 중요한 정보를 전달하는 알림 컴포넌트들
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                
                <div>
                  <h4 className="text-lg font-semibold mb-4">알림 변형</h4>
                  <div className="space-y-4 mb-4">
                    <Alert variant="info" title="정보 알림">
                      이것은 정보성 메시지입니다. 사용자에게 유용한 정보를 제공합니다.
                    </Alert>
                    
                    <Alert variant="success" title="성공 알림">
                      작업이 성공적으로 완료되었습니다!
                    </Alert>
                    
                    <Alert variant="warning" title="주의 알림">
                      주의가 필요한 상황입니다. 확인 후 진행해주세요.
                    </Alert>
                    
                    <Alert variant="error" title="오류 알림">
                      오류가 발생했습니다. 다시 시도해주세요.
                    </Alert>
                  </div>
                  <CodeBlock 
                    id="alert-variants"
                    componentType="alert"
                    code={`<Alert variant="info" title="정보 알림">
  이것은 정보성 메시지입니다.
</Alert>

<Alert variant="success" title="성공 알림">
  작업이 성공적으로 완료되었습니다!
</Alert>`}
                  />
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4">닫기 가능한 알림</h4>
                  <div className="space-y-4 mb-4">
                    <Alert 
                      variant="warning" 
                      title="닫기 가능한 알림"
                      dismissible
                      onDismiss={() => alert('알림이 닫혔습니다!')}
                    >
                      이 알림은 닫기 버튼을 클릭하여 제거할 수 있습니다.
                    </Alert>
                  </div>
                  <CodeBlock 
                    id="alert-dismissible"
                    componentType="alert"
                    code={`<Alert 
  variant="warning" 
  title="닫기 가능한 알림"
  dismissible
  onDismiss={() => alert('알림이 닫혔습니다!')}
>
  이 알림은 닫기 버튼을 클릭하여 제거할 수 있습니다.
</Alert>`}
                  />
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-gray-50 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-8">
            {/* 기술 스택 섹션 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 text-center mb-6">
                🛠️ 기술 스택 (Tech Stack)
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {/* React */}
                <div className="flex flex-col items-center p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                    <Code className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-medium text-gray-900 text-sm">React</h4>
                  <p className="text-xs text-gray-500">v18.3.1</p>
                  <p className="text-xs text-gray-400 mt-1">UI 라이브러리</p>
                </div>

                {/* TypeScript */}
                <div className="flex flex-col items-center p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                    <Code className="w-6 h-6 text-blue-700" />
                  </div>
                  <h4 className="font-medium text-gray-900 text-sm">TypeScript</h4>
                  <p className="text-xs text-gray-500">v5.5.3</p>
                  <p className="text-xs text-gray-400 mt-1">타입 시스템</p>
                </div>

                {/* Tailwind CSS */}
                <div className="flex flex-col items-center p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-3">
                    <Palette className="w-6 h-6 text-cyan-600" />
                  </div>
                  <h4 className="font-medium text-gray-900 text-sm">Tailwind CSS</h4>
                  <p className="text-xs text-gray-500">v3.4.13</p>
                  <p className="text-xs text-gray-400 mt-1">CSS 프레임워크</p>
                </div>

                {/* Vite */}
                <div className="flex flex-col items-center p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                    <Zap className="w-6 h-6 text-purple-600" />
                  </div>
                  <h4 className="font-medium text-gray-900 text-sm">Vite</h4>
                  <p className="text-xs text-gray-500">v5.4.8</p>
                  <p className="text-xs text-gray-400 mt-1">빌드 도구</p>
                </div>

                {/* Lucide React */}
                <div className="flex flex-col items-center p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
                    <Star className="w-6 h-6 text-orange-600" />
                  </div>
                  <h4 className="font-medium text-gray-900 text-sm">Lucide React</h4>
                  <p className="text-xs text-gray-500">v0.446.0</p>
                  <p className="text-xs text-gray-400 mt-1">아이콘 라이브러리</p>
                </div>

                {/* ESLint */}
                <div className="flex flex-col items-center p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-3">
                    <Settings className="w-6 h-6 text-red-600" />
                  </div>
                  <h4 className="font-medium text-gray-900 text-sm">ESLint</h4>
                  <p className="text-xs text-gray-500">v9.11.1</p>
                  <p className="text-xs text-gray-400 mt-1">코드 품질</p>
                </div>
              </div>
            </div>

            {/* 구분선 */}
            <div className="border-t border-gray-200"></div>

            {/* 기존 푸터 정보 */}
            <div className="text-center">
              <p className="text-gray-600 mb-2">
                {designSystemInfo.description}
              </p>
              <p className="text-sm text-gray-500 mb-4">
                {designSystemInfo.name} {designSystemInfo.version} | Made with ❤️ for education
              </p>
              
              {/* 추가 기술 정보 */}
              <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-400">
                <span>• 스크래치 개발 (No UI Library)</span>
                <span>• 디자인 토큰 시스템</span>
                <span>• 반응형 디자인</span>
                <span>• 접근성 준수 (WCAG 2.1)</span>
                <span>• 교육용 최적화</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Preview;