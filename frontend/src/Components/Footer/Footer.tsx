import React from "react"
import style from "./Footer.module.css"
import { SocialWebIcon } from "./socialWebIcon/SocialWebIcon"
import { FaRegCopyright } from "react-icons/fa"


export const Footer = React.memo(() => {
  return (
    <div className={style.footerContainer}>
      <div className={style.socialWebIconWrapper}>
          <SocialWebIcon  linkdin ='https://www.linkedin.com/in/karen-manukyan-a436671b6/' 
                          facebook = 'https://www.facebook.com/karen.manukyan.5832343'
                          github = 'https://github.com/MK-Manukyan-Karen'
          />
      </div>
    </div>
  )
})

