import { BaseThunkType } from "../Redux-Store"
import { InferActionsTypes } from "../Redux-Store"
import { getAuthUserData } from "./Auth-reducer"

const SET_INITIALIZED = "Project/App/SET_INITIALIZED"

type initialStateType = typeof initialState

let initialState = {
  isAppInitialized: false,
}

export const appReducer = (state = initialState,action: ActionsTypes): initialStateType => {

  switch (action.type) {

    case SET_INITIALIZED:
      return {
        ...state,
        isAppInitialized: true,
      }

    default:
      return state
  }
}

export const appActions = {

  initializedSuccess: () =>
    ({
      type: SET_INITIALIZED,
    } as const),

}

export const initializeApp = (): ThunkType => {
  return async (dispatch) => {
    let resultGetAuthUserData = await dispatch(getAuthUserData())
    Promise.all([resultGetAuthUserData])
      .then(() => {
        dispatch(appActions.initializedSuccess())
      })
      .catch((err) => console.log(err))
  }
}

type ActionsTypes = InferActionsTypes<typeof appActions>
type ThunkType = BaseThunkType
