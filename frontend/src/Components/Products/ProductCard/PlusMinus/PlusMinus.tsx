import React from 'react'
import style from './PlusMinus.module.css'
import { AiOutlineMinusCircle } from 'react-icons/ai'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import soundQuantity from '../../../../Assets/audio/button3.mp3'

type PropsType = {
    quantity : number 
    setQuantity : (count:number) => void
}

export const PlusMinus:React.FC<PropsType> = ({quantity,setQuantity}) => {

const playPlusMinusSound = () => {
const plusMinuSound = new Audio(soundQuantity)
      plusMinuSound.volume = 0.2
      plusMinuSound.play()
}

  const plus = () => {
      if (quantity < 50) {
          setQuantity(++quantity)
          playPlusMinusSound()
      }
  
  }
  const minus = () => {
      if (quantity > 1) {
          setQuantity(--quantity)
          playPlusMinusSound()
      }
  }

  return (
 
      <div className={style.quantityWrapper}>
                <button onClick={minus} className={style.minusWrapper}>
                    <AiOutlineMinusCircle className={style.minus} />
                </button>
                <div className={style.quantity}>{quantity}</div>
                <button onClick={plus} className={style.plusWrapper}>
                    <AiOutlinePlusCircle className={style.plus} />
                </button>
    </div>
  )
}
