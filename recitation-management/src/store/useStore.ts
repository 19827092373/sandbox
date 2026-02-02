import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Class, Task, StudentStatus, ExportLayout } from '../types';

// 生成唯一 ID
const generateId = (items: { id: number }[]) => {
  if (items.length === 0) return 1;
  return Math.max(...items.map(item => item.id)) + 1;
};

// 获取当前时间字符串
const getTimeString = () => {
  const now = new Date();
  return now.toLocaleString('zh-CN');
};

// 默认数据
const createDefaultClass = (): Class => ({
  id: 1,
  name: '默认班级',
  students: ['张三', '李四', '王五'],
  tasks: [{
    id: 1,
    content: '默认任务',
    students: [
      { name: '张三', completed: false },
      { name: '李四', completed: false },
      { name: '王五', completed: false },
    ]
  }]
});

interface RecitationStore {
  // 数据状态
  classes: Class[];
  currentClassId: number;
  currentTaskId: number;
  lastSaved: string;

  // UI 状态
  searchKeyword: string;
  selectedStudents: Set<number>;
  isImportVisible: boolean;
  isExportModalOpen: boolean;
  isClassModalOpen: boolean;
  classModalMode: 'add' | 'rename';
  exportLayout: ExportLayout;

  // Getters
  getCurrentClass: () => Class | undefined;
  getCurrentTask: () => Task | undefined;
  getFilteredStudents: () => StudentStatus[];
  getStats: () => { total: number; completed: number; uncompleted: number; rate: string };

  // Actions - 班级
  addClass: (name: string) => void;
  renameClass: (name: string) => void;
  deleteClass: () => void;
  switchClass: (id: number) => void;

  // Actions - 任务
  addTask: () => void;
  renameTask: (content: string) => void;
  copyTask: () => void;
  deleteTask: (id: number) => void;
  switchTask: (id: number) => void;
  updateTaskContent: (content: string) => void;

  // Actions - 学生
  toggleStudent: (index: number) => void;
  importStudents: (names: string[]) => void;
  resetTaskStatus: () => void;

  // Actions - 批量操作
  selectStudent: (index: number, multiSelect: boolean) => void;
  selectAll: () => void;
  selectNone: () => void;
  selectInverse: () => void;
  batchMark: (completed: boolean) => void;

  // Actions - 搜索
  setSearchKeyword: (keyword: string) => void;

  // Actions - UI
  setImportVisible: (visible: boolean) => void;
  setExportModalOpen: (open: boolean) => void;
  setClassModalOpen: (open: boolean, mode?: 'add' | 'rename') => void;
  setExportLayout: (layout: ExportLayout) => void;

  // Actions - 持久化
  saveData: () => void;
}

