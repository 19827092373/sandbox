# 明暗双模式主题系统设计

## 概述
为学生诊断系统添加明暗双模式切换功能，默认明亮模式适合教室投影展示。

## 需求
- 支持明亮/深色两种主题模式
- 默认使用明亮模式（适合投影）
- 切换按钮位于顶部导航栏
- 用户偏好持久化到 localStorage
- 所有组件支持两种模式

## 架构设计

### 状态管理
```jsx
// App.jsx
const [theme, setTheme] = useLocalStorage('theme', 'light');

const toggleTheme = () => {
  setTheme(prev => prev === 'light' ? 'dark' : 'light');
};
```

### 主题定义

#### Light Mode (明亮模式 - 默认)
```css
--background: 210 40% 98%;      /* #F8FAFC slate-50 */
--foreground: 222 47% 11%;      /* #1E293B slate-800 */
--card: 0 0% 100%;              /* #FFFFFF white */
--card-foreground: 222 47% 11%; /* #1E293B slate-800 */
--border: 214 32% 91%;          /* #E2E8F0 slate-200 */
--primary: 239 84% 67%;         /* #4F46E5 indigo-600 */
--primary-foreground: 0 0% 100%; /* #FFFFFF white */
--secondary: 210 40% 96%;       /* #F1F5F9 slate-100 */
--muted: 210 40% 96%;           /* #F1F5F9 slate-100 */
--muted-foreground: 215 16% 47%; /* #64748B slate-500 */
```

#### Dark Mode (深色模式 - 现有)
```css
--background: 222 47% 11%;      /* #0F172A slate-950 */
--foreground: 210 40% 98%;      /* #F1F5F9 slate-100 */
--card: 222 47% 13%;            /* #1E293B slate-900 */
--card-foreground: 210 40% 98%; /* #F1F5F9 slate-100 */
--border: 217 33% 17%;          /* #1E293B slate-800 */
--primary: 239 84% 67%;         /* #818CF8 indigo-400 */
--primary-foreground: 0 0% 100%; /* #FFFFFF white */
--secondary: 217 33% 17%;       /* #1E293B slate-900 */
--muted: 217 33% 17%;           /* #1E293B slate-900 */
--muted-foreground: 215 20% 65%; /* #94A3B8 slate-400 */
```

## 组件变更

### App.jsx
- 添加 theme state 和 toggleTheme 函数
- 创建 ThemeContext 并向下传递
- 在步骤指示器旁添加主题切换按钮
- 使用 Sun/Moon 图标表示当前模式

### index.css
- 使用 CSS 变量定义主题
- 添加 `.light` 和 `.dark` 类选择器
- 更新 glass-panel, glass-card 等组件类以支持两种模式
- 添加主题切换过渡动画

### 所有 Phase 组件
- 使用 CSS 变量替代硬编码颜色
- 确保文字在两种模式下都可读
- 调整阴影效果以适应不同背景

## 字体大小优化

### InputPhase (已调整)
```jsx
// 题目 ≤9: text-4xl md:text-5xl
// 题目 ≤12: text-3xl md:text-4xl
// 题目 ≤16: text-2xl md:text-3xl
// 题目 ≤20: text-xl md:text-2xl
// 题目 ≤25: text-xl md:text-2xl
// 更多: text-lg md:text-xl
```

### ReportPhase (待调整)
- 题目卡片数字: text-2xl → text-3xl
- 题目卡片统计: text-[10px] → text-xs
- 详情标题: text-3xl → text-4xl
- 详情百分比: text-4xl → text-5xl
- 学生名字卡片: text-sm → text-base

## 实现文件清单
1. `src/index.css` - 主题 CSS 变量
2. `src/App.jsx` - 主题状态和切换按钮
3. `src/components/SetupPhase.jsx` - 适配主题
4. `src/components/PickingPhase.jsx` - 适配主题
5. `src/components/InputPhase.jsx` - 适配主题 + 大字体
6. `src/components/ReportPhase.jsx` - 适配主题 + 大字体
7. `src/components/ui/Button.jsx` - 按钮主题适配
