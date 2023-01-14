import React from 'react'
import style from './Item.module.css'
import { NavLink } from 'react-router-dom'
import { SidebarDataType } from '../../../../Types/Types'
import { playBtnSound } from '../../../../Utils/helpers/helpers'


type PropsType = {
    itemData : SidebarDataType
    toggleSideBar: (toggle: boolean) => void 
    indicator : ( e: any) => void 
}

export const Item:React.FC<PropsType> = React.memo ( ({ itemData,toggleSideBar,
                                                        indicator,
                                                    }) => {

  const buttonClick = () => {
          playBtnSound()
          toggleSideBar(false)
  }

  return (
        
      <li className = {style.linkWrapper}>
                  <NavLink to={ itemData.path } 
                           onMouseMove={indicator} data-text = {itemData.title}
                           onClick = {buttonClick} 
                           className={({ isActive }) => isActive ? style.activeLink : style[itemData.cName]}
                  >
                      {itemData.title}
                  </NavLink>
      </li>
    )
})



