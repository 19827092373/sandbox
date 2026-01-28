import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function QuestionGrid({ questionStats, selectedQuestion, setSelectedQuestion, getErrorRateStyle }) {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-3 sm:gap-4">
      {questionStats.map((q, idx) => {
        const style = getErrorRateStyle(q.rate, q.count, questionStats.length);
        const isSelected = selectedQuestion?.qNum === q.qNum;
        const isHighError = q.rate > 70;
        const isCritical = q.rate > 85;

        return (
          <button
            key={q.qNum}
            onClick={() => setSelectedQuestion(q)}
            className={cn(
              'group relative aspect-square rounded-2xl border-3',
              'flex flex-col items-center justify-center p-3',
              'cursor-pointer overflow-hidden',
              'transition-all duration-300 ease-out',
              'hover:scale-110 hover:z-10 hover:-translate-y-1',
              'active:scale-95 active:translate-y-0',
              style.bgGradient,
              style.border,
              'shadow-md',
              style.hoverGlow,
              isSelected && 'ring-4 ring-indigo-500/50 scale-110 -translate-y-1 !shadow-xl border-indigo-500',
              'animate-fade-in'
            )}
            style={{
              animationDelay: `${idx * 15}ms`,
            }}
          >
            {/* Mistake Count Badge - Top Right Corner */}
            <div className="absolute top-1 right-1 z-10">
              <div className={cn(
                'flex items-center justify-center min-w-[1.5rem] h-6 px-1.5 rounded-lg font-black text-[10px] border transition-all duration-300',
                'group-hover:scale-110',
                q.count === 0
                  ? 'bg-emerald-500 border-emerald-400 text-white shadow-sm'
                  : q.rate <= 20
                  ? 'bg-green-500 border-green-400 text-white shadow-sm'
                  : q.rate <= 50
                  ? 'bg-yellow-500 border-yellow-400 text-white shadow-sm'
                  : q.rate <= 70
                  ? 'bg-orange-500 border-orange-400 text-white shadow-sm'
                  : 'bg-red-500 border-red-400 text-white shadow-md animate-pulse-glow'
              )}>
                {q.count}
              </div>
            </div>

            {/* High Error Warning Indicator - Top Left */}
            {isHighError && (
              <div className="absolute top-1 left-1 w-5 h-5 rounded-lg flex items-center justify-center z-10 bg-red-500 text-white shadow-sm transition-all duration-300 group-hover:scale-110">
                <AlertTriangle className="w-3 h-3" />
              </div>
            )}

            {/* Question Number - Center Large */}
            <div className={cn(
              'font-black tracking-tighter leading-none relative z-10',
              'transition-all duration-300 group-hover:scale-110',
              style.text
            )} style={{
              fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)'
            }}>
              {q.qNum}
            </div>

            {/* Shine effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
          </button>
        );
      })}
    </div>
  );
}
