# Gradient Scroll

A scroll-driven color-shift effect built with React, TypeScript, and [Motion](https://motion.dev), recreating a Webflow/GSAP interaction pattern natively in code.

## The effect

**Scroll-linked gradient reveal** (`ColorShiftImage.tsx`)

Each gradient image sits inside a `position: sticky` wrapper that pins it in the viewport while its containing section scrolls past. As you scroll, `useScroll`/`useTransform` map scroll progress through an eased curve (`power3.inOut`) to a `scaleY` value. The `reverse` variant flips the transform origin and scale range so the effect plays in the opposite direction. A negative bottom margin on the top section makes the next block of content slide up and overlap it, matching the reference site's layered scroll transition.

**Word-by-word text reveal** (`IntroText.tsx`)

The intro headline is split into individual words, each masked inside an `overflow: hidden` span. A `motion.span` per word animates in from below (`translateY`) with a small stagger delay between each word, triggered once via `whileInView` when the text scrolls into view.

## Changes since the initial handoff

Notes for whoever built the original version, so you can reproduce these tweaks in your own copy (or a Webflow/GSAP port) without re-deriving them:

1. **Made the scroll trigger configurable, instead of hardcoded to each section.** In `ColorShiftImage.tsx`, `sectionRef` moved from an internal `useRef` to a required prop (so the parent can hold onto it), and two new optional props were added: `progressTarget` (a different element to drive `useScroll`'s `target`, falling back to `sectionRef`) and `offset` (the `useScroll` offset window, defaulting to `["start end", "start start"]` — exactly one viewport height).

2. **Bottom gradient now triggers off the footer, not its own section.** In `App.tsx`, a `footerRef` is attached to the final "End of demo" section and passed to the bottom `ColorShiftImage` as `progressTarget={footerRef}`, with `offset={["start 150%", "start start"]}`. In GSAP/ScrollTrigger terms: `trigger: footerEl, start: "top bottom+=50%", end: "top top"` — the expansion now starts while the footer is still half a viewport-height below the visible area, and finishes as the footer's top reaches the top of the viewport (≈1.5 viewport heights of scroll, up from ≈1.1 tied to its own 50vh section).

3. **Top gradient's window is now explicit and slightly longer.** `App.tsx` passes `offset={["start end", "start -10%"]}` to the top `ColorShiftImage`. In ScrollTrigger terms: `start: "top bottom", end: "top top-=10%"` — net timing is close to the original (~1.1 viewport heights), just now a tunable prop instead of baked into the component.

4. **Scale values are unchanged**: top still animates `scaleY` `3 → 0`, bottom still `0 → 2.5`. (We tried halving the bottom's range to `0 → 1.25` mid-session but reverted it.)

5. **Added a fixed scroll-progress readout** — new `ScrollProgress.tsx`, wired into `App.tsx` alongside the two `ColorShiftImage` instances. It reads both animations' `scrollYProgress` with the same offsets as above and renders `Math.round((topProgress - bottomProgress) * 100) + "%"` in a `position: fixed` element (top-right, `mixBlendMode: "difference"` so it stays legible over any background) — climbing `0 → 100` through the top animation, holding at 100 through the intro text, then counting back down to 0 through the bottom animation.

6. **`IntroText.tsx` spacing and a new cards row.** The container's shared `gap: 32` was replaced with explicit `marginBottom` per child, so each gap can be tuned independently; the bottom padding dropped from `256px` to `100px`; and a new row of 3 equal-width gray cards (`#e5e5e5`, `16px` radius, `4:3` aspect ratio) was added below the headline with `16px` gaps between them, the same `24px` left/right padding as the rest of the module, and a `160px` margin above (on the headline's `marginBottom`).

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
