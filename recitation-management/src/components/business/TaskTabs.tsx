import { useState } from 'react';
import { Plus, X, Copy, Pencil } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Button, Modal, Input } from '../ui';

export function TaskTabs() {
  const {
    getCurrentClass,
    currentTaskId,
    switchTask,
    addTask,
    renameTask,
    copyTask,
    deleteTask,
  } = useStore();

  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [renameValue, setRenameValue] = useState('');
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);

  const currentClass = getCurrentClass();
  const tasks = currentClass?.tasks || [];

  const handleRename = (taskId: number) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      setRenameValue(task.content);
      setEditingTaskId(taskId);
      setIsRenameModalOpen(true);
    }
  };

  const handleRenameSubmit = () => {
    if (!renameValue.trim() || editingTaskId === null) return;

    // 先切换到要重命名的任务
    if (editingTaskId !== currentTaskId) {
      switchTask(editingTaskId);
    }

    // 由于 store 中 renameTask 使用 currentTaskId，需要确保是当前任务
    setTimeout(() => {
      renameTask(renameValue.trim());
      setIsRenameModalOpen(false);
      setEditingTaskId(null);
    }, 0);
  };

  const handleDelete = (taskId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (tasks.length <= 1) {
      alert('至少保留一个任务');
      return;
    }
    if (confirm('确定要删除这个任务吗？')) {
      deleteTask(taskId);
    }
  };

  const handleCopy = () => {
    copyTask();
  };

  const truncateText = (text: string, maxLength: number = 10) => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  return (
    <div className="space-y-3">
      {/* 任务标签列表 */}
      <div className="
        flex flex-wrap gap-2
        overflow-x-auto pb-2
        -mx-4 px-4 md:mx-0 md:px-0
      ">
        {tasks.map(task => (
          <div
            key={task.id}
            onClick={() => switchTask(task.id)}
            className={`
              group relative
              px-4 py-2 pr-8
              rounded-lg text-sm font-medium
              cursor-pointer
              transition-all duration-200
              flex items-center gap-2
              ${task.id === currentTaskId
                ? 'bg-blue-700 text-white shadow-md'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:border-slate-300'
              }
            `}
          >
            <span>{truncateText(task.content)}</span>

            {/* 删除按钮 */}
            {tasks.length > 1 && (
              <button
                onClick={(e) => handleDelete(task.id, e)}
                className={`
                  absolute right-1 top-1/2 -translate-y-1/2
                  w-5 h-5 rounded
                  flex items-center justify-center
                  opacity-0 group-hover:opacity-100
                  transition-opacity duration-150
                  ${task.id === currentTaskId
                    ? 'hover:bg-blue-600 text-white/80 hover:text-white'
                    : 'hover:bg-slate-200 text-slate-400 hover:text-slate-600'
                  }
                `}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        ))}

        {/* 添加任务按钮 */}
        <button
          onClick={addTask}
          className="
            px-4 py-2
            rounded-lg text-sm font-medium
            border border-dashed border-slate-300
            text-slate-500 hover:text-blue-600
            hover:border-blue-400 hover:bg-blue-50
            transition-all duration-200
            flex items-center gap-1.5
            cursor-pointer
          "
        >
          <Plus className="w-4 h-4" />
          <span>新任务</span>
        </button>
      </div>

      {/* 任务操作按钮 */}
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="sm"
          icon={<Pencil className="w-4 h-4" />}
          onClick={() => handleRename(currentTaskId)}
        >
          重命名
        </Button>
        <Button
          variant="ghost"
          size="sm"
          icon={<Copy className="w-4 h-4" />}
          onClick={handleCopy}
        >
          复制任务
        </Button>
      </div>

      {/* 重命名模态框 */}
      <Modal
        isOpen={isRenameModalOpen}
        onClose={() => setIsRenameModalOpen(false)}
        title="重命名任务"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsRenameModalOpen(false)}>
              取消
            </Button>
            <Button onClick={handleRenameSubmit} disabled={!renameValue.trim()}>
              确定
            </Button>
          </>
        }
      >
        <Input
          value={renameValue}
          onChange={(e) => setRenameValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleRenameSubmit()}
          placeholder="请输入任务名称"
          autoFocus
        />
      </Modal>
    </div>
  );
}
