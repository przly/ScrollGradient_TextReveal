import { ColorShiftImage } from "./ColorShiftImage"
import { IntroText } from "./IntroText"
import gradientImage from "./assets/GradientTransparent2.webp"
import bottomGradientImage from "./assets/GradientTransparent2Flipped.webp"

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
  return (
    <>
      <div style={topSpacerStyle}>Scroll down ↓</div>

      <ColorShiftImage src={gradientImage} />

      <IntroText />

      <ColorShiftImage reverse src={bottomGradientImage} />

      <div style={topSpacerStyle}>End of demo</div>
    </>
  )
}

export default App
