# 背诵管理系统 - 完整设计系统规范

> 配色方案：**分析蓝 (Analytics Blue)**
> 技术栈：React 18 + TypeScript + Tailwind CSS

---

## 一、颜色系统 (Color System)

### 1.1 主色板 (Primary Palette)

| 变量名 | 色值 | 用途 | Tailwind |
|--------|------|------|----------|
| `--primary-50` | `#EFF6FF` | 超浅背景、hover 状态背景 | `blue-50` |
| `--primary-100` | `#DBEAFE` | 浅色背景、选中背景 | `blue-100` |
| `--primary-200` | `#BFDBFE` | 边框、分割线 | `blue-200` |
| `--primary-300` | `#93C5FD` | 图标、次要文字 | `blue-300` |
| `--primary-400` | `#60A5FA` | 链接 hover | `blue-400` |
| `--primary-500` | `#3B82F6` | 辅助色、链接 | `blue-500` |
| `--primary-600` | `#2563EB` | 次主色、按钮 hover | `blue-600` |
| `--primary-700` | `#1D4ED8` | 主色、主按钮 | `blue-700` |
| `--primary-800` | `#1E40AF` | **品牌主色** | `blue-800` |
| `--primary-900` | `#1E3A8A` | 主文字色、深色元素 | `blue-900` |

### 1.2 强调色 (Accent Color - Amber)

| 变量名 | 色值 | 用途 | Tailwind |
|--------|------|------|----------|
| `--accent-50` | `#FFFBEB` | CTA 背景浅色 | `amber-50` |
| `--accent-100` | `#FEF3C7` | 警告背景 | `amber-100` |
| `--accent-200` | `#FDE68A` | 高亮背景 | `amber-200` |
| `--accent-300` | `#FCD34D` | 徽章背景 | `amber-300` |
| `--accent-400` | `#FBBF24` | 图标、星级 | `amber-400` |
| `--accent-500` | `#F59E0B` | **CTA 主色** | `amber-500` |
| `--accent-600` | `#D97706` | CTA hover | `amber-600` |
| `--accent-700` | `#B45309` | CTA active | `amber-700` |

### 1.3 语义色 (Semantic Colors)

#### 成功色 (Success - 已完成)
| 变量名 | 色值 | 用途 | Tailwind |
|--------|------|------|----------|
| `--success-50` | `#F0FDF4` | 成功消息背景 | `green-50` |
| `--success-100` | `#DCFCE7` | 已完成卡片背景 | `green-100` |
| `--success-200` | `#BBF7D0` | 进度条填充浅 | `green-200` |
| `--success-400` | `#4ADE80` | 进度条填充 | `green-400` |
| `--success-500` | `#22C55E` | **完成状态主色** | `green-500` |
| `--success-600` | `#16A34A` | 完成图标、徽章 | `green-600` |
| `--success-700` | `#15803D` | 完成文字 | `green-700` |

#### 错误色 (Error - 删除/危险)
| 变量名 | 色值 | 用途 | Tailwind |
|--------|------|------|----------|
| `--error-50` | `#FEF2F2` | 错误消息背景 | `red-50` |
| `--error-100` | `#FEE2E2` | 删除确认背景 | `red-100` |
| `--error-400` | `#F87171` | 错误图标 | `red-400` |
| `--error-500` | `#EF4444` | **删除按钮主色** | `red-500` |
| `--error-600` | `#DC2626` | 删除 hover | `red-600` |
| `--error-700` | `#B91C1C` | 错误文字 | `red-700` |

#### 警告色 (Warning)
| 变量名 | 色值 | 用途 | Tailwind |
|--------|------|------|----------|
| `--warning-50` | `#FFFBEB` | 警告背景 | `amber-50` |
| `--warning-100` | `#FEF3C7` | 提示背景 | `amber-100` |
| `--warning-500` | `#F59E0B` | **警告主色** | `amber-500` |
| `--warning-600` | `#D97706` | 警告图标 | `amber-600` |

#### 信息色 (Info)
| 变量名 | 色值 | 用途 | Tailwind |
|--------|------|------|----------|
| `--info-50` | `#EFF6FF` | 信息背景 | `blue-50` |
| `--info-100` | `#DBEAFE` | 提示背景 | `blue-100` |
| `--info-500` | `#3B82F6` | **信息主色** | `blue-500` |

### 1.4 中性色 (Neutral Colors)

| 变量名 | 色值 | 用途 | Tailwind |
|--------|------|------|----------|
| `--neutral-50` | `#F8FAFC` | **页面背景** | `slate-50` |
| `--neutral-100` | `#F1F5F9` | 卡片背景、输入框背景 | `slate-100` |
| `--neutral-200` | `#E2E8F0` | 边框、分割线 | `slate-200` |
| `--neutral-300` | `#CBD5E1` | 禁用边框、placeholder | `slate-300` |
| `--neutral-400` | `#94A3B8` | 次要文字、图标 | `slate-400` |
| `--neutral-500` | `#64748B` | 辅助文字 | `slate-500` |
| `--neutral-600` | `#475569` | 正文文字 | `slate-600` |
| `--neutral-700` | `#334155` | 标题文字 | `slate-700` |
| `--neutral-800` | `#1E293B` | 重要文字 | `slate-800` |
| `--neutral-900` | `#0F172A` | 最深文字 | `slate-900` |