export const useStore = create<RecitationStore>()(
  persist(
    (set, get) => ({
      // 初始数据状态
      classes: [createDefaultClass()],
      currentClassId: 1,
      currentTaskId: 1,
      lastSaved: getTimeString(),

      // 初始 UI 状态
      searchKeyword: '',
      selectedStudents: new Set<number>(),
      isImportVisible: false,
      isExportModalOpen: false,
      isClassModalOpen: false,
      classModalMode: 'add',
      exportLayout: 'compact',

      // Getters
      getCurrentClass: () => {
        const { classes, currentClassId } = get();
        return classes.find(c => c.id === currentClassId);
      },

      getCurrentTask: () => {
        const currentClass = get().getCurrentClass();
        if (!currentClass) return undefined;
        return currentClass.tasks.find(t => t.id === get().currentTaskId);
      },

      getFilteredStudents: () => {
        const task = get().getCurrentTask();
        const keyword = get().searchKeyword.toLowerCase();
        if (!task) return [];
        if (!keyword) return task.students;
        return task.students.filter(s => s.name.toLowerCase().includes(keyword));
      },

      getStats: () => {
        const task = get().getCurrentTask();
        if (!task) return { total: 0, completed: 0, uncompleted: 0, rate: '0%' };
        const total = task.students.length;
        const completed = task.students.filter(s => s.completed).length;
        const uncompleted = total - completed;
        const rate = total > 0 ? `${((completed / total) * 100).toFixed(1)}%` : '0%';
        return { total, completed, uncompleted, rate };
      },

      // Actions - 班级
      addClass: (name: string) => {
        set(state => {
          const newId = generateId(state.classes);
          const newClass: Class = {
            id: newId,
            name,
            students: [],
            tasks: [{
              id: 1,
              content: '新任务',
              students: []
            }]
          };
          return {
            classes: [...state.classes, newClass],
            currentClassId: newId,
            currentTaskId: 1,
            lastSaved: getTimeString(),
            searchKeyword: '',
            selectedStudents: new Set(),
          };
        });
      },

      renameClass: (name: string) => {
        set(state => ({
          classes: state.classes.map(c =>
            c.id === state.currentClassId ? { ...c, name } : c
          ),
          lastSaved: getTimeString(),
        }));
      },

      deleteClass: () => {
        set(state => {
          if (state.classes.length <= 1) return state;
          const newClasses = state.classes.filter(c => c.id !== state.currentClassId);
          return {
            classes: newClasses,
            currentClassId: newClasses[0].id,
            currentTaskId: newClasses[0].tasks[0]?.id || 1,
            lastSaved: getTimeString(),
            searchKeyword: '',
            selectedStudents: new Set(),
          };
        });
      },

      switchClass: (id: number) => {
        set(state => {
          const targetClass = state.classes.find(c => c.id === id);
          if (!targetClass) return state;
          return {
            currentClassId: id,
            currentTaskId: targetClass.tasks[0]?.id || 1,
            searchKeyword: '',
            selectedStudents: new Set(),
          };
        });
      },

      // Actions - 任务
      addTask: () => {
        set(state => {
          const currentClass = state.classes.find(c => c.id === state.currentClassId);
          if (!currentClass) return state;

          const newTaskId = generateId(currentClass.tasks);
          const newTask: Task = {
            id: newTaskId,
            content: '新任务',
            students: currentClass.students.map(name => ({ name, completed: false }))
          };

          return {
            classes: state.classes.map(c =>
              c.id === state.currentClassId
                ? { ...c, tasks: [...c.tasks, newTask] }
                : c
            ),
            currentTaskId: newTaskId,
            lastSaved: getTimeString(),
            searchKeyword: '',
            selectedStudents: new Set(),
          };
        });
      },

      renameTask: (content: string) => {
        set(state => ({
          classes: state.classes.map(c =>
            c.id === state.currentClassId
              ? {
                  ...c,
                  tasks: c.tasks.map(t =>
                    t.id === state.currentTaskId ? { ...t, content } : t
                  )
                }
              : c
          ),
          lastSaved: getTimeString(),
        }));
      },

      copyTask: () => {
        set(state => {
          const currentClass = state.classes.find(c => c.id === state.currentClassId);
          const currentTask = currentClass?.tasks.find(t => t.id === state.currentTaskId);
          if (!currentClass || !currentTask) return state;

          const newTaskId = generateId(currentClass.tasks);
          const newTask: Task = {
            id: newTaskId,
            content: `${currentTask.content}(副本)`,
            students: currentTask.students.map(s => ({ ...s, completed: false }))
          };

          return {
            classes: state.classes.map(c =>
              c.id === state.currentClassId
                ? { ...c, tasks: [...c.tasks, newTask] }
                : c
            ),
            currentTaskId: newTaskId,
            lastSaved: getTimeString(),
          };
        });
      },

      deleteTask: (id: number) => {
        set(state => {
          const currentClass = state.classes.find(c => c.id === state.currentClassId);
          if (!currentClass || currentClass.tasks.length <= 1) return state;

          const newTasks = currentClass.tasks.filter(t => t.id !== id);
          const newCurrentTaskId = id === state.currentTaskId
            ? newTasks[0].id
            : state.currentTaskId;

          return {
            classes: state.classes.map(c =>
              c.id === state.currentClassId
                ? { ...c, tasks: newTasks }
                : c
            ),
            currentTaskId: newCurrentTaskId,
            lastSaved: getTimeString(),
          };
        });
      },

      switchTask: (id: number) => {
        set({
          currentTaskId: id,
          searchKeyword: '',
          selectedStudents: new Set(),
        });
      },

      updateTaskContent: (content: string) => {
        set(state => ({
          classes: state.classes.map(c =>
            c.id === state.currentClassId
              ? {
                  ...c,
                  tasks: c.tasks.map(t =>
                    t.id === state.currentTaskId ? { ...t, content } : t
                  )
                }
              : c
          ),
        }));
      },

      // Actions - 学生
      toggleStudent: (index: number) => {
        set(state => {
          const currentClass = state.classes.find(c => c.id === state.currentClassId);
          const currentTask = currentClass?.tasks.find(t => t.id === state.currentTaskId);
          if (!currentTask || index < 0 || index >= currentTask.students.length) return state;

          return {
            classes: state.classes.map(c =>
              c.id === state.currentClassId
                ? {
                    ...c,
                    tasks: c.tasks.map(t =>
                      t.id === state.currentTaskId
                        ? {
                            ...t,
                            students: t.students.map((s, i) =>
                              i === index ? { ...s, completed: !s.completed } : s
                            )
                          }
                        : t
                    )
                  }
                : c
            ),
            lastSaved: getTimeString(),
          };
        });
      },

      importStudents: (names: string[]) => {
        set(state => {
          const uniqueNames = [...new Set(names.filter(n => n.trim()))];
          return {
            classes: state.classes.map(c =>
              c.id === state.currentClassId
                ? {
                    ...c,
                    students: uniqueNames,
                    tasks: c.tasks.map(t => ({
                      ...t,
                      students: uniqueNames.map(name => ({
                        name,
                        completed: t.students.find(s => s.name === name)?.completed || false
                      }))
                    }))
                  }
                : c
            ),
            lastSaved: getTimeString(),
            isImportVisible: false,
          };
        });
      },

      resetTaskStatus: () => {
        set(state => ({
          classes: state.classes.map(c =>
            c.id === state.currentClassId
              ? {
                  ...c,
                  tasks: c.tasks.map(t =>
                    t.id === state.currentTaskId
                      ? {
                          ...t,
                          students: t.students.map(s => ({ ...s, completed: false }))
                        }
                      : t
                  )
                }
              : c
          ),
          lastSaved: getTimeString(),
          selectedStudents: new Set(),
        }));
      },

      // Actions - 批量操作
      selectStudent: (index: number, multiSelect: boolean) => {
        set(state => {
          const newSelected = new Set(state.selectedStudents);
          if (multiSelect) {
            if (newSelected.has(index)) {
              newSelected.delete(index);
            } else {
              newSelected.add(index);
            }
          } else {
            newSelected.clear();
            newSelected.add(index);
          }
          return { selectedStudents: newSelected };
        });
      },

      selectAll: () => {
        const task = get().getCurrentTask();
        const keyword = get().searchKeyword.toLowerCase();
        if (!task) return;

        const indices = task.students
          .map((s, i) => ({ s, i }))
          .filter(({ s }) => !keyword || s.name.toLowerCase().includes(keyword))
          .map(({ i }) => i);

        set({ selectedStudents: new Set(indices) });
      },

      selectNone: () => {
        set({ selectedStudents: new Set() });
      },

      selectInverse: () => {
        const task = get().getCurrentTask();
        const keyword = get().searchKeyword.toLowerCase();
        const current = get().selectedStudents;
        if (!task) return;

        const visibleIndices = task.students
          .map((s, i) => ({ s, i }))
          .filter(({ s }) => !keyword || s.name.toLowerCase().includes(keyword))
          .map(({ i }) => i);

        const newSelected = new Set(
          visibleIndices.filter(i => !current.has(i))
        );
        set({ selectedStudents: newSelected });
      },

      batchMark: (completed: boolean) => {
        set(state => {
          const selected = state.selectedStudents;
          if (selected.size === 0) return state;

          return {
            classes: state.classes.map(c =>
              c.id === state.currentClassId
                ? {
                    ...c,
                    tasks: c.tasks.map(t =>
                      t.id === state.currentTaskId
                        ? {
                            ...t,
                            students: t.students.map((s, i) =>
                              selected.has(i) ? { ...s, completed } : s
                            )
                          }
                        : t
                    )
                  }
                : c
            ),
            selectedStudents: new Set(),
            lastSaved: getTimeString(),
          };
        });
      },

      // Actions - 搜索
      setSearchKeyword: (keyword: string) => {
        set({ searchKeyword: keyword });
      },

      // Actions - UI
      setImportVisible: (visible: boolean) => {
        set({ isImportVisible: visible });
      },

      setExportModalOpen: (open: boolean) => {
        set({ isExportModalOpen: open });
      },

      setClassModalOpen: (open: boolean, mode: 'add' | 'rename' = 'add') => {
        set({ isClassModalOpen: open, classModalMode: mode });
      },

      setExportLayout: (layout: ExportLayout) => {
        set({ exportLayout: layout });
      },

      // Actions - 持久化
      saveData: () => {
        set({ lastSaved: getTimeString() });
      },
    }),
    {
      name: 'recitation-storage',
      partialize: (state) => ({
        classes: state.classes,
        currentClassId: state.currentClassId,
        currentTaskId: state.currentTaskId,
        lastSaved: state.lastSaved,
      }),
    }
  )
);
