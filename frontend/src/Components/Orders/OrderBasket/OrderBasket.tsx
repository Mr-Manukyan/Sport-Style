import React from "react"
import style from "./OrderBasket.module.css"
import { FaShoppingCart } from "react-icons/fa"
import { CounterOdometer } from "../Odometer/CounterOdometer"
import { motion } from "framer-motion"

type PropsType = {
      children: React.ReactNode
      ordersTotalCount: number
      ordersTotalPrice: number
      ordersLength : number
      removeAllOrders: () => void
      setNewOrder : () => void
}

export const OrderBasket: React.FC<PropsType> = ({
  children,
  ordersTotalCount,
  ordersTotalPrice,
  ordersLength,
  removeAllOrders,
  setNewOrder
}) => {


  return (
    <div className={style.container}>
 
        <motion.div className={ordersLength ? style.bodyWrapper : style.bodyWrapperEmpty} layout 
                    transition={{duration : .4}}>
          <div className={style.cartWrapper}>
            <FaShoppingCart className={style.cart} />
            <h4 className={style.paragraph}>{"Your basket"}</h4>
          </div>
          {ordersLength 
          ? <>
              <div
                className={style.removeButtonWrapper}
                onClick={removeAllOrders}
              >
                <button className={style.removeAllOrder}>
                  {"Clean the Basket"}
                </button>
              </div>
          
                {children}
                <div className={style.totalPriceContainer}>
                  <div className={style.totalPriceWrapper}>

                    <span className={style.totalQuantity}>
                      {"Total count `"}
                      <span className={style.quantity}>{ordersTotalCount}</span>
                    </span>

                    <span className={style.totalPrice}>
                      {"Total price `"}
                      <span className={style.odometer}>
                        <CounterOdometer value={ordersTotalPrice} />
                      </span>
                      <span className={style.currency}>{"dram"}</span>
                    </span>
                  </div>
                </div>
                  <div className={style.buttonWrapper}>
                    <button className={style.button} onClick = {setNewOrder}>{"Buy Order"}</button>
                  </div>
            </>
          : <p className={style.textInfo}>{"Your basket is empty"}</p>
          }
        </motion.div>

    </div>
  )
}