### 1.5 透明度规范 (Opacity)

| 用途 | 透明度 | CSS | 示例 |
|------|--------|-----|------|
| 遮罩层 | 50% | `opacity: 0.5` / `bg-black/50` | Modal 背景遮罩 |
| 禁用状态 | 40% | `opacity: 0.4` | 禁用按钮 |
| 次要元素 | 60% | `opacity: 0.6` | 次要图标 |
| Hover 背景 | 5% | `bg-primary/5` | 列表项 hover |
| 选中背景 | 10% | `bg-primary/10` | 选中状态背景 |
| 卡片玻璃效果 | 80% | `bg-white/80` | 毛玻璃卡片 |
| 按钮按下 | 90% | `opacity: 0.9` | Active 状态 |

### 1.6 渐变配色 (Gradients)

```css
/* 页面背景渐变 */
--gradient-bg: linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%);

/* 主按钮渐变 */
--gradient-primary: linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%);

/* 统计区域渐变 */
--gradient-stats: linear-gradient(135deg, #1E40AF 0%, #1D4ED8 50%, #2563EB 100%);

/* 进度条渐变 */
--gradient-progress: linear-gradient(90deg, #22C55E 0%, #4ADE80 100%);

/* CTA 按钮渐变 */
--gradient-cta: linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%);

/* 卡片完成状态渐变 */
--gradient-completed: linear-gradient(135deg, #DCFCE7 0%, #BBF7D0 100%);

/* Header 渐变 */
--gradient-header: linear-gradient(180deg, #1E40AF 0%, #1E3A8A 100%);
```

**Tailwind 配置：**
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      backgroundImage: {
        'gradient-bg': 'linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)',
        'gradient-primary': 'linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%)',
        'gradient-stats': 'linear-gradient(135deg, #1E40AF 0%, #1D4ED8 50%, #2563EB 100%)',
        'gradient-progress': 'linear-gradient(90deg, #22C55E 0%, #4ADE80 100%)',
        'gradient-cta': 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)',
        'gradient-completed': 'linear-gradient(135deg, #DCFCE7 0%, #BBF7D0 100%)',
      },
    },
  },
}
```

---

## 二、阴影系统 (Shadow System)

### 2.1 阴影层级

| 层级 | CSS 变量 | 值 | 用途 |
|------|----------|-----|------|
| **xs** | `--shadow-xs` | `0 1px 2px 0 rgb(0 0 0 / 0.05)` | 输入框、小按钮 |
| **sm** | `--shadow-sm` | `0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)` | 卡片默认 |
| **md** | `--shadow-md` | `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)` | 卡片 hover、下拉框 |
| **lg** | `--shadow-lg` | `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)` | 弹窗、悬浮元素 |
| **xl** | `--shadow-xl` | `0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)` | Modal、重要弹窗 |
| **2xl** | `--shadow-2xl` | `0 25px 50px -12px rgb(0 0 0 / 0.25)` | 大型 Modal |

### 2.2 彩色阴影 (Colored Shadows)

```css
/* 主色阴影 - 用于主按钮 hover */
--shadow-primary: 0 4px 14px 0 rgb(30 64 175 / 0.35);
--shadow-primary-lg: 0 10px 25px -5px rgb(30 64 175 / 0.4);

/* 成功色阴影 - 用于完成状态 */
--shadow-success: 0 4px 14px 0 rgb(34 197 94 / 0.35);
--shadow-success-glow: 0 0 20px rgb(34 197 94 / 0.4);

/* CTA 阴影 */
--shadow-cta: 0 4px 14px 0 rgb(245 158 11 / 0.35);

/* 错误阴影 - 用于删除按钮 */
--shadow-error: 0 4px 14px 0 rgb(239 68 68 / 0.35);

/* 选中状态阴影 */
--shadow-selected: 0 0 0 3px rgb(59 130 246 / 0.3), 0 4px 6px -1px rgb(0 0 0 / 0.1);
```

### 2.3 内阴影 (Inset Shadows)

```css
/* 输入框聚焦内阴影 */
--shadow-inset-focus: inset 0 0 0 2px #3B82F6;

/* 按压状态内阴影 */
--shadow-inset-pressed: inset 0 2px 4px 0 rgb(0 0 0 / 0.1);

