import React, { useState, useRef } from "react"
import { Link, Navigate } from "react-router-dom"
import { UserDataEditorType } from "../../../../Types/Types"
import { useAppDispatch, useAppSelector } from "../../../../Hooks/hooks"
import { getUserData } from "../../../../Redux/selectors/user-selector"
import { authActions, savePhoto, updateUserName } from "../../../../Redux/reducers/Auth-reducer"
import { getAuthIsLoading,getAuthMessageInfo, getIsAuth } from "../../../../Redux/selectors/auth-selector"
import style from "./MyProfileEditor.module.css"
import { VscSignOut } from "react-icons/vsc"
import userIcon from "../../../../Assets/Images/userIcon.png"
import { MyProfileEditor } from "./MyProfileEditor"
import { MatrixRain } from "../../../Common/MatrixEffect/MatrixRain"
import { AnimatedPage } from "../../../Common/AnimatedPage/AnimatedPage"
import { LoadingPage } from "../../../Common/LoadingPage/LoadingPage"
import { ModalMessageInfo } from "../../../Common/ModalMessageInfo/ModalMessageInfo"


const MyProfileEditorContainer = React.memo(() => {

  let currentImage = useRef()

  const isLoading = useAppSelector(getAuthIsLoading)
  const { userPhoto, userName } = useAppSelector(getUserData)
  const messageInfo = useAppSelector(getAuthMessageInfo)

  const isAuth = useAppSelector(getIsAuth)
  const dispatch = useAppDispatch()


  const [profileImage, setProfileImage] = useState(
    userPhoto ? `https://sport-style.onrender.com/${userPhoto}` : userIcon
  )
 
  const onChangeProfilePhoto = (e: any) => {
    if (e.target.files.length) {
      currentImage.current = e.target.files[0]
      let reader = new FileReader()
      reader.onload = (e: any) => {
        setProfileImage(e.target.result)
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const setMessageInfo = (message:string) => {
         dispatch(authActions.setMessageInfo(message))
  }

  const changeUserData = (data:UserDataEditorType) => {
    if(data.userName !== userName){
        dispatch( updateUserName(data.userName) )
    }
    if(currentImage.current){
        dispatch(savePhoto(currentImage.current) )
    }
  }

  if (isLoading) {
    return <LoadingPage />
  }

  if (!isAuth) {
    return <Navigate to='/auth/login' />
  }

  return (
    <>
      {
        messageInfo && <ModalMessageInfo infoText = {messageInfo} 
                                         setMessageInfo = {setMessageInfo}
                       />
      }
    <AnimatedPage>
      <div className={style.container}>
        <MatrixRain />
        <div className={style.editorWrapper}>
          <div className={style.editorBody}>
            <Link to = {'/products'} className={style.close}>
              {<VscSignOut />}
            </Link>
            <MyProfileEditor changeUserData={changeUserData}
                             onChangeProfilePhoto={onChangeProfilePhoto}
                             profileImage={profileImage}
                             userName = {userName}
            />
          </div>
        </div>
      </div>
    </AnimatedPage>
    </>  
  )
})

export default MyProfileEditorContainer
