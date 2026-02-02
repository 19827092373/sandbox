# 背诵任务管理系统 - 功能需求文档

> 用于 React 重构参考
> **项目根目录**: `/Users/huangshangfei/code/teacherlab/reaction/`
> **原项目地址**: https://github.com/19827092373/Recitation-management-

---

## 一、项目概述

### 1.1 项目定位
面向中小学教师的背诵任务管理工具，用于追踪和管理学生的背诵完成情况。

### 1.2 技术栈（原项目）
- 纯前端：HTML + CSS + 原生 JavaScript
- 数据存储：localStorage
- 图片导出：html2canvas

### 1.3 重构技术栈建议
- React 18 + TypeScript
- 状态管理：Zustand / Redux Toolkit
- UI 框架：Ant Design / Tailwind CSS
- 数据持久化：localStorage / IndexedDB

---

## 二、数据模型设计

### 2.1 核心数据结构

```typescript
// 应用状态
interface AppState {
  classes: Class[];           // 班级列表
  currentClassId: number;     // 当前选中班级 ID
  currentTaskId: number;      // 当前选中任务 ID
  lastSaved: string;          // 最后保存时间
}

// 班级
interface Class {
  id: number;
  name: string;               // 班级名称，如"一年级1班"
  students: string[];         // 学生名单（姓名数组）
  tasks: Task[];              // 该班级的任务列表
}

// 任务
interface Task {
  id: number;
  content: string;            // 任务内容，如"背诵Unit 1课文"
  students: StudentStatus[];  // 学生完成状态列表
}

// 学生状态
interface StudentStatus {
  name: string;
  completed: boolean;
}
```

### 2.2 状态变量

```typescript
// 全局状态
let searchKeyword: string = '';           // 搜索关键词
let selectedStudents: Set<number> = new Set(); // 选中的学生索引
let currentLayout: 'single' | 'multi' | 'compact' = 'compact'; // 导出布局
```

---

## 三、功能模块详解

### 3.1 班级管理模块

| 功能 | 描述 | 交互细节 |
|------|------|----------|
| **添加班级** | 创建新班级 | 弹出模态框输入班级名称，自动生成 ID（最大 ID + 1），创建时包含一个默认任务 |
| **重命名班级** | 修改班级名称 | 弹出模态框，预填充当前名称，支持回车确认、ESC 取消 |
| **删除班级** | 删除当前班级 | 二次确认，删除后自动切换到第一个班级，至少保留一个班级 |
| **切换班级** | 下拉选择切换 | 切换时保存当前任务，清空搜索和选择状态，切换到新班级第一个任务 |

**组件需求**：
- `ClassSelector` - 顶部班级选择器（下拉框 + 操作按钮）
- `ClassModal` - 班级添加/重命名模态框

---

### 3.2 任务管理模块

| 功能 | 描述 | 交互细节 |
|------|------|----------|
| **任务标签展示** | Tab 形式显示任务 | 显示任务内容前 10 字符 + "..."，高亮当前任务 |
| **新建任务** | 创建新任务 | 点击"+ 新任务"，使用班级学生名单，所有学生默认未完成 |
| **切换任务** | 点击标签切换 | 保存当前任务后切换，清空搜索和选择状态 |
| **重命名任务** | 修改任务内容 | 显示输入框，支持回车确认、ESC/失焦取消 |
| **复制任务** | 创建任务副本 | 复制学生名单，重置所有完成状态，名称加"(副本)"后缀 |
| **删除任务** | 删除任务 | 悬停显示删除按钮，二次确认，至少保留一个任务 |
| **编辑任务内容** | 文本框编辑 | 输入停止 1 秒后自动保存（防抖） |

**组件需求**：
- `TaskTabs` - 任务标签栏
- `TaskEditor` - 任务内容编辑区
- `TaskManagement` - 任务管理操作区（重命名/复制/删除）

---

### 3.3 学生管理模块

| 功能 | 描述 | 交互细节 |
|------|------|----------|
| **学生卡片展示** | 网格布局展示 | 显示姓名 + 完成状态徽章，已完成显示绿色背景 |
| **单击切换状态** | 点击卡片切换完成 | 触发翻转 + 脉冲 + 闪光动画，延迟 250ms 更新状态 |
| **Ctrl/Cmd+点击多选** | 批量选择学生 | 选中卡片显示蓝色边框和阴影 |
| **导入学生名单** | 批量导入 | 文本框输入，每行一个姓名，替换当前班级所有任务的学生名单 |
| **重置状态** | 重置所有完成状态 | 二次确认，将当前任务所有学生标记为未完成 |

**组件需求**：
- `StudentList` - 学生卡片网格
- `StudentCard` - 单个学生卡片（带动画）
- `ImportStudentsModal` - 导入学生名单区域

---

### 3.4 统计分析模块

| 功能 | 描述 | 数据 |
|------|------|------|
| **总人数** | 学生总数 | `students.length` |
| **已完成** | 已完成人数 | `students.filter(s => s.completed).length` |
| **未完成** | 未完成人数 | `total - completed` |
| **完成率** | 百分比 | `(completed / total * 100).toFixed(1) + '%'` |
| **进度条** | 可视化进度 | 宽度 = 完成率，带闪光动画 |

