/**
 * EduDesignSystem Spacing Tokens
 * 교육용 디자인시스템의 스페이싱 토큰 정의 (4px 기준)
 */

export const spacing = {
  0: '0px',
  1: '4px',     // 0.25rem
  2: '8px',     // 0.5rem
  3: '12px',    // 0.75rem
  4: '16px',    // 1rem
  5: '20px',    // 1.25rem
  6: '24px',    // 1.5rem
  7: '28px',    // 1.75rem
  8: '32px',    // 2rem
  9: '36px',    // 2.25rem
  10: '40px',   // 2.5rem
  11: '44px',   // 2.75rem
  12: '48px',   // 3rem
  14: '56px',   // 3.5rem
  16: '64px',   // 4rem
  20: '80px',   // 5rem
  24: '96px',   // 6rem
  28: '112px',  // 7rem
  32: '128px',  // 8rem
  36: '144px',  // 9rem
  40: '160px',  // 10rem
  44: '176px',  // 11rem
  48: '192px',  // 12rem
  52: '208px',  // 13rem
  56: '224px',  // 14rem
  60: '240px',  // 15rem
  64: '256px',  // 16rem
  72: '288px',  // 18rem
  80: '320px',  // 20rem
  96: '384px',  // 24rem
} as const;

// 컴포넌트별 스페이싱 프리셋
export const spacingPresets = {
  // 컴포넌트 내부 패딩
  componentPadding: {
    xs: spacing[2],   // 8px
    sm: spacing[3],   // 12px
    md: spacing[4],   // 16px
    lg: spacing[6],   // 24px
    xl: spacing[8],   // 32px
  },

  // 컴포넌트 간 마진
  componentMargin: {
    xs: spacing[2],   // 8px
    sm: spacing[4],   // 16px
    md: spacing[6],   // 24px
    lg: spacing[8],   // 32px
    xl: spacing[12],  // 48px
  },

  // 섹션 간 간격
  sectionSpacing: {
    sm: spacing[16],  // 64px
    md: spacing[24],  // 96px
    lg: spacing[32],  // 128px
    xl: spacing[40],  // 160px
  },

  // 레이아웃 간격
  layoutSpacing: {
    container: spacing[6],  // 24px
    grid: spacing[4],       // 16px
    card: spacing[6],       // 24px
  },
} as const;