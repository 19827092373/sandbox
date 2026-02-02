import { useEffect, useRef, useState } from 'react';
import { useStore } from '../../store/useStore';

export function TaskEditor() {
  const { getCurrentTask, updateTaskContent, saveData } = useStore();
  const currentTask = getCurrentTask();

  const [value, setValue] = useState(currentTask?.content || '');
  const saveTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 同步任务内容
  useEffect(() => {
    setValue(currentTask?.content || '');
  }, [currentTask?.id, currentTask?.content]);

  // 防抖保存
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    // 清除之前的定时器
    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
    }

    // 设置新的定时器（1秒后自动保存）
    saveTimerRef.current = setTimeout(() => {
      updateTaskContent(newValue);
      saveData();
    }, 1000);
  };

  // 组件卸载时清理定时器
  useEffect(() => {
    return () => {
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current);
      }
    };
  }, []);

  if (!currentTask) {
    return (
      <div className="p-4 text-center text-slate-400">
        请选择一个任务
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-700">
        任务内容
      </label>
      <textarea
        value={value}
        onChange={handleChange}
        placeholder="输入任务内容，如：背诵 Unit 1 课文"
        className="
          w-full px-4 py-3
          bg-white border border-slate-300 rounded-lg
          text-slate-800 placeholder:text-slate-400
          resize-none min-h-[100px]
          shadow-sm
          transition-all duration-200
          focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
        "
      />
      <p className="text-xs text-slate-400">
        输入停止 1 秒后自动保存
      </p>
    </div>
  );
}
