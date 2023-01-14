import React from 'react'
import style from './PlusMinus.module.css'
import { AiOutlineMinusCircle } from 'react-icons/ai'
import { AiOutlinePlusCircle } from 'react-icons/ai'


type PropsType = {
    quantity : number 
    setQuantity : (count:number) => void
}

export const PlusMinus:React.FC<PropsType> = ({quantity,setQuantity}) => {


  const plus = () => {
      if (quantity < 50) {
          setQuantity(++quantity) 
      }
  
  }
  const minus = () => {
      if (quantity > 1) {
          setQuantity(--quantity)
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
