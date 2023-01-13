import React from 'react'
import style from './SingIn.module.css'
import { authActions, login } from '../../../Redux/reducers/Auth-reducer'
import { getAuthIsLoading, getAuthIsSuccess, getAuthMessageInfo, getIsAuth} from '../../../Redux/selectors/auth-selector'
import { LoginValuesType } from '../../../Types/Types'
import { useAppDispatch, useAppSelector } from '../../../Hooks/hooks'
import { SingIn } from './SingIn'
import { MatrixRain } from '../../Common/MatrixEffect/MatrixRain'
import { AnimatedPage } from '../../Common/AnimatedPage/AnimatedPage'
import { Navigate } from 'react-router-dom'
import { ModalMessageInfo } from '../../Common/ModalMessageInfo/ModalMessageInfo'
import { LoadingPage } from '../../Common/LoadingPage/LoadingPage'



 const SingInContainer = React.memo( () => {
 
    const isAuth = useAppSelector(getIsAuth)
    const isLoading = useAppSelector(getAuthIsLoading)
    const isSuccess = useAppSelector(getAuthIsSuccess)
    const messageInfo = useAppSelector(getAuthMessageInfo)
    const dispatch = useAppDispatch()

    const setUserLoginData =  (loginDataValues:LoginValuesType) => {
        dispatch(login(loginDataValues))
    }

    const setMessageInfo = (message:string) => {
      dispatch(authActions.setMessageInfo(message))
    };
  
    const setIsSuccess = (isSuccess: boolean) => {
      dispatch(authActions.setIsSuccessAC(isSuccess))
    };

    
    if (isAuth) {
      return <Navigate to = {'/'}/>
    }

    if (isLoading) {
        return <LoadingPage/>
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
              <div className = {style.container}>
                <MatrixRain/>
                <SingIn setUserLoginData = {setUserLoginData} isLoading = {isLoading}/>
              </div>
          </AnimatedPage>
        </>
      ) 
})

export default SingInContainer




  
