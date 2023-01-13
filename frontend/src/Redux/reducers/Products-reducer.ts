
import { ThunkAction } from 'redux-thunk'
import { productsAPI } from '../../API-request/products_api'
import { CodeStatus, ProductType } from '../../Types/Types'
import { AppStateType, InferActionsTypes } from '../Redux-Store'

const SET_PRODUCTS = 'My-Project/Products/SET_PRODUCTS'
const SET_NUMBER_PAGE = 'My-Project/Products/SET_NUMBER_PAGE'
const PRODUCTS_TOTAL_COUNT = 'My-Project/Products/PRODUCTS_TOTAL_COUNT'
const TOGGLE_IS_LOADING = 'My-Project/Priducts/TOGGLE_IS_LOADING'
const SET_PORTION_NUMBER = 'My-Project/Products/SET_PORTION_NUMBER'
const SET_SET_MESSAGE_INFO = 'My-Project/Products/SET_SET_MESSAGE_INFO'

type initialStateType = typeof initialState

const currentPageHistory = sessionStorage.getItem('currentPage')
const currentPage = Number(currentPageHistory)

const initialState = {
  products: [] as ProductType[],
  pageSize: 6,
  currentPage: currentPage || 1,
  totalProductsCount: 0,
  isLoading: false,
  portionNumber: 1,
  messageInfo : ''
}

export const productsReducer = (state = initialState, action : ActionsTypes): initialStateType=> {

  switch (action.type) {

    case SET_PRODUCTS:
      return {
        ...state,
        products: action.products
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

    case PRODUCTS_TOTAL_COUNT:
      return {
        ...state,
        totalProductsCount: action.productsTotalCount
      }

    case TOGGLE_IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      }

    case SET_SET_MESSAGE_INFO:
        return {
          ...state,
          messageInfo: action.messageInfo
        }  

    default: return state
  }
}

//Action Creators

export const productActions  = {
  setProducts : (products : ProductType[]) => 
    ({
        type: SET_PRODUCTS,
        products
    } as const),

  setCurrentPage : (currentPageNumber : number) => 
    ({
      type: SET_NUMBER_PAGE,
      currentPageNumber,
    } as const),
      
  setPortionNumber : (portionNumber : number) =>
    ({
      type: SET_PORTION_NUMBER,
      portionNumber,
    } as const),

  setProductTotalCount : (productsTotalCount : number) => 
    ({
      type: PRODUCTS_TOTAL_COUNT,
      productsTotalCount,
    } as const),

  toggleIsLoading : (isLoading : boolean) => 
    ({
      type: TOGGLE_IS_LOADING,
      isLoading,
    } as const),

  setMessageInfo : (messageInfo : string) => 
    ({
        type: SET_SET_MESSAGE_INFO,
        messageInfo
    } as const),  
}


//thunks
export const requestProducts = (currentPage:number, pageSize : number):ThunkType => {
  return async (dispatch) => {
      try{
        dispatch(productActions.toggleIsLoading(true))
        dispatch(productActions.setCurrentPage(currentPage))
        const data = await productsAPI.getProducts(currentPage, pageSize)
        dispatch(productActions.setProducts(data.products))
        dispatch(productActions.setProductTotalCount(data.totalCount))
        dispatch(productActions.toggleIsLoading(false))
      }catch(err){
        if(err.response.status === CodeStatus.serverError){
           const errorMessage = err.response.data.message
               ? err.response.data.message
               : err.response.statusText
          dispatch(productActions.setMessageInfo(errorMessage))
          dispatch(productActions.toggleIsLoading(false))
          console.log(errorMessage)
       }
         dispatch(productActions.toggleIsLoading(false))
      }
  }
}

export const onProductsPageChanged = (p:number, pageSize:number):ThunkType => {
  return async (dispatch) => {
    try{
      dispatch(productActions.toggleIsLoading(true));
      sessionStorage.setItem('currentPage',JSON.stringify(p))
      dispatch(productActions.setCurrentPage(p))
      const data = await productsAPI.getProducts(p, pageSize)
      dispatch(productActions.setProducts(data.products))
      dispatch(productActions.toggleIsLoading(false))
    }catch(err){
      if(err.response.status === CodeStatus.serverError){
        const errorMessage = err.response.data.message
            ? err.response.data.message
            : err.response.statusText
       dispatch(productActions.setMessageInfo(errorMessage))
       dispatch(productActions.toggleIsLoading(false))
       console.log(errorMessage)
    }
      dispatch(productActions.toggleIsLoading(false))
    }
  }
}

type ActionsTypes = InferActionsTypes<typeof productActions>;
type ThunkType = ThunkAction< Promise<void>,AppStateType,unknown,ActionsTypes>;













