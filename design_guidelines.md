# Design Guidelines: Fleet Management Dashboard

## Design Approach

**Selected Approach**: Dashboard Design System with Professional SaaS Aesthetics

**Inspiration Sources**: 
- Modern SaaS dashboards (Linear, Stripe Dashboard, Vercel)
- Fleet management platforms (emphasis on data clarity and professional presentation)
- Enterprise data applications prioritizing information hierarchy

**Core Principles**:
- Data clarity above decoration
- Professional trust and reliability
- Efficient information density
- Scannable layouts with clear visual hierarchy

## Color Palette

### Light Mode
- **Background**: 0 0% 100% (pure white)
- **Surface**: 210 40% 98% (cool gray-50)
- **Surface Elevated**: 0 0% 100% (white cards)
- **Border**: 214 32% 91% (gray-200)
- **Text Primary**: 222 47% 11% (near black)
- **Text Secondary**: 215 16% 47% (gray-600)
- **Text Tertiary**: 215 20% 65% (gray-400)

### Dark Mode
- **Background**: 222 47% 11% (deep navy-black)
- **Surface**: 217 33% 17% (dark slate)
- **Surface Elevated**: 215 28% 22% (elevated slate)
- **Border**: 215 20% 30% (subtle borders)
- **Text Primary**: 210 40% 98% (near white)
- **Text Secondary**: 215 20% 65% (gray-400)
- **Text Tertiary**: 215 16% 47% (gray-500)

### Brand & Accent Colors
- **Primary**: 211 100% 50% (professional blue - trust, reliability)
- **Success**: 142 76% 36% (green for active status, completed maintenance)
- **Warning**: 38 92% 50% (amber for upcoming renewals, alerts)
- **Danger**: 0 84% 60% (red for overdue, critical alerts)
- **Chart Colors**: 211 100% 50%, 142 76% 36%, 262 83% 58%, 24 100% 50%, 280 100% 70%

## Typography

**Font Stack**: 
- Primary: 'Inter', system-ui, -apple-system, sans-serif
- Data/Numbers: 'JetBrains Mono', 'Courier New', monospace (for metrics, IDs)

**Type Scale**:
- **Display**: text-4xl font-bold (36px) - Dashboard headings
- **H1**: text-3xl font-semibold (30px) - Page titles
- **H2**: text-2xl font-semibold (24px) - Section headers
- **H3**: text-xl font-medium (20px) - Card titles
- **Body**: text-base (16px) - Regular content
- **Small**: text-sm (14px) - Labels, captions
- **Tiny**: text-xs (12px) - Metadata, timestamps

## Layout System

**Spacing Primitives**: Use Tailwind units of 2, 4, 6, 8, 12, 16, 24
- Tight spacing: gap-2, p-2 (cards, buttons)
- Standard: gap-4, p-4, p-6 (sections, containers)
- Generous: gap-8, p-8, p-12 (page sections, dashboard grid)

**Grid Structure**:
- Dashboard: 12-column grid with gap-6
- Summary Cards: 4-column grid (lg:grid-cols-4 md:grid-cols-2 grid-cols-1)
- Detail Views: 3-column layout for metadata sections
- Responsive breakpoints: sm(640px), md(768px), lg(1024px), xl(1280px), 2xl(1536px)

**Container Widths**:
- Max width: max-w-7xl (1280px) for dashboard content
- Sidebar: w-64 (256px) on desktop, full-width drawer on mobile

## Component Library

### Navigation
- **Sidebar**: Fixed left navigation, collapsible on mobile
  - Logo/brand at top (h-16)
  - Navigation items with icons (h-10, hover:bg-surface)
  - Active state: bg-primary/10 with border-l-4 border-primary
  - User profile at bottom

### Dashboard Elements
- **Summary Cards**: 
  - White/Surface background, rounded-lg, p-6
  - Icon container (h-12 w-12 rounded-lg bg-primary/10)
  - Large metric (text-3xl font-bold)
  - Label (text-sm text-secondary)
  - Trend indicator (+5.2% with arrow icon)

- **Data Tables**:
  - Sticky header with bg-surface
  - Alternating row backgrounds (hover:bg-surface)
  - Right-aligned numerical data
  - Action buttons in final column
  - Pagination controls at bottom

- **Charts & Visualizations**:
  - Card container (p-6, rounded-lg)
  - Title and time range selector in header
  - Recharts library for line/bar/pie charts
  - Consistent color palette from design system
  - Min height: h-80 for readability

### Forms & Inputs
- **Input Fields**: 
  - h-10 rounded-md border border-border
  - Focus: ring-2 ring-primary/20 border-primary
  - Dark mode: bg-surface text-primary
  - Labels: text-sm font-medium mb-2

- **Buttons**:
  - Primary: bg-primary text-white h-10 px-4 rounded-md font-medium
  - Secondary: border border-border bg-transparent hover:bg-surface
  - Danger: bg-danger text-white
  - Icon buttons: h-10 w-10 rounded-md

### Status & Alerts
- **Status Badges**: 
  - Pill shape (rounded-full px-3 py-1)
  - Active: bg-success/10 text-success
  - Pending: bg-warning/10 text-warning  
  - Expired: bg-danger/10 text-danger

- **Alert Panel**:
  - Card with border-l-4 (color-coded by severity)
  - Icon + message + timestamp
  - Dismissible with close button

## Page-Specific Layouts

### Landing Dashboard
- **Header**: Search bar (max-w-md), notification bell, user avatar (h-10 w-10 rounded-full)
- **Summary Row**: 4 metric cards across top (gap-6)
- **Main Grid**: 2-column layout
  - Left (col-span-8): Charts stacked vertically (gap-6)
  - Right (col-span-4): Alerts panel + quick links
- **Bottom Section**: Recent activity table (full width)

### Vehicle Detail View
- **Hero Section**: 
  - Vehicle image placeholder (aspect-video, rounded-lg, bg-surface) or vehicle type icon
  - Registration number (text-3xl font-bold)
  - Key metadata badges (status, type, odometer)

- **Info Grid**: 3-column layout
  - Metadata cards (VIN, make/model, dates)
  - Renewal dates with countdown indicators
  - Maintenance status overview

- **Tabs Section**: 
  - Tab navigation (Maintenance, Insurance, History)
  - Content area with tables/timelines

### Mobile Optimization
- Stack all grids to single column
- Collapsible sidebar to hamburger menu
- Horizontal scroll for wide tables
- Bottom navigation bar for key actions
- Touch-friendly tap targets (min h-12)

## Visual Enhancements

**Subtle Depth**:
- Cards: shadow-sm (light), shadow-md on hover
- Modals: shadow-xl backdrop-blur
- Sticky elements: shadow-sm with border-b

**Micro-interactions** (minimal):
- Button hover: subtle scale or brightness shift
- Row hover: bg-surface transition
- Loading states: skeleton screens (animate-pulse)

**No decorative animations** - focus on instant, snappy transitions (150ms)

## Images

**Vehicle Placeholders**: Use for vehicle detail hero sections
- Aspect ratio: 16:9
- Placement: Top of detail view, rounded-lg
- Fallback: Vehicle type icon with gradient background

**No large hero images** - this is a data-focused dashboard, not marketing site