import React from 'react'
import style from './LogoBars.module.css'
import { FaBars } from 'react-icons/fa'
import { AiOutlineClose } from 'react-icons/ai'
import { playBtnSound } from '../../../Utils/helpers/helpers'

type PropsType = {
    sidebar: boolean
    toggleSideBar : (toggle:boolean) => void 
}

export const LogoBars:React.FC<PropsType> = React.memo( ({sidebar,toggleSideBar}) => {

    const onClickMenuBarHandler = (toggle:boolean) => {
                playBtnSound()
                toggleSideBar(toggle)
    }

    return (
        <div className={style.menuIcon} >
            {sidebar ? <span className={style.close} onClick={()=> onClickMenuBarHandler(false)}>
                                <AiOutlineClose />
                       </span>
                     : <span className={style.bars}onClick={()=> onClickMenuBarHandler(true)}>
                                <FaBars />
                       </span>
            }
        </div>
    )
})