/* 输入框默认内阴影 */
--shadow-inset-input: inset 0 1px 2px 0 rgb(0 0 0 / 0.05);
```

### 2.4 组件阴影应用

| 组件 | 默认状态 | Hover 状态 | Active/Focus 状态 |
|------|----------|------------|-------------------|
| **统计卡片** | `shadow-sm` | `shadow-md` | - |
| **学生卡片** | `shadow-sm` | `shadow-md` + `translateY(-2px)` | `shadow-selected` |
| **任务标签** | `shadow-xs` | `shadow-sm` | `shadow-primary` |
| **主按钮** | `shadow-md` | `shadow-primary` | `shadow-inset-pressed` |
| **次按钮** | `shadow-xs` | `shadow-sm` | - |
| **输入框** | `shadow-inset-input` | - | `shadow-inset-focus` |
| **下拉框** | `shadow-sm` | - | `shadow-md` |
| **Modal** | `shadow-2xl` | - | - |
| **Toast** | `shadow-lg` | - | - |

---

## 三、圆角系统 (Border Radius)

### 3.1 圆角层级

| 层级 | 值 | CSS 变量 | Tailwind | 用途 |
|------|-----|----------|----------|------|
| **none** | `0px` | `--radius-none` | `rounded-none` | 特殊场景 |
| **sm** | `4px` | `--radius-sm` | `rounded-sm` | 小按钮、徽章 |
| **base** | `6px` | `--radius-base` | `rounded-md` | 按钮、输入框 |
| **md** | `8px` | `--radius-md` | `rounded-lg` | 小卡片、下拉框 |
| **lg** | `12px` | `--radius-lg` | `rounded-xl` | 卡片 |
| **xl** | `16px` | `--radius-xl` | `rounded-2xl` | 大卡片、统计卡片 |
| **2xl** | `24px` | `--radius-2xl` | `rounded-3xl` | Modal、容器 |
| **full** | `9999px` | `--radius-full` | `rounded-full` | 头像、徽章、药丸按钮 |

### 3.2 组件圆角应用

| 组件 | 圆角 | Tailwind |
|------|------|----------|
| **统计卡片** | `16px` | `rounded-2xl` |
| **学生卡片** | `12px` | `rounded-xl` |
| **任务标签** | `8px` | `rounded-lg` |
| **主按钮** | `8px` | `rounded-lg` |
| **输入框** | `8px` | `rounded-lg` |
| **徽章** | `9999px` | `rounded-full` |
| **进度条** | `9999px` | `rounded-full` |
| **Modal** | `24px` | `rounded-3xl` |
| **下拉菜单** | `12px` | `rounded-xl` |
| **头像** | `9999px` | `rounded-full` |

---

## 四、动画与过渡系统 (Animation & Transitions)

### 4.1 过渡时间 (Duration)

| 速度 | 时间 | CSS 变量 | Tailwind | 用途 |
|------|------|----------|----------|------|
| **instant** | `0ms` | - | `duration-0` | 无过渡 |
| **fast** | `100ms` | `--duration-fast` | `duration-100` | 颜色变化、透明度 |
| **normal** | `150ms` | `--duration-normal` | `duration-150` | 按钮 hover |
| **moderate** | `200ms` | `--duration-moderate` | `duration-200` | 卡片 hover、展开 |
| **slow** | `300ms` | `--duration-slow` | `duration-300` | Modal 进出、复杂动画 |
| **slower** | `500ms` | `--duration-slower` | `duration-500` | 卡片翻转、大型动画 |

### 4.2 缓动函数 (Easing)

```css
/* 标准缓动 */
--ease-default: cubic-bezier(0.4, 0, 0.2, 1);     /* Tailwind ease-in-out */
--ease-in: cubic-bezier(0.4, 0, 1, 1);            /* 进入 */
--ease-out: cubic-bezier(0, 0, 0.2, 1);           /* 退出 */
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);      /* 双向 */

/* 弹性缓动 */
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);  /* 弹跳效果 */
--ease-elastic: cubic-bezier(0.175, 0.885, 0.32, 1.275); /* 弹性效果 */

/* 强调缓动 */
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);  /* 弹簧效果 */
```

### 4.3 预设过渡组合

```css
/* 通用过渡 */
--transition-all: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-colors: color, background-color, border-color 150ms ease;
--transition-opacity: opacity 150ms ease;
--transition-shadow: box-shadow 200ms ease;
--transition-transform: transform 200ms cubic-bezier(0.4, 0, 0.2, 1);

/* 组件专用 */
--transition-card: transform 200ms ease, box-shadow 200ms ease;
--transition-button: all 150ms ease;
--transition-modal: opacity 300ms ease, transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
```

### 4.4 关键帧动画 (Keyframe Animations)

#### 完成脉冲 (Complete Pulse)
```css
@keyframes completePulse {
  0% { transform: scale(1); }
  25% { transform: scale(0.95); }
  50% { transform: scale(1.05); }
  75% { transform: scale(0.98); }
  100% { transform: scale(1); }
}
/* 用途: 学生卡片点击切换状态 */
/* 时长: 600ms */
/* 缓动: ease-out */
```

#### 完成发光 (Completed Glow)
```css
@keyframes completedGlow {
  0% { box-shadow: 0 0 0 0 rgb(34 197 94 / 0.6); }
  50% { box-shadow: 0 0 20px 10px rgb(34 197 94 / 0.3); }
  100% { box-shadow: 0 0 0 0 rgb(34 197 94 / 0); }
}
/* 用途: 完成状态确认反馈 */
/* 时长: 500ms */
/* 缓动: ease-out */
```

#### 卡片翻转 (Card Flip)
```css
@keyframes cardFlip {
  0% { transform: perspective(400px) rotateY(0deg); }
  50% { transform: perspective(400px) rotateY(90deg); }
  100% { transform: perspective(400px) rotateY(0deg); }
}
/* 用途: 学生卡片状态切换 */
/* 时长: 500ms */
/* 缓动: ease-in-out */
```

#### 徽章弹跳 (Badge Bounce)
```css
@keyframes badgeBounce {
  0%, 100% { transform: scale(1); }
  30% { transform: scale(1.3); }
  50% { transform: scale(0.9); }
  70% { transform: scale(1.1); }
}
/* 用途: 状态徽章更新 */
/* 时长: 500ms */
/* 缓动: ease-out */
```

#### 星星闪烁 (Sparkle)
```css
@keyframes sparkle {
  0% {
    opacity: 0;
    transform: translateY(0) rotate(0deg) scale(0);
  }
  50% {
    opacity: 1;
    transform: translateY(-20px) rotate(180deg) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(-40px) rotate(360deg) scale(0);
  }
}
/* 用途: 完成时的星星特效 */
/* 时长: 1200ms */
/* 缓动: ease-out */
```

#### 进度条闪光 (Shimmer)
```css
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
/* 用途: 进度条动态效果 */
/* 时长: 2000ms */
/* 循环: infinite */
```

#### 淡入上滑 (Fade In Up)
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
/* 用途: 元素入场动画 */
/* 时长: 300ms */
/* 缓动: ease-out */
```

