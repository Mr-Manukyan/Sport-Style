import React from 'react'
import style from './GlowingTextAnimation.module.css'

type PropsType = {
  paragraph : string
}

export const GlowingTextAnimation:React.FC<PropsType> = ({paragraph}) => {
  const paragraphArr = paragraph.toUpperCase().split('')
  return (
        <ul className={style.loadingUl}>
          {
            paragraphArr.map( (char, index) => <li key={index} style={{animationDelay : `${index * 0.2}s`}}>{char}</li>)
          }
        </ul> 
  );
}

export default GlowingTextAnimation
