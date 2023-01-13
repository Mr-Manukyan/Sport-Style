import React from "react"
import style from "./ContactUs.module.css"
import { MatrixRain } from "../Common/MatrixEffect/MatrixRain"
import logoRobot from "../../Assets/Images/helloRobot.gif"
import logoLeft from "../../Assets/Images/logoLeft.png"
import logoRight from "../../Assets/Images/logoRight.png"

export const ContactUs: React.FC = React.memo(() => {
  return (
    <div className={style.container}>
      <MatrixRain />
      <div className={style.infoBodyWrapper}>
        <img src={logoLeft} alt="logo" className={style.logoLeft} />
        <div className={style.logoBody}>
          <img src={logoRobot} alt="robot" className={style.logoRobot} />
        </div>
        <div className={style.infoBody}>
          <div className={style.authorBody}>
            <p className={style.profession}>
              {"Programmer `"}
              <span className={style.author}>{"Karen Manukyan"}</span>
            </p>
          </div>
          <div className={style.infoGmailBody}>
            <p className={style.gmail}>
              {"Gmail `"}
              <span className={style.gmailLink}>
                {"arm.karen.manukyan88@gamil.com"}
              </span>
            </p>
          </div>
          <div className={style.phoneNumberBody}>
            <p className={style.phone}>
              {"Phone `"}
              <span className={style.number}>{"+374-33-065-064"}</span>
            </p>
          </div>
        </div>
        <img src={logoRight} alt="logo" className={style.logoRight} />
      </div>
    </div>
  )
})
