import { useEffect, useRef, type ReactNode } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const sizeStyles = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
};

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // 按 ESC 关闭
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // 点击遮罩关闭
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        p-4
        bg-black/50 backdrop-blur-sm
        animate-fade-in-up
      "
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className={`
          bg-white rounded-2xl shadow-2xl
          w-full ${sizeStyles[size]}
          overflow-hidden
          transform transition-all duration-300
        `}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
      >
        {/* Header */}
        {title && (
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
            <h2 id="modal-title" className="text-lg font-semibold text-slate-800">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="
                w-8 h-8 flex items-center justify-center
                text-slate-400 hover:text-slate-600
                hover:bg-slate-100 rounded-lg
                transition-colors duration-150
                cursor-pointer
              "
              aria-label="关闭"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Content */}
        <div className="px-6 py-5">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
