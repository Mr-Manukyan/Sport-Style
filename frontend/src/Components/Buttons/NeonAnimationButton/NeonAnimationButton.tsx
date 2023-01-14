import React from 'react'
import style from './NeonAnimationButton.module.css'

type PropsType = {
  name : string
  hoverColor? : string
  textColor? : string
  animationColor? : string
  width? : string
  height? : string
  margin? : string
  padding? : string
  fontSize? : string
  marginTop? : string
}
                                 

 export const NeonAnimationButton:React.FC<PropsType> = React.memo( (props) => {
    const [hoverColor, setHoverColor] = React.useState('')
    const [color, setColor] = React.useState(props.textColor ? props.textColor : '#03e9f4')
  


    const hoverEffectOver = () => {
          setHoverColor(props.hoverColor ? props.hoverColor : '#03e9f4')
          setColor('#050801')
    }

    const hoverEffectOut = () => {
          setHoverColor('')
          setColor(props.textColor ? props.textColor : '#03e9f4')
    }
  

  return (

      <button className = {style.button} 
              style = {{
                        background : hoverColor,
                        color : color,
                        width : props.width,
                        height : props.height,
                        margin : props.margin,
                        padding : props.padding,
                        fontSize:props.fontSize,
                        marginTop : props.marginTop
                        }}
              onMouseOver={hoverEffectOver}
              onMouseOut={hoverEffectOut}                        
        >
        <span style = {{background:`linear-gradient(90deg,transparent, ${props.animationColor 
                                                                        ? props.animationColor
                                                                        : '#03e9f4'})`}}
              className="button__line button__line__top">
        </span>
        <span style = {{background:`linear-gradient(180deg,transparent,${props.animationColor 
                                                                        ? props.animationColor
                                                                        : '#03e9f4'})`}} 
              className="button__line button__line__right">
        </span>
        <span style = {{background:`linear-gradient(270deg,transparent,${props.animationColor 
                                                                        ? props.animationColor
                                                                        : '#03e9f4'})`}}
              className="button__line button__line__bottom">
        </span>
        <span style = {{background:`linear-gradient(0deg,transparent,${props.animationColor 
                                                                        ? props.animationColor
                                                                        : '#03e9f4'})`}}
              className="button__line button__line__left">
        </span>
        {props.name}
      </button>

  )
})
