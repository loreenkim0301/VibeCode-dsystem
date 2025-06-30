/**
 * EduDesignSystem Input Component
 * 교육용 디자인시스템의 입력 필드 컴포넌트
 */

import React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** 입력 필드 크기 */
  size?: 'sm' | 'md' | 'lg';
  /** 에러 상태 */
  error?: boolean;
  /** 성공 상태 */
  success?: boolean;
  /** 왼쪽 아이콘 */
  leftIcon?: React.ReactNode;
  /** 오른쪽 아이콘 */
  rightIcon?: React.ReactNode;
  /** 라벨 */
  label?: string;
  /** 도움말 텍스트 */
  helperText?: string;
  /** 에러 메시지 */
  errorMessage?: string;
  /** 전체 너비 사용 */
  fullWidth?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({
    className,
    type = 'text',
    size = 'md',
    error = false,
    success = false,
    leftIcon,
    rightIcon,
    label,
    helperText,
    errorMessage,
    fullWidth = false,
    disabled,
    ...props
  }, ref) => {
    const baseStyles = `
      flex w-full rounded-md border bg-white px-3 py-2
      text-sm transition-colors duration-200
      file:border-0 file:bg-transparent file:text-sm file:font-medium
      placeholder:text-gray-400
      focus:outline-none focus:ring-2 focus:ring-offset-2
      disabled:cursor-not-allowed disabled:opacity-50
    `;

    const sizeStyles = {
      sm: 'h-8 px-2 text-xs',
      md: 'h-10 px-3 text-sm',
      lg: 'h-12 px-4 text-base',
    };

    const stateStyles = {
      default: `
        border-gray-300
        focus:border-blue-500 focus:ring-blue-500
      `,
      error: `
        border-red-500
        focus:border-red-500 focus:ring-red-500
      `,
      success: `
        border-green-500
        focus:border-green-500 focus:ring-green-500
      `,
    };

    const getStateStyle = () => {
      if (error) return stateStyles.error;
      if (success) return stateStyles.success;
      return stateStyles.default;
    };

    const inputElement = (
      <div className={cn('relative', fullWidth && 'w-full')}>
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {leftIcon}
          </div>
        )}
        
        <input
          ref={ref}
          type={type}
          className={cn(
            baseStyles,
            sizeStyles[size],
            getStateStyle(),
            leftIcon && 'pl-10',
            rightIcon && 'pr-10',
            className
          )}
          disabled={disabled}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            {rightIcon}
          </div>
        )}
      </div>
    );

    if (label || helperText || errorMessage) {
      return (
        <div className={cn('space-y-2', fullWidth && 'w-full')}>
          {label && (
            <label className="text-sm font-medium text-gray-700">
              {label}
            </label>
          )}
          
          {inputElement}
          
          {(helperText || errorMessage) && (
            <p className={cn(
              'text-xs',
              error ? 'text-red-600' : 'text-gray-500'
            )}>
              {error ? errorMessage : helperText}
            </p>
          )}
        </div>
      );
    }

    return inputElement;
  }
);

Input.displayName = 'Input';

export { Input };