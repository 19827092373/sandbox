// 学生状态
export interface StudentStatus {
  name: string;
  completed: boolean;
}

// 任务
export interface Task {
  id: number;
  content: string;
  students: StudentStatus[];
}

// 班级
export interface Class {
  id: number;
  name: string;
  students: string[];
  tasks: Task[];
}

// 应用状态
export interface AppState {
  classes: Class[];
  currentClassId: number;
  currentTaskId: number;
  lastSaved: string;
}

// 导出布局类型
export type ExportLayout = 'single' | 'multi' | 'compact';

// UI 状态
export interface UIState {
  searchKeyword: string;
  selectedStudents: Set<number>;
  isImportVisible: boolean;
  isExportModalOpen: boolean;
  isClassModalOpen: boolean;
  classModalMode: 'add' | 'rename';
  exportLayout: ExportLayout;
}
