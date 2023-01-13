import { CodeStatus, OrderType } from "../../Types/Types"
import { ThunkAction } from "redux-thunk"
import { AppStateType, InferActionsTypes } from "../Redux-Store"
import { ordersAPI } from "../../API-request/orders_api"

const SET_ORDER_BY_ID_PRODUCT = "My-Project/Products/SET_ORDER_BY_ID_PRODUCT"
const UPDATE_ORDER_COUNT_BY_ID = "My-Project/Products/UPDATE_ORDER_COUNT_BY_ID"
const REMOVE_ORDER_BY_ID = "My-Project/Products/REMOVE_ORDER_BY_ID"
const REMOVE_ALL_ORDER = "My-Project/Products/REMOVE_ALL_ORDER"
const TOGGLE_IS_LOADING_ORDER = "My-Project/Orders/TOGGLE_IS_LOADING_ORDER"
const SET_MESSAGE_INFO = "Project/Orders/SET_MESSAGE_INFO"


type initialStateType = typeof initialState

const ordersHistory = sessionStorage.getItem("orders")
const orders: OrderType[] = ordersHistory && JSON.parse(ordersHistory)

const initialState = {
  orders: orders || [],
  isLoading: false,
  messageInfo: "",
}

export const ordersReducer = ( state = initialState,action: ActionsTypes): initialStateType => {

  switch (action.type) {
    case SET_ORDER_BY_ID_PRODUCT:
        return {
          ...state,
          orders: state.orders.some((order) => order.id === action.order.id)
            ? state.orders.map((order) => {
                if (order.id === action.order.id) {
                  return {
                    ...order,
                    quantity: order.quantity + action.order.quantity,
                  }
                }
                return order
              })
            : [...state.orders, action.order],
      }

    case UPDATE_ORDER_COUNT_BY_ID:
        return {
          ...state,
          orders: state.orders.map((order) => {
            if (order.id === action.orderId) {
              return {
                ...order,
                quantity: action.orderCount,
              }
            }
            return order
          }),
      }

    case REMOVE_ORDER_BY_ID:
        return {
          ...state,
          orders: [...state.orders].filter(
            (order) => order.id !== action.orderId
          ),
        }

    case REMOVE_ALL_ORDER:
        return {
          ...state,
          orders: [],
        }

    case TOGGLE_IS_LOADING_ORDER:
        return {
          ...state,
          isLoading: action.isLoading,
        }

    case SET_MESSAGE_INFO:
        return {
          ...state,
          messageInfo: action.message,
        }

    default:
      return state
  }
}

//Action Creators

export const orderActions = {
  
  setOrderAC: (order: OrderType) =>
    ({
      type: SET_ORDER_BY_ID_PRODUCT,
      order,
    } as const),

  removeOrderAC: (orderId: string) =>
    ({
      type: REMOVE_ORDER_BY_ID,
      orderId,
    } as const),

  removeAllOrdersAC: () =>
    ({
      type: REMOVE_ALL_ORDER,
    } as const),

  updateOrderCountAC: (orderId: string, orderCount: number) =>
    ({
      type: UPDATE_ORDER_COUNT_BY_ID,
      orderId,
      orderCount,
    } as const),

  setIsLoading: (isLoading: boolean) =>
    ({
      type: TOGGLE_IS_LOADING_ORDER,
      isLoading,
    } as const),

  setMessageInfo: (message: string) =>
    ({
      type: SET_MESSAGE_INFO,
      message,
    } as const),

}

//thunks

export const buyOrder = (newOrder: OrderType[],totalPrice: number): ThunkType => {
  
  return async (dispatch) => {
    try {
      dispatch(orderActions.setIsLoading(true))
      let data = await ordersAPI.setOrders(newOrder, totalPrice)
      if(data.resultCode === CodeStatus.created){
        dispatch(orderActions.setMessageInfo(data.message))
        dispatch(orderActions.setIsLoading(false))
      }
    } catch (err) {
      if (err.response.status === CodeStatus.serverError) {
        const errorMessage = err.response.data.message
          ? err.response.data.message
          : err.response.statusText
        dispatch(orderActions.setMessageInfo(errorMessage))
      }
      dispatch(orderActions.setIsLoading(false))
    }
  }
}

type ActionsTypes = InferActionsTypes<typeof orderActions>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>