**组件需求**：
- `StatsContainer` - 统计卡片容器
- `StatCard` - 单个统计卡片
- `ProgressBar` - 进度条

---

### 3.5 搜索筛选模块

| 功能 | 描述 | 交互细节 |
|------|------|----------|
| **实时搜索** | 按姓名筛选 | 输入时实时过滤，不匹配的卡片添加 `filtered-out` 类隐藏 |
| **空状态提示** | 无匹配结果 | 显示"未找到匹配的学生"提示 |

**组件需求**：
- `SearchInput` - 搜索输入框

---

### 3.6 批量操作模块

| 功能 | 描述 | 交互细节 |
|------|------|----------|
| **全选** | 选中所有可见学生 | 仅选中未被筛选隐藏的学生 |
| **取消全选** | 清空选择 | 清空 selectedStudents Set |
| **反选** | 反转选择状态 | 仅对可见学生操作 |
| **批量标记完成** | 批量设为已完成 | 需先选中学生，操作后清空选择 |
| **批量取消完成** | 批量设为未完成 | 需先选中学生，操作后清空选择 |

**组件需求**：
- `BatchToolbar` - 批量操作工具栏

---

### 3.7 数据导出模块

#### 3.7.1 导出图片

| 功能 | 描述 |
|------|------|
| **单列布局** | 标准表格，序号 + 姓名 + 状态 |
| **多列布局** | 三列并排表格，适合大量学生 |
| **紧凑布局** | 一行三组数据，最省空间（默认） |

**导出流程**：
1. 点击"导出图片"按钮
2. 显示预览模态框 + 加载指示器
3. 选择布局方案（单选框）
4. 使用 html2canvas 生成图片
5. 显示预览图片
6. 点击"下载图片"保存

**文件命名**：`{任务名前10字}_完成情况_{日期}.png`

#### 3.7.2 导出 Excel (CSV)

| 字段 | 说明 |
|------|------|
| 序号 | 1, 2, 3... |
| 姓名 | 学生姓名 |
| 完成状态 | "已完成" / "未完成" |
| 统计信息 | 末尾附加总人数、已完成、完成率 |

**文件格式**：UTF-8 BOM 编码的 CSV
**文件命名**：`{任务名前20字}_完成情况_{日期}.csv`

**组件需求**：
- `ExportPreviewModal` - 导出预览模态框
- `ExportOptions` - 布局选择
- `ExportTable` - 导出表格（单列/多列/紧凑）

---

### 3.8 数据持久化模块

| 功能 | 描述 |
|------|------|
| **自动保存** | 任务内容输入停止 1 秒后保存 |
| **手动保存** | 切换任务/班级时保存 |
| **页面关闭保存** | beforeunload 事件触发保存 |
| **数据迁移** | 自动将旧格式数据迁移到新格式 |
| **错误处理** | 存储空间不足提示，数据损坏自动清除 |

**localStorage Key**：`recitationAppState`

---

## 四、UI/UX 规范

### 4.1 布局结构

```
┌─────────────────────────────────────────────────────┐
│  班级选择器（固定顶部）                               │
│  [下拉框] [添加] [重命名] [删除]                      │
├──────────────────┬──────────────────────────────────┤
│   任务区 (30%)   │        学生区 (70%)               │
│                  │                                  │
│  ┌────────────┐  │  ┌──────────────────────────┐   │
│  │ 任务标签   │  │  │ 统计卡片 (4个)           │   │
│  └────────────┘  │  └──────────────────────────┘   │
│                  │                                  │
│  ┌────────────┐  │  ┌──────────────────────────┐   │
│  │ 任务内容   │  │  │ 进度条                   │   │
│  │ 文本框     │  │  └──────────────────────────┘   │
│  └────────────┘  │                                  │
│                  │  ┌──────────────────────────┐   │
│  ┌────────────┐  │  │ 搜索框                   │   │
│  │ 任务管理   │  │  └──────────────────────────┘   │
│  │ 操作按钮   │  │                                  │
│  └────────────┘  │  ┌──────────────────────────┐   │
│                  │  │ 批量操作工具栏           │   │
│  ┌────────────┐  │  └──────────────────────────┘   │
│  │ 导入名单   │  │                                  │
│  │ (可折叠)   │  │  ┌──────────────────────────┐   │
│  └────────────┘  │  │ 学生卡片网格             │   │
│                  │  │                          │   │
│  ┌────────────┐  │  │  [卡片] [卡片] [卡片]    │   │
│  │ 操作按钮组 │  │  │  [卡片] [卡片] [卡片]    │   │
│  │ 导出/重置  │  │  │  ...                     │   │
│  └────────────┘  │  └──────────────────────────┘   │
├──────────────────┴──────────────────────────────────┤
│  状态栏（固定底部）                                  │
│  [保存状态]                            [备案信息]   │
└─────────────────────────────────────────────────────┘
```

### 4.2 响应式断点

