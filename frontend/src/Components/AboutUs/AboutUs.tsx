import React from "react"
import style from "./AboutUs.module.css"
import { Link } from "react-router-dom"
import { Text3D } from "../Common/Text3D/Text3D"
import logoLeft from "../../Assets/Images/logoLeft.png"
import logoRight from "../../Assets/Images/logoRight.png"

type PropsType = {
  isAuth: boolean
  infoData: {
    text: string
  }
}

export const AboutUs: React.FC<PropsType> = React.memo(({ isAuth, infoData }) => {
    return (
      <div className={style.container}>
        <div className={style.aboutUsBodyWrapper}>
          <div className={style.paragraphBody}>
            <img src={logoLeft} alt="logo" className={style.logo} />
            <Text3D text="SPORT STYLE SHOP" />
            <img src={logoRight} alt="logo" className={style.logo} />
          </div>
          <div className={style.infoTextBody}>
            <div className={style.textWrapper}>
              <p className={style.text1}>{infoData.text}</p>
              <p className={style.text2}>
                By registering on
                {!isAuth ? <Link to="/auth/register" className={style.link}>{" "}our website{" "}</Link>
                         : " our website "
                }
                and becoming our client, you can purchase the entire range
                presented on the website of the Sport Style store
                <i className={style.discount}> 10% discount. </i>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
)
