import { useStore } from './store/useStore';
import { SearchInput } from './components/ui';
import {
  ClassSelector,
  TaskTabs,
  TaskEditor,
  StudentGrid,
  StatsSection,
  BatchToolbar,
  ImportSection,
  ExportSection,
  StatusBar,
} from './components/business';

function App() {
  const {
    getCurrentTask,
    searchKeyword,
    setSearchKeyword,
    selectedStudents,
    toggleStudent,
    selectStudent,
  } = useStore();

  const currentTask = getCurrentTask();
  const students = currentTask?.students || [];

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      {/* 顶部班级选择器 */}
      <header className="sticky top-0 z-40 bg-slate-50/80 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <ClassSelector />
        </div>
      </header>

      {/* 主内容区域 */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* 左侧：任务区域 */}
          <aside className="w-full md:w-[35%] lg:w-[30%] space-y-4">
            {/* 任务标签 */}
            <div className="bg-white rounded-2xl shadow-sm p-4">
              <h2 className="text-lg font-semibold text-slate-800 mb-3">
                任务列表
              </h2>
              <TaskTabs />
            </div>

            {/* 任务编辑器 */}
            <div className="bg-white rounded-2xl shadow-sm p-4">
              <TaskEditor />
            </div>

            {/* 导入名单 */}
            <ImportSection />

            {/* 导出按钮 */}
            <div className="bg-white rounded-2xl shadow-sm p-4">
              <h3 className="text-sm font-medium text-slate-700 mb-3">
                数据导出
              </h3>
              <ExportSection />
            </div>
          </aside>

          {/* 右侧：学生区域 */}
          <section className="w-full md:w-[65%] lg:w-[70%] space-y-4">
            {/* 统计区域 */}
            <StatsSection />

            {/* 搜索框 */}
            <SearchInput
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />

            {/* 批量操作工具栏 */}
            <BatchToolbar />

            {/* 学生卡片网格 */}
            <div className="bg-white rounded-2xl shadow-sm p-4">
              <StudentGrid
                students={students}
                selectedStudents={selectedStudents}
                searchKeyword={searchKeyword}
                onToggle={toggleStudent}
                onSelect={selectStudent}
              />
            </div>

            {/* 使用提示 */}
            <div className="text-center text-sm text-slate-400 mt-4">
              <p>点击卡片切换完成状态 | Ctrl/Cmd + 点击多选</p>
            </div>
          </section>
        </div>
      </main>

      {/* 底部状态栏 */}
      <StatusBar />
    </div>
  );
}

export default App;
