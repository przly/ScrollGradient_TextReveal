# Gradient Scroll

A scroll-driven color-shift effect built with React, TypeScript, and [Motion](https://motion.dev), recreating a Webflow/GSAP interaction pattern natively in code.

## The effect

**Scroll-linked gradient reveal** (`ColorShiftImage.tsx`)

Each gradient image sits inside a `position: sticky` wrapper that pins it in the viewport while its containing section scrolls past. As you scroll, `useScroll`/`useTransform` map scroll progress through an eased curve (`power3.inOut`) to a `scaleY` value — the image starts scaled up to 3x (showing only one color) and eases down to its natural size, revealing the rest of its baked-in vertical gradient as it shrinks. The `reverse` variant flips the transform origin and scale range so the effect plays in the opposite direction. A negative bottom margin on the top section makes the next block of content slide up and overlap it, matching the reference site's layered scroll transition.

**Word-by-word text reveal** (`IntroText.tsx`)

The intro headline is split into individual words, each masked inside an `overflow: hidden` span. A `motion.span` per word animates in from below (`translateY`) with a small stagger delay between each word, triggered once via `whileInView` when the text scrolls into view.

## Stack

- React 19 + TypeScript + Vite
- [Motion](https://motion.dev) (`motion/react`) for all scroll and reveal animations
- Plain inline styles, no CSS framework
- Local WebP assets (converted from Figma exports) — no remote CDN dependency

## Development

```bash
npm install
npm run dev
```
