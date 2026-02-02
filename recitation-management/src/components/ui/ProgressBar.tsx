interface ProgressBarProps {
  value: number; // 0-100
  className?: string;
  showLabel?: boolean;
}

export function ProgressBar({ value, className = '', showLabel = true }: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, value));

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-slate-700">完成进度</span>
          <span className="text-sm font-semibold text-slate-900">{percentage.toFixed(1)}%</span>
        </div>
      )}
      <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
        <div
          className="
            h-full bg-gradient-progress rounded-full
            transition-all duration-500 ease-out
            relative overflow-hidden
          "
          style={{ width: `${percentage}%` }}
        >
          {/* Shimmer effect */}
          <div className="
            absolute inset-0
            bg-gradient-to-r from-transparent via-white/40 to-transparent
            animate-shimmer
          " />
        </div>
      </div>
    </div>
  );
}
