/**
 * EduDesignSystem Button Component
 * 교육용 디자인시스템의 기본 버튼 컴포넌트
 */

import React from 'react';
import { cn } from '@/lib/utils';
import { colors, spacing, borders, animations } from '../../tokens';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 버튼 변형 스타일 */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  /** 버튼 크기 */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** 로딩 상태 */
  loading?: boolean;
  /** 전체 너비 사용 */
  fullWidth?: boolean;
  /** 아이콘만 표시 (정사각형) */
  iconOnly?: boolean;
  /** 왼쪽 아이콘 */
  leftIcon?: React.ReactNode;
  /** 오른쪽 아이콘 */
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant = 'primary',
    size = 'md',
    loading = false,
    fullWidth = false,
    iconOnly = false,
    leftIcon,
    rightIcon,
    children,
    disabled,
    ...props
  }, ref) => {
    const baseStyles = `
      inline-flex items-center justify-center font-medium
      transition-all duration-200 ease-in-out
      focus:outline-none focus:ring-2 focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
      relative overflow-hidden
    `;

    const variantStyles = {
      primary: `
        bg-blue-500 text-white border border-blue-500
        hover:bg-blue-600 hover:border-blue-600
        focus:ring-blue-500
        active:bg-blue-700
      `,
      secondary: `
        bg-purple-500 text-white border border-purple-500
        hover:bg-purple-600 hover:border-purple-600
        focus:ring-purple-500
        active:bg-purple-700
      `,
      outline: `
        bg-transparent text-gray-700 border border-gray-300
        hover:bg-gray-50 hover:border-gray-400 hover:text-gray-900
        focus:ring-gray-500
        active:bg-gray-100
      `,
      ghost: `
        bg-transparent text-gray-900 border border-transparent
        hover:bg-gray-100 hover:text-gray-700
        focus:ring-gray-500
        active:bg-gray-200
      `,
      destructive: `
        bg-red-500 text-white border border-red-500
        hover:bg-red-600 hover:border-red-600
        focus:ring-red-500
        active:bg-red-700
      `,
    };

    const sizeStyles = {
      xs: iconOnly ? 'h-6 w-6 text-xs' : 'h-6 px-2 text-xs',
      sm: iconOnly ? 'h-8 w-8 text-sm' : 'h-8 px-3 text-sm',
      md: iconOnly ? 'h-10 w-10 text-base' : 'h-10 px-4 text-base',
      lg: iconOnly ? 'h-12 w-12 text-lg' : 'h-12 px-6 text-lg',
      xl: iconOnly ? 'h-14 w-14 text-xl' : 'h-14 px-8 text-xl',
    };

    const radiusStyles = {
      xs: 'rounded',
      sm: 'rounded-md',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-lg',
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          radiusStyles[size],
          fullWidth && 'w-full',
          loading && 'cursor-wait',
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        
        <div className={cn('flex items-center gap-2', loading && 'opacity-0')}>
          {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
          {children && !iconOnly && <span>{children}</span>}
          {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
        </div>
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };