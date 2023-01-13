import { AppStateType } from "../Redux-Store"

export const getAllProducts = (state:AppStateType) => {
    return  state.productsPage.products
}

export const getProductsPageSize = (state:AppStateType) => {
    return  state.productsPage.pageSize
}

export const getTotalProductsCount = (state:AppStateType) => {
    return  state.productsPage.totalProductsCount
}

export const getProductsCurrentPage = (state:AppStateType) => {
    return  state.productsPage.currentPage
}

export const getProductsPortionNumber = (state:AppStateType) => {
    return  state.productsPage.portionNumber
}

export const getProductsIsLoading = (state:AppStateType) => {
    return  state.productsPage.isLoading
}

export const getProductsMessageInfo = (state:AppStateType) => {
    return  state.productsPage.messageInfo
}
