/**
 * EduDesignSystem Main Entry Point
 * 디자인시스템의 메인 진입점
 */

// 디자인 토큰
export * from './tokens';

// 컴포넌트
export * from './components';

// 버전 정보
export const DESIGN_SYSTEM_VERSION = 'VibeCodeZero-Core-1.1.0';

// 디자인시스템 정보
export const designSystemInfo = {
  name: 'VibeCodeZero Design System',
  version: '1.1.0',
  description: '기획자/디자이너를 위한 VibeCodeZero 디자인시스템',
  author: 'EduDesignSystem Team',
  license: 'MIT',
  repository: 'https://github.com/your-username/edu-design-system',
} as const;

// 콘솔에 버전 정보 출력
if (typeof window !== 'undefined') {
  console.log(`🎨 ${designSystemInfo.name} ${designSystemInfo.version} loaded`);
  console.log(`📚 ${designSystemInfo.description}`);
}