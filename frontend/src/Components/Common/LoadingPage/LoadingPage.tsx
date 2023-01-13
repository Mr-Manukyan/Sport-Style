import React from "react"
import style from './LoadingPage.module.css'

type PropsType = {
     zIndex?: number
     name? : string
}

export const LoadingPage:React.FC<PropsType> = ({zIndex,name = 'SPORT STYLE'}) => {
  return (
    <div className={style.container} style = {{zIndex : zIndex ? -1000 : 1000}}>
       <div className = {style.wrapper}>
         <span className = {style.text}>{name}</span>
         <div className = {style.spinner}></div>
       </div>
    </div>
  )
}


