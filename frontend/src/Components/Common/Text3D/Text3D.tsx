import React from 'react'
import style from './Text3D.module.css'


type PropsType = {
    text:string
}
export const Text3D:React.FC<PropsType> = ({text}) => {

  return (
    <div className = {style.container}>
        <div className = {style.hiWrapper}>
           <h2>WELCOME</h2>
        </div> 
        <div className = {style.shopNameWrapper}>
            <p className = {style.text}>{text}</p>
        </div>
    </div>
  )
}