#### 加载旋转 (Spin)
```css
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
/* 用途: 加载指示器 */
/* 时长: 1000ms */
/* 循环: infinite */
/* 缓动: linear */
```

#### 抖动 (Shake)
```css
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-4px); }
  40% { transform: translateX(4px); }
  60% { transform: translateX(-4px); }
  80% { transform: translateX(4px); }
}
/* 用途: 错误提示 */
/* 时长: 400ms */
/* 缓动: ease-in-out */
```

### 4.5 交互状态动画

| 交互 | 动画效果 | 时长 | 缓动 |
|------|----------|------|------|
| **按钮 Hover** | `translateY(-1px)` + 阴影增强 | 150ms | ease |
| **按钮 Active** | `translateY(0)` + 阴影减弱 | 100ms | ease |
| **卡片 Hover** | `translateY(-4px)` + 阴影增强 | 200ms | ease-out |
| **链接 Hover** | 颜色变化 + 下划线 | 150ms | ease |
| **输入框 Focus** | 边框颜色 + 阴影 | 200ms | ease |
| **复选框 Check** | scale 弹跳 | 200ms | spring |
| **Modal 进入** | `scale(0.95)` → `scale(1)` + fade | 300ms | spring |
| **Modal 退出** | `scale(1)` → `scale(0.95)` + fade | 200ms | ease-in |
| **Toast 进入** | `translateY(100%)` → `translateY(0)` | 300ms | ease-out |
| **Dropdown 展开** | `scaleY(0)` → `scaleY(1)` | 200ms | ease-out |

---

## 五、间距系统 (Spacing System)

### 5.1 间距刻度 (Spacing Scale)

| Token | 值 | Tailwind | 用途 |
|-------|-----|----------|------|
| `--space-0` | `0px` | `0` | 无间距 |
| `--space-0.5` | `2px` | `0.5` | 极小间距 |
| `--space-1` | `4px` | `1` | 紧凑间距 |
| `--space-1.5` | `6px` | `1.5` | 图标与文字间距 |
| `--space-2` | `8px` | `2` | 小间距、按钮内边距 |
| `--space-2.5` | `10px` | `2.5` | - |
| `--space-3` | `12px` | `3` | 中小间距 |
| `--space-4` | `16px` | `4` | **基准间距**、卡片内边距 |
| `--space-5` | `20px` | `5` | 中间距 |
| `--space-6` | `24px` | `6` | 大间距、区块间距 |
| `--space-8` | `32px` | `8` | 较大间距 |
| `--space-10` | `40px` | `10` | 大区块间距 |
| `--space-12` | `48px` | `12` | 主要区域间距 |
| `--space-16` | `64px` | `16` | 页面级间距 |
| `--space-20` | `80px` | `20` | 大型页面间距 |
| `--space-24` | `96px` | `24` | 超大间距 |

### 5.2 组件间距应用

| 组件/区域 | 内边距 (padding) | 外边距/间隔 (gap/margin) |
|-----------|------------------|--------------------------|
| **页面容器** | `24px` (p-6) | - |
| **统计卡片** | `20px` (p-5) | `16px` (gap-4) |
| **学生卡片** | `16px` (p-4) | `12px` (gap-3) |
| **任务标签** | `8px 16px` (px-4 py-2) | `8px` (gap-2) |
| **按钮** | `8px 16px` (px-4 py-2) | `8px` (gap-2) |
| **按钮 (小)** | `6px 12px` (px-3 py-1.5) | `8px` (gap-2) |
| **输入框** | `10px 14px` (px-3.5 py-2.5) | `16px` (mb-4) |
| **Modal** | `24px` (p-6) | - |
| **工具栏** | `12px` (p-3) | `8px` (gap-2) |
| **表单项间距** | - | `16px` (space-y-4) |
| **区域间距** | - | `24px` (gap-6) |

### 5.3 网格间距 (Grid Gap)

```css
/* 学生卡片网格 */
--grid-gap-cards: 12px;        /* gap-3 */

/* 统计卡片网格 */
--grid-gap-stats: 16px;        /* gap-4 */

/* 任务标签 */
--grid-gap-tabs: 8px;          /* gap-2 */

/* 按钮组 */
--grid-gap-buttons: 8px;       /* gap-2 */
```

