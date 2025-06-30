/**
 * EduDesignSystem Component Guide
 * 컴포넌트 사용법과 Props 문서화 페이지
 */

import React, { useState } from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent,
  Button,
  Badge,
  Input,
  Alert,
  designSystemInfo
} from '../design-system';
import { 
  BookOpen, 
  Code, 
  Info, 
  Check, 
  Copy, 
  ArrowLeft,
  Eye,
  Settings,
  AlertCircle,
  CheckCircle,
  Search,
  Heart,
  X,
  Lightbulb,
  Shield,
  Zap,
  Target,
  Users,
  Palette
} from 'lucide-react';

interface ComponentGuideProps {
  onBack?: () => void;
}

const ComponentGuide: React.FC<ComponentGuideProps> = ({ onBack }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('button');

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const CodeDisplay: React.FC<{ code: string; id: string; title?: string }> = ({ code, id, title }) => (
    <div className="relative bg-gray-900 rounded-lg p-4 mt-4">
      <div className="flex items-center justify-between mb-3">
        {title && <span className="text-sm font-medium text-gray-300">{title}</span>}
        <button
          onClick={() => copyToClipboard(code, id)}
          className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-md transition-colors"
        >
          {copiedCode === id ? (
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
      <pre className="text-sm text-gray-300 overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );

  const PropTable: React.FC<{ props: Array<{name: string; type: string; default?: string; description: string; required?: boolean}> }> = ({ props }) => (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-2 px-3 font-medium text-gray-900">Prop</th>
            <th className="text-left py-2 px-3 font-medium text-gray-900">타입</th>
            <th className="text-left py-2 px-3 font-medium text-gray-900">기본값</th>
            <th className="text-left py-2 px-3 font-medium text-gray-900">설명</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop, index) => (
            <tr key={index} className="border-b border-gray-100">
              <td className="py-2 px-3">
                <code className="text-blue-600 bg-blue-50 px-1 rounded text-xs">
                  {prop.name}
                  {prop.required && <span className="text-red-500 ml-1">*</span>}
                </code>
              </td>
              <td className="py-2 px-3">
                <code className="text-gray-600 bg-gray-50 px-1 rounded text-xs">{prop.type}</code>
              </td>
              <td className="py-2 px-3">
                {prop.default ? (
                  <code className="text-green-600 bg-green-50 px-1 rounded text-xs">{prop.default}</code>
                ) : (
                  <span className="text-gray-400">-</span>
                )}
              </td>
              <td className="py-2 px-3 text-gray-700">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const GuideSection: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        {icon}
        {title}
      </h3>
      {children}
    </div>
  );

  const ButtonGuide = () => (
    <div className="space-y-8">
      <GuideSection title="Props 정의" icon={<Settings className="w-5 h-5 text-blue-600" />}>
        <PropTable props={[
          { name: 'variant', type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'", default: "'primary'", description: '버튼의 시각적 스타일을 결정합니다.' },
          { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: '버튼의 크기를 설정합니다.' },
          { name: 'loading', type: 'boolean', default: 'false', description: '로딩 상태를 표시합니다.' },
          { name: 'fullWidth', type: 'boolean', default: 'false', description: '버튼이 전체 너비를 차지하도록 합니다.' },
          { name: 'iconOnly', type: 'boolean', default: 'false', description: '아이콘만 표시하는 정사각형 버튼으로 만듭니다.' },
          { name: 'leftIcon', type: 'React.ReactNode', description: '버튼 왼쪽에 표시할 아이콘입니다.' },
          { name: 'rightIcon', type: 'React.ReactNode', description: '버튼 오른쪽에 표시할 아이콘입니다.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: '버튼을 비활성화합니다.' },
        ]} />
      </GuideSection>

      <GuideSection title="기본 사용법" icon={<Code className="w-5 h-5 text-green-600" />}>
        <div className="space-y-4">
          <div className="flex gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
          </div>
          <CodeDisplay 
            id="button-basic"
            title="기본 버튼 사용"
            code={`<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>`}
          />
        </div>
      </GuideSection>

      <GuideSection title="아이콘과 함께 사용" icon={<Heart className="w-5 h-5 text-red-500" />}>
        <div className="space-y-4">
          <div className="flex gap-3">
            <Button leftIcon={<Heart className="w-4 h-4" />}>좋아요</Button>
            <Button iconOnly><Settings className="w-4 h-4" /></Button>
            <Button loading>로딩중...</Button>
          </div>
          <CodeDisplay 
            id="button-icons"
            title="아이콘 버튼 사용"
            code={`import { Heart, Settings } from 'lucide-react';

<Button leftIcon={<Heart className="w-4 h-4" />}>좋아요</Button>
<Button iconOnly><Settings className="w-4 h-4" /></Button>
<Button loading>로딩중...</Button>`}
          />
        </div>
      </GuideSection>

      <GuideSection title="Do's and Don'ts" icon={<CheckCircle className="w-5 h-5 text-green-600" />}>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-green-700 mb-3 flex items-center gap-2">
              <Check className="w-4 h-4" />
              Do's (권장사항)
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• 주요 액션에는 primary variant 사용</li>
              <li>• 아이콘과 텍스트를 함께 사용할 때는 의미가 명확하게</li>
              <li>• 로딩 상태에서는 사용자에게 피드백 제공</li>
              <li>• 버튼 텍스트는 액션을 명확히 설명</li>
              <li>• 터치 디바이스를 고려한 적절한 크기 사용</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-red-700 mb-3 flex items-center gap-2">
              <X className="w-4 h-4" />
              Don'ts (피해야 할 것)
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• 한 화면에 primary 버튼을 너무 많이 사용</li>
              <li>• 아이콘 없이 iconOnly 속성 사용</li>
              <li>• 긴 텍스트를 버튼에 넣기</li>
              <li>• 비슷한 액션의 버튼을 인접하게 배치</li>
              <li>• 로딩 중에 추가 클릭 허용</li>
            </ul>
          </div>
        </div>
      </GuideSection>

      <GuideSection title="접근성 고려사항" icon={<Shield className="w-5 h-5 text-purple-600" />}>
        <div className="bg-purple-50 p-4 rounded-lg">
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• <strong>키보드 네비게이션:</strong> Tab 키로 포커스 이동, Enter/Space로 활성화</li>
            <li>• <strong>스크린 리더:</strong> 버튼의 목적이 명확한 텍스트 사용</li>
            <li>• <strong>색상 대비:</strong> WCAG 2.1 AA 기준 준수 (4.5:1 이상)</li>
            <li>• <strong>포커스 표시:</strong> 키보드 사용자를 위한 명확한 포커스 링</li>
            <li>• <strong>상태 표시:</strong> 로딩, 비활성화 상태를 명확히 전달</li>
          </ul>
        </div>
      </GuideSection>

      <GuideSection title="Bolt.new 활용 팁" icon={<Zap className="w-5 h-5 text-yellow-600" />}>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h4 className="font-medium text-yellow-800 mb-2">AI 프롬프트 예시:</h4>
          <div className="text-sm text-yellow-700 space-y-2">
            <p>"버튼에 호버 시 살짝 위로 올라가는 애니메이션 효과를 추가해주세요"</p>
            <p>"primary 버튼의 배경색을 그라디언트로 변경하고 싶어요"</p>
            <p>"버튼 클릭 시 ripple 효과를 추가할 수 있나요?"</p>
          </div>
        </div>
      </GuideSection>
    </div>
  );

  const CardGuide = () => (
    <div className="space-y-8">
      <GuideSection title="Props 정의" icon={<Settings className="w-5 h-5 text-blue-600" />}>
        <PropTable props={[
          { name: 'variant', type: "'default' | 'outlined' | 'elevated' | 'filled'", default: "'default'", description: '카드의 시각적 스타일을 결정합니다.' },
          { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: '카드의 패딩 크기를 설정합니다.' },
          { name: 'hoverable', type: 'boolean', default: 'false', description: '마우스 호버 시 효과를 활성화합니다.' },
          { name: 'clickable', type: 'boolean', default: 'false', description: '클릭 가능한 카드로 만듭니다.' },
          { name: 'noPadding', type: 'boolean', default: 'false', description: '카드의 기본 패딩을 제거합니다.' },
        ]} />
      </GuideSection>

      <GuideSection title="카드 구조" icon={<Code className="w-5 h-5 text-green-600" />}>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>카드 제목</CardTitle>
              <CardDescription>카드에 대한 설명입니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">카드의 주요 콘텐츠가 여기에 들어갑니다.</p>
            </CardContent>
          </Card>
          <CodeDisplay 
            id="card-structure"
            title="기본 카드 구조"
            code={`<Card>
  <CardHeader>
    <CardTitle>카드 제목</CardTitle>
    <CardDescription>카드에 대한 설명입니다.</CardDescription>
  </CardHeader>
  <CardContent>
    <p>카드의 주요 콘텐츠가 여기에 들어갑니다.</p>
  </CardContent>
</Card>`}
          />
        </div>
      </GuideSection>

      <GuideSection title="카드 변형" icon={<Palette className="w-5 h-5 text-purple-600" />}>
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card variant="elevated" hoverable>
              <CardHeader>
                <CardTitle>Elevated Card</CardTitle>
                <CardDescription>그림자 효과가 있는 카드</CardDescription>
              </CardHeader>
            </Card>
            <Card variant="outlined" clickable>
              <CardHeader>
                <CardTitle>Outlined Card</CardTitle>
                <CardDescription>테두리가 강조된 카드</CardDescription>
              </CardHeader>
            </Card>
          </div>
          <CodeDisplay 
            id="card-variants"
            title="카드 변형 사용"
            code={`<Card variant="elevated" hoverable>
  <CardHeader>
    <CardTitle>Elevated Card</CardTitle>
    <CardDescription>그림자 효과가 있는 카드</CardDescription>
  </CardHeader>
</Card>

<Card variant="outlined" clickable>
  <CardHeader>
    <CardTitle>Outlined Card</CardTitle>
    <CardDescription>테두리가 강조된 카드</CardDescription>
  </CardHeader>
</Card>`}
          />
        </div>
      </GuideSection>

      <GuideSection title="Do's and Don'ts" icon={<CheckCircle className="w-5 h-5 text-green-600" />}>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-green-700 mb-3 flex items-center gap-2">
              <Check className="w-4 h-4" />
              Do's (권장사항)
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• 관련된 정보를 그룹핑할 때 사용</li>
              <li>• 카드 제목은 명확하고 간결하게</li>
              <li>• 일관된 카드 크기와 간격 유지</li>
              <li>• 중요한 액션은 카드 하단에 배치</li>
              <li>• 적절한 여백으로 가독성 확보</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-red-700 mb-3 flex items-center gap-2">
              <X className="w-4 h-4" />
              Don'ts (피해야 할 것)
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• 너무 많은 정보를 한 카드에 담기</li>
              <li>• 카드 안에 또 다른 카드 중첩</li>
              <li>• 일관성 없는 카드 높이</li>
              <li>• 클릭 가능한 카드에 명확한 표시 없음</li>
              <li>• 과도한 그림자나 테두리 효과</li>
            </ul>
          </div>
        </div>
      </GuideSection>
    </div>
  );

  const InputGuide = () => (
    <div className="space-y-8">
      <GuideSection title="Props 정의" icon={<Settings className="w-5 h-5 text-blue-600" />}>
        <PropTable props={[
          { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: '입력 필드의 크기를 설정합니다.' },
          { name: 'error', type: 'boolean', default: 'false', description: '에러 상태를 표시합니다.' },
          { name: 'success', type: 'boolean', default: 'false', description: '성공 상태를 표시합니다.' },
          { name: 'leftIcon', type: 'React.ReactNode', description: '입력 필드 왼쪽에 표시할 아이콘입니다.' },
          { name: 'rightIcon', type: 'React.ReactNode', description: '입력 필드 오른쪽에 표시할 아이콘입니다.' },
          { name: 'label', type: 'string', description: '입력 필드의 라벨입니다.' },
          { name: 'helperText', type: 'string', description: '도움말 텍스트입니다.' },
          { name: 'errorMessage', type: 'string', description: '에러 메시지입니다.' },
          { name: 'fullWidth', type: 'boolean', default: 'false', description: '전체 너비를 사용합니다.' },
        ]} />
      </GuideSection>

      <GuideSection title="기본 사용법" icon={<Code className="w-5 h-5 text-green-600" />}>
        <div className="space-y-4">
          <div className="space-y-4 max-w-md">
            <Input 
              label="이메일"
              placeholder="이메일을 입력하세요"
              leftIcon={<Search className="w-4 h-4" />}
            />
            <Input 
              label="비밀번호"
              type="password"
              placeholder="비밀번호를 입력하세요"
              helperText="8자 이상 입력해주세요"
            />
          </div>
          <CodeDisplay 
            id="input-basic"
            title="기본 입력 필드 사용"
            code={`<Input 
  label="이메일"
  placeholder="이메일을 입력하세요"
  leftIcon={<Search className="w-4 h-4" />}
/>

<Input 
  label="비밀번호"
  type="password"
  placeholder="비밀번호를 입력하세요"
  helperText="8자 이상 입력해주세요"
/>`}
          />
        </div>
      </GuideSection>

      <GuideSection title="상태별 입력 필드" icon={<AlertCircle className="w-5 h-5 text-orange-600" />}>
        <div className="space-y-4">
          <div className="space-y-4 max-w-md">
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
          </div>
          <CodeDisplay 
            id="input-states"
            title="상태별 입력 필드"
            code={`<Input 
  label="에러 상태"
  error
  errorMessage="올바른 형식으로 입력해주세요"
/>

<Input 
  label="성공 상태"
  success
  helperText="입력이 완료되었습니다"
/>`}
          />
        </div>
      </GuideSection>

      <GuideSection title="접근성 고려사항" icon={<Shield className="w-5 h-5 text-purple-600" />}>
        <div className="bg-purple-50 p-4 rounded-lg">
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• <strong>라벨 연결:</strong> label과 input이 올바르게 연결되어 있음</li>
            <li>• <strong>에러 메시지:</strong> 스크린 리더가 읽을 수 있도록 aria-describedby 사용</li>
            <li>• <strong>플레이스홀더:</strong> 라벨을 대체하지 않고 보조 정보로만 사용</li>
            <li>• <strong>포커스 관리:</strong> 명확한 포커스 표시와 키보드 네비게이션</li>
            <li>• <strong>상태 표시:</strong> 시각적 표시와 함께 텍스트로도 상태 전달</li>
          </ul>
        </div>
      </GuideSection>
    </div>
  );

  const BadgeGuide = () => (
    <div className="space-y-8">
      <GuideSection title="Props 정의" icon={<Settings className="w-5 h-5 text-blue-600" />}>
        <PropTable props={[
          { name: 'variant', type: "'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'outline'", default: "'default'", description: '배지의 색상 스타일을 결정합니다.' },
          { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: '배지의 크기를 설정합니다.' },
          { name: 'dot', type: 'boolean', default: 'false', description: '배지 앞에 점을 표시합니다.' },
          { name: 'removable', type: 'boolean', default: 'false', description: '제거 가능한 배지로 만듭니다.' },
          { name: 'onRemove', type: '() => void', description: '배지 제거 시 호출되는 함수입니다.' },
        ]} />
      </GuideSection>

      <GuideSection title="기본 사용법" icon={<Code className="w-5 h-5 text-green-600" />}>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant="primary">Primary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
          </div>
          <CodeDisplay 
            id="badge-basic"
            title="기본 배지 사용"
            code={`<Badge variant="primary">Primary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>`}
          />
        </div>
      </GuideSection>

      <GuideSection title="특수 배지" icon={<Target className="w-5 h-5 text-indigo-600" />}>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge dot variant="success">온라인</Badge>
            <Badge dot variant="error">오프라인</Badge>
            <Badge removable onRemove={() => alert('제거됨!')}>제거 가능</Badge>
          </div>
          <CodeDisplay 
            id="badge-special"
            title="특수 배지 사용"
            code={`<Badge dot variant="success">온라인</Badge>
<Badge dot variant="error">오프라인</Badge>
<Badge removable onRemove={() => alert('제거됨!')}>제거 가능</Badge>`}
          />
        </div>
      </GuideSection>

      <GuideSection title="사용 시나리오" icon={<Users className="w-5 h-5 text-teal-600" />}>
        <div className="bg-teal-50 p-4 rounded-lg">
          <h4 className="font-medium text-teal-800 mb-2">배지 활용 예시:</h4>
          <ul className="space-y-1 text-sm text-teal-700">
            <li>• <strong>상태 표시:</strong> 온라인/오프라인, 활성/비활성</li>
            <li>• <strong>카테고리:</strong> 태그, 분류, 라벨링</li>
            <li>• <strong>알림:</strong> 새 메시지, 업데이트 알림</li>
            <li>• <strong>진행 상태:</strong> 완료, 진행중, 대기</li>
            <li>• <strong>우선순위:</strong> 높음, 보통, 낮음</li>
          </ul>
        </div>
      </GuideSection>
    </div>
  );

  const AlertGuide = () => (
    <div className="space-y-8">
      <GuideSection title="Props 정의" icon={<Settings className="w-5 h-5 text-blue-600" />}>
        <PropTable props={[
          { name: 'variant', type: "'info' | 'success' | 'warning' | 'error'", default: "'info'", description: '알림의 타입을 결정합니다.' },
          { name: 'title', type: 'string', description: '알림의 제목입니다.' },
          { name: 'dismissible', type: 'boolean', default: 'false', description: '닫기 가능한 알림으로 만듭니다.' },
          { name: 'onDismiss', type: '() => void', description: '알림 닫기 시 호출되는 함수입니다.' },
          { name: 'hideIcon', type: 'boolean', default: 'false', description: '아이콘을 숨깁니다.' },
        ]} />
      </GuideSection>

      <GuideSection title="기본 사용법" icon={<Code className="w-5 h-5 text-green-600" />}>
        <div className="space-y-4">
          <div className="space-y-3">
            <Alert variant="info" title="정보 알림">
              이것은 정보성 메시지입니다.
            </Alert>
            <Alert variant="success" title="성공 알림">
              작업이 성공적으로 완료되었습니다!
            </Alert>
          </div>
          <CodeDisplay 
            id="alert-basic"
            title="기본 알림 사용"
            code={`<Alert variant="info" title="정보 알림">
  이것은 정보성 메시지입니다.
</Alert>

<Alert variant="success" title="성공 알림">
  작업이 성공적으로 완료되었습니다!
</Alert>`}
          />
        </div>
      </GuideSection>

      <GuideSection title="닫기 가능한 알림" icon={<X className="w-5 h-5 text-gray-600" />}>
        <div className="space-y-4">
          <Alert 
            variant="warning" 
            title="주의 알림"
            dismissible
            onDismiss={() => alert('알림이 닫혔습니다!')}
          >
            이 알림은 닫기 버튼을 클릭하여 제거할 수 있습니다.
          </Alert>
          <CodeDisplay 
            id="alert-dismissible"
            title="닫기 가능한 알림"
            code={`<Alert 
  variant="warning" 
  title="주의 알림"
  dismissible
  onDismiss={() => alert('알림이 닫혔습니다!')}
>
  이 알림은 닫기 버튼을 클릭하여 제거할 수 있습니다.
</Alert>`}
          />
        </div>
      </GuideSection>

      <GuideSection title="알림 사용 가이드라인" icon={<Lightbulb className="w-5 h-5 text-yellow-600" />}>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h4 className="font-medium text-yellow-800 mb-2">효과적인 알림 사용법:</h4>
          <ul className="space-y-1 text-sm text-yellow-700">
            <li>• <strong>Info:</strong> 일반적인 정보나 팁 제공</li>
            <li>• <strong>Success:</strong> 작업 완료, 성공적인 액션 결과</li>
            <li>• <strong>Warning:</strong> 주의가 필요한 상황, 확인 요청</li>
            <li>• <strong>Error:</strong> 오류 발생, 실패한 액션 결과</li>
            <li>• 중요하지 않은 정보는 알림 대신 다른 방법 고려</li>
            <li>• 자동으로 사라지는 알림과 수동으로 닫는 알림 구분</li>
          </ul>
        </div>
      </GuideSection>
    </div>
  );

  const sections = [
    { id: 'button', label: 'Button', icon: Code, component: ButtonGuide },
    { id: 'card', label: 'Card', icon: BookOpen, component: CardGuide },
    { id: 'input', label: 'Input', icon: Search, component: InputGuide },
    { id: 'badge', label: 'Badge', icon: Target, component: BadgeGuide },
    { id: 'alert', label: 'Alert', icon: AlertCircle, component: AlertGuide },
  ];

  const activeComponent = sections.find(section => section.id === activeSection)?.component || ButtonGuide;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              {onBack && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  leftIcon={<ArrowLeft className="w-4 h-4" />}
                  onClick={onBack}
                >
                  뒤로
                </Button>
              )}
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">컴포넌트 가이드</h1>
                <p className="text-xs text-gray-500">{designSystemInfo.name}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Badge variant="secondary" size="sm">
                <BookOpen className="w-3 h-3 mr-1" />
                문서화
              </Badge>
              <Badge variant="outline" size="sm">
                <Code className="w-3 h-3 mr-1" />
                가이드
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 flex-shrink-0">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">컴포넌트 목록</CardTitle>
                <CardDescription>
                  각 컴포넌트의 상세 사용법을 확인하세요
                </CardDescription>
              </CardHeader>
              <CardContent>
                <nav className="space-y-2">
                  {sections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-md transition-colors ${
                          activeSection === section.id
                            ? 'bg-blue-100 text-blue-900 font-medium'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {section.label}
                      </button>
                    );
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {React.createElement(sections.find(s => s.id === activeSection)?.icon || Code, { className: "w-5 h-5" })}
                  {sections.find(s => s.id === activeSection)?.label} 컴포넌트
                </CardTitle>
                <CardDescription>
                  Props, 사용법, 접근성 고려사항 및 Bolt.new 활용 팁을 확인하세요.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {React.createElement(activeComponent)}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentGuide;