import { useState } from 'react';
import { Check } from 'lucide-react';
import type { StudentStatus } from '../../types';

interface StudentCardProps {
  student: StudentStatus;
  index: number;
  isSelected: boolean;
  onToggle: (index: number) => void;
  onSelect: (index: number, multiSelect: boolean) => void;
}

export function StudentCard({
  student,
  index,
  isSelected,
  onToggle,
  onSelect,
}: StudentCardProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    // Ctrl/Cmd + 点击：多选
    if (e.ctrlKey || e.metaKey) {
      onSelect(index, true);
      return;
    }

    // 普通点击：切换状态
    setIsAnimating(true);
    setTimeout(() => {
      onToggle(index);
      setIsAnimating(false);
    }, 250);
  };

  return (
    <div
      onClick={handleClick}
      className={`
        relative
        rounded-xl p-4
        cursor-pointer
        transition-all duration-200
        border
        ${student.completed
          ? 'bg-gradient-completed border-green-200'
          : 'bg-white border-slate-200 hover:bg-slate-50'
        }
        ${isSelected
          ? 'ring-2 ring-blue-500 ring-offset-2'
          : 'hover:shadow-md hover:-translate-y-1'
        }
        ${isAnimating ? 'animate-complete-pulse' : ''}
      `}
    >
      {/* 完成动画发光效果 */}
      {isAnimating && student.completed && (
        <div className="absolute inset-0 rounded-xl animate-completed-glow" />
      )}

      <div className="flex items-center justify-between gap-3">
        {/* 姓名 */}
        <span className={`
          text-base font-medium truncate
          ${student.completed ? 'text-green-800' : 'text-slate-800'}
        `}>
          {student.name}
        </span>

        {/* 状态徽章 */}
        <span
          className={`
            flex-shrink-0
            inline-flex items-center justify-center
            px-2 py-0.5
            rounded-full
            text-xs font-medium
            transition-all duration-200
            ${isAnimating ? 'animate-badge-bounce' : ''}
            ${student.completed
              ? 'bg-green-500 text-white'
              : 'bg-slate-200 text-slate-600'
            }
          `}
        >
          {student.completed ? (
            <>
              <Check className="w-3 h-3 mr-0.5" />
              已完成
            </>
          ) : (
            '未完成'
          )}
        </span>
      </div>

      {/* 选中指示器 */}
      {isSelected && (
        <div className="
          absolute -top-1 -right-1
          w-5 h-5 rounded-full
          bg-blue-500 text-white
          flex items-center justify-center
        ">
          <Check className="w-3 h-3" />
        </div>
      )}
    </div>
  );
}

// 学生卡片网格
interface StudentGridProps {
  students: StudentStatus[];
  selectedStudents: Set<number>;
  searchKeyword: string;
  onToggle: (index: number) => void;
  onSelect: (index: number, multiSelect: boolean) => void;
}

export function StudentGrid({
  students,
  selectedStudents,
  searchKeyword,
  onToggle,
  onSelect,
}: StudentGridProps) {
  const keyword = searchKeyword.toLowerCase();

  const filteredStudents = students.map((student, index) => ({
    student,
    index,
    visible: !keyword || student.name.toLowerCase().includes(keyword),
  }));

  const visibleCount = filteredStudents.filter(s => s.visible).length;

  if (students.length === 0) {
    return (
      <div className="
        text-center py-12
        text-slate-400
      ">
        <p className="text-lg">暂无学生</p>
        <p className="text-sm mt-1">请先导入学生名单</p>
      </div>
    );
  }

  if (visibleCount === 0) {
    return (
      <div className="
        text-center py-12
        text-slate-400
      ">
        <p className="text-lg">未找到匹配的学生</p>
        <p className="text-sm mt-1">请尝试其他搜索词</p>
      </div>
    );
  }

  return (
    <div className="
      grid
      grid-cols-2
      sm:grid-cols-3
      md:grid-cols-4
      lg:grid-cols-5
      xl:grid-cols-6
      gap-3
    ">
      {filteredStudents.map(({ student, index, visible }) =>
        visible && (
          <StudentCard
            key={index}
            student={student}
            index={index}
            isSelected={selectedStudents.has(index)}
            onToggle={onToggle}
            onSelect={onSelect}
          />
        )
      )}
    </div>
  );
}
