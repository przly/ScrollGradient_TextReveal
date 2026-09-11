# Gradient Scroll

A scroll-driven color-shift effect built with React, TypeScript, and [Motion](https://motion.dev), recreating a Webflow/GSAP interaction pattern natively in code.

## The effect

**Scroll-linked gradient reveal** (`ColorShiftImage.tsx`)

Each gradient image sits inside a `position: sticky` wrapper that pins it in the viewport while its containing section scrolls past. As you scroll, `useScroll`/`useTransform` map scroll progress through an eased curve (`power3.inOut`) to a `scaleY` value. The `reverse` variant flips the transform origin and scale range so the effect plays in the opposite direction. A negative bottom margin on the top section makes the next block of content slide up and overlap it, matching the reference site's layered scroll transition.

`ColorShiftImage` doesn't create its own scroll target — it takes a `sectionRef` (for its own layout) and an optional `progressTarget` + `offset` (for what drives the animation), so the trigger element and the scroll window are both controllable from the parent. Currently `App.tsx` configures the two instances quite differently:

- **Top** — scales `3 → 0` (starts covering the viewport in one color, shrinks to reveal the gradient). Triggered by its own section, offset `["start end", "start -10%"]`: starts as its top touches the bottom of the viewport, and finishes once it's scrolled 10% of a viewport-height *past* the top of the viewport — a 1.1-viewport-height-long animation.
- **Bottom** — scales `0 → 2.5` (expands from nothing), with the image itself mirrored via `scaleY(-1)` so both sections reuse the same asset. It's triggered off the **footer** section instead of its own (short, `50vh`) section, via `progressTarget`, with offset `["start 150%", "start start"]`: it starts while the footer is still 50% of a viewport-height below the visible area (well before it's on screen), and finishes once the footer's top reaches the top of the viewport — a 1.5-viewport-height-long animation.

**Scroll progress indicator** (`ScrollProgress.tsx`)

A fixed, top-right percentage readout tracks both animations' `scrollYProgress` (using the same offsets as above) and combines them into a single `0% → 100% → 0%` value via `(topProgress - bottomProgress) * 100` — climbing through the top animation, holding at 100% through the intro text, then counting back down through the bottom animation.

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
