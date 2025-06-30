/**
 * EduDesignSystem Badge Component
 * 교육용 디자인시스템의 배지 컴포넌트
 */

import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 배지 변형 스타일 */
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'outline';
  /** 배지 크기 */
  size?: 'sm' | 'md' | 'lg';
  /** 점 표시 */
  dot?: boolean;
  /** 제거 가능한 배지 */
  removable?: boolean;
  /** 제거 콜백 */
  onRemove?: () => void;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({
    className,
    variant = 'default',
    size = 'md',
    dot = false,
    removable = false,
    onRemove,
    children,
    ...props
  }, ref) => {
    const baseStyles = `
      inline-flex items-center gap-1 rounded-full font-medium
      transition-all duration-200 ease-in-out
    `;

    const variantStyles = {
      default: 'bg-gray-100 text-gray-800',
      primary: 'bg-blue-100 text-blue-800',
      secondary: 'bg-purple-100 text-purple-800',
      success: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      error: 'bg-red-100 text-red-800',
      outline: 'bg-transparent text-gray-700 border border-gray-300',
    };

    const sizeStyles = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-1 text-sm',
      lg: 'px-3 py-1.5 text-base',
    };

    const dotStyles = {
      sm: 'w-1.5 h-1.5',
      md: 'w-2 h-2',
      lg: 'w-2.5 h-2.5',
    };

    const getDotColor = () => {
      switch (variant) {
        case 'primary': return 'bg-blue-500';
        case 'secondary': return 'bg-purple-500';
        case 'success': return 'bg-green-500';
        case 'warning': return 'bg-yellow-500';
        case 'error': return 'bg-red-500';
        case 'outline': return 'bg-gray-500';
        default: return 'bg-gray-500';
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {dot && (
          <div className={cn(
            'rounded-full flex-shrink-0',
            dotStyles[size],
            getDotColor()
          )} />
        )}
        
        {children}
        
        {removable && onRemove && (
          <button
            onClick={onRemove}
            className="ml-1 hover:bg-black/10 rounded-full p-0.5 transition-colors"
            type="button"
          >
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };