import React from 'react'
import style from './ProfileData.module.css'
import userIcon from '../../../Assets/Images/userIcon.png'
import { Link } from 'react-router-dom'
import { ButtonHoverGradients } from '../../Buttons/ButtonHoverGradients/ButtonHoverGradients'

type PropsType = {
        toggleSideBar : (toggle:boolean) => void
        setShowWindowGoOutQuestionHandler : (isShow:boolean) => void
        isAuth : boolean
        userPhoto : string
        userName : string
   }


export const ProfileData:React.FC<PropsType> = React.memo(({toggleSideBar,isAuth,
                                                     userPhoto,userName,setShowWindowGoOutQuestionHandler
                                                   }) => {
   
    const buttonClick = () => {
            toggleSideBar(false)
    }

    const logOutQuestion = () => {
            setShowWindowGoOutQuestionHandler(true)
    }

    return (
        
        <div className={style.container}>
            <Link to={isAuth ? '/myProfile/edit' : '/auth/login'} className={style.link}>
                <div className={style.wrapper} onClick={buttonClick}>
                    <img src={userPhoto ? `https://sport-style.onrender.com/${userPhoto}` : userIcon}
                         className={style.photo}
                         alt='userPhoto' />
                    <span className={style.info}>{userName}</span>
                </div>
            </Link>
            <ButtonHoverGradients name = 'EXIT' callback={logOutQuestion}/>
        </div>
    )
})

