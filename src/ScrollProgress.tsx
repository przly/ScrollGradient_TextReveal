import type { RefObject } from "react"
import { motion, useScroll, useTransform } from "motion/react"

interface ScrollProgressProps {
  /** Section driving the 0 -> 100 climb. */
  topRef: RefObject<HTMLElement | null>
  /** Section driving the 100 -> 0 descent. */
  bottomRef: RefObject<HTMLElement | null>
}

export function ScrollProgress({ topRef, bottomRef }: ScrollProgressProps) {
  const { scrollYProgress: topProgress } = useScroll({
    target: topRef,
    offset: ["start end", "start -10%"],
  })
  const { scrollYProgress: bottomProgress } = useScroll({
    target: bottomRef,
    offset: ["start 150%", "start start"],
  })

  // Both progresses are clamped to [0, 1], so before the bottom section is
  // reached this is just topProgress, and once the top section is fully
  // played out (topProgress pinned at 1) it counts back down as bottomProgress rises.
  const percentage = useTransform(
    [topProgress, bottomProgress],
    ([top, bottom]: number[]) => `${Math.round((top - bottom) * 100)}%`
  )

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        zIndex: 1000,
        fontFamily: "monospace",
        fontSize: 14,
        color: "#fff",
        mixBlendMode: "difference",
        pointerEvents: "none",
      }}
    >
      {percentage}
    </motion.div>
  )
}
