import React from "react"
import style from "./SingUp.module.css"
import { Navigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../Hooks/hooks"
import { authActions, register } from "../../../Redux/reducers/Auth-reducer"
import { getAuthIsLoading, getAuthIsSuccess, getAuthMessageInfo, getIsAuth} from "../../../Redux/selectors/auth-selector"
import { RegisterValuesType } from "../../../Types/Types"
import { MatrixRain } from "../../Common/MatrixEffect/MatrixRain"
import { AnimatedPage } from "../../Common/AnimatedPage/AnimatedPage"
import { SingUp } from "./SingUp"
import { ModalMessageInfo } from "../../Common/ModalMessageInfo/ModalMessageInfo"
import { LoadingPage } from "../../Common/LoadingPage/LoadingPage"



const SingUpContainer = React.memo(() => {

  const isAuth = useAppSelector(getIsAuth)
  const isLoading = useAppSelector(getAuthIsLoading)
  const isSuccess = useAppSelector(getAuthIsSuccess)
  const messageInfo = useAppSelector(getAuthMessageInfo)
  const dispatch = useAppDispatch()

  const setUserRegisterData = (registerDataValues: RegisterValuesType) => {
    dispatch(register(registerDataValues))
  }

  const setMessageInfo = (message:string) => {
    dispatch(authActions.setMessageInfo(message))
  }

  const setIsSuccess = (isSuccess: boolean) => {
    dispatch(authActions.setIsSuccessAC(isSuccess))
  }

  if (isAuth) {
    return <Navigate to = {'/home'}/>
  }

  if (isLoading) {
    return <LoadingPage />
  }

  return (
    <>
      {
        messageInfo && <ModalMessageInfo infoText = {messageInfo} 
                                         setMessageInfo = {setMessageInfo}
                                         isSuccess = {isSuccess}
                                         setIsSuccess = {setIsSuccess}
                                />
      }
      <AnimatedPage>
        <div className={style.container}>
          <MatrixRain />
          <SingUp setUserRegisterData={setUserRegisterData} isLoading={isLoading}/>
        </div>
      </AnimatedPage>
    </>
  )
})

export default SingUpContainer




