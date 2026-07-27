import { useRef } from "react"
import { motion, useScroll, useTransform, useWillChange } from "motion/react"

// Mirrors GSAP's power3.inOut easing curve.
function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

interface ColorShiftImageProps {
  src: string
  /** Responsive srcset, e.g. "img-500.webp 500w, img-800.webp 800w, ..." */
  srcSet?: string
  /** Sizes attribute paired with srcSet. Defaults to "100vw". */
  sizes?: string
  alt?: string
  loading?: "lazy" | "eager"
  /** Flips the wipe direction, matching the original's ".reverse" variant. */
  reverse?: boolean
}

export function ColorShiftImage({
  src,
  srcSet,
  sizes = "100vw",
  alt = "",
  loading = "lazy",
  reverse = false,
}: ColorShiftImageProps) {
  const sectionRef = useRef<HTMLElement>(null)

  // Matches GSAP ScrollTrigger's start: "top bottom", end: "+=1.1 * viewport height"
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "10vh"],
  })

  const [from, to] = reverse ? [0, 2.5] : [3, 0]

  const scaleY = useTransform(scrollYProgress, (progress) => {
    return from + (to - from) * easeInOutCubic(progress)
  })

  const willChange = useWillChange()

  return (
    <section
      ref={sectionRef}
      style={
        reverse
          ? { height: "50vh" }
          : { height: "100vh", marginBottom: "-75vh" }
      }
    >
      <div style={{ height: "102%", position: "relative" }}>
        <div style={{ width: "100%", height: "100%", position: "sticky", top: 0 }}>
          <motion.div
            style={{
              scaleY,
              willChange,
              transformOrigin: reverse ? "bottom center" : "top center",
              width: "100%",
              height: "100%",
            }}
          >
            <img
              src={src}
              srcSet={srcSet}
              sizes={srcSet ? sizes : undefined}
              alt={alt}
              loading={loading}
              style={{
                transform: reverse ? "scaleY(-1)" : undefined,
                width: "110%",
                maxWidth: "110%",
                height: "100%",
                marginLeft: "-5%",
                marginTop: "-5px",
                marginBottom: "-5px",
                display: "block",
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
