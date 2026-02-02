import { useState } from 'react';
import { ChevronDown, ChevronUp, Upload, RotateCcw } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Button, Textarea } from '../ui';

export function ImportSection() {
  const {
    isImportVisible,
    setImportVisible,
    importStudents,
    resetTaskStatus,
    getCurrentClass,
  } = useStore();

  const [inputValue, setInputValue] = useState('');
  const currentClass = getCurrentClass();

  const handleImport = () => {
    if (!inputValue.trim()) return;

    const names = inputValue
      .split('\n')
      .map(name => name.trim())
      .filter(name => name.length > 0);

    if (names.length === 0) {
      alert('请输入有效的学生名单');
      return;
    }

    if (confirm(`确定要导入 ${names.length} 名学生吗？这将替换当前班级的学生名单。`)) {
      importStudents(names);
      setInputValue('');
    }
  };

  const handleReset = () => {
    if (confirm('确定要重置当前任务所有学生的完成状态吗？')) {
      resetTaskStatus();
    }
  };

  // 预填充当前学生名单
  const handlePrefill = () => {
    if (currentClass) {
      setInputValue(currentClass.students.join('\n'));
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      {/* 折叠头部 */}
      <button
        onClick={() => setImportVisible(!isImportVisible)}
        className="
          w-full px-4 py-3
          flex items-center justify-between
          hover:bg-slate-50
          transition-colors duration-150
          cursor-pointer
        "
      >
        <span className="font-medium text-slate-700 flex items-center gap-2">
          <Upload className="w-4 h-4" />
          导入学生名单
        </span>
        {isImportVisible ? (
          <ChevronUp className="w-5 h-5 text-slate-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-slate-400" />
        )}
      </button>

      {/* 折叠内容 */}
      {isImportVisible && (
        <div className="px-4 pb-4 space-y-3">
          <div className="flex justify-between items-center">
            <p className="text-sm text-slate-500">
              每行输入一个学生姓名
            </p>
            {currentClass && currentClass.students.length > 0 && (
              <button
                onClick={handlePrefill}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                显示当前名单
              </button>
            )}
          </div>

          <Textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="张三&#10;李四&#10;王五"
            className="min-h-[150px]"
          />

          <div className="flex gap-2">
            <Button
              variant="primary"
              size="sm"
              icon={<Upload className="w-4 h-4" />}
              onClick={handleImport}
              disabled={!inputValue.trim()}
            >
              导入名单
            </Button>
            <Button
              variant="danger"
              size="sm"
              icon={<RotateCcw className="w-4 h-4" />}
              onClick={handleReset}
            >
              重置状态
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
