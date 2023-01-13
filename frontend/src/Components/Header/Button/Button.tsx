import React from 'react'
import style from './Button.module.css'
import { NeonAnimationButton } from '../../Buttons/NeonAnimationButton/NeonAnimationButton'
import { Link } from 'react-router-dom'
import { playBtnSound } from '../../../Utils/helpers/helpers'

type PropsType = {
   toggleSideBar : (toggle:boolean) => void
 }

export const Button:React.FC<PropsType> = React.memo( ({toggleSideBar}) => {

  const buttonClick = () => {
          playBtnSound()
          toggleSideBar(false)
  }

  return (
            <div className={style.buttonWrapper}>
              <div onClick={buttonClick}>
                <Link to='/auth/login' className={style.linkLogin}>
            
                  <NeonAnimationButton name = 'Login'
                                      hoverColor = '#1ff403'
                                      textColor = '#1ff403'
                                      shadow = ' 0 0 2px #1ff403, 0 0 4px #1ff403, 0 0 8px #1ff403, 0 0 30px #1ff403'
                                      animationColor = '#1ff403'
                  />
                </Link>
              </div>
              <div onClick={buttonClick}>
                <Link to='/auth/register' className={style.linkLogin}>
                  <NeonAnimationButton name = {'Register'}/>
                </Link>
              </div>
            </div>
         )
})
