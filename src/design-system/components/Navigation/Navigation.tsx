/**
 * EduDesignSystem Navigation Component
 * 교육용 디자인시스템의 네비게이션 컴포넌트
 */

import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronRight } from 'lucide-react';

export interface NavigationItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 메뉴 아이템 텍스트 */
  label: string;
  /** 아이콘 */
  icon?: React.ReactNode;
  /** 활성 상태 */
  active?: boolean;
  /** 비활성화 상태 */
  disabled?: boolean;
  /** 하위 메뉴 여부 */
  hasSubmenu?: boolean;
  /** 하위 메뉴 확장 상태 */
  expanded?: boolean;
  /** 클릭 핸들러 */
  onClick?: () => void;
  /** 뱃지 텍스트 */
  badge?: string;
  /** 뱃지 변형 */
  badgeVariant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
}

const NavigationItem = React.forwardRef<HTMLDivElement, NavigationItemProps>(
  ({
    className,
    label,
    icon,
    active = false,
    disabled = false,
    hasSubmenu = false,
    expanded = false,
    onClick,
    badge,
    badgeVariant = 'default',
    ...props
  }, ref) => {
    const baseStyles = `
      flex items-center justify-between w-full px-3 py-2 text-sm
      rounded-md transition-all duration-200 cursor-pointer
      group relative
    `;

    const stateStyles = {
      default: `
        text-gray-700 hover:bg-gray-100 hover:text-gray-900
      `,
      active: `
        bg-blue-100 text-blue-900 font-medium
        border-r-2 border-blue-500
      `,
      disabled: `
        text-gray-400 cursor-not-allowed opacity-50
        hover:bg-transparent hover:text-gray-400
      `,
    };

    const getStateStyle = () => {
      if (disabled) return stateStyles.disabled;
      if (active) return stateStyles.active;
      return stateStyles.default;
    };

    const badgeStyles = {
      default: 'bg-gray-100 text-gray-700',
      primary: 'bg-blue-100 text-blue-700',
      success: 'bg-green-100 text-green-700',
      warning: 'bg-yellow-100 text-yellow-700',
      error: 'bg-red-100 text-red-700',
    };

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          getStateStyle(),
          className
        )}
        onClick={disabled ? undefined : onClick}
        {...props}
      >
        <div className="flex items-center gap-3 flex-1">
          {icon && (
            <span className="flex-shrink-0 w-5 h-5">
              {icon}
            </span>
          )}
          <span className="truncate">{label}</span>
        </div>

        <div className="flex items-center gap-2">
          {badge && (
            <span className={cn(
              'px-1.5 py-0.5 text-xs font-medium rounded-full',
              badgeStyles[badgeVariant]
            )}>
              {badge}
            </span>
          )}
          
          {hasSubmenu && (
            <span className="flex-shrink-0 w-4 h-4 text-gray-400">
              {expanded ? <ChevronDown /> : <ChevronRight />}
            </span>
          )}
        </div>
      </div>
    );
  }
);

NavigationItem.displayName = 'NavigationItem';

export interface NavigationGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 그룹 제목 */
  title?: string;
  /** 그룹 접기/펼치기 가능 여부 */
  collapsible?: boolean;
  /** 접힌 상태 */
  collapsed?: boolean;
  /** 접기/펼치기 핸들러 */
  onToggle?: () => void;
}

const NavigationGroup = React.forwardRef<HTMLDivElement, NavigationGroupProps>(
  ({
    className,
    title,
    collapsible = false,
    collapsed = false,
    onToggle,
    children,
    ...props
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('space-y-1', className)}
        {...props}
      >
        {title && (
          <div
            className={cn(
              'flex items-center justify-between px-3 py-2',
              collapsible && 'cursor-pointer hover:bg-gray-50 rounded-md'
            )}
            onClick={collapsible ? onToggle : undefined}
          >
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {title}
            </h3>
            {collapsible && (
              <span className="w-4 h-4 text-gray-400">
                {collapsed ? <ChevronRight /> : <ChevronDown />}
              </span>
            )}
          </div>
        )}
        
        {(!collapsible || !collapsed) && (
          <div className="space-y-1">
            {children}
          </div>
        )}
      </div>
    );
  }
);

NavigationGroup.displayName = 'NavigationGroup';

export interface NavigationHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 로고 또는 아이콘 */
  logo?: React.ReactNode;
  /** 제목 */
  title?: string;
  /** 부제목 */
  subtitle?: string;
  /** 액션 버튼들 */
  actions?: React.ReactNode;
}

const NavigationHeader = React.forwardRef<HTMLDivElement, NavigationHeaderProps>(
  ({
    className,
    logo,
    title,
    subtitle,
    actions,
    ...props
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center justify-between p-4 border-b border-gray-200',
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-3">
          {logo && (
            <div className="flex-shrink-0">
              {logo}
            </div>
          )}
          
          {(title || subtitle) && (
            <div className="min-w-0">
              {title && (
                <h2 className="text-lg font-semibold text-gray-900 truncate">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-sm text-gray-500 truncate">
                  {subtitle}
                </p>
              )}
            </div>
          )}
        </div>
        
        {actions && (
          <div className="flex-shrink-0">
            {actions}
          </div>
        )}
      </div>
    );
  }
);

NavigationHeader.displayName = 'NavigationHeader';

export interface NavigationSidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 사이드바 너비 */
  width?: 'sm' | 'md' | 'lg' | 'xl';
  /** 접힌 상태 */
  collapsed?: boolean;
  /** 그림자 표시 */
  shadow?: boolean;
  /** 테두리 표시 */
  border?: boolean;
}

const NavigationSidebar = React.forwardRef<HTMLDivElement, NavigationSidebarProps>(
  ({
    className,
    width = 'md',
    collapsed = false,
    shadow = true,
    border = true,
    children,
    ...props
  }, ref) => {
    const widthStyles = {
      sm: collapsed ? 'w-16' : 'w-48',
      md: collapsed ? 'w-16' : 'w-64',
      lg: collapsed ? 'w-16' : 'w-72',
      xl: collapsed ? 'w-16' : 'w-80',
    };

    const baseStyles = `
      h-full bg-white transition-all duration-300 ease-in-out
      flex flex-col overflow-hidden
    `;

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          widthStyles[width],
          shadow && 'shadow-lg',
          border && 'border-r border-gray-200',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

NavigationSidebar.displayName = 'NavigationSidebar';

export {
  NavigationSidebar,
  NavigationHeader,
  NavigationGroup,
  NavigationItem,
};