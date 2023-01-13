import React from "react"
import { MatrixRain } from "../Common/MatrixEffect/MatrixRain"
import style from "./NotFound.module.css"
import robotNotFound from "../../Assets/Images/notFoundRobot.gif"
import { AnimatedPage } from "../Common/AnimatedPage/AnimatedPage"

const NotFound: React.FC = React.memo(() => {
  return (
    <AnimatedPage>
      <div className={style.container}>
        <MatrixRain />
        <div className={style.bodyWrapper}>
          <img src={robotNotFound} alt="robotNotFound" className={style.gif} />
          <div className={style.infoTextWrapper}>
            <p className={style.text1}>{"Sorry"}</p>
            <p className={style.text2}>{"Page Not Found"}</p>
          </div>
        </div>
      </div>
    </AnimatedPage>
  )
})

export default NotFound
