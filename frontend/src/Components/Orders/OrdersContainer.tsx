import React from "react"
import { useNavigate } from "react-router-dom"
import { Orders } from "./Orders"
import { LoadingPage } from "../Common/LoadingPage/LoadingPage"
import { useAppDispatch, useAppSelector } from "../../Hooks/hooks"
import { getOrderIsLoading,getOrders, getOrdersMessageInfo} from "../../Redux/selectors/order-selector"
import { getIsAuth } from "../../Redux/selectors/auth-selector"
import { AnimatedPage } from "../Common/AnimatedPage/AnimatedPage"
import { MatrixRain } from "../Common/MatrixEffect/MatrixRain"
import { buyOrder, orderActions } from "../../Redux/reducers/Orders-reducer"
import { ModalMessageInfo } from "../Common/ModalMessageInfo/ModalMessageInfo"



const OrdersContiner: React.FC = React.memo(() => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const orders = useAppSelector(getOrders)
  const isAuth = useAppSelector(getIsAuth)
  const isLoading = useAppSelector(getOrderIsLoading)
  const messageInfo = useAppSelector(getOrdersMessageInfo)


  const removeAllOrders = () => {
          dispatch(orderActions.removeAllOrdersAC())
  }

  const removeOrderById = (orderId: string) => {
          dispatch(orderActions.removeOrderAC(orderId))
  }

  const updateOrderCountById = (orderId: string, orderCount: number) => {
          dispatch(orderActions.updateOrderCountAC(orderId, orderCount))
  }

  const setMessageInfo = (message:string) => {
          dispatch(orderActions.setMessageInfo(message))
  }



  const ordersTotalPriceArr = [] as number[]
  orders.map((order) => {
    return ordersTotalPriceArr.push(order.price * order.quantity)
  })

  const ordersTotalPrice = ordersTotalPriceArr.reduce((prev, price) => {
    return prev + price
  }, 0)

  const ordersTotalCountArr = [] as number[];
  orders.map((order) => {
    return ordersTotalCountArr.push(order.quantity)
  })

  const ordersTotalCount = ordersTotalCountArr.reduce((prev, quantity) => {
    return prev + quantity
  }, 0)

  const setNewOrder = () => {

    if (!isAuth) {
      navigate("/auth/login")
    } else {
      dispatch(buyOrder(orders, ordersTotalPrice))
    }
  }

  if (isLoading) {
    return <LoadingPage />
  }

  return (
    <>
      {messageInfo && <ModalMessageInfo infoText={messageInfo} setMessageInfo={setMessageInfo}/>}
      <AnimatedPage>
        <MatrixRain />
        <Orders
          orders={orders}
          ordersTotalPrice={ordersTotalPrice}
          ordersTotalCount={ordersTotalCount}
          removeAllOrders={removeAllOrders}
          removeOrderById={removeOrderById}
          updateOrderCountById={updateOrderCountById}
          setNewOrder={setNewOrder}
        />
      </AnimatedPage>
    </>
  )
})

export default OrdersContiner
