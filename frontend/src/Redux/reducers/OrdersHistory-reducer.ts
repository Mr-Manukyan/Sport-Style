import { Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { orders_history_API } from '../../API-request/orders_history_api'
import { CodeStatus, HistoryOrderType, SearchOrderByPriceDataType} from '../../Types/Types'
import { AppStateType, InferActionsTypes } from '../Redux-Store'

const SET_ORDERS = 'My-Project/History/SET_ORDERS'
const TOGGLE_IS_LOADING_HISTORY = 'My-Project/History/TOGGLE_IS_LOADING_HISTORY'
const SET_NUMBER_PAGE = 'My-Project/OrdersHistory/SET_NUMBER_PAGE'
const SET_PORTION_NUMBER = 'My-Project/OrdersHistory/SET_PORTION_NUMBER'
const ORDERS_TOTAL_COUNT = 'My-Project/OrdersHistory/ORDERS_TOTAL_COUNT'
const SET_MESSAGE_INFO = 'My-Project/OrdersHistory/SET_MESSAGE_INFO'
const SET_SEARCH_ORDERS_BY_PRICE_TOTAL_COUNT = 'My-Project/SET_SEARCH_ORDERS_BY_PRICE_TOTAL_COUNT'
const SET_SEARCH_ORDERS_BY_DATE_TOTAL_COUNT = 'My-Project/SET_SEARCH_ORDERS_BY_DATE_TOTAL_COUNT'
const SET_SEARCH_BY_PRICE_DATA = 'My-Project/OrdersHistory/SET_SEARCH_BY_PRICE_DATA'
const SET_SEARCH_BY_DATE_DATA = 'My-Project/OrdersHistory/SET_SEARCH_BY_DATE_DATA'
const SET_ORDERS_HISTORY_TOTAL_PRICE = 'My-Project/OrdersHistory/SET_ORDERS_HISTORY_TOTAL_PRICE'
const SET_ORDER_INFO = 'My-Project/OrdersHistory/SET_ORDER_INFO'
const SET_IS_REMOVE = 'My-Project/OrdersHistory/SET_IS_REMOVE'

type initialStateType = typeof initialState;

let initialState = {
  orders: [] as HistoryOrderType[],
  orderInfo : {} as HistoryOrderType,
  isLoading: false,
  isRemove: false,
  messageInfo: '',
  currentPage: 1,
  pageSize: 5,
  portionNumber: 1,
  totalOrdersHistoryCount:0,
  searchByPirceTotalCount: 0,
  searchByDateTotalCount: 0,
  searchOrdersByPirceData : {} as SearchOrderByPriceDataType,
  searchByDateData: '',
  ordersHistoryTotalPrice : 0
}

export const ordersHistoryReducer = (state = initialState, action : ActionsTypes) : initialStateType => {

  switch (action.type) {

    case SET_ORDERS:
      return {
        ...state,
        orders: action.orders
      }

    case SET_ORDER_INFO:
      return {
        ...state,
        orderInfo  : action.orderInfo
      }  

    case TOGGLE_IS_LOADING_HISTORY:
      return {
        ...state,
        isLoading: action.isLoading
      }

    case SET_IS_REMOVE:
        return {
          ...state,
          isRemove: action.isRemove
    }  

    case SET_NUMBER_PAGE:
      return {
        ...state,
        currentPage: action.currentPageNumber
      }

    case SET_PORTION_NUMBER:
      return {
        ...state,
        portionNumber: action.portionNumber
      }

    case ORDERS_TOTAL_COUNT:
      return {
        ...state,
        totalOrdersHistoryCount: action.ordersTotalCount
      }

    case SET_SEARCH_ORDERS_BY_PRICE_TOTAL_COUNT:
      return {
        ...state,
        searchByPirceTotalCount: action.ordersTotalCount
      }

    case SET_SEARCH_BY_PRICE_DATA:
      return {
        ...state,
        searchOrdersByPirceData: {...action.searchByPriceData}
    }  

    case SET_SEARCH_ORDERS_BY_DATE_TOTAL_COUNT:
      return {
        ...state,
        searchByDateTotalCount: action.ordersTotalCount
      }

    case SET_SEARCH_BY_DATE_DATA:
        return {
          ...state,
          searchByDateData: action.dateData
        }

    case SET_ORDERS_HISTORY_TOTAL_PRICE:
          return {
            ...state,
            ordersHistoryTotalPrice: action.totalPrice
          }
        
    case SET_MESSAGE_INFO:
      return {
        ...state,
        messageInfo: action.message
      }

    default: return state
  }
}

//Action Creators
export const orderHistoryActions = {

    setOrders : (orders:HistoryOrderType[] | []) => 
            ({
              type: SET_ORDERS,
              orders
            } as const),
    
    toggleIsLoadingHistory : (isLoading : boolean) => 
            ({
                type: TOGGLE_IS_LOADING_HISTORY,
                isLoading
            } as const),

    setIsLoadingRemove : (isRemove : boolean) => 
    ({
        type: SET_IS_REMOVE,
        isRemove
    } as const),

    setCurrentPage : (currentPageNumber : number) => 
            ({
                type: SET_NUMBER_PAGE,
                currentPageNumber
            } as const),

    setPortionNumber : (portionNumber : number) => 
            ({
                type: SET_PORTION_NUMBER,
                portionNumber
            } as const),
    setOrdersTotalCount : (ordersTotalCount : number) => 
            ({
                type: ORDERS_TOTAL_COUNT,
                ordersTotalCount
            } as const),

    setSearchByPriceTotalCount : (ordersTotalCount : number) => 
            ({
                type: SET_SEARCH_ORDERS_BY_PRICE_TOTAL_COUNT,
                ordersTotalCount
            } as const),

    setSearchByPriceData : (searchByPriceData : SearchOrderByPriceDataType) => 
            ({
                type: SET_SEARCH_BY_PRICE_DATA,
                searchByPriceData
            } as const),   
            
    setSearchByDateTotalCount : (ordersTotalCount : number) => 
            ({
                type: SET_SEARCH_ORDERS_BY_DATE_TOTAL_COUNT,
                ordersTotalCount
            } as const),
          
    setSearchByDateData : (dateData : string) => 
            ({
                type: SET_SEARCH_BY_DATE_DATA,
                dateData
            } as const),  

    setAllOrdersHistoryTotalPrice : (totalPrice:number) => 
            ({
                type: SET_ORDERS_HISTORY_TOTAL_PRICE,
                totalPrice
            } as const), 

    setOrderInfo : (orderInfo:HistoryOrderType) => 
            ({
              type: SET_ORDER_INFO,
              orderInfo
            } as const),

    setMessageInfo : (message : string) =>
            ({
                type: SET_MESSAGE_INFO,
                message
            } as const) 
}


//thunks

const errorHandler = (dispatch:Dispatch<ActionsTypes>,err:any)=> {
  if(err.response.status === CodeStatus.unAuthorized ||
     err.response.status === CodeStatus.serverError ||
     err.response.status === CodeStatus.notFound) {
     const errorMessage = err.response.data.message
           ? err.response.data.message
           : err.response.statusText 
    console.log(err)
    dispatch(orderHistoryActions.setMessageInfo(errorMessage))
    dispatch(orderHistoryActions.toggleIsLoadingHistory(false))
  }
}

export const getOrdersHistory = (currentPage : number) : ThunkType => {
  return async (dispatch) => {
    try {
      dispatch(orderHistoryActions.toggleIsLoadingHistory(true))
      dispatch(orderHistoryActions.setCurrentPage(currentPage))
      const data = await orders_history_API.getOrdersHistory(currentPage)

      if(data.resultCode === CodeStatus.ok){
        dispatch(orderHistoryActions.setSearchByPriceTotalCount(0))
        dispatch(orderHistoryActions.setSearchByDateTotalCount(0))
        dispatch(orderHistoryActions.setOrders(data.orders))
        dispatch(orderHistoryActions.setOrdersTotalCount(data.totalHistoryOrderCount))
        dispatch(orderHistoryActions.setAllOrdersHistoryTotalPrice(data.ordersTotalPrice))
        dispatch(orderHistoryActions.toggleIsLoadingHistory(false))
      }
    } catch (err) {
        errorHandler(dispatch,err)
    } 
  }
}

export const searchOrdersByPrice = ( searchOrderByPriceData : SearchOrderByPriceDataType,
                                     currentPage : number
                                    ) : ThunkType => {

  return async (dispatch) => {
    try{
      dispatch(orderHistoryActions.toggleIsLoadingHistory(true))
      dispatch(orderHistoryActions.setCurrentPage(currentPage))
      dispatch(orderHistoryActions.setSearchByPriceData(searchOrderByPriceData))
      const data = await orders_history_API.getOrdersByPrice(searchOrderByPriceData,currentPage)

      if(data.resultCode === CodeStatus.ok){
        dispatch(orderHistoryActions.setOrdersTotalCount(0));
        dispatch(orderHistoryActions.setSearchByDateTotalCount(0));
        dispatch(orderHistoryActions.setOrders(data.orders))
        dispatch(orderHistoryActions.setSearchByPriceTotalCount(data.totalHistoryOrderCount))
        dispatch(orderHistoryActions.setAllOrdersHistoryTotalPrice(data.ordersTotalPrice))
        dispatch(orderHistoryActions.toggleIsLoadingHistory(false))
      }
    }catch (err) {
        errorHandler(dispatch,err)
    }
  }
}

export const searchOrdersByDate = ( searchOrderByDateData : string,currentPage : number) : ThunkType => {

  return async (dispatch) => {

    try{
      dispatch(orderHistoryActions.toggleIsLoadingHistory(true))
      dispatch(orderHistoryActions.setCurrentPage(currentPage))
      dispatch(orderHistoryActions.setSearchByDateData(searchOrderByDateData))
      const data = await orders_history_API.getOrdersByDate(searchOrderByDateData,currentPage)
     
      if(data.resultCode === CodeStatus.ok){
        dispatch(orderHistoryActions.setOrdersTotalCount(0))
        dispatch(orderHistoryActions.setSearchByPriceTotalCount(0))
        dispatch(orderHistoryActions.setOrders(data.orders))
        dispatch(orderHistoryActions.setSearchByDateTotalCount(data.totalHistoryOrderCount))
        dispatch(orderHistoryActions.setAllOrdersHistoryTotalPrice(data.ordersTotalPrice))
        dispatch(orderHistoryActions.toggleIsLoadingHistory(false))
      }

    }catch(err) {
      errorHandler(dispatch,err)
    } 
  }
}

export const removeOneOrder = (orderID:string,currentPage:number,totalOrdersCount:number,
                               searchByDateTotalCount:number,searchByPirceTotalCount : number,
                               searchOrdersByPirceData: SearchOrderByPriceDataType,searchByDateData : string
                               ): ThunkType => {
  return async (dispatch) => {
    try{
      dispatch(orderHistoryActions.setIsLoadingRemove(true))
      const data = await orders_history_API.removeOneOrder(orderID)
      if(data.resultCode === CodeStatus.ok){
          
         if(totalOrdersCount){
            dispatch( getOrdersHistory(currentPage) )
         }
         if(searchByPirceTotalCount){
            dispatch( searchOrdersByPrice(searchOrdersByPirceData,currentPage) )
         }
         if(searchByDateTotalCount){
            dispatch( searchOrdersByDate(searchByDateData, currentPage) )
         }
         dispatch(orderHistoryActions.setIsLoadingRemove(false))
      }
    }catch (err) {
      errorHandler(dispatch,err)
    } 
  }
}

export const removeAllOrdersHistory = (): ThunkType => {
  return async (dispatch) => {
    try{
      dispatch(orderHistoryActions.setIsLoadingRemove(true))
      const data = await orders_history_API.removeAllhistory()
      if (data.resultCode === CodeStatus.ok) {
        dispatch(orderHistoryActions.setOrders([]))
        dispatch(orderHistoryActions.setAllOrdersHistoryTotalPrice(0))
        dispatch(orderHistoryActions.setOrdersTotalCount(0))
        dispatch(orderHistoryActions.setSearchByDateTotalCount(0))
        dispatch(orderHistoryActions.setSearchByPriceTotalCount(0))
        dispatch(orderHistoryActions.setIsLoadingRemove(false))
      }
    }catch (err) {
      errorHandler(dispatch,err)
    }

  }
}

type ActionsTypes = InferActionsTypes<typeof orderHistoryActions>
type ThunkType = ThunkAction< Promise<void>,AppStateType,unknown,ActionsTypes>





