import React from 'react'
import style from './OrdersHistory.module.css'
import { AnimatePresence, motion } from 'framer-motion'
import { HistoryOrderType } from '../../Types/Types'
import { OrdersHistoryBasket } from './OrdersHistoryBasket/OrdersHistoryBasket'


import { OrderHistory } from './OrderHistory/OrderHistory'
import { OrderHistoryInfo } from './OrderHistoryInfo/OrderHistoryInfo'

type PropsType = {
    orders : HistoryOrderType[]
    ordersTotalPrice : number
    onPageChanged : (pageNumber: number) => void
    setPortionNumber : (portionNumber: number) => void
    removeAllOrdersHistory : () => void
    removeOrderById : (orderID: string) => void
    isShowOrderInfo : boolean
    showOrderInfo : (isShow:boolean) => void
    setOrderInfo : (ordersInfo: HistoryOrderType) => void

}

export const OrdersHistory:React.FC<PropsType> = ({orders,ordersTotalPrice,removeOrderById,
                                                   removeAllOrdersHistory,onPageChanged,setPortionNumber,
                                                   isShowOrderInfo,showOrderInfo,setOrderInfo
                                                  }) => {
                                                                                             
  return (
    <div className={style.container}>
    { isShowOrderInfo &&  <OrderHistoryInfo  showOrderInfo = {showOrderInfo} />}  
    <OrdersHistoryBasket
        ordersLength = {orders.length}
        ordersTotalPrice={ordersTotalPrice}
        removeAllOrdersHistory={removeAllOrdersHistory}
        onPageChanged = {onPageChanged}
        setPortionNumber = {setPortionNumber}

   
      >
        <div className={style.orderContainer}>
        <AnimatePresence >
          {orders.map((order) => {
            return (

                <motion.div  className={style.wrapper}
                             key={order._id}
                             animate = {{ opacity : 1, x: "0px" }}
                             exit = {{ opacity : 0, x: "-100px" }}
                             initial = {false}
                             transition = {{duration: .2,}}
                             layoutId = {order._id}
    
                >
                  <OrderHistory order={order}
                                removeOrderById = {removeOrderById}
                                showOrderInfo = {showOrderInfo}
                                setOrderInfo = {setOrderInfo}
                  />
                </motion.div>
       
            );
          })}
        </AnimatePresence>
        </div>
      </OrdersHistoryBasket>
  </div>
  )
}