---

## 六、字体排版系统 (Typography System)

### 6.1 字体家族 (Font Family)

```css
/* 中文主字体 */
--font-sans-cn: 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif;

/* 英文/数字字体 */
--font-sans-en: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* 等宽字体 (代码/数字) */
--font-mono: 'Fira Code', 'JetBrains Mono', Consolas, monospace;

/* 组合字体栈 */
--font-sans: 'Inter', 'Noto Sans SC', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

**Google Fonts 导入：**
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Noto+Sans+SC:wght@300;400;500;600;700&display=swap');
```

### 6.2 字体大小 (Font Size)

| 层级 | 大小 | 行高 | Tailwind | 用途 |
|------|------|------|----------|------|
| **xs** | `12px` | `16px` (1.33) | `text-xs` | 辅助文字、徽章 |
| **sm** | `14px` | `20px` (1.43) | `text-sm` | 次要文字、按钮小 |
| **base** | `16px` | `24px` (1.5) | `text-base` | **正文、按钮** |
| **lg** | `18px` | `28px` (1.56) | `text-lg` | 卡片标题 |
| **xl** | `20px` | `28px` (1.4) | `text-xl` | 小标题 |
| **2xl** | `24px` | `32px` (1.33) | `text-2xl` | 区域标题 |
| **3xl** | `30px` | `36px` (1.2) | `text-3xl` | 页面标题 |
| **4xl** | `36px` | `40px` (1.11) | `text-4xl` | 大标题 |
| **5xl** | `48px` | `48px` (1) | `text-5xl` | 统计数字 |

### 6.3 字重 (Font Weight)

| 字重 | 值 | Tailwind | 用途 |
|------|-----|----------|------|
| **Light** | `300` | `font-light` | 大数字、装饰文字 |
| **Regular** | `400` | `font-normal` | 正文 |
| **Medium** | `500` | `font-medium` | 强调文字、按钮 |
| **Semibold** | `600` | `font-semibold` | 小标题、重要信息 |
| **Bold** | `700` | `font-bold` | 大标题、数字 |

### 6.4 行高 (Line Height)

| 类型 | 值 | Tailwind | 用途 |
|------|-----|----------|------|
| **None** | `1` | `leading-none` | 单行大标题 |
| **Tight** | `1.25` | `leading-tight` | 紧凑标题 |
| **Snug** | `1.375` | `leading-snug` | 标题 |
| **Normal** | `1.5` | `leading-normal` | **正文默认** |
| **Relaxed** | `1.625` | `leading-relaxed` | 长文阅读 |
| **Loose** | `2` | `leading-loose` | 宽松文本 |

### 6.5 文本颜色应用

| 用途 | 颜色 | Tailwind |
|------|------|----------|
| **主标题** | `#0F172A` (slate-900) | `text-slate-900` |
| **正文** | `#334155` (slate-700) | `text-slate-700` |
| **次要文字** | `#64748B` (slate-500) | `text-slate-500` |
| **辅助文字** | `#94A3B8` (slate-400) | `text-slate-400` |
| **链接** | `#2563EB` (blue-600) | `text-blue-600` |
| **链接 Hover** | `#1D4ED8` (blue-700) | `hover:text-blue-700` |
| **错误文字** | `#DC2626` (red-600) | `text-red-600` |
| **成功文字** | `#16A34A` (green-600) | `text-green-600` |

---

## 七、组件样式规范 (Component Styles)

### 7.1 统计卡片 (Stat Card)

```tsx
// 基础样式
className="
  bg-white
  rounded-2xl
  p-5
  shadow-sm
  hover:shadow-md
  transition-shadow
  duration-200
"

// 统计数字
className="text-4xl font-bold text-slate-900"

// 标签文字
className="text-sm text-slate-500 mt-1"

// 图标容器
className="
  w-12 h-12
  rounded-xl
  bg-blue-100
  flex items-center justify-center
  text-blue-600
"
```

**变体颜色：**
| 类型 | 图标背景 | 图标颜色 |
|------|----------|----------|
| 总人数 | `bg-blue-100` | `text-blue-600` |
| 已完成 | `bg-green-100` | `text-green-600` |
| 未完成 | `bg-amber-100` | `text-amber-600` |
| 完成率 | `bg-purple-100` | `text-purple-600` |

### 7.2 学生卡片 (Student Card)

```tsx
// 未完成状态
className="
  bg-white
  rounded-xl
  p-4
  shadow-sm
  border border-slate-200
  cursor-pointer
  transition-all
  duration-200
  hover:shadow-md
  hover:-translate-y-1
"

// 已完成状态
className="
  bg-gradient-to-br from-green-50 to-green-100
  rounded-xl
  p-4
  shadow-sm
  border border-green-200
  cursor-pointer
  transition-all
  duration-200
  hover:shadow-md
  hover:-translate-y-1
"

// 选中状态 (叠加)
className="ring-2 ring-blue-500 ring-offset-2"

// 姓名文字
className="text-base font-medium text-slate-800"

// 状态徽章 - 已完成
className="
  px-2 py-0.5
  rounded-full
  text-xs font-medium
  bg-green-500 text-white
"

// 状态徽章 - 未完成
className="
  px-2 py-0.5
  rounded-full
  text-xs font-medium
  bg-slate-200 text-slate-600
"
```

