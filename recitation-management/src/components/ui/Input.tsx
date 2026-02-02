import { forwardRef, type InputHTMLAttributes } from 'react';
import { Search } from 'lucide-react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`
              w-full px-4 py-2.5
              bg-white border border-slate-300 rounded-lg
              text-slate-800 placeholder:text-slate-400
              shadow-sm
              transition-all duration-200
              focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
              disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed
              ${icon ? 'pl-10' : ''}
              ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}
              ${className}
            `}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1.5 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

// 搜索框组件
interface SearchInputProps extends Omit<InputProps, 'icon'> {}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (props, ref) => {
    return (
      <Input
        ref={ref}
        icon={<Search className="w-5 h-5" />}
        placeholder="搜索学生姓名..."
        {...props}
      />
    );
  }
);

SearchInput.displayName = 'SearchInput';

// 文本域组件
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={`
            w-full px-4 py-3
            bg-white border border-slate-300 rounded-lg
            text-slate-800 placeholder:text-slate-400
            resize-none min-h-[120px]
            shadow-sm
            transition-all duration-200
            focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
            disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed
            ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
