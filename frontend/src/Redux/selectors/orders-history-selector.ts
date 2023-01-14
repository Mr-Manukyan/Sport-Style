import { AppStateType } from "../Redux-Store"

export const getOrdersHistoryIsLoading = (state:AppStateType) => {
    return  state.historyPage.isLoading
}

export const getHistoryOrders = (state:AppStateType) => {
    return  state.historyPage.orders
}

export const getHistoryMessageInfo = (state:AppStateType) => {
    return  state.historyPage.messageInfo
}

export const getOrdersHistoryCurrentPage = (state:AppStateType) => {
    return  state.historyPage.currentPage
}

export const getOrdersHistoryPageSize = (state:AppStateType) => {
    return  state.historyPage.pageSize
}

export const getOrdersHistoryTotalOrdersCount = (state:AppStateType) => {
    return  state.historyPage.totalOrdersHistoryCount
}


export const getOrdersHistorysearchByDateTotalCount = (state:AppStateType) => {
    return  state.historyPage.searchByDateTotalCount
}

export const getOrdersHistorySearchByPirceTotalCount = (state:AppStateType) => {
    return  state.historyPage.searchByPirceTotalCount
}

export const getOrdersHistorySearchByPirceData = (state:AppStateType) => {
    return  state.historyPage.searchOrdersByPirceData
}

export const getOrdersHistorySearchByDateData = (state:AppStateType) => {
    return  state.historyPage.searchByDateData
}

export const getOrdersHistoryPortionNumber = (state:AppStateType) => {
    return  state.historyPage.portionNumber
}

export const getOrdersHistoryTotalPrice = (state:AppStateType) => {
    return  state.historyPage.ordersHistoryTotalPrice
}

export const getOrderHistoryOrderInfoData = (state:AppStateType) => {
    return  state.historyPage.orderInfo
}

export const getOrdersHistoryIsRemove = (state:AppStateType) => {
    return  state.historyPage.isRemove
}





