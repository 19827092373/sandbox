import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export function Card({ children, className = '', onClick, hoverable = false }: CardProps) {
  return (
    <div
      className={`
        bg-white rounded-xl p-4
        shadow-sm border border-slate-200
        ${hoverable ? 'hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

// 统计卡片
interface StatCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  iconBg?: string;
  iconColor?: string;
}

export function StatCard({
  label,
  value,
  icon,
  iconBg = 'bg-blue-100',
  iconColor = 'text-blue-600',
}: StatCardProps) {
  return (
    <div className="
      bg-white rounded-2xl p-5
      shadow-sm hover:shadow-md
      transition-shadow duration-200
      flex items-center gap-4
    ">
      <div className={`
        w-12 h-12 rounded-xl
        flex items-center justify-center
        ${iconBg} ${iconColor}
      `}>
        {icon}
      </div>
      <div>
        <div className="text-3xl font-bold text-slate-900">
          {value}
        </div>
        <div className="text-sm text-slate-500 mt-0.5">
          {label}
        </div>
      </div>
    </div>
  );
}
