import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { Loader2 } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'cta';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: `
    bg-blue-700 hover:bg-blue-800 active:bg-blue-900
    text-white shadow-md hover:shadow-lg
    disabled:bg-blue-300
  `,
  secondary: `
    bg-white hover:bg-slate-50 active:bg-slate-100
    text-slate-700 border border-slate-300
    shadow-sm hover:shadow-md
    disabled:bg-slate-100 disabled:text-slate-400
  `,
  danger: `
    bg-red-500 hover:bg-red-600 active:bg-red-700
    text-white shadow-md hover:shadow-lg
    disabled:bg-red-300
  `,
  ghost: `
    bg-transparent hover:bg-slate-100 active:bg-slate-200
    text-slate-600 hover:text-slate-800
  `,
  cta: `
    bg-gradient-cta hover:brightness-105
    text-white font-semibold shadow-md hover:shadow-cta
  `,
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm rounded-md',
  md: 'px-4 py-2 text-base rounded-lg',
  lg: 'px-6 py-3 text-lg rounded-lg',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    variant = 'primary',
    size = 'md',
    loading = false,
    icon,
    children,
    className = '',
    disabled,
    ...props
  }, ref) => {
    return (
      <button
        ref={ref}
        className={`
          inline-flex items-center justify-center gap-2
          font-medium transition-all duration-150
          disabled:opacity-40 disabled:cursor-not-allowed
          cursor-pointer
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${className}
        `}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : icon ? (
          icon
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
