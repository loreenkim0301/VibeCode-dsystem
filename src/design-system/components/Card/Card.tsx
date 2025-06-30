/**
 * EduDesignSystem Card Component
 * 교육용 디자인시스템의 카드 컴포넌트
 */

import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 카드 변형 스타일 */
  variant?: 'default' | 'outlined' | 'elevated' | 'filled';
  /** 카드 크기 */
  size?: 'sm' | 'md' | 'lg';
  /** 호버 효과 활성화 */
  hoverable?: boolean;
  /** 클릭 가능한 카드 */
  clickable?: boolean;
  /** 패딩 제거 */
  noPadding?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({
    className,
    variant = 'default',
    size = 'md',
    hoverable = false,
    clickable = false,
    noPadding = false,
    children,
    ...props
  }, ref) => {
    const baseStyles = `
      rounded-lg border transition-all duration-200 ease-in-out
      ${clickable ? 'cursor-pointer' : ''}
    `;

    const variantStyles = {
      default: `
        bg-white border-gray-200
        ${hoverable ? 'hover:shadow-md' : ''}
        ${clickable ? 'hover:border-gray-300 active:scale-[0.98]' : ''}
      `,
      outlined: `
        bg-white border-gray-300
        ${hoverable ? 'hover:shadow-sm hover:border-gray-400' : ''}
        ${clickable ? 'hover:bg-gray-50 active:scale-[0.98]' : ''}
      `,
      elevated: `
        bg-white border-gray-200 shadow-md
        ${hoverable ? 'hover:shadow-lg' : ''}
        ${clickable ? 'hover:shadow-xl active:scale-[0.98]' : ''}
      `,
      filled: `
        bg-gray-50 border-gray-200
        ${hoverable ? 'hover:bg-gray-100 hover:shadow-sm' : ''}
        ${clickable ? 'hover:bg-gray-100 active:scale-[0.98]' : ''}
      `,
    };

    const sizeStyles = {
      sm: noPadding ? '' : 'p-4',
      md: noPadding ? '' : 'p-6',
      lg: noPadding ? '' : 'p-8',
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
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

// Card 하위 컴포넌트들
const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 pb-4', className)}
      {...props}
    />
  )
);
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-lg font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  )
);
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-gray-600', className)}
      {...props}
    />
  )
);
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('', className)}
      {...props}
    />
  )
);
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center pt-4', className)}
      {...props}
    />
  )
);
CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};