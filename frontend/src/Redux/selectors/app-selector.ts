import { AppStateType } from "../Redux-Store"

export const getIsAppInitialized = (state:AppStateType) => {
    return  state.app.isAppInitialized
}
