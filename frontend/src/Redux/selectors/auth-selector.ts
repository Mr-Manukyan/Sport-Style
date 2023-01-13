import { AppStateType } from "../Redux-Store";

export const getIsAuth = (state:AppStateType) => {
    return  state.auth.isAuth;
}

export const getAuthMessageInfo = (state:AppStateType) => {
    return  state.auth.messageInfo;
}

export const getAuthIsSuccess = (state:AppStateType) => {
    return  state.auth.isSuccess;
}

export const getAuthIsLoading = (state:AppStateType) => {
    return  state.auth.isLoading;
}

