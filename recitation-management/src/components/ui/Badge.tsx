import type { ReactNode } from 'react';

type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info';

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-slate-100 text-slate-700',
  success: 'bg-green-100 text-green-700',
  warning: 'bg-amber-100 text-amber-700',
  error: 'bg-red-100 text-red-700',
  info: 'bg-blue-100 text-blue-700',
};

export function Badge({ variant = 'default', children, className = '' }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center
        px-2.5 py-0.5
        rounded-full
        text-xs font-medium
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}

// 完成状态徽章
interface StatusBadgeProps {
  completed: boolean;
  className?: string;
}

export function StatusBadge({ completed, className = '' }: StatusBadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center
        px-2 py-0.5
        rounded-full
        text-xs font-medium
        transition-all duration-200
        ${completed
          ? 'bg-green-500 text-white'
          : 'bg-slate-200 text-slate-600'
        }
        ${className}
      `}
    >
      {completed ? '已完成' : '未完成'}
    </span>
  );
}

// 数字徽章
interface CountBadgeProps {
  count: number;
  className?: string;
}

export function CountBadge({ count, className = '' }: CountBadgeProps) {
  if (count <= 0) return null;

  return (
    <span
      className={`
        min-w-[20px] h-5
        flex items-center justify-center
        rounded-full
        text-xs font-bold
        bg-red-500 text-white
        ${className}
      `}
    >
      {count > 99 ? '99+' : count}
    </span>
  );
}
