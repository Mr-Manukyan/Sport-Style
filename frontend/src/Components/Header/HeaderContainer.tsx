import React from "react"
import { useNavigate } from "react-router-dom"
import { UserDataType } from "../../Types/Types"
import { authActions } from "../../Redux/reducers/Auth-reducer"
import { getOrders } from "../../Redux/selectors/order-selector"
import { getIsAuth } from "../../Redux/selectors/auth-selector"
import { getUserData } from "../../Redux/selectors/user-selector"
import { useAppDispatch, useAppSelector } from "../../Hooks/hooks"
import { Header } from "./Header"
import { Modal } from "../Common/Modal/Modal"

export const HeaderContainer = React.memo(() => {

  const [sidebar, setSidebar] = React.useState(false)
  const [showWindowQuestion, setShowWindowQuestion] = React.useState(false)

  const orders = useAppSelector(getOrders)
  const userData = useAppSelector(getUserData)
  const isAuth = useAppSelector(getIsAuth)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const setShowWindowGoOutQuestionHandler = (isShow : boolean) => {
    setShowWindowQuestion(isShow)
  }

  const setLogOut = () => {
          localStorage.clear()
          dispatch(authActions.setIsAuthAC(false))
          dispatch(authActions.setAuthUserData({} as UserDataType))
          setShowWindowGoOutQuestionHandler(false)
          navigate("/products")
          setSidebar(false)
  }

  return (
    <>
      {showWindowQuestion && <Modal setShowModal={setShowWindowGoOutQuestionHandler} 
                                    setLogOut = {setLogOut}
                              />}
      <Header
        setShowWindowGoOutQuestionHandler = {setShowWindowGoOutQuestionHandler}
        orders={orders}
        userData={userData}
        isAuth={isAuth}
        sidebar={sidebar}
        setSidebar={setSidebar}
      />
    </>
  )
})
