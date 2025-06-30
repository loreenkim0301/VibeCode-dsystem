import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb, Eye, Palette } from 'lucide-react';
import { DesignTokens } from './DesignTokens';
import { ComponentGuide } from './ComponentGuide';

export default function Preview() {
  const [currentView, setCurrentView] = useState<'preview' | 'tokens'>('preview');

  if (currentView === 'tokens') {
    return <DesignTokens onBack={() => setCurrentView('preview')} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Eye className="w-6 h-6" />
            디자인 시스템 미리보기
          </h2>
          <p className="text-gray-600 mt-1">
            컴포넌트와 디자인 토큰을 확인하고 테스트해보세요
          </p>
        </div>
        <Button
          onClick={() => setCurrentView('tokens')}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Palette className="w-4 h-4" />
          디자인 토큰 보기
        </Button>
      </div>

      <Card className="p-6">
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Lightbulb className="w-4 h-4" />
            컴포넌트 가이드
          </h4>
        </div>
        
        <ComponentGuide />
      </Card>
    </div>
  );
}