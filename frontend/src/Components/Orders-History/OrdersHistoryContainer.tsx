import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../Hooks/hooks'
import { getHistoryMessageInfo, getHistoryOrders, getOrdersHistoryCurrentPage, 
         getOrdersHistoryIsLoading,
         getOrdersHistorySearchByDateData,
         getOrdersHistorysearchByDateTotalCount, 
         getOrdersHistorySearchByPirceData, 
         getOrdersHistorySearchByPirceTotalCount,
         getOrdersHistoryTotalOrdersCount, 
         getOrdersHistoryTotalPrice
        } from '../../Redux/selectors/orders-history-selector'
import { getIsAuth } from '../../Redux/selectors/auth-selector'
import { LoadingPage } from '../Common/LoadingPage/LoadingPage'
import { getOrdersHistory, orderHistoryActions, removeAllOrdersHistory, removeOneOrder, searchOrdersByDate, searchOrdersByPrice } from '../../Redux/reducers/OrdersHistory-reducer'
import { ModalMessageInfo } from '../Common/ModalMessageInfo/ModalMessageInfo'
import { AnimatedPage } from '../Common/AnimatedPage/AnimatedPage'
import { MatrixRain } from '../Common/MatrixEffect/MatrixRain'
import { OrdersHistory } from './OrdersHistory'
import { HistoryOrderType } from '../../Types/Types'


const OrdersHistoryContiner: React.FC = React.memo(() => {
    const [isShowOrderInfo, setIsShowOrderInfo] = React.useState(false)

    const dispatch = useAppDispatch()
    const orders = useAppSelector(getHistoryOrders)
    const isAuth = useAppSelector(getIsAuth)
    const isLoading = useAppSelector(getOrdersHistoryIsLoading)
    const messageInfo = useAppSelector(getHistoryMessageInfo)
    const currentPage = useAppSelector(getOrdersHistoryCurrentPage)
    const totalOrdersCount = useAppSelector(getOrdersHistoryTotalOrdersCount)
    const searchByPirceTotalCount = useAppSelector(getOrdersHistorySearchByPirceTotalCount)
    const searchByDateTotalCount = useAppSelector(getOrdersHistorysearchByDateTotalCount)
    const searchByPirceData = useAppSelector(getOrdersHistorySearchByPirceData)
    const searchByDateData = useAppSelector(getOrdersHistorySearchByDateData)
    const ordersTotalPrice = useAppSelector(getOrdersHistoryTotalPrice)

    const showOrderInfo = (isShow:boolean) => {
      setIsShowOrderInfo( isShow) 
    }

  const setOrderInfo = (orderInfo: HistoryOrderType) => {
      dispatch( orderHistoryActions.setOrderInfo(orderInfo) )
      setIsShowOrderInfo(false) 
  }

  React.useEffect(() => {
        dispatch( getOrdersHistory(currentPage) ) 
  }, [])

  const setMessageInfo = (message:string) => {
      dispatch(orderHistoryActions.setMessageInfo(message))
  }


  const onPageChanged = (p:number) => {
    if(totalOrdersCount){
      dispatch( getOrdersHistory(p) )
    }
    if(searchByPirceTotalCount){
      dispatch( searchOrdersByPrice(searchByPirceData,p) )
    }

    if(searchByDateTotalCount){
      dispatch( searchOrdersByDate(searchByDateData,p))
    }
    
  }

  const setPortionNumber = (portionNumber:number) => {
     dispatch( orderHistoryActions.setPortionNumber(portionNumber) )
  }

  const setRemoveAllOrdersHistory = () => {
    dispatch( removeAllOrdersHistory() )
  }

  const removeOrderById = (orderId:string) => {
    dispatch( removeOneOrder(orderId,currentPage,totalOrdersCount,searchByDateTotalCount,
                             searchByPirceTotalCount,searchByPirceData,searchByDateData
                            )
            )
  } 
  
  if (!isAuth) {
        return <Navigate to = '/auth/login' />
   }

  // if (isLoading) {
  //   return <LoadingPage />
  // }

  return (
    <>
      {messageInfo && <ModalMessageInfo infoText={messageInfo} setMessageInfo={setMessageInfo}/>}
      <AnimatedPage>
        <MatrixRain />
          <OrdersHistory orders={orders}
                         removeAllOrdersHistory = {setRemoveAllOrdersHistory} 
                         removeOrderById = {removeOrderById} 
                         ordersTotalPrice = {ordersTotalPrice}
                         onPageChanged = {onPageChanged}
                         setPortionNumber = {setPortionNumber}
                         isShowOrderInfo = {isShowOrderInfo}
                         showOrderInfo = {showOrderInfo}
                         setOrderInfo = {setOrderInfo}
          />
      </AnimatedPage>
    </>
  )
})

export default OrdersHistoryContiner



