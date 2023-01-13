import React from 'react'
import { playBtnSound } from '../../../Utils/helpers/helpers'
import style from './ButtonHoverGradients.module.css'

type PropsType = {
  callback? : () => void,
  name? : string
  width?: string
  height?:string
  borderRadius?: string
  fontSize? : string
  padding?:string
}

export const ButtonHoverGradients:React.FC<PropsType> = React.memo ( ({
                                                                       callback,name,width,fontSize,
                                                                       height,borderRadius,padding
                                                                      }) => {

  const buttonClick = () => {
    if(callback){
      callback()
    }
    playBtnSound()
  }

  return (
      <button className = {style.btn}
              onClick = {buttonClick} 
              style = {{width,height,borderRadius,fontSize,padding}}
      >
        {name}
      </button>
  )
})
