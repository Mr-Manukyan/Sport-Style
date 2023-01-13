import React from 'react'
import style from './Logo.module.css'
import GlowingTextAnimation from './GlowingTextAnimation/GlowingTextAnimation'
import logo from '../../../Assets/Images/logo.png'
import { playBtnSound } from '../../../Utils/helpers/helpers'

type PropsType = {
  toggleSideBar : (toggle:boolean) => void
}

export const Logo:React.FC<PropsType> = React.memo(({toggleSideBar}) => {

  const buttonClick = () => {
          playBtnSound()
          toggleSideBar(false)
  }

  return (
    <div className={style.wrapper}>
      
      <div className={style.paragraphWrapper} onClick={buttonClick}>
        <div className={style.link}>
          <img src = {logo} alt = 'logo' className = {style.logo}/>
          <GlowingTextAnimation paragraph = 'sportstyle'/>
        </div>
      </div>

    </div>
  )
})


