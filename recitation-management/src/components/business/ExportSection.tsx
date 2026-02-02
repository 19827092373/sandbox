import { useState, useRef } from 'react';
import { Download, FileImage, FileSpreadsheet, Loader2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import { useStore } from '../../store/useStore';
import { Button, Modal } from '../ui';
import type { ExportLayout } from '../../types';

export function ExportSection() {
  const {
    getCurrentTask,
    getStats,
    isExportModalOpen,
    setExportModalOpen,
    exportLayout,
    setExportLayout,
  } = useStore();

  const [isGenerating, setIsGenerating] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const exportRef = useRef<HTMLDivElement>(null);

  const currentTask = getCurrentTask();
  const stats = getStats();

  const handleOpenExport = () => {
    setPreviewUrl(null);
    setExportModalOpen(true);
  };

  const handleGenerateImage = async () => {
    if (!exportRef.current) return;

    setIsGenerating(true);
    try {
      const canvas = await html2canvas(exportRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        useCORS: true,
      });
      const url = canvas.toDataURL('image/png');
      setPreviewUrl(url);
    } catch (error) {
      console.error('生成图片失败:', error);
      alert('生成图片失败，请重试');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadImage = () => {
    if (!previewUrl || !currentTask) return;

    const link = document.createElement('a');
    const taskName = currentTask.content.slice(0, 10);
    const date = new Date().toISOString().slice(0, 10);
    link.download = `${taskName}_完成情况_${date}.png`;
    link.href = previewUrl;
    link.click();
  };

  const handleExportCSV = () => {
    if (!currentTask) return;

    const BOM = '\uFEFF';
    const headers = '序号,姓名,完成状态\n';
    const rows = currentTask.students
      .map((s, i) => `${i + 1},${s.name},${s.completed ? '已完成' : '未完成'}`)
      .join('\n');
    const summary = `\n\n总人数,${stats.total}\n已完成,${stats.completed}\n完成率,${stats.rate}`;

    const csv = BOM + headers + rows + summary;
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    const taskName = currentTask.content.slice(0, 20);
    const date = new Date().toISOString().slice(0, 10);
    link.download = `${taskName}_完成情况_${date}.csv`;
    link.href = url;
    link.click();

    URL.revokeObjectURL(url);
  };

  const layouts: { value: ExportLayout; label: string }[] = [
    { value: 'compact', label: '紧凑布局（推荐）' },
    { value: 'single', label: '单列布局' },
    { value: 'multi', label: '多列布局' },
  ];

  return (
    <>
      {/* 导出按钮 */}
      <div className="flex gap-2">
        <Button
          variant="primary"
          size="sm"
          icon={<FileImage className="w-4 h-4" />}
          onClick={handleOpenExport}
        >
          导出图片
        </Button>
        <Button
          variant="secondary"
          size="sm"
          icon={<FileSpreadsheet className="w-4 h-4" />}
          onClick={handleExportCSV}
        >
          导出 Excel
        </Button>
      </div>

      {/* 导出模态框 */}
      <Modal
        isOpen={isExportModalOpen}
        onClose={() => setExportModalOpen(false)}
        title="导出图片"
        size="lg"
        footer={
          <>
            <Button variant="secondary" onClick={() => setExportModalOpen(false)}>
              关闭
            </Button>
            {previewUrl ? (
              <Button
                icon={<Download className="w-4 h-4" />}
                onClick={handleDownloadImage}
              >
                下载图片
              </Button>
            ) : (
              <Button
                icon={isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileImage className="w-4 h-4" />}
                onClick={handleGenerateImage}
                loading={isGenerating}
              >
                生成预览
              </Button>
            )}
          </>
        }
      >
        {/* 布局选择 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            选择布局方案
          </label>
          <div className="flex gap-3">
            {layouts.map(layout => (
              <label
                key={layout.value}
                className={`
                  flex items-center gap-2 px-3 py-2
                  border rounded-lg cursor-pointer
                  transition-all duration-150
                  ${exportLayout === layout.value
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-slate-200 hover:border-slate-300'
                  }
                `}
              >
                <input
                  type="radio"
                  name="layout"
                  value={layout.value}
                  checked={exportLayout === layout.value}
                  onChange={() => {
                    setExportLayout(layout.value);
                    setPreviewUrl(null);
                  }}
                  className="sr-only"
                />
                <span className="text-sm">{layout.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 预览/导出内容 */}
        {previewUrl ? (
          <div className="border rounded-lg p-2 bg-slate-50">
            <img src={previewUrl} alt="导出预览" className="w-full rounded" />
          </div>
        ) : (
          <div className="border rounded-lg overflow-hidden">
            <div ref={exportRef} className="p-4 bg-white">
              <ExportContent
                task={currentTask}
                stats={stats}
                layout={exportLayout}
              />
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}

// 导出内容组件
interface ExportContentProps {
  task: ReturnType<typeof useStore.getState>['getCurrentTask'] extends () => infer R ? R : never;
  stats: ReturnType<typeof useStore.getState>['getStats'] extends () => infer R ? R : never;
  layout: ExportLayout;
}

function ExportContent({ task, stats, layout }: ExportContentProps) {
  if (!task) return <div>无数据</div>;

  return (
    <div className="font-sans">
      {/* 标题 */}
      <h2 className="text-lg font-bold text-center mb-4 text-slate-800">
        {task.content} - 完成情况
      </h2>

      {/* 统计信息 */}
      <div className="flex justify-center gap-6 mb-4 text-sm">
        <span>总人数: <strong>{stats.total}</strong></span>
        <span className="text-green-600">已完成: <strong>{stats.completed}</strong></span>
        <span className="text-amber-600">未完成: <strong>{stats.uncompleted}</strong></span>
        <span className="text-blue-600">完成率: <strong>{stats.rate}</strong></span>
      </div>

      {/* 表格内容 */}
      {layout === 'single' && <SingleLayoutTable students={task.students} />}
      {layout === 'multi' && <MultiLayoutTable students={task.students} />}
      {layout === 'compact' && <CompactLayoutTable students={task.students} />}

      {/* 底部信息 */}
      <div className="mt-4 text-xs text-slate-400 text-center">
        生成时间: {new Date().toLocaleString('zh-CN')}
      </div>
    </div>
  );
}

// 单列布局
function SingleLayoutTable({ students }: { students: { name: string; completed: boolean }[] }) {
  return (
    <table className="w-full border-collapse text-sm">
      <thead>
        <tr className="bg-slate-100">
          <th className="border border-slate-300 px-3 py-2 text-left w-16">序号</th>
          <th className="border border-slate-300 px-3 py-2 text-left">姓名</th>
          <th className="border border-slate-300 px-3 py-2 text-center w-24">状态</th>
        </tr>
      </thead>
      <tbody>
        {students.map((s, i) => (
          <tr key={i} className={s.completed ? 'bg-green-50' : ''}>
            <td className="border border-slate-300 px-3 py-2">{i + 1}</td>
            <td className="border border-slate-300 px-3 py-2">{s.name}</td>
            <td className={`border border-slate-300 px-3 py-2 text-center ${s.completed ? 'text-green-600' : 'text-slate-500'}`}>
              {s.completed ? '✓' : '○'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// 多列布局
function MultiLayoutTable({ students }: { students: { name: string; completed: boolean }[] }) {
  const columns = 3;
  const rows = Math.ceil(students.length / columns);

  return (
    <div className="flex gap-4">
      {Array.from({ length: columns }).map((_, colIdx) => (
        <table key={colIdx} className="flex-1 border-collapse text-sm">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-300 px-2 py-1.5 text-left w-10">#</th>
              <th className="border border-slate-300 px-2 py-1.5 text-left">姓名</th>
              <th className="border border-slate-300 px-2 py-1.5 text-center w-10">状态</th>
            </tr>
          </thead>
          <tbody>
            {students.slice(colIdx * rows, (colIdx + 1) * rows).map((s, i) => (
              <tr key={i} className={s.completed ? 'bg-green-50' : ''}>
                <td className="border border-slate-300 px-2 py-1.5">{colIdx * rows + i + 1}</td>
                <td className="border border-slate-300 px-2 py-1.5">{s.name}</td>
                <td className={`border border-slate-300 px-2 py-1.5 text-center ${s.completed ? 'text-green-600' : 'text-slate-500'}`}>
                  {s.completed ? '✓' : '○'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ))}
    </div>
  );
}

// 紧凑布局
function CompactLayoutTable({ students }: { students: { name: string; completed: boolean }[] }) {
  const columns = 3;
  const itemsPerRow = columns;

  return (
    <table className="w-full border-collapse text-sm">
      <tbody>
        {Array.from({ length: Math.ceil(students.length / itemsPerRow) }).map((_, rowIdx) => (
          <tr key={rowIdx}>
            {Array.from({ length: itemsPerRow }).map((_, colIdx) => {
              const idx = rowIdx * itemsPerRow + colIdx;
              const student = students[idx];
              if (!student) return <td key={colIdx} className="border border-slate-300 px-2 py-1.5" />;

              return (
                <td
                  key={colIdx}
                  className={`border border-slate-300 px-2 py-1.5 ${student.completed ? 'bg-green-50' : ''}`}
                >
                  <span className="text-slate-500 mr-1">{idx + 1}.</span>
                  <span>{student.name}</span>
                  <span className={`ml-1 ${student.completed ? 'text-green-600' : 'text-slate-400'}`}>
                    {student.completed ? '✓' : '○'}
                  </span>
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
