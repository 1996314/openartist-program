# The OpenArtist Program — Landing Page

The official landing page for **The OpenArtist Program**, OpenArt's invitation-only, paid creator partnership for AI content creators.

https://openartist-landing-page.vercel.app/

Built with a Renaissance atelier-inspired visual identity — oil painting textures, dramatic lighting, and a prestige-first design language that reflects the selectivity of the program itself.

## Features

- **Scroll-driven background transitions** — Parallax painted backgrounds crossfade from grassland to sky to a dark FAQ zone as you scroll
- **Animated pixel "A" logo** — Periodic glitch effect bridging classical and generative aesthetics
- **Liquid glass cursor** — Custom cursor with a frosted-glass trailing ring, reactive to interactive elements
- **Scroll-triggered reveals** — Content sections animate into view using Framer Motion
- **Tier comparison** — Foundry and Vanguard tiers displayed as glassmorphic cards with hover effects
- **FAQ accordion** — Smooth expand/collapse with AnimatePresence
- **Canvas grain overlay** — Subtle SVG noise texture across all sections
- **Floating particles** — Gold particles in painted sections, muted ivory particles in the FAQ zone
- **Fully responsive** — Scales from mobile to desktop with clamp-based typography

## Tech Stack

- [Next.js](https://nextjs.org) (App Router)
- [React](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Framer Motion](https://www.framer.com/motion)
- [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) + [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts

## Project Structure

```
openartist-landing/
├── app/
│   ├── globals.css            # Minimal CSS reset
│   ├── layout.tsx             # HTML wrapper, metadata, font imports
│   └── page.tsx               # Entry point, imports the landing component
├── components/
│   └── OpenArtistLanding.tsx   # Full landing page component
├── public/
│   ├── hero-grassland.jpg     # Painted grassland hero background
│   └── sky-clouds.jpg         # Painted sky/clouds background
└── ...
```

## Color Palette

| Name           | Hex       | Usage                                    |
|----------------|-----------|------------------------------------------|
| Atelier Black  | `#0D0B0A` | Primary background, hero sections        |
| Warm Ivory     | `#F2EDE4` | Primary text on dark backgrounds         |
| Burnt Sienna   | `#C4622D` | Foundry tier accent, CTAs                |
| Raw Umber      | `#7A5C3E` | Secondary text, dividers, texture        |
| Antique Gold   | `#C9A84C` | Vanguard tier, achievements, highlights  |
| Cerulean Dusk  | `#2A3F5F` | Cool counter-tone                        |
| Glow Amber     | `#E8943A` | Hover states, light beam                 |

---

## Getting Started

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

First, install dependencies:

```bash
npm install
```

Then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `components/OpenArtistLanding.tsx`. The page auto-updates as you edit the file.

### Background Images

Place your two painted background assets in the `public/` folder:

- `hero-grassland.jpg` — The grassland/ocean painting used for the hero section
- `sky-clouds.jpg` — The sky/clouds painting used for the middle and closing sections

Recommended: compress images to under 500KB each using [Squoosh](https://squoosh.app) for optimal load performance.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) — learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) — an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) — your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