| 断点 | 布局变化 |
|------|----------|
| `> 768px` | 左右两栏布局 |
| `768px` (横屏) | 左 35% / 右 65% |
| `< 768px` (竖屏) | 上下单列布局 |
| `< 480px` | 移动端优化，任务标签横向滚动 |
| `< 360px` | 超小屏幕，统计卡片单列 |

### 4.3 色彩规范

| 用途 | 颜色值 |
|------|--------|
| 主色 | `#1a73e8` (蓝色) |
| 主色渐变 | `linear-gradient(135deg, #1a73e8, #4285f4)` |
| 成功/完成 | `#4caf50` (绿色) |
| 危险/删除 | `#dc3545` (红色) |
| 警告 | `#ff9800` (橙色) |
| 背景渐变 | `linear-gradient(135deg, #f5f7fa, #c3cfe2)` |
| 统计区渐变 | `linear-gradient(135deg, #667eea, #764ba2)` |

### 4.4 动画效果

| 动画名称 | 用途 | 实现 |
|----------|------|------|
| `completePulse` | 完成状态切换 | 0.6s 缩放脉冲 |
| `completedGlow` | 完成后闪光 | 0.5s 绿色阴影 |
| `cardFlip` | 卡片翻转 | 0.5s 3D 翻转 |
| `badgeBounce` | 状态徽章弹跳 | 0.5s 缩放 |
| `sparkle` | 完成星星效果 | 1.2s 位移 + 旋转 |
| `shimmer` | 进度条闪光 | 2s 循环移动 |
| `spin` | 加载指示器 | 1s 无限旋转 |

---

## 五、React 组件规划

### 5.1 组件树

```
App
├── ClassSelector
│   ├── ClassSelect (下拉框)
│   └── ClassActions (操作按钮组)
├── MainContainer
│   ├── TaskSection (左侧)
│   │   ├── TaskTabs
│   │   ├── TaskEditor (textarea)
│   │   ├── TaskManagement
│   │   ├── ImportSection (可折叠)
│   │   └── ActionButtons
│   └── StudentsSection (右侧)
│       ├── StatsContainer
│       │   └── StatCard (x4)
│       ├── ProgressBar
│       ├── SearchInput
│       ├── BatchToolbar
│       └── StudentList
│           └── StudentCard (多个)
├── StatusBar
├── ClassModal
└── ExportPreviewModal
    ├── ExportOptions
    ├── SingleLayoutTable
    ├── MultiLayoutTable
    ├── CompactLayoutTable
    └── ImagePreview
```

### 5.2 状态管理建议

```typescript
// Store (Zustand 示例)
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
  exportLayout: 'single' | 'multi' | 'compact';

  // Actions - 班级
  addClass: (name: string) => void;
  renameClass: (id: number, name: string) => void;
  deleteClass: (id: number) => void;
  switchClass: (id: number) => void;

  // Actions - 任务
  addTask: () => void;
  renameTask: (id: number, content: string) => void;
  copyTask: (id: number) => void;
  deleteTask: (id: number) => void;
  switchTask: (id: number) => void;
  updateTaskContent: (content: string) => void;

  // Actions - 学生
  toggleStudent: (index: number) => void;
  importStudents: (names: string[]) => void;
  resetTaskStatus: () => void;

  // Actions - 批量操作
  selectAll: () => void;
  selectNone: () => void;
  selectInverse: () => void;
  batchMark: (completed: boolean) => void;

  // Actions - 搜索
  setSearchKeyword: (keyword: string) => void;

  // Actions - 持久化
  saveData: () => void;
  loadData: () => void;
}
```

### 5.3 Hooks 建议

```typescript
// 自定义 Hooks
useAutoSave(data, delay: number)     // 防抖自动保存
useLocalStorage(key, defaultValue)   // localStorage 封装
useImageExport(elementRef)           // html2canvas 封装
useKeyboardShortcut(key, callback)   // 快捷键支持
```

---

## 六、待优化项（重构时可考虑）

1. **数据校验**：添加 Zod/Yup 数据验证
2. **撤销/重做**：实现操作历史记录
3. **云端同步**：支持用户登录和云端存储
4. **批量导入**：支持 Excel 文件导入
5. **打印支持**：优化打印样式
6. **深色模式**：支持主题切换
7. **国际化**：支持多语言
8. **PWA**：离线使用支持
9. **快捷键**：键盘操作支持
10. **拖拽排序**：支持学生/任务拖拽排序

---

## 七、测试要点

### 7.1 功能测试
- [ ] 班级 CRUD 操作
- [ ] 任务 CRUD 操作
- [ ] 学生状态切换
- [ ] 批量操作
- [ ] 搜索筛选
- [ ] 数据导出（图片/Excel）
- [ ] 数据持久化
- [ ] 数据迁移

### 7.2 边界测试
- [ ] 至少保留一个班级
- [ ] 至少保留一个任务
- [ ] 空学生名单处理
- [ ] 空搜索结果处理
- [ ] localStorage 满时处理

### 7.3 响应式测试
- [ ] 桌面端
- [ ] 平板横屏
- [ ] 平板竖屏
- [ ] 手机横屏
- [ ] 手机竖屏
