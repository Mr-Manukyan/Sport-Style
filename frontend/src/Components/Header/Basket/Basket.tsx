import React from 'react'
import style from './Basket.module.css'
import { NavLink } from 'react-router-dom'
import backpack from '../../../Assets/Images/backpack.png'


type PropsType = {
    toggleSideBar : (toggle: boolean) => void
    quantityProducts : number
}

export const Basket:React.FC<PropsType> = React.memo(({toggleSideBar,quantityProducts}) => {

    const buttonClick = () => {
         toggleSideBar(false)
    }

    return (
        <div className={style.basketWrapper} onClick = {buttonClick}>
            <NavLink to='/orders' className={style.basket}>
                <span className={style.infoQuantity}>
                    {quantityProducts ? quantityProducts : 0}
                </span>
                <img  className = {style.image} src = {backpack} alt = 'backpack'/>
            </NavLink>

        </div>
    )
})



