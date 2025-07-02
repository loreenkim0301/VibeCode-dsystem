/**
 * EduDesignSystem Design Tokens Visualization
 * 디자인 토큰을 시각적으로 보여주는 페이지
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
  designSystemInfo
} from '../design-system';
import { 
  colors, 
  typography, 
  spacing, 
  shadows, 
  borders, 
  animations 
} from '../design-system/tokens';
import { 
  Palette, 
  Type, 
  Ruler, 
  Layers, 
  CornerUpRight, 
  Zap,
  Copy,
  Check,
  ArrowLeft,
  Eye,
  Code2
} from 'lucide-react';

interface DesignTokensProps {
  onBack?: () => void;
}

const DesignTokens: React.FC<DesignTokensProps> = ({ onBack }) => {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('colors');

  const copyToClipboard = (value: string, tokenName: string) => {
    navigator.clipboard.writeText(value);
    setCopiedToken(tokenName);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const ColorPalette: React.FC<{ title: string; colors: Record<string, string>; prefix?: string }> = ({ 
    title, 
    colors: colorSet, 
    prefix = '' 
  }) => (
    <div className="mb-8">
      <h4 className="text-lg font-semibold mb-4">{title}</h4>
      <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-3">
        {Object.entries(colorSet).map(([key, value]) => (
          <div key={key} className="group">
            <div 
              className="w-full h-16 rounded-lg border border-gray-200 cursor-pointer transition-transform hover:scale-105"
              style={{ backgroundColor: value }}
              onClick={() => copyToClipboard(value, `${prefix}${key}`)}
              title={`클릭하여 복사: ${value}`}
            />
            <div className="mt-2 text-center">
              <p className="text-xs font-medium text-gray-700">{key}</p>
              <p className="text-xs text-gray-500 font-mono">{value}</p>
              {copiedToken === `${prefix}${key}` && (
                <p className="text-xs text-green-600 flex items-center justify-center gap-1 mt-1">
                  <Check className="w-3 h-3" />
                  복사됨!
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const TypographyScale: React.FC = () => (
    <div className="space-y-6">
      <h4 className="text-lg font-semibold mb-4">타이포그래피 스케일</h4>
      
      {/* Font Sizes */}
      <div>
        <h5 className="text-md font-medium mb-3">폰트 크기</h5>
        <div className="space-y-3">
          {Object.entries(typography.fontSize).map(([key, value]) => (
            <div 
              key={key} 
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => copyToClipboard(value, `fontSize-${key}`)}
            >
              <div className="flex items-center gap-4">
                <span className="text-sm font-mono text-gray-600 w-12">{key}</span>
                <span 
                  className="font-medium"
                  style={{ fontSize: value }}
                >
                  The quick brown fox jumps
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 font-mono">{value}</span>
                {copiedToken === `fontSize-${key}` ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-400" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Font Weights */}
      <div>
        <h5 className="text-md font-medium mb-3">폰트 굵기</h5>
        <div className="grid md:grid-cols-2 gap-3">
          {Object.entries(typography.fontWeight).map(([key, value]) => (
            <div 
              key={key}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => copyToClipboard(value, `fontWeight-${key}`)}
            >
              <span 
                className="text-lg"
                style={{ fontWeight: value }}
              >
                {key} - Sample Text
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 font-mono">{value}</span>
                {copiedToken === `fontWeight-${key}` ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-400" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const SpacingSystem: React.FC = () => (
    <div className="space-y-6">
      <h4 className="text-lg font-semibold mb-4">스페이싱 시스템 (4px 기준)</h4>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(spacing).map(([key, value]) => (
          <div 
            key={key}
            className="p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
            onClick={() => copyToClipboard(value, `spacing-${key}`)}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">{key}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 font-mono">{value}</span>
                {copiedToken === `spacing-${key}` ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-400" />
                )}
              </div>
            </div>
            <div className="flex items-center">
              <div 
                className="bg-blue-500 rounded"
                style={{ 
                  width: value, 
                  height: '16px',
                  maxWidth: '100%'
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ShadowSamples: React.FC = () => (
    <div className="space-y-6">
      <h4 className="text-lg font-semibold mb-4">그림자 스타일</h4>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(shadows).map(([key, value]) => (
          <div 
            key={key}
            className="p-6 bg-white rounded-lg cursor-pointer hover:scale-105 transition-transform"
            style={{ boxShadow: value }}
            onClick={() => copyToClipboard(value, `shadow-${key}`)}
          >
            <div className="text-center">
              <h5 className="font-medium text-gray-900 mb-2">{key}</h5>
              <p className="text-xs text-gray-500 font-mono break-all">{value}</p>
              {copiedToken === `shadow-${key}` && (
                <p className="text-xs text-green-600 flex items-center justify-center gap-1 mt-2">
                  <Check className="w-3 h-3" />
                  복사됨!
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const BorderSamples: React.FC = () => (
    <div className="space-y-6">
      <h4 className="text-lg font-semibold mb-4">테두리 스타일</h4>
      
      {/* Border Radius */}
      <div>
        <h5 className="text-md font-medium mb-3">테두리 반지름</h5>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Object.entries(borders.radius).map(([key, value]) => (
            <div 
              key={key}
              className="p-4 bg-blue-100 border-2 border-blue-300 cursor-pointer hover:bg-blue-200 transition-colors"
              style={{ borderRadius: value }}
              onClick={() => copyToClipboard(value, `radius-${key}`)}
            >
              <div className="text-center">
                <p className="text-sm font-medium text-blue-900">{key}</p>
                <p className="text-xs text-blue-700 font-mono">{value}</p>
                {copiedToken === `radius-${key}` && (
                  <p className="text-xs text-green-600 flex items-center justify-center gap-1 mt-1">
                    <Check className="w-3 h-3" />
                    복사됨!
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Border Widths */}
      <div>
        <h5 className="text-md font-medium mb-3">테두리 두께</h5>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
          {Object.entries(borders.width).map(([key, value]) => (
            <div 
              key={key}
              className="p-4 bg-gray-50 border-gray-400 cursor-pointer hover:bg-gray-100 transition-colors"
              style={{ borderWidth: value, borderStyle: 'solid' }}
              onClick={() => copyToClipboard(value, `borderWidth-${key}`)}
            >
              <div className="text-center">
                <p className="text-sm font-medium">{key}</p>
                <p className="text-xs text-gray-500 font-mono">{value}</p>
                {copiedToken === `borderWidth-${key}` && (
                  <p className="text-xs text-green-600 flex items-center justify-center gap-1 mt-1">
                    <Check className="w-3 h-3" />
                    복사됨!
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const AnimationSamples: React.FC = () => {
    const [animatingElements, setAnimatingElements] = useState<Set<string>>(new Set());

    const triggerAnimation = (key: string) => {
      setAnimatingElements(prev => new Set(prev).add(key));
      setTimeout(() => {
        setAnimatingElements(prev => {
          const newSet = new Set(prev);
          newSet.delete(key);
          return newSet;
        });
      }, 1000);
    };

    return (
      <div className="space-y-6">
        <h4 className="text-lg font-semibold mb-4">애니메이션 토큰</h4>
        
        {/* Duration */}
        <div>
          <h5 className="text-md font-medium mb-3">지속 시간</h5>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {Object.entries(animations.duration).map(([key, value]) => (
              <div 
                key={key}
                className="p-4 bg-purple-50 border border-purple-200 rounded-lg cursor-pointer hover:bg-purple-100 transition-colors"
                onClick={() => copyToClipboard(value, `duration-${key}`)}
              >
                <div className="text-center">
                  <p className="text-sm font-medium text-purple-900">{key}</p>
                  <p className="text-xs text-purple-700 font-mono">{value}</p>
                  {copiedToken === `duration-${key}` && (
                    <p className="text-xs text-green-600 flex items-center justify-center gap-1 mt-1">
                      <Check className="w-3 h-3" />
                      복사됨!
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timing Functions */}
        <div>
          <h5 className="text-md font-medium mb-3">이징 함수</h5>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(animations.timing).map(([key, value]) => (
              <div 
                key={key}
                className={`p-4 bg-green-50 border border-green-200 rounded-lg cursor-pointer transition-all duration-500 ${
                  animatingElements.has(key) ? 'transform scale-110 bg-green-100' : 'hover:bg-green-100'
                }`}
                style={{ 
                  transitionTimingFunction: value,
                  transitionDuration: '500ms'
                }}
                onClick={() => {
                  triggerAnimation(key);
                  copyToClipboard(value, `timing-${key}`);
                }}
              >
                <div className="text-center">
                  <p className="text-sm font-medium text-green-900">{key}</p>
                  <p className="text-xs text-green-700 font-mono break-all">{value}</p>
                  {copiedToken === `timing-${key}` && (
                    <p className="text-xs text-green-600 flex items-center justify-center gap-1 mt-1">
                      <Check className="w-3 h-3" />
                      복사됨!
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const sections = [
    { id: 'colors', label: '색상', icon: Palette, component: () => (
      <div className="space-y-8">
        <ColorPalette title="Primary Colors" colors={colors.primary} prefix="primary-" />
        <ColorPalette title="Secondary Colors" colors={colors.secondary} prefix="secondary-" />
        <ColorPalette title="Neutral Colors" colors={colors.neutral} prefix="neutral-" />
        <ColorPalette title="Success Colors" colors={colors.semantic.success} prefix="success-" />
        <ColorPalette title="Warning Colors" colors={colors.semantic.warning} prefix="warning-" />
        <ColorPalette title="Error Colors" colors={colors.semantic.error} prefix="error-" />
        <ColorPalette title="Info Colors" colors={colors.semantic.info} prefix="info-" />
      </div>
    )},
    { id: 'typography', label: '타이포그래피', icon: Type, component: TypographyScale },
    { id: 'spacing', label: '스페이싱', icon: Ruler, component: SpacingSystem },
    { id: 'shadows', label: '그림자', icon: Layers, component: ShadowSamples },
    { id: 'borders', label: '테두리', icon: CornerUpRight, component: BorderSamples },
    { id: 'animations', label: '애니메이션', icon: Zap, component: AnimationSamples },
  ];

  const activeComponent = sections.find(section => section.id === activeSection)?.component || (() => null);

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
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Palette className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">디자인 토큰</h1>
                <p className="text-xs text-gray-500">{designSystemInfo.name}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Badge variant="secondary" size="sm">
                <Eye className="w-3 h-3 mr-1" />
                시각화
              </Badge>
              <Badge variant="outline" size="sm">
                <Code2 className="w-3 h-3 mr-1" />
                토큰
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
                <CardTitle className="text-lg">토큰 카테고리</CardTitle>
                <CardDescription>
                  각 카테고리를 클릭하여 토큰을 확인하세요
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
                            ? 'bg-neutral-50 text-blue-700 font-semibold shadow-sm border border-blue-200'
                            : 'text-gray-700 hover:bg-neutral-50 hover:text-blue-700 border border-transparent'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${
                          activeSection === section.id ? 'text-blue-600' : 'text-gray-600'
                        }`} />
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
                  {React.createElement(sections.find(s => s.id === activeSection)?.icon || Palette, { className: "w-5 h-5" })}
                  {sections.find(s => s.id === activeSection)?.label} 토큰
                </CardTitle>
                <CardDescription>
                  토큰을 클릭하면 값이 클립보드에 복사됩니다. Bolt.new에서 바로 사용할 수 있습니다.
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

export default DesignTokens;