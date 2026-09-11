import { motion } from "motion/react"
import ellipse4 from "./assets/ellipse-4.svg"

const containerStyle = {
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "flex-start",
  paddingTop: 256,
  paddingBottom: 100,
  paddingLeft: 24,
  paddingRight: 24,
  textAlign: "left" as const,
}

const labelRowStyle = {
  display: "flex",
  gap: 24,
  alignItems: "center",
  marginBottom: 32,
}

const labelTextStyle = {
  fontFamily: "'Geist Mono', monospace",
  fontWeight: 600,
  fontSize: 12,
  lineHeight: 1,
  letterSpacing: "-0.24px",
  textTransform: "uppercase" as const,
  color: "#7c868e",
  whiteSpace: "nowrap" as const,
}

const cardsRowStyle = {
  display: "flex",
  gap: 16,
  width: "100%",
}

const cardStyle = {
  flex: 1,
  aspectRatio: "4 / 3",
  borderRadius: 16,
  background: "#e5e5e5",
}

const headlineStyle = {
  display: "flex",
  flexWrap: "wrap" as const,
  columnGap: "0.13em",
  fontFamily: "'Inter', sans-serif",
  fontWeight: 500,
  fontSize: 72,
  lineHeight: 1,
  letterSpacing: "-2.88px",
  color: "#041c2c",
  margin: "0 0 160px 0",
  width: "100%",
}

interface Word {
  text: string
  color?: string
}

function toWords(sentence: string, color?: string): Word[] {
  return sentence.split(" ").map((text) => ({ text, color }))
}

const words: Word[] = [
  ...toWords(
    "NGEN connects solar, batteries, EV charging and the electricity grid.",
  ),
  ...toWords(
    "Our systems help homes and businesses lower costs, while supporting large-scale energy projects.",
    "#7c868e",
  ),
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.015 },
  },
}

const wordVariants = {
  hidden: { y: "220%" },
  visible: {
    y: "0%",
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const },
  },
}

export function IntroText() {
  return (
    <div style={containerStyle}>
      <div style={labelRowStyle}>
        <img src={ellipse4} alt="" width={10} height={10} />
        <p style={labelTextStyle}>WHAT WE DO?</p>
      </div>
      <motion.p
        style={headlineStyle}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={containerVariants}
      >
        {words.map(({ text, color }, i) => (
          <span
            key={i}
            style={{
              overflow: "hidden",
              paddingTop: "0.4em",
              paddingBottom: "0.4em",
              paddingRight: "0.15em",
              marginTop: "-0.4em",
              marginBottom: "-0.4em",
              marginRight: "-0.15em",
            }}
          >
            <motion.span
              style={{ display: "inline-block", color }}
              variants={wordVariants}
            >
              {text}
            </motion.span>
          </span>
        ))}
      </motion.p>
      <div style={cardsRowStyle}>
        <div style={cardStyle} />
        <div style={cardStyle} />
        <div style={cardStyle} />
      </div>
    </div>
  )
}
