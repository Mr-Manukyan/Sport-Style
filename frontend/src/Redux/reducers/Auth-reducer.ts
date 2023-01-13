import { profileAPI } from './../../API-request/profile_api'
import { BaseThunkType } from '../Redux-Store'
import { InferActionsTypes } from "../Redux-Store"
import {RegisterValuesType,LoginValuesType, CodeStatus, UserDataType} from "../../Types/Types"
import { authAPI } from '../../API-request/auth_api'

const SET_USER_DATA = "My-Project/auth/SET-USER-DATA"
const SET_USER_PHOTO = "My-Project/Profile/SET_USER_PHOTO"
const SET_USER_NAME = "My-Project/Profile/SET_USER_NAME"
const SET_ISLOADING = "My-Project/Auth/SET_ISLOADING"
const SET_IS_AUTH = "My-Project/Auth/SET_IS_AUTH"
const REMOVE_USER_DATA = "My-Project/Auth/REMOVE_USER_DATA"
const SET_MESSAGE_INFO = "Project/Auth/SET_MESSAGE_INFO"
const SET_IS_SUCCESS = "Project/Auth/SET_IS_SUCCESS"

type initialStateType = typeof initialState

let initialState = {
  user : {} as UserDataType,
  isLoading: false,
  isAuth: false,
  messageInfo: "",
  isSuccess: false,
}

export const authReducer = (state = initialState,action: ActionsTypes ): initialStateType => {
  switch (action.type) {
    
    case SET_USER_DATA:
        return {
          ...state,
          user : {...action.payload},
        }

    case REMOVE_USER_DATA:
        return {
          ...state,
          user : action.userData,
    }

    case SET_USER_PHOTO:
        return {
          ...state,
          user: {
            ...state.user,
            userPhoto: action.photo,
          }
      }

    case SET_USER_NAME:
        return {
          ...state,
          user: {
            ...state.user,
            userName: action.newUserName,
          }
      }

    case SET_ISLOADING:
        return {
          ...state,
          isLoading: action.isLoading,
        }

    case SET_IS_AUTH:
        return {
          ...state,
          isAuth: action.isAuth,
        }

    case SET_MESSAGE_INFO:
        return {
          ...state,
          messageInfo: action.message,
        }
  
    case SET_IS_SUCCESS:
        return {
          ...state,
          isSuccess: action.isSuccess,
        }

    default:
      return state
  }
}

// ActionCreator

export const authActions = {
  setAuthUserData: (userData: UserDataType) =>
    ({
      type: SET_USER_DATA,
      payload:userData,
    } as const),

  removeAuthUserData: (userData: UserDataType, isAuth:boolean) =>
    ({
      type: REMOVE_USER_DATA,
      userData,
      isAuth
    } as const),  

  setUserPhoto: (photo: string) =>
    ({
      type: SET_USER_PHOTO,
      photo,
    } as const),

  setUserName: (newUserName: string) =>
    ({
      type: SET_USER_NAME,
      newUserName,
    } as const),

  setIsLoading: (isLoading: boolean) =>
    ({
      type: SET_ISLOADING,
      isLoading,
    } as const),

  setIsAuthAC: (isAuth: boolean) =>
    ({
      type: SET_IS_AUTH,
      isAuth,
    } as const),

  setMessageInfo: (message: string) =>
    ({
      type: SET_MESSAGE_INFO,
      message,
    } as const),

  setIsSuccessAC: (isSuccess: boolean) =>
    ({
      type: SET_IS_SUCCESS,
      isSuccess,
    } as const),

}

// Thunks

export const register = (registerDataValues:RegisterValuesType): ThunkType => {
  return async (dispatch) => {
    try {
      dispatch(authActions.setIsLoading(true));
      const data = await authAPI.postAuthRegsterData(registerDataValues)
      if (data.success) {
          dispatch(authActions.setIsSuccessAC(true))
          dispatch(authActions.setMessageInfo(data.message))
      }
      dispatch(authActions.setIsLoading(false))
    } catch (err) {
      
         if(err.response.status === CodeStatus.conflict ||
            err.response.status === CodeStatus.serverError){
             const errorMessage = err.response.data.message
                 ? err.response.data.message
                 : err.response.statusText
            dispatch(authActions.setMessageInfo(errorMessage))
         }
           dispatch(authActions.setIsLoading(false))
    }
  }
}

export const login = (loginDataValues: LoginValuesType): ThunkType => {
  return async (dispatch) => {
    try{
      dispatch(authActions.setIsLoading(true))
      const data = await authAPI.postAuthLoginData(loginDataValues)
      if(data.resultCode === CodeStatus.ok){
         dispatch(authActions.setIsAuthAC(true))
         dispatch(authActions.setAuthUserData(data.userData))
      }
      dispatch(authActions.setIsLoading(false))
    }catch(err){
       if(err.response.status === CodeStatus.unAuthorized ||
          err.response.status === CodeStatus.notFound || 
          err.response.status === CodeStatus.serverError){
          const errorMessage = err.response.data.message
                            ? err.response.data.message
                            : err.response.statusText  
          dispatch(authActions.setMessageInfo(errorMessage))
       } 
       dispatch(authActions.setIsLoading(false))
    }
  }
}


export const getAuthUserData = (): ThunkType => {
  return async (dispatch) => {
    try {
      dispatch(authActions.setIsLoading(true))
      const data = await profileAPI.getMyProfile()
      if(data.resultCode === CodeStatus.ok){
        dispatch(authActions.setAuthUserData(data.userData))
        dispatch(authActions.setIsAuthAC(true))
      }
      dispatch(authActions.setIsLoading(false))
    } catch (err) {
        if(err.response.data === CodeStatus.unAuthorized){
          dispatch(authActions.setAuthUserData({} as UserDataType))
          dispatch(authActions.setIsAuthAC(false))
          localStorage.clear()
        }
        dispatch(authActions.setIsLoading(false))
    } 
  }
}

export const updateUserName = (newUserName: string): ThunkType => {
  return async (dispatch) => {
    try {
      dispatch(authActions.setIsLoading(true))
      const data = await profileAPI.updateUserName(newUserName)
      dispatch(authActions.setIsLoading(false))
      if (data.resultCode === CodeStatus.ok) {
        dispatch(authActions.setUserName(data.userData.userName))
      }
    } catch (err) {
      if(err.response.status === CodeStatus.notFound ||
         err.response.status === CodeStatus.serverError){
         const errorMessage = err.response.data.message
             ? err.response.data.message
             : err.response.statusText; 
        dispatch(authActions.setMessageInfo(errorMessage))
        dispatch(authActions.setIsLoading(false))
      }
      dispatch(authActions.setIsLoading(false))
    } 
  }
}

export const savePhoto = (file: File): ThunkType => {
  return async (dispatch) => {
    try {
      dispatch(authActions.setIsLoading(true))
      const data = await profileAPI.updateProfilPhoto(file)
      if (data.resultCode === CodeStatus.ok) {
        dispatch(authActions.setUserPhoto(data.userData.userPhoto))
        dispatch(authActions.setIsLoading(false))
      }
    } catch (err) {
      if(err.response.status === CodeStatus.notFound ||
        err.response.status === CodeStatus.serverError){
        const errorMessage = err.response.data.message
            ? err.response.data.message
            : err.response.statusText 
       dispatch(authActions.setMessageInfo(errorMessage))
       dispatch(authActions.setIsLoading(false))
     }
      dispatch(authActions.setIsLoading(false))
    } 
  }
}


type ActionsTypes = InferActionsTypes<typeof authActions>;
type ThunkType = BaseThunkType