### 7.3 按钮 (Buttons)

#### 主按钮 (Primary)
```tsx
className="
  bg-blue-700
  hover:bg-blue-800
  active:bg-blue-900
  text-white
  font-medium
  px-4 py-2
  rounded-lg
  shadow-md
  hover:shadow-lg
  transition-all
  duration-150
  disabled:opacity-40
  disabled:cursor-not-allowed
"
```

#### 次按钮 (Secondary)
```tsx
className="
  bg-white
  hover:bg-slate-50
  active:bg-slate-100
  text-slate-700
  font-medium
  px-4 py-2
  rounded-lg
  border border-slate-300
  shadow-xs
  hover:shadow-sm
  transition-all
  duration-150
"
```

#### CTA 按钮 (Call-to-Action)
```tsx
className="
  bg-gradient-to-r from-amber-500 to-amber-400
  hover:from-amber-600 hover:to-amber-500
  text-white
  font-semibold
  px-6 py-3
  rounded-lg
  shadow-md
  hover:shadow-lg
  transition-all
  duration-150
"
```

#### 危险按钮 (Danger)
```tsx
className="
  bg-red-500
  hover:bg-red-600
  active:bg-red-700
  text-white
  font-medium
  px-4 py-2
  rounded-lg
  shadow-md
  hover:shadow-lg
  transition-all
  duration-150
"
```

#### 幽灵按钮 (Ghost)
```tsx
className="
  bg-transparent
  hover:bg-slate-100
  active:bg-slate-200
  text-slate-600
  hover:text-slate-800
  font-medium
  px-4 py-2
  rounded-lg
  transition-all
  duration-150
"
```

#### 图标按钮 (Icon)
```tsx
className="
  w-10 h-10
  flex items-center justify-center
  bg-transparent
  hover:bg-slate-100
  active:bg-slate-200
  text-slate-500
  hover:text-slate-700
  rounded-lg
  transition-colors
  duration-150
"
```

### 7.4 输入框 (Input)

```tsx
// 基础输入框
className="
  w-full
  px-4 py-2.5
  bg-white
  border border-slate-300
  rounded-lg
  text-slate-800
  placeholder:text-slate-400
  shadow-sm
  transition-all
  duration-200
  focus:outline-none
  focus:border-blue-500
  focus:ring-2
  focus:ring-blue-500/20
"

// 搜索框 (带图标)
className="
  w-full
  pl-10 pr-4 py-2.5
  bg-slate-50
  border border-slate-200
  rounded-lg
  text-slate-800
  placeholder:text-slate-400
  transition-all
  duration-200
  focus:outline-none
  focus:bg-white
  focus:border-blue-500
  focus:ring-2
  focus:ring-blue-500/20
"

// 文本域 (Textarea)
className="
  w-full
  px-4 py-3
  bg-white
  border border-slate-300
  rounded-lg
  text-slate-800
  placeholder:text-slate-400
  resize-none
  min-h-[120px]
  shadow-sm
  transition-all
  duration-200
  focus:outline-none
  focus:border-blue-500
  focus:ring-2
  focus:ring-blue-500/20
"
```

### 7.5 下拉选择框 (Select)

```tsx
className="
  w-full
  px-4 py-2.5
  pr-10
  bg-white
  border border-slate-300
  rounded-lg
  text-slate-800
  shadow-sm
  cursor-pointer
  appearance-none
  transition-all
  duration-200
  focus:outline-none
  focus:border-blue-500
  focus:ring-2
  focus:ring-blue-500/20
"
// 需要添加自定义下拉箭头图标
```

### 7.6 任务标签 (Task Tab)

```tsx
// 默认状态
className="
  px-4 py-2
  bg-white
  border border-slate-200
  rounded-lg
  text-slate-600
  text-sm font-medium
  cursor-pointer
  transition-all
  duration-200
  hover:bg-slate-50
  hover:border-slate-300
"

// 激活状态
className="
  px-4 py-2
  bg-blue-700
  border border-blue-700
  rounded-lg
  text-white
  text-sm font-medium
  cursor-pointer
  shadow-md
"
```

### 7.7 进度条 (Progress Bar)

```tsx
// 容器
className="
  w-full h-3
  bg-slate-200
  rounded-full
  overflow-hidden
"

// 填充条
className="
  h-full
  bg-gradient-to-r from-green-500 to-green-400
  rounded-full
  transition-all
  duration-500
  ease-out
"
// 添加 shimmer 动画的伪元素
```

### 7.8 Modal 弹窗

```tsx
// 遮罩层
className="
  fixed inset-0
  bg-black/50
  backdrop-blur-sm
  z-50
  flex items-center justify-center
  p-4
"

// 弹窗容器
className="
  bg-white
  rounded-3xl
  shadow-2xl
  w-full max-w-md
  overflow-hidden
  transform
  transition-all
  duration-300
"

// 弹窗头部
className="
  px-6 py-4
  border-b border-slate-200
  flex items-center justify-between
"

// 弹窗内容
className="px-6 py-5"

// 弹窗底部
className="
  px-6 py-4
  border-t border-slate-100
  bg-slate-50
  flex justify-end gap-3
"
```

### 7.9 徽章 (Badge)

