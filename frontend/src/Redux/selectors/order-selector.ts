import { AppStateType } from "../Redux-Store"

export const getOrders = (state:AppStateType) => {
    return  state.ordersPage.orders
}

export const getOrderIsLoading = (state:AppStateType) => {
    return  state.ordersPage.isLoading
}

export const getOrdersMessageInfo = (state:AppStateType) => {
    return  state.ordersPage.messageInfo
}


