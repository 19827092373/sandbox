import { Save } from 'lucide-react';
import { useStore } from '../../store/useStore';

export function StatusBar() {
  const { lastSaved } = useStore();

  return (
    <div className="
      fixed bottom-0 left-0 right-0
      bg-white border-t border-slate-200
      px-4 py-2
      flex items-center justify-between
      text-sm text-slate-500
    ">
      <div className="flex items-center gap-2">
        <Save className="w-4 h-4" />
        <span>最后保存: {lastSaved || '未保存'}</span>
      </div>
      <div className="text-xs">
        背诵任务管理系统 v2.0
      </div>
    </div>
  );
}
