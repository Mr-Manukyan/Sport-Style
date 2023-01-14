import React from "react"
import style from "./MatrixRain.module.css"

export const MatrixRain = ({ timeout = 10 }) => {
  const canvas = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
 
    if (canvas.current) {
      const context = canvas.current.getContext("2d")
      canvas.current.width = window.innerWidth
      canvas.current.height = window.innerHeight
      let wipeBlock1 = "██"
      let wipeBlock2 = "▉"
      let matrix = "SPORTSTYLE"
      let matrixArr = matrix.split("")
      let fontSize = 13
      if (context) {
        context.font = fontSize + "px monospace"
        let columns = canvas.current.width / fontSize
        let drops: number[] = []
        let speed: number[] = []
        let sMem: number[] = []
        for (let x = 0; x < columns; x++) {
          drops[x] = 1
          sMem[x] = 1
          speed[x] = 0
        }

        const draw = () => {
  
          if (canvas.current) {
            context.shadowColor = "#000"
            context.shadowBlur = 0
            context.fillStyle = "rgba(0, 0, 0, 0.03)"
            context.fillRect(0, 0, canvas.current.width, canvas.current.height)

            for (var i = 0; i < drops.length; i++) {
              if (
                drops[i] * fontSize > canvas.current.height &&
                Math.random() > 0.95
              ) {
                drops[i] = 0;
                sMem[i] = 1 + Math.floor(Math.random() * 5)
                speed[i] = 0
              }

              if (speed[i] >= sMem[i]) {
                context.fillStyle = "#000"
                context.shadowBlur = 0

                context.fillText(wipeBlock1, i * fontSize, drops[i] * fontSize)
                context.shadowBlur = 0
                context.fillText(wipeBlock2, i * fontSize, drops[i] * fontSize)
                context.shadowBlur = 0
                let text = matrixArr[Math.floor(Math.random() * matrix.length)]
                context.shadowBlur = 2
                context.fillStyle = "#e4f403";
                context.fillText(text, i * fontSize, drops[i] * fontSize)
                context.shadowColor = "#fff"
                context.shadowBlur = 2
                context.fillStyle = "#fff"
                context.fillText(text, i * fontSize, (drops[i] + 1) * fontSize)
                drops[i]++
                speed[i] = 0
              } else {
                speed[i]++
              }
            }
          }
        };
        const interval = setInterval(draw, timeout)
        return () => {
          clearInterval(interval)
        };
      }
    }
  }, [canvas, timeout])

  return (
    <div className={style.container}>
      <canvas ref={canvas} />
    </div>
  )
}
