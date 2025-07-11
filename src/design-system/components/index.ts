/**
 * EduDesignSystem Components
 * 모든 컴포넌트를 통합 관리하는 인덱스 파일
 */

// 기본 컴포넌트 import
import { Button } from './Button/Button';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from './Card/Card';
import { Input } from './Input/Input';
import { Badge } from './Badge/Badge';
import { Alert } from './Alert/Alert';
import { 
  NavigationSidebar,
  NavigationHeader,
  NavigationGroup,
  NavigationItem,
} from './Navigation';

// 타입 import
import type { ButtonProps } from './Button/Button';
import type { CardProps } from './Card/Card';
import type { InputProps } from './Input/Input';
import type { BadgeProps } from './Badge/Badge';
import type { AlertProps } from './Alert/Alert';
import type { 
  NavigationSidebarProps,
  NavigationHeaderProps,
  NavigationGroupProps,
  NavigationItemProps,
} from './Navigation';

// 컴포넌트 export
export { 
  Button,
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter,
  Input,
  Badge,
  Alert,
  NavigationSidebar,
  NavigationHeader,
  NavigationGroup,
  NavigationItem,
};

// 타입 export
export type { 
  ButtonProps,
  CardProps,
  InputProps,
  BadgeProps,
  AlertProps,
  NavigationSidebarProps,
  NavigationHeaderProps,
  NavigationGroupProps,
  NavigationItemProps,
};

// 컴포넌트 카테고리별 그룹핑
export const BasicComponents = {
  Button,
  Card,
  Input,
  Badge,
  Alert,
};

export const LayoutComponents = {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};

export const FeedbackComponents = {
  Alert,
  Badge,
};
export const NavigationComponents = {
  NavigationSidebar,
  NavigationHeader,
  NavigationGroup,
  NavigationItem,
};