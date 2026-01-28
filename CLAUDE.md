# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Chinese classroom diagnostic system** (错题统计 / Student Stats App) designed to help teachers efficiently collect and analyze student error data during assignments. The system enables rapid classroom data collection through three distinct implementations:

1. **classroom_kiosk_demo.html** - Four-zone concurrent kiosk mode for classroom deployment
2. **sampling_statistics_demo.html** - Statistical sampling diagnostic system
3. **student-stats-app/** - Full React/Vite production application

## Project Structure

```
错题统计/
├── classroom_kiosk_demo.html       # Standalone demo (CDN-based React)
├── sampling_statistics_demo.html   # Standalone demo (Tailwind via CDN)
├── package.json                    # Root package (minimal)
└── student-stats-app/              # Production React app
    ├── src/
    │   ├── components/
    │   │   ├── *Phase.jsx          # Main phase components
    │   │   ├── setup/              # Setup phase subcomponents
    │   │   ├── input/              # Input phase subcomponents
    │   │   ├── report/             # Report phase subcomponents
    │   │   └── ui/                 # Reusable UI components
    │   ├── contexts/               # React contexts (Theme)
    │   ├── hooks/                  # Custom hooks (useLocalStorage)
    │   └── lib/                    # Utilities (cn helper)
    ├── package.json
    ├── vite.config.js
    └── tailwind.config.js
```

## Architecture

### Root-Level Demos

Two standalone HTML files demonstrate core concepts without build tooling:

- **classroom_kiosk_demo.html**: Self-contained React app using CDN imports. Implements a 4-split screen layout where each zone independently handles student-question selection workflow (IDLE → SELECTING → SUBMITTING → SUCCESS states). Uses inline Babel for JSX transformation.

- **sampling_statistics_demo.html**: Complete diagnostic system with 4-phase workflow (SETUP → PICKING → INPUT → REPORT). Features 3-channel concurrent input pipeline, statistical analysis, and error rate visualization. Uses Tailwind CSS via CDN.

### Production App (student-stats-app/)

Modern React application with Vite build system:

**Technology Stack:**
- React 18 with hooks
- Vite for dev/build tooling
- Tailwind CSS + PostCSS for styling
- Lucide React for icons (no emoji)
- html2canvas for image export
- ESLint for code quality

**Design System (v4 - Dual-Theme System):**
- Typography: Space Grotesk (headings) + DM Sans (body)
- Color System: HSL CSS variables with light/dark mode support
- Primary: Indigo (HSL 239 84% 67%) with semantic color tokens
- Theme Toggle: Light mode (slate backgrounds) ↔ Dark mode (slate-950 base)
- Glass Morphism: Backdrop blur with semi-transparent surfaces
- All interactive elements have `cursor-pointer`
- Transitions: 200-300ms cubic-bezier easing

**Key Architecture Patterns:**
- Phase-based workflow managed through `stage` state in App.jsx
- Local storage persistence via `useLocalStorage` hook
- Separation of concerns: each phase is isolated in its own component
- UI components follow composition pattern with shadcn/ui-inspired structure

**Component Hierarchy:**
```
App.jsx (root state manager)
├── SetupPhase.jsx (configuration entry)
│   ├── setup/BasicSettings.jsx
│   ├── setup/DataImporter.jsx
│   └── setup/SamplingEngine.jsx
├── PickingPhase.jsx (random sampling animation)
├── InputPhase.jsx (3-channel concurrent input)
│   ├── input/InputLane.jsx (individual input zone)
│   └── input/InputProgress.jsx
└── ReportPhase.jsx (data visualization & analysis)
    ├── report/ReportHeader.jsx
    ├── report/QuestionGrid.jsx
    └── report/QuestionDetail.jsx
```

**State Flow:**
1. Setup phase: Collect `totalQuestions`, `studentNames`, `sampleSize`
2. Picking phase: Random selection from full student list
3. Input phase: Parallel data collection across 3 channels with queue distribution
4. Report phase: Statistical analysis with sorting, filtering, and insights

## Development Commands

### Production App (student-stats-app/)

```bash
cd student-stats-app

# Install dependencies (includes html2canvas for image export)
npm install

# Start development server
npm run dev
# → Opens at http://localhost:5173

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

### HTML Demos

Simply open `.html` files in a modern browser. No build step required. All dependencies loaded via CDN.

## Code Conventions

**File Organization:**
- Phase components: `student-stats-app/src/components/*Phase.jsx`
- Phase subcomponents: `student-stats-app/src/components/{setup,input,report}/*.jsx`
- Reusable UI: `student-stats-app/src/components/ui/*.jsx`
- Hooks: `student-stats-app/src/hooks/*.js`
- Contexts: `student-stats-app/src/contexts/*.jsx` (ThemeContext)
- Utilities: `student-stats-app/src/lib/utils.js`

**Naming:**
- Components use PascalCase
- Phase state values use lowercase strings: 'setup', 'picking', 'input', 'report'
- Student data includes `{ id, name, level }` structure
- Results/records use `{ studentId, mistakes: [questionNumbers] }`

**Styling:**
- Tailwind utility classes with CSS variable tokens
- Glass morphism: `backdrop-blur-xl` + semi-transparent backgrounds
- Dual-theme system via `.dark` class toggle (ThemeContext)
- Light mode: white/slate-50 surfaces | Dark mode: slate-950/slate-900
- Primary brand: indigo (HSL variable)
- Error/mistake visualization: rose-500
- Custom Tailwind config extends color system with semantic tokens

**State Management:**
- Config persisted to localStorage via `useLocalStorage` hook
- Session state (selectedStudents, results) also persisted to localStorage
- Theme preference stored in ThemeContext (localStorage-backed)
- Phase transitions trigger data processing and state updates
- No external state management library (Redux/MobX) - uses React hooks + Context

## Important Implementation Notes

**Input Phase Logic:**
- Distributes remaining students across 3 channels using modulo 3 pattern
- Each channel maintains independent queue and submission state
- Finished students filtered out via `finishedIds` tracking
- Auto-advances to report when all students complete

**Report Phase Features (v2 - Optimized):**
- **Heatmap Grid View**: All questions visible at once (no scrolling needed)
- **Smart Sorting**: Toggle between question sequence (default) and error rate
- **Color-Coded Visualization**:
  - 🟢 0-20% (Green) | 🟡 21-50% (Yellow) | 🟠 51-70% (Orange) | 🔴 71-100% (Red)
- **Click-to-Expand**: Select any question to view detailed student list
- **Dual Export**: CSV (按题号顺序) + Image (PNG with html2canvas)
- **Performance Badges**: Elite students (≥80分) marked with ⭐
- **Hover Tooltips**: Quick stats preview on grid hover
- **Responsive Grid**: Auto-adjusts columns based on screen size (5-10 columns)

**Data Parsing:**
- Student names parsed from comma or newline-separated text
- Excel paste support via split on `/[\n,，]/` regex
- Questions represented as 1-indexed integers (1 to totalQuestions)

**UI/UX Patterns:**
- Touch-optimized for tablet/kiosk deployment
- `user-select: none` to prevent accidental text selection
- Active state feedback with scale transforms
- Success overlays auto-dismiss after 1.5s
- Queue size indicators show remaining work per channel

## Recent Optimizations (v2 Report Phase)

### Problem Solved
**Before:** Left-side scrollable list (1/3 width) + right detail panel (2/3 width) required constant scrolling during classroom projection.

**After:** Heatmap grid showing all questions at once with color-coded error rates.

### Key Improvements

1. **No-Scroll Design**
   - All questions visible in one viewport
   - Responsive grid: 5-10 columns depending on screen width
   - Ideal for projector/smartboard display

2. **Default Sorting**
   - Questions sorted by sequence (1, 2, 3...) by default
   - Toggle to error rate sorting for analysis mode
   - CSV export always uses sequence order

3. **Enhanced Export**
   - CSV export: Plain text with UTF-8 BOM for Excel compatibility
   - Image export: PNG via html2canvas at 2x scale for clarity
   - Export respects question sequence regardless of display mode

4. **Visual Hierarchy**
   - Color-coded error rates (4-tier system)
   - Hover tooltips for quick preview
   - Selected question highlights with ring indicator
   - High-frequency errors (>70%) get warning badge

5. **Accessibility**
   - `cursor-pointer` on all interactive cards
   - Smooth 300ms transitions
   - Focus states for keyboard navigation
   - High contrast text (4.5:1 minimum)

## Testing

**Note:** This project currently has no automated test infrastructure. There are no test files, test runners, or testing libraries configured in package.json. Testing is performed manually through the UI workflow.
