/**
 * EduDesignSystem Shadow Tokens
 * 교육용 디자인시스템의 그림자 토큰 정의
 */

export const shadows = {
  // 기본 그림자
  none: 'none',
  xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',

  // 내부 그림자
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',

  // 컬러 그림자 (브랜드 색상)
  primary: '0 4px 14px 0 rgb(14 165 233 / 0.15)',
  secondary: '0 4px 14px 0 rgb(217 70 239 / 0.15)',
  success: '0 4px 14px 0 rgb(34 197 94 / 0.15)',
  warning: '0 4px 14px 0 rgb(245 158 11 / 0.15)',
  error: '0 4px 14px 0 rgb(239 68 68 / 0.15)',

  // 특수 그림자
  glow: '0 0 20px rgb(14 165 233 / 0.3)',
  focus: '0 0 0 3px rgb(14 165 233 / 0.1)',
} as const;

// 컴포넌트별 그림자 프리셋
export const shadowPresets = {
  card: shadows.sm,
  cardHover: shadows.md,
  button: shadows.xs,
  buttonHover: shadows.sm,
  modal: shadows['2xl'],
  dropdown: shadows.lg,
  tooltip: shadows.md,
  floating: shadows.xl,
} as const;