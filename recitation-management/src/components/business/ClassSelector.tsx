import { useState } from 'react';
import { Plus, Pencil, Trash2, GraduationCap } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Button, Modal, Input } from '../ui';

export function ClassSelector() {
  const {
    classes,
    currentClassId,
    switchClass,
    addClass,
    renameClass,
    deleteClass,
    isClassModalOpen,
    classModalMode,
    setClassModalOpen,
  } = useStore();

  const [inputValue, setInputValue] = useState('');
  const currentClass = classes.find(c => c.id === currentClassId);

  const handleOpenModal = (mode: 'add' | 'rename') => {
    setInputValue(mode === 'rename' && currentClass ? currentClass.name : '');
    setClassModalOpen(true, mode);
  };

  const handleSubmit = () => {
    if (!inputValue.trim()) return;

    if (classModalMode === 'add') {
      addClass(inputValue.trim());
    } else {
      renameClass(inputValue.trim());
    }
    setClassModalOpen(false);
    setInputValue('');
  };

  const handleDelete = () => {
    if (classes.length <= 1) {
      alert('至少保留一个班级');
      return;
    }
    if (confirm(`确定要删除班级 "${currentClass?.name}" 吗？`)) {
      deleteClass();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    } else if (e.key === 'Escape') {
      setClassModalOpen(false);
    }
  };

  return (
    <>
      <div className="
        bg-white rounded-2xl shadow-sm
        px-4 py-3
        flex flex-wrap items-center gap-3
      ">
        {/* 班级图标 */}
        <div className="flex items-center gap-2 text-blue-700">
          <GraduationCap className="w-6 h-6" />
          <span className="font-medium hidden sm:inline">班级：</span>
        </div>

        {/* 班级选择器 */}
        <select
          value={currentClassId}
          onChange={(e) => switchClass(Number(e.target.value))}
          className="
            flex-1 min-w-[150px] max-w-[300px]
            px-4 py-2 pr-8
            bg-slate-50 border border-slate-200 rounded-lg
            text-slate-800 font-medium
            cursor-pointer appearance-none
            transition-all duration-200
            focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
            hover:bg-slate-100
          "
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 0.5rem center',
            backgroundSize: '1.5rem',
          }}
        >
          {classes.map(c => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        {/* 操作按钮 */}
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => handleOpenModal('add')}
          >
            <span className="hidden sm:inline">添加</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            icon={<Pencil className="w-4 h-4" />}
            onClick={() => handleOpenModal('rename')}
          >
            <span className="hidden sm:inline">重命名</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            icon={<Trash2 className="w-4 h-4 text-red-500" />}
            onClick={handleDelete}
          />
        </div>
      </div>

      {/* 班级模态框 */}
      <Modal
        isOpen={isClassModalOpen}
        onClose={() => setClassModalOpen(false)}
        title={classModalMode === 'add' ? '添加班级' : '重命名班级'}
        footer={
          <>
            <Button variant="secondary" onClick={() => setClassModalOpen(false)}>
              取消
            </Button>
            <Button onClick={handleSubmit} disabled={!inputValue.trim()}>
              确定
            </Button>
          </>
        }
      >
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="请输入班级名称"
          autoFocus
        />
      </Modal>
    </>
  );
}
