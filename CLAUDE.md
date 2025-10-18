# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a GUID v7 generator application built with Next.js 15, using the App Router architecture. The project uses pnpm as its package manager.

## Development Commands

### Running the Application
- `pnpm dev` - Start development server with Turbopack (runs on http://localhost:3000)
- `pnpm build` - Create production build with Turbopack
- `pnpm start` - Start production server

### Code Quality
- `pnpm lint` - Run Biome linter/formatter checks
- `pnpm format` - Format code with Biome

Note: This project uses **Biome** (not ESLint/Prettier) for linting and formatting.

## Architecture

### UI Component System
The project uses **HeroUI** (not NextUI or other component libraries) as its component library:
- HeroUI plugin configured in `app/hero.ts` and `tailwind.config.js`
- `HeroUIProvider` wraps the app in `components/ui-provider.tsx`
- Provider is integrated in root layout at `app/layout.tsx:31`
- Import components from `@heroui/react`

### Styling
- **Tailwind CSS v4** (latest major version with new PostCSS plugin)
- Dark mode configured as `class`-based in `tailwind.config.js:12`
- HeroUI theme content path is included in Tailwind config
- Global styles in `app/globals.css`
- Geist and Geist Mono fonts loaded via `next/font/google`

### Path Aliases
- `@/*` maps to root directory (configured in `tsconfig.json:22`)
- Example: `import { Providers } from "@/components/ui-provider"`

### Client vs Server Components
- Root layout (`app/layout.tsx`) is a Server Component
- UI Provider (`components/ui-provider.tsx`) uses `'use client'` directive
- Main page (`app/page.tsx`) uses `'use client'` directive for interactive HeroUI components

## Important Configuration Details

### Biome Configuration
- Import organization is enabled (runs on save/format)
- React and Next.js recommended rules enabled
- Custom rule: `noUnknownAtRules` disabled for CSS compatibility
- 2-space indentation enforced

### TypeScript
- Strict mode enabled
- Target: ES2017
- Path alias `@/*` resolves to project root
- Next.js plugin integrated for enhanced type checking

### Next.js
- Version 15.5.6 with Turbopack enabled for dev and build
- App Router architecture (not Pages Router)
- React 19 (latest version)

## Development Notes

When working with this codebase:
- Always use `'use client'` directive for components that use HeroUI interactive components or React hooks
- Use Biome commands (`pnpm lint`, `pnpm format`) instead of ESLint/Prettier
- Import UI components from `@heroui/react`, not other UI libraries
- Use the `@/` path alias for absolute imports from project root
