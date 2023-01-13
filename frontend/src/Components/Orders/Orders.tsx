import React from "react"
import style from "./Orders.module.css"
import { AnimatePresence, motion } from "framer-motion"
import { Order } from "./Order.js/Order"
import { OrderType } from "../../Types/Types"
import { OrderBasket } from "./OrderBasket/OrderBasket"


type PropsType = {
      orders: OrderType[]
      ordersTotalPrice: number
      ordersTotalCount : number
      removeAllOrders : () => void
      removeOrderById : (orderId:string) => void
      updateOrderCountById : (orderId:string, orderCount: number) => void
      setNewOrder : () => void
}

export const Orders: React.FC<PropsType> = React.memo(({ 
                                                         orders, ordersTotalPrice,setNewOrder,
                                                         removeAllOrders,removeOrderById,
                                                         updateOrderCountById,ordersTotalCount
                                                      }) => {
                                                                                 
    return (
      <div className={style.container}>
        <OrderBasket
            ordersTotalCount={ordersTotalCount}
            ordersLength = {orders.length}
            ordersTotalPrice={ordersTotalPrice}
            removeAllOrders={removeAllOrders}
            setNewOrder = {setNewOrder}
          >
            <div className={style.orderContainer}>
            <AnimatePresence >
              {orders.map((order) => {
                return (

                    <motion.div  className={style.wrapper}
                                 key={order.id}
                                 animate = {{ opacity : 1, x: "0px" }}
                                 exit = {{ opacity : 0, x: "-100px" }}
                                 initial = {false}
                                 transition = {{duration: .2,}}
                                 layoutId = {order.id}
                    >
                      <Order
                        order={order}
                        removeOrderById = {removeOrderById}
                        updateOrderCountById = {updateOrderCountById}
                      />
                    </motion.div>
                )
              })}
            </AnimatePresence>
            </div>
          </OrderBasket>
      </div>
    )
  }
)