```tsx
// 默认徽章
className="
  inline-flex items-center
  px-2.5 py-0.5
  rounded-full
  text-xs font-medium
  bg-slate-100
  text-slate-700
"

// 成功徽章
className="bg-green-100 text-green-700"

// 警告徽章
className="bg-amber-100 text-amber-700"

// 错误徽章
className="bg-red-100 text-red-700"

// 信息徽章
className="bg-blue-100 text-blue-700"

// 带数字的计数徽章
className="
  min-w-[20px] h-5
  flex items-center justify-center
  rounded-full
  text-xs font-bold
  bg-red-500 text-white
"
```

---

## 八、响应式设计规范 (Responsive Design)

### 8.1 断点系统

| 断点 | 最小宽度 | Tailwind 前缀 | 设备 |
|------|----------|---------------|------|
| **xs** | `0px` | (默认) | 手机竖屏 |
| **sm** | `640px` | `sm:` | 手机横屏/小平板 |
| **md** | `768px` | `md:` | 平板竖屏 |
| **lg** | `1024px` | `lg:` | 平板横屏/笔记本 |
| **xl** | `1280px` | `xl:` | 桌面显示器 |
| **2xl** | `1536px` | `2xl:` | 大屏显示器 |

### 8.2 布局响应式规则

```tsx
// 主布局容器
className="
  flex flex-col         // 移动端：垂直堆叠
  md:flex-row          // 平板+：水平排列
  gap-6
  p-4
  md:p-6
"

// 任务区 (左侧)
className="
  w-full               // 移动端：全宽
  md:w-[35%]          // 平板：35%
  lg:w-[30%]          // 桌面：30%
"

// 学生区 (右侧)
className="
  w-full               // 移动端：全宽
  md:w-[65%]          // 平板：65%
  lg:w-[70%]          // 桌面：70%
"

// 统计卡片网格
className="
  grid
  grid-cols-2          // 移动端：2列
  sm:grid-cols-4       // 手机横屏+：4列
  gap-3
  sm:gap-4
"

// 学生卡片网格
className="
  grid
  grid-cols-2          // 移动端：2列
  sm:grid-cols-3       // 手机横屏：3列
  md:grid-cols-4       // 平板：4列
  lg:grid-cols-5       // 笔记本：5列
  xl:grid-cols-6       // 桌面：6列
  gap-3
"

// 任务标签 - 移动端横向滚动
className="
  flex
  gap-2
  overflow-x-auto      // 移动端可横向滚动
  md:flex-wrap         // 平板+：换行显示
  pb-2
  -mx-4 px-4           // 边缘出血效果
  md:mx-0 md:px-0
"
```

### 8.3 字体响应式规则

```tsx
// 页面主标题
className="
  text-2xl             // 移动端
  md:text-3xl          // 平板
  lg:text-4xl          // 桌面
  font-bold
"

// 统计数字
className="
  text-3xl             // 移动端
  md:text-4xl          // 平板
  lg:text-5xl          // 桌面
  font-bold
"

// 正文
className="
  text-sm              // 移动端
  md:text-base         // 平板+
"
```

---

## 九、图标规范 (Icons)

### 9.1 推荐图标库

