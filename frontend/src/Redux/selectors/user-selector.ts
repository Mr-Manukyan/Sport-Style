import { AppStateType } from "../Redux-Store"

export const getUserData = (state:AppStateType) => {
    return  state.auth.user
}
