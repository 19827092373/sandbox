import React, { useState, useMemo, useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { BarChart2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import html2canvas from 'html2canvas';
import ReportHeader from './report/ReportHeader';
import QuestionGrid from './report/QuestionGrid';
import QuestionDetail from './report/QuestionDetail';
import ReportExportView from './report/ReportExportView';

export default function ReportPhase({ results = [], totalQuestions = 20, onReset }) {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [sortMode, setSortMode] = useState('sequence'); // 'sequence' | 'errorRate'
  const [isExporting, setIsExporting] = useState(false);
  const reportRef = useRef(null);
  const exportViewRef = useRef(null);

  // Process Data
  const { questionStats, studentScores, totalStudents } = useMemo(() => {
    if (!results || results.length === 0) {
      return { questionStats: [], studentScores: {}, totalStudents: 0 };
    }

    const stats = Array.from({ length: Number(totalQuestions) }, (_, i) => {
      const qNum = i + 1;
      const wrongStudents = results.filter(r => r.wrong && r.wrong.includes(qNum));
      return {
        qNum,
        count: wrongStudents.length,
        students: wrongStudents.map(s => s.name),
        rate: Math.round((wrongStudents.length / results.length) * 100) || 0
      };
    });

    // Sort based on mode
    const sortedStats = [...stats];
    if (sortMode === 'errorRate') {
      sortedStats.sort((a, b) => b.count - a.count || a.qNum - b.qNum);
    } else {
      sortedStats.sort((a, b) => a.qNum - b.qNum);
    }

    const scores = {};
    results.forEach(r => {
      const wrongCount = r.wrong ? r.wrong.length : 0;
      const score = Math.round(((totalQuestions - wrongCount) / totalQuestions) * 100);
      scores[r.name] = score;
    });

    return { questionStats: sortedStats, studentScores: scores, totalStudents: results.length };
  }, [results, totalQuestions, sortMode]);

  // Get error rate color style - Enhanced contrast for better visibility
  const getErrorRateStyle = (rate, count, total) => {
    if (rate === 0) return {
      bgGradient: 'bg-gradient-to-br from-emerald-100 via-emerald-200/50 to-emerald-300/30',
      border: 'border-emerald-300',
      text: 'text-emerald-950',
      shadow: 'shadow-md shadow-emerald-200/50',
      glow: '',
      hoverGlow: 'hover:shadow-lg hover:shadow-emerald-300/50'
    };

    if (rate <= 20) {
      return {
        bgGradient: 'bg-gradient-to-br from-green-100 via-green-200/60 to-green-300/40',
        border: 'border-green-400',
        text: 'text-green-950',
        shadow: 'shadow-md shadow-green-200/50',
        glow: '',
        hoverGlow: 'hover:shadow-lg hover:shadow-green-400/50'
      };
    }

    if (rate <= 50) {
      return {
        bgGradient: 'bg-gradient-to-br from-yellow-100 via-yellow-200 to-amber-300/60',
        border: 'border-yellow-500',
        text: 'text-amber-950',
        shadow: 'shadow-md shadow-yellow-200/60',
        glow: '',
        hoverGlow: 'hover:shadow-lg hover:shadow-yellow-500/50'
      };
    }

    if (rate <= 70) {
      return {
        bgGradient: 'bg-gradient-to-br from-orange-100 via-orange-200 to-orange-400/70',
        border: 'border-orange-500',
        text: 'text-orange-950',
        shadow: 'shadow-lg shadow-orange-200/60',
        glow: '',
        hoverGlow: 'hover:shadow-xl hover:shadow-orange-500/50'
      };
    }

    // Critical error: Vivid Red
    return {
      bgGradient: 'bg-gradient-to-br from-red-100 via-red-200 to-red-400/80',
      border: 'border-red-500',
      text: 'text-red-950',
      shadow: 'shadow-lg shadow-red-200/60',
      glow: '',
      hoverGlow: 'hover:shadow-xl hover:shadow-red-500/50'
    };
  };

  // Export CSV
  const handleExportCSV = () => {
    if (!questionStats.length) return;

    const sortedBySequence = [...questionStats].sort((a, b) => a.qNum - b.qNum);
    const headers = ['题号', '错误人数', '错误率', '错误学生'];
    const rows = sortedBySequence.map(q => [
      `第${q.qNum}题`,
      q.count,
      `${q.rate}%`,
      `"${q.students.join(', ')}"`
    ]);

    const bom = '\uFEFF';
    const csvContent = bom + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `学情诊断报告_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export Image
  const handleExportImage = async () => {
    if (!exportViewRef.current) return;

    setIsExporting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 300)); // More delay for complex layout

      const canvas = await html2canvas(exportViewRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false,
        useCORS: true,
      });

      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `学情诊断分析报告_${new Date().toISOString().slice(0, 10)}.png`;
      link.click();
    } catch (error) {
      console.error('Export failed:', error);
      alert('导出失败，请重试');
    } finally {
      setIsExporting(false);
    }
  };

  // Empty state
  if (!results || results.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center animate-fade-in gap-4 text-slate-400">
        <div className="w-24 h-24 rounded-[2rem] flex items-center justify-center border border-slate-200 bg-slate-50 transition-all duration-500 shadow-premium">
          <BarChart2 className="w-12 h-12 text-indigo-400" />
        </div>
        <p className="text-lg font-black uppercase tracking-widest">暂无数据</p>
        <Button variant="outline" onClick={onReset} className="mt-4 rounded-xl px-8 font-black uppercase tracking-widest border-2">返回设置</Button>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col animate-fade-in gap-8 pb-10">
      {/* Hidden Export View */}
      <ReportExportView 
        exportRef={exportViewRef}
        questionStats={questionStats}
        totalStudents={totalStudents}
        getErrorRateStyle={getErrorRateStyle}
      />

      <ReportHeader 
        totalStudents={totalStudents}
        totalQuestions={totalQuestions}
        sortMode={sortMode}
        setSortMode={setSortMode}
        handleExportCSV={handleExportCSV}
        handleExportImage={handleExportImage}
        isExporting={isExporting}
        onReset={onReset}
      />

      <div ref={reportRef} className="flex-grow space-y-10">
        <QuestionGrid 
          questionStats={questionStats}
          selectedQuestion={selectedQuestion}
          setSelectedQuestion={setSelectedQuestion}
          getErrorRateStyle={getErrorRateStyle}
        />

        {selectedQuestion && (
          <QuestionDetail 
            selectedQuestion={selectedQuestion}
            totalStudents={totalStudents}
            studentScores={studentScores}
            getErrorRateStyle={getErrorRateStyle}
          />
        )}

        {/* Legend */}
        <div className="flex justify-center items-center gap-6 pt-4 text-[11px] font-black uppercase tracking-[0.2em] transition-colors duration-300 text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-3.5 h-3.5 rounded-full bg-emerald-200 border-2 border-emerald-400 shadow-sm" />
            <span>优秀 (0-20%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3.5 h-3.5 rounded-full bg-yellow-200 border-2 border-yellow-400 shadow-sm" />
            <span>预警 (21-50%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3.5 h-3.5 rounded-full bg-orange-200 border-2 border-orange-400 shadow-sm" />
            <span>注意 (51-70%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3.5 h-3.5 rounded-full bg-red-200 border-2 border-red-400 shadow-sm" />
            <span>严重 (71-100%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
