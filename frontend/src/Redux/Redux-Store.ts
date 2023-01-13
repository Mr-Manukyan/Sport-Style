import { configureStore } from '@reduxjs/toolkit'
import { ThunkAction } from 'redux-thunk'
import { combineReducers, AnyAction} from 'redux'

import { appReducer } from './reducers/App-reducer'
import { productsReducer } from './reducers/Products-reducer'
import { ordersReducer } from './reducers/Orders-reducer'
import { ordersHistoryReducer } from './reducers/OrdersHistory-reducer'
import { authReducer } from './reducers/Auth-reducer'

const rootReducer = combineReducers({
    productsPage : productsReducer,
    ordersPage : ordersReducer,
    historyPage : ordersHistoryReducer,
    auth : authReducer,
    app : appReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  })

export type AppDispatch = typeof store.dispatch
export type AppStateType = ReturnType<typeof store.getState>

export type InferActionsTypes<T> = T extends { [key : string] : (...arg:any[]) => infer U } ? U : never 
export type BaseThunkType<ReturnType = Promise<void>> = ThunkAction<ReturnType, AppStateType, unknown,AnyAction>

//@ts-ignore
window.store = store

export default store