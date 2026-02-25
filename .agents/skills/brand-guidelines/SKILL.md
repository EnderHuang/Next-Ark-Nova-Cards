---
name: brand-guidelines
description: Applies the Ark Nova Teller brand identity — a nature-inspired, eco-conservation aesthetic with sage-green tones and clean minimalism. Use when brand colors, typography, component styling, or visual formatting guidelines apply.
license: Complete terms in LICENSE.txt
---

# Ark Nova Teller — Brand Guidelines

## Overview

A design system for an ecological conservation & animal-themed web application. The visual identity draws from the natural world: muted sage greens, warm earth tones, and soft organic textures — executed with clean, modern minimalism.

**Keywords**: nature, conservation, eco, wildlife, green theme, sage, lime, organic, clean UI, minimal, brand colors, design system

## Design Philosophy

**"Natural Minimalism"** — Sophisticated restraint meets organic warmth. Every element feels intentional, like a well-curated nature exhibit. The interface recedes to let content (animal cards, conservation data) take center stage while maintaining a cohesive, premium feel.

## Color System

### Semantic Tokens (CSS Variables)

All UI surfaces use HSL-based CSS variables for seamless light/dark theming.

| Token              | Light                      | Dark                       |
|--------------------|----------------------------|----------------------------|
| `--background`     | Sage-tinted off-white      | Deep forest dark           |
| `--foreground`     | Dark charcoal-green        | Warm off-white             |
| `--primary`        | Vibrant lime `84 81% 44%`  | Bright lime `84 85% 50%`  |
| `--secondary`      | Light sage                 | Forest mid-tone            |
| `--muted`          | Pale sage                  | Deep forest muted          |
| `--accent`         | Soft sage highlight        | Forest accent              |
| `--card`           | Near-white warm            | Dark forest surface        |
| `--border`         | Sage-gray edge             | Forest edge                |
| `--destructive`    | Warm red                   | Deep red                   |

### Primary Palette — Lime Green

The primary accent is a vibrant lime green that evokes new growth and vitality.

| Scale | Hex       | Usage                              |
|-------|-----------|------------------------------------|
| 50    | `#f7fee7` | Subtle tinted backgrounds          |
| 100   | `#ecfccb` | Hover highlights                   |
| 200   | `#d9f99d` | Light badges, soft fills           |
| 300   | `#bef264` | Active indicators                  |
| 400   | `#a3e635` | Prominent UI elements              |
| 500   | `#84cc16` | **Primary accent** — buttons, links|
| 600   | `#65a30d` | Hover/active states                |
| 700   | `#4d7c0f` | Strong emphasis text               |
| 800   | `#3f6212` | Dark accent contexts               |
| 900   | `#365314` | Very dark accent                   |
| 950   | `#1a2e05` | Near-black accent                  |

### Ark-Specific Colors (Game Domain)

These colors represent in-game card types and must remain unchanged:

| Name           | Hex       | Usage            |
|----------------|-----------|------------------|
| Animal         | `#eb8a00` | Animal cards     |
| Animal Dark    | `#fcbd1a` | Animal accents   |
| Sponsor        | `#006999` | Sponsor cards    |
| Conversation   | `#4c7d39` | Project cards    |
| Endgame        | `#a04d35` | Endgame cards    |

### Neutral Palette — Sage

Instead of pure gray, neutrals carry a subtle green undertone creating a natural, organic feel.

| Role           | Light Theme                  | Dark Theme                   |
|----------------|------------------------------|------------------------------|
| Surface        | Warm sage-white `hsl(78,25%,97%)` | Deep forest `hsl(150,10%,8%)`  |
| Text           | Charcoal-green               | Soft warm white              |
| Borders        | Sage-gray `hsl(80,10%,87%)`  | Forest edge `hsl(150,6%,18%)`  |
| Muted text     | Mid-sage `hsl(80,5%,46%)`    | Soft sage `hsl(80,4%,60%)`     |

## Typography

- **Primary Font**: System font stack with `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
- **Headings**: `font-semibold` or `font-bold`, tracking tight
- **Body**: `text-sm` (14px) to `text-base` (16px), leading relaxed
- **Monospace**: `font-mono` for card IDs and data

### Hierarchy

| Level     | Size           | Weight     | Color           |
|-----------|----------------|------------|-----------------|
| H1        | `text-2xl`+    | Bold       | Foreground      |
| H2        | `text-xl`      | Semibold   | Foreground      |
| H3        | `text-lg`      | Semibold   | Foreground      |
| Body      | `text-sm/base` | Normal     | Foreground      |
| Caption   | `text-xs`      | Medium     | Muted-foreground|

## Component Patterns

### Glass-morphism Panels

Used for navigation, filters, floating UI elements:

```
bg-gradient-to-b from-sage-50/70 to-white/90
shadow-lg shadow-sage-800/5
ring-1 ring-sage-900/5
backdrop-blur-md
```

Dark mode:
```
dark:from-forest-900/70 dark:to-forest-800/90
dark:ring-white/10
```

### Buttons

| Variant     | Style                                    |
|-------------|------------------------------------------|
| Primary     | `bg-primary text-primary-foreground`     |
| Secondary   | `bg-secondary text-secondary-foreground` |
| Ghost       | Transparent, hover shows `bg-accent`     |
| Nature      | `bg-primary text-white` with shadow      |
| Destructive | `bg-destructive text-destructive-fg`     |

### Cards (UI Cards, not game cards)

```
rounded-lg border border-border bg-card text-card-foreground shadow-sm
```

### Inputs & Form Controls

```
border border-border bg-background
focus-visible:ring-2 focus-visible:ring-primary/40
```

### Selection Colors

```css
::selection {
  background-color: lime-300;
  color: lime-950;
}
```

## Spacing & Layout

- **Border radius**: `--radius: 0.625rem` (10px) — slightly larger for organic feel
- **Container max-width**: `1400px` at `2xl` breakpoint
- **Content max-width**: `6xl` (72rem) for card grids
- **Padding**: `px-4 sm:px-8 lg:px-12`
- **Gaps**: `gap-2` for tight groups, `gap-4` for sections

## Motion & Interaction

- **Navigation**: Spring-based entrance (`damping: 30, stiffness: 200`)
- **Hover spotlight**: Radial gradient following cursor on navigation
- **Card preview**: `hover:scale-[200%]` with `duration-500`
- **Accordion**: `0.2s ease-out` for open/close
- **Page transitions**: Fade + slide with `framer-motion`

## Dark Mode

- Class-based dark mode via `html.dark`
- All semantic tokens shift to forest-green dark tones
- Surfaces use `hsl(150, 10%, 7-10%)` range
- Reduced contrast for comfortable reading
- Primary accent brightens slightly for visibility

## Rules

1. **Never modify game card styles** — Animal, Sponsor, Endgame, Project, and Action card components have their own domain-specific styling via `arknova.css`
2. **Use semantic tokens** — Prefer `bg-background`, `text-foreground`, `bg-primary`, `border-border` over hardcoded color values
3. **Maintain glass-morphism** — Floating panels use `backdrop-blur-md` + gradient backgrounds + subtle ring borders
4. **Respect the neutral shift** — Use sage-tinted neutrals, not pure grays, for all non-card UI
5. **Keep accessibility** — Maintain sufficient contrast ratios in both light and dark modes
