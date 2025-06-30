/**
 * EduDesignSystem Animation Tokens
 * 교육용 디자인시스템의 애니메이션 토큰 정의
 */

export const animations = {
  // Duration (지속 시간)
  duration: {
    instant: '0ms',
    fast: '150ms',
    normal: '250ms',
    slow: '350ms',
    slower: '500ms',
  },

  // Timing Functions (이징 함수)
  timing: {
    linear: 'linear',
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },

  // Transform Origins
  origin: {
    center: 'center',
    top: 'top',
    topRight: 'top right',
    right: 'right',
    bottomRight: 'bottom right',
    bottom: 'bottom',
    bottomLeft: 'bottom left',
    left: 'left',
    topLeft: 'top left',
  },
} as const;

// 애니메이션 프리셋
export const animationPresets = {
  // 기본 트랜지션
  default: `all ${animations.duration.normal} ${animations.timing.smooth}`,
  fast: `all ${animations.duration.fast} ${animations.timing.smooth}`,
  slow: `all ${animations.duration.slow} ${animations.timing.smooth}`,

  // 특정 속성 트랜지션
  color: `color ${animations.duration.normal} ${animations.timing.smooth}`,
  background: `background-color ${animations.duration.normal} ${animations.timing.smooth}`,
  border: `border-color ${animations.duration.normal} ${animations.timing.smooth}`,
  shadow: `box-shadow ${animations.duration.normal} ${animations.timing.smooth}`,
  transform: `transform ${animations.duration.normal} ${animations.timing.smooth}`,
  opacity: `opacity ${animations.duration.normal} ${animations.timing.smooth}`,

  // 컴포넌트별 애니메이션
  button: `all ${animations.duration.fast} ${animations.timing.smooth}`,
  modal: `all ${animations.duration.normal} ${animations.timing.smooth}`,
  dropdown: `all ${animations.duration.fast} ${animations.timing.smooth}`,
  tooltip: `all ${animations.duration.fast} ${animations.timing.smooth}`,

  // 특수 효과
  bounce: `transform ${animations.duration.slow} ${animations.timing.bounce}`,
  pulse: `opacity ${animations.duration.slower} ${animations.timing.easeInOut}`,
} as const;

// 키프레임 애니메이션
export const keyframes = {
  fadeIn: {
    from: { opacity: '0' },
    to: { opacity: '1' },
  },
  fadeOut: {
    from: { opacity: '1' },
    to: { opacity: '0' },
  },
  slideInUp: {
    from: { transform: 'translateY(100%)', opacity: '0' },
    to: { transform: 'translateY(0)', opacity: '1' },
  },
  slideInDown: {
    from: { transform: 'translateY(-100%)', opacity: '0' },
    to: { transform: 'translateY(0)', opacity: '1' },
  },
  slideInLeft: {
    from: { transform: 'translateX(-100%)', opacity: '0' },
    to: { transform: 'translateX(0)', opacity: '1' },
  },
  slideInRight: {
    from: { transform: 'translateX(100%)', opacity: '0' },
    to: { transform: 'translateX(0)', opacity: '1' },
  },
  scaleIn: {
    from: { transform: 'scale(0.9)', opacity: '0' },
    to: { transform: 'scale(1)', opacity: '1' },
  },
  scaleOut: {
    from: { transform: 'scale(1)', opacity: '1' },
    to: { transform: 'scale(0.9)', opacity: '0' },
  },
  spin: {
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
  },
  pulse: {
    '0%, 100%': { opacity: '1' },
    '50%': { opacity: '0.5' },
  },
} as const;