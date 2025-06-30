/**
 * EduDesignSystem Border Tokens
 * 교육용 디자인시스템의 테두리 토큰 정의
 */

export const borders = {
  // Border Widths
  width: {
    0: '0px',
    1: '1px',
    2: '2px',
    4: '4px',
    8: '8px',
  },

  // Border Radius
  radius: {
    none: '0px',
    xs: '2px',
    sm: '4px',
    md: '6px',
    lg: '8px',
    xl: '12px',
    '2xl': '16px',
    '3xl': '24px',
    full: '9999px',
  },

  // Border Styles
  style: {
    solid: 'solid',
    dashed: 'dashed',
    dotted: 'dotted',
    none: 'none',
  },
} as const;

// 컴포넌트별 테두리 프리셋
export const borderPresets = {
  // 기본 테두리
  default: `${borders.width[1]} ${borders.style.solid}`,
  thick: `${borders.width[2]} ${borders.style.solid}`,
  
  // 라운드 테두리
  rounded: {
    sm: borders.radius.sm,
    md: borders.radius.md,
    lg: borders.radius.lg,
    xl: borders.radius.xl,
    full: borders.radius.full,
  },

  // 컴포넌트별
  button: borders.radius.md,
  input: borders.radius.sm,
  card: borders.radius.lg,
  modal: borders.radius.xl,
  badge: borders.radius.full,
  avatar: borders.radius.full,
} as const;