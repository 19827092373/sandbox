import { Users, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { StatCard, ProgressBar } from '../ui';

export function StatsSection() {
  const { getStats } = useStore();
  const stats = getStats();

  const rateNumber = parseFloat(stats.rate) || 0;

  return (
    <div className="space-y-4">
      {/* 统计卡片 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <StatCard
          label="总人数"
          value={stats.total}
          icon={<Users className="w-6 h-6" />}
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
        />
        <StatCard
          label="已完成"
          value={stats.completed}
          icon={<CheckCircle className="w-6 h-6" />}
          iconBg="bg-green-100"
          iconColor="text-green-600"
        />
        <StatCard
          label="未完成"
          value={stats.uncompleted}
          icon={<Clock className="w-6 h-6" />}
          iconBg="bg-amber-100"
          iconColor="text-amber-600"
        />
        <StatCard
          label="完成率"
          value={stats.rate}
          icon={<TrendingUp className="w-6 h-6" />}
          iconBg="bg-purple-100"
          iconColor="text-purple-600"
        />
      </div>

      {/* 进度条 */}
      <ProgressBar value={rateNumber} />
    </div>
  );
}
