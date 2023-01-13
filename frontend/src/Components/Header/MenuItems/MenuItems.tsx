import React from 'react'
import style from './MenuItems.module.css'
import { Item } from './Item/Item'
import { SidebarDataType } from '../../../Types/Types'


type PropsType = {
        sidebar : boolean
        toggleSideBar : (toggle:boolean) => void
        sideBarData : SidebarDataType[]
}

export const MenuItems:React.FC<PropsType> = React.memo(({sidebar,toggleSideBar,
                                                          sideBarData
                                                        }) => {
    const [width, setWidth] = React.useState('')
    const [left, setLeft] = React.useState('')
    const indicator = (e:any) => {
            setLeft(e.target.offsetLeft+'px');
            setWidth(e.target.offsetWidth+'px');  
    }

    return (
        <ul className={sidebar ? `${style.navMenu} ${style.active}` : style.navMenu}>
            {sideBarData.map((item, index) => {
            
                return <Item key={index} 
                             itemData ={item} 
                             toggleSideBar={toggleSideBar}
                             indicator = {indicator}
                       />
            })}
           <div className = {style.indicator}  style = {{width,left}}></div>
        </ul>     
    )
})