**主要使用：** [Lucide React](https://lucide.dev/)

```bash
npm install lucide-react
```

### 9.2 图标尺寸规范

| 用途 | 尺寸 | Tailwind |
|------|------|----------|
| 内联图标 | `16px` | `w-4 h-4` |
| 按钮图标 | `20px` | `w-5 h-5` |
| 卡片图标 | `24px` | `w-6 h-6` |
| 统计图标 | `28px` | `w-7 h-7` |
| 大图标 | `32px` | `w-8 h-8` |
| 空状态图标 | `48px` | `w-12 h-12` |

### 9.3 常用图标映射

| 功能 | 图标名称 | Lucide 组件 |
|------|----------|-------------|
| 添加 | Plus | `<Plus />` |
| 删除 | Trash2 | `<Trash2 />` |
| 编辑 | Pencil | `<Pencil />` |
| 搜索 | Search | `<Search />` |
| 关闭 | X | `<X />` |
| 确认 | Check | `<Check />` |
| 复制 | Copy | `<Copy />` |
| 导出 | Download | `<Download />` |
| 用户 | User | `<User />` |
| 用户组 | Users | `<Users />` |
| 任务 | ClipboardList | `<ClipboardList />` |
| 班级 | GraduationCap | `<GraduationCap />` |
| 统计 | BarChart3 | `<BarChart3 />` |
| 设置 | Settings | `<Settings />` |
| 重置 | RotateCcw | `<RotateCcw />` |
| 保存 | Save | `<Save />` |
| 加载 | Loader2 | `<Loader2 />` (带旋转动画) |

---

## 十、Tailwind 配置文件

```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        accent: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans SC', '-apple-system', 'sans-serif'],
        mono: ['Fira Code', 'JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'primary': '0 4px 14px 0 rgb(30 64 175 / 0.35)',
        'primary-lg': '0 10px 25px -5px rgb(30 64 175 / 0.4)',
        'success': '0 4px 14px 0 rgb(34 197 94 / 0.35)',
        'success-glow': '0 0 20px rgb(34 197 94 / 0.4)',
        'cta': '0 4px 14px 0 rgb(245 158 11 / 0.35)',
        'selected': '0 0 0 3px rgb(59 130 246 / 0.3), 0 4px 6px -1px rgb(0 0 0 / 0.1)',
      },
      backgroundImage: {
        'gradient-bg': 'linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)',
        'gradient-primary': 'linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%)',
        'gradient-stats': 'linear-gradient(135deg, #1E40AF 0%, #1D4ED8 50%, #2563EB 100%)',
        'gradient-progress': 'linear-gradient(90deg, #22C55E 0%, #4ADE80 100%)',
        'gradient-cta': 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)',
        'gradient-completed': 'linear-gradient(135deg, #DCFCE7 0%, #BBF7D0 100%)',
      },
      animation: {
        'complete-pulse': 'completePulse 600ms ease-out',
        'completed-glow': 'completedGlow 500ms ease-out',
        'card-flip': 'cardFlip 500ms ease-in-out',
        'badge-bounce': 'badgeBounce 500ms ease-out',
        'sparkle': 'sparkle 1200ms ease-out forwards',
        'shimmer': 'shimmer 2s infinite',
        'fade-in-up': 'fadeInUp 300ms ease-out',
        'shake': 'shake 400ms ease-in-out',
      },
      keyframes: {
        completePulse: {
          '0%': { transform: 'scale(1)' },
          '25%': { transform: 'scale(0.95)' },
          '50%': { transform: 'scale(1.05)' },
          '75%': { transform: 'scale(0.98)' },
          '100%': { transform: 'scale(1)' },
        },
        completedGlow: {
          '0%': { boxShadow: '0 0 0 0 rgb(34 197 94 / 0.6)' },
          '50%': { boxShadow: '0 0 20px 10px rgb(34 197 94 / 0.3)' },
          '100%': { boxShadow: '0 0 0 0 rgb(34 197 94 / 0)' },
        },
        cardFlip: {
          '0%': { transform: 'perspective(400px) rotateY(0deg)' },
          '50%': { transform: 'perspective(400px) rotateY(90deg)' },
          '100%': { transform: 'perspective(400px) rotateY(0deg)' },
        },
        badgeBounce: {
          '0%, 100%': { transform: 'scale(1)' },
          '30%': { transform: 'scale(1.3)' },
          '50%': { transform: 'scale(0.9)' },
          '70%': { transform: 'scale(1.1)' },
        },
        sparkle: {
          '0%': { opacity: 0, transform: 'translateY(0) rotate(0deg) scale(0)' },
          '50%': { opacity: 1, transform: 'translateY(-20px) rotate(180deg) scale(1)' },
          '100%': { opacity: 0, transform: 'translateY(-40px) rotate(360deg) scale(0)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        fadeInUp: {
          from: { opacity: 0, transform: 'translateY(20px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-4px)' },
          '40%': { transform: 'translateX(4px)' },
          '60%': { transform: 'translateX(-4px)' },
          '80%': { transform: 'translateX(4px)' },
        },
      },
    },
  },
  plugins: [],
}
```

---

## 十一、CSS 变量汇总

```css
:root {
  /* 颜色 */
  --color-primary: #1E40AF;
  --color-primary-light: #3B82F6;
  --color-accent: #F59E0B;
  --color-success: #22C55E;
  --color-error: #EF4444;
  --color-warning: #F59E0B;
  --color-bg: #F8FAFC;
  --color-text: #1E3A8A;
  --color-text-secondary: #64748B;

  /* 间距 */
  --space-unit: 4px;
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;

  /* 圆角 */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 24px;
  --radius-full: 9999px;

  /* 阴影 */
  --shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);

  /* 过渡 */
  --transition-fast: 100ms;
  --transition-normal: 150ms;
  --transition-moderate: 200ms;
  --transition-slow: 300ms;

  /* 字体 */
  --font-sans: 'Inter', 'Noto Sans SC', sans-serif;
  --font-mono: 'Fira Code', monospace;
}
```

---

## 十二、设计核对清单 (Pre-Delivery Checklist)

### 视觉质量
- [ ] 所有图标使用 SVG (Lucide)，不使用 emoji
- [ ] 图标来自统一图标库
- [ ] Hover 状态不会导致布局抖动
- [ ] 使用主题色变量，不硬编码颜色

### 交互体验
- [ ] 所有可点击元素有 `cursor-pointer`
- [ ] Hover 状态有明确视觉反馈
- [ ] 过渡动画平滑 (150-300ms)
- [ ] Focus 状态清晰可见（键盘导航）

### 颜色对比度
- [ ] 正文文字对比度 ≥ 4.5:1
- [ ] 大标题对比度 ≥ 3:1
- [ ] 按钮文字清晰可读

### 布局
- [ ] 响应式测试：375px / 768px / 1024px / 1440px
- [ ] 移动端无横向滚动
- [ ] 固定元素不遮挡内容
- [ ] 间距一致

### 可访问性
- [ ] 所有图片有 alt 文本
- [ ] 表单有正确 label
- [ ] 颜色不是唯一信息载体
- [ ] 支持 `prefers-reduced-motion`

---

*文档版本: 1.0*
*更新日期: 2024*
*配色方案: 分析蓝 (Analytics Blue)*
