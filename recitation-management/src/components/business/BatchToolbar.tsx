import { CheckSquare, Square, ToggleLeft, CheckCircle, XCircle } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Button } from '../ui';

export function BatchToolbar() {
  const {
    selectedStudents,
    selectAll,
    selectNone,
    selectInverse,
    batchMark,
  } = useStore();

  const selectedCount = selectedStudents.size;

  return (
    <div className="
      flex flex-wrap items-center gap-2
      p-3 bg-slate-50 rounded-xl
    ">
      {/* 选择按钮组 */}
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          icon={<CheckSquare className="w-4 h-4" />}
          onClick={selectAll}
        >
          全选
        </Button>
        <Button
          variant="ghost"
          size="sm"
          icon={<Square className="w-4 h-4" />}
          onClick={selectNone}
        >
          取消
        </Button>
        <Button
          variant="ghost"
          size="sm"
          icon={<ToggleLeft className="w-4 h-4" />}
          onClick={selectInverse}
        >
          反选
        </Button>
      </div>

      {/* 分隔线 */}
      <div className="w-px h-6 bg-slate-300 hidden sm:block" />

      {/* 批量操作按钮组 */}
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          icon={<CheckCircle className="w-4 h-4 text-green-600" />}
          onClick={() => batchMark(true)}
          disabled={selectedCount === 0}
        >
          标记完成
        </Button>
        <Button
          variant="ghost"
          size="sm"
          icon={<XCircle className="w-4 h-4 text-amber-600" />}
          onClick={() => batchMark(false)}
          disabled={selectedCount === 0}
        >
          取消完成
        </Button>
      </div>

      {/* 已选择数量 */}
      {selectedCount > 0 && (
        <span className="
          ml-auto
          px-2.5 py-1
          bg-blue-100 text-blue-700
          rounded-full text-sm font-medium
        ">
          已选择 {selectedCount} 人
        </span>
      )}
    </div>
  );
}
