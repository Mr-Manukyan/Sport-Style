import React from 'react'
import style from './Header.module.css'
import { OrderType, UserDataType } from '../../Types/Types'
import { Logo } from './Logo/Logo'
import { MenuItems } from './MenuItems/MenuItems'
import { Button } from './Button/Button'
import { LogoBars } from './LogoBars/LogoBars'
import { Basket } from './Basket/Basket'
import { ProfileData } from './ProfileData/ProfileData'
import { SidebarData } from './SidebarData'
import { isOwnerSideBarData } from './isOwnerSideBarData'

type PropsType = {
    sidebar : boolean
    isAuth : boolean
    orders : OrderType[]
    userData : UserDataType
    setShowWindowGoOutQuestionHandler : (isShow:boolean) => void
    setSidebar : (toggle:boolean) => void
}

export const Header:React.FC<PropsType> = React.memo ( ({sidebar,setSidebar,orders,
                                                        isAuth,userData,
                                                        setShowWindowGoOutQuestionHandler
                                                      }) => {
    return (

        <header className={style.headerContainer}>
          <Logo toggleSideBar={setSidebar} />
            <nav className={style.navbarItems}>
                <MenuItems sidebar={sidebar}  toggleSideBar={setSidebar}
                           sideBarData = {isAuth ? isOwnerSideBarData : SidebarData}
                />
            </nav>
                <div className = {style.basketAndButtonWrapper}>
                   <Basket quantityProducts = {orders.length}
                           toggleSideBar={setSidebar}
                   />

                    {isAuth 
                        ? <ProfileData userName = {userData.userName}
                                       userPhoto = {userData.userPhoto}
                                       isAuth = {isAuth}
                                       toggleSideBar={setSidebar}
                                       setShowWindowGoOutQuestionHandler = {setShowWindowGoOutQuestionHandler}
                           />
                        : <Button toggleSideBar={setSidebar} /> 
                    }

                </div>
                <LogoBars toggleSideBar={setSidebar} sidebar={sidebar} />
            <span className = {style.borderShadow}></span>
        </header>
    )
})



