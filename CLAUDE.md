# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + Vite application for waste disposal guidance (배출의 민족 / Disposal Nation), originally designed in Figma and exported as a code bundle. The app helps users identify waste items through photo capture and provides region-specific disposal instructions in multiple languages (Korean, English, Japanese).

## Core Technologies

- **Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 6.3.5
- **Styling**: Tailwind CSS v4.1.12 (via @tailwindcss/vite)
- **UI Components**:
  - Radix UI primitives for accessible components
  - Material UI (@mui/material, @mui/icons-material)
  - Custom shadcn/ui-style components in `src/app/components/ui/`
- **Notable Libraries**:
  - lucide-react for icons
  - react-hook-form for form handling
  - motion for animations
  - sonner for toast notifications

## Development Commands

```bash
# Install dependencies
npm i

# Start development server
npm run dev

# Build for production
npm run build
```

## Architecture

### Entry Point
- [index.html](index.html) - HTML entry with root div
- [src/main.tsx](src/main.tsx) - React root renderer

### Application Structure

The app is a single-page application with client-side routing managed through React state in [src/app/App.tsx](src/app/App.tsx):

**Main App Component** ([src/app/App.tsx](src/app/App.tsx)):
- Manages global state (authentication, language, page navigation, image uploads)
- Coordinates between 5 main pages: main, mypage, notice, community, auth
- Handles camera/file input for waste photo capture
- Maintains recent search history
- Language switching (ko/en/ja) with translations object pattern

**Page Components** (in [src/app/components/](src/app/components/)):
- `AnalysisResult.tsx` - Displays AI analysis results with disposal instructions
- `AuthPage.tsx` - User authentication/login
- `MyPage.tsx` - User profile and settings
- `NoticePage.tsx` - Notices/announcements
- `CommunityPage.tsx` - Community features
- `Sidebar.tsx` - Navigation sidebar

**UI Components** ([src/app/components/ui/](src/app/components/ui/)):
- 46 reusable UI components following shadcn/ui patterns
- Built on Radix UI primitives for accessibility
- Components include: accordion, alert-dialog, button, calendar, card, dialog, dropdown-menu, form, input, select, etc.

### Styling System

**Theme Configuration** ([src/styles/theme.css](src/styles/theme.css)):
- CSS custom properties for colors, spacing, typography
- Green color scheme (primary: #1b5e20, accent: #2e7d32)
- Dark mode support via `.dark` class
- Semantic color tokens (background, foreground, primary, secondary, muted, accent, destructive)
- Design system variables for consistency

**Tailwind Integration**:
- Tailwind v4 automatically configured via Vite plugin
- Custom theme variables injected via `@theme inline`
- Typography defaults in `@layer base`

### Path Aliases

The project uses `@/` as an alias for the `src/` directory (configured in [vite.config.ts](vite.config.ts)):
```typescript
import { Component } from '@/app/components/Component'
```

### Multi-language Support

All user-facing components use a `translations` object pattern with `Language` type ("ko" | "en" | "ja"). Pass the `language` prop and look up strings via `translations[language].key`.

### State Management

No external state library is used. State is managed via:
- React useState hooks in App.tsx for global concerns
- Props drilling to child components
- Local component state where appropriate

### Image Handling

- File input with `capture="environment"` for mobile camera access
- FileReader API to convert images to base64 data URLs
- Images stored in component state and passed as props
- Mock AI analysis data (no real backend integration)

## Important Notes

- This is a Figma Make export - the original design is at https://www.figma.com/design/QTYkfmUjmdyp6B3mjNx57E
- The Vite config requires both React and Tailwind plugins even if Tailwind isn't actively used
- No test suite is configured
- No backend integration - all data is mocked in components
- Authentication state is client-side only with no persistence
