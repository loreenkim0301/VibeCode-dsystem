/**
 * EduDesignSystem Alert Component
 * 교육용 디자인시스템의 알림 컴포넌트
 */

import React from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from 'lucide-react';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 알림 변형 스타일 */
  variant?: 'info' | 'success' | 'warning' | 'error';
  /** 제목 */
  title?: string;
  /** 닫기 가능한 알림 */
  dismissible?: boolean;
  /** 닫기 콜백 */
  onDismiss?: () => void;
  /** 아이콘 숨기기 */
  hideIcon?: boolean;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({
    className,
    variant = 'info',
    title,
    dismissible = false,
    onDismiss,
    hideIcon = false,
    children,
    ...props
  }, ref) => {
    const baseStyles = `
      relative rounded-lg border p-4
      transition-all duration-200 ease-in-out
    `;

    const variantStyles = {
      info: 'bg-blue-50 border-blue-200 text-blue-800',
      success: 'bg-green-50 border-green-200 text-green-800',
      warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      error: 'bg-red-50 border-red-200 text-red-800',
    };

    const iconMap = {
      info: Info,
      success: CheckCircle,
      warning: AlertTriangle,
      error: AlertCircle,
    };

    const iconColorMap = {
      info: 'text-blue-500',
      success: 'text-green-500',
      warning: 'text-yellow-500',
      error: 'text-red-500',
    };

    const Icon = iconMap[variant];

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          className
        )}
        {...props}
      >
        <div className="flex">
          {!hideIcon && (
            <div className="flex-shrink-0">
              <Icon className={cn('w-5 h-5', iconColorMap[variant])} />
            </div>
          )}
          
          <div className={cn('flex-1', !hideIcon && 'ml-3')}>
            {title && (
              <h3 className="text-sm font-medium mb-1">
                {title}
              </h3>
            )}
            
            {children && (
              <div className="text-sm">
                {children}
              </div>
            )}
          </div>
          
          {dismissible && onDismiss && (
            <div className="flex-shrink-0 ml-auto pl-3">
              <button
                onClick={onDismiss}
                className={cn(
                  'inline-flex rounded-md p-1.5 transition-colors',
                  'hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-offset-2',
                  variant === 'info' && 'text-blue-500 focus:ring-blue-500',
                  variant === 'success' && 'text-green-500 focus:ring-green-500',
                  variant === 'warning' && 'text-yellow-500 focus:ring-yellow-500',
                  variant === 'error' && 'text-red-500 focus:ring-red-500'
                )}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
);

Alert.displayName = 'Alert';

export { Alert };