/**
 * EduDesignSystem Design Tokens
 * 모든 디자인 토큰을 통합 관리하는 인덱스 파일
 */

export { colors, colorTokens } from './colors';
export { typography, typographyStyles } from './typography';
export { spacing, spacingPresets } from './spacing';
export { shadows, shadowPresets } from './shadows';
export { borders, borderPresets } from './borders';
export { animations, animationPresets, keyframes } from './animations';

// 전체 토큰을 하나의 객체로 통합
export const designTokens = {
  colors: () => import('./colors').then(m => m.colors),
  typography: () => import('./typography').then(m => m.typography),
  spacing: () => import('./spacing').then(m => m.spacing),
  shadows: () => import('./shadows').then(m => m.shadows),
  borders: () => import('./borders').then(m => m.borders),
  animations: () => import('./animations').then(m => m.animations),
} as const;

// CSS 변수 생성 함수
export const generateCSSVariables = async () => {
  const { colorTokens } = await import('./colors');
  const { spacing } = await import('./spacing');
  const { shadows } = await import('./shadows');
  const { borders } = await import('./borders');
  
  const cssVars: Record<string, string> = {};

  // 색상 변수
  Object.entries(colorTokens).forEach(([key, value]) => {
    cssVars[key] = value;
  });

  // 스페이싱 변수
  Object.entries(spacing).forEach(([key, value]) => {
    cssVars[`--spacing-${key}`] = value;
  });

  // 그림자 변수
  Object.entries(shadows).forEach(([key, value]) => {
    cssVars[`--shadow-${key}`] = value;
  });

  // 테두리 반지름 변수
  Object.entries(borders.radius).forEach(([key, value]) => {
    cssVars[`--radius-${key}`] = value;
  });

  return cssVars;
};