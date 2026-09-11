import { useRef } from "react"
import { ColorShiftImage } from "./ColorShiftImage"
import { IntroText } from "./IntroText"
import { ScrollProgress } from "./ScrollProgress"
import gradientImage from "./assets/GradientTransparent2.webp"

const spacerStyle = {
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "sans-serif",
  color: "#888",
  background: "#fff",
}

const topSpacerStyle = {
  ...spacerStyle,
  color: "#f0ead6",
  background: "#041C2C",
}

function App() {
  const topRef = useRef<HTMLElement>(null)
  const bottomRef = useRef<HTMLElement>(null)
  const footerRef = useRef<HTMLElement>(null)

  return (
    <>
      <ScrollProgress topRef={topRef} bottomRef={footerRef} />

      <div style={topSpacerStyle}>Scroll down ↓</div>

      <ColorShiftImage sectionRef={topRef} src={gradientImage} />

      <IntroText />

      <ColorShiftImage
        reverse
        sectionRef={bottomRef}
        progressTarget={footerRef}
        offset={["start 150%", "start start"]}
        src={gradientImage}
      />

      <section ref={footerRef} style={topSpacerStyle}>
        End of demo
      </section>
    </>
  )
}

export default App
