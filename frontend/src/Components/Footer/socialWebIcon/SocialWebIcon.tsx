import React from 'react'
import style from './SocialWebIcon.module.css'
import {CgFacebook} from 'react-icons/cg'
import { FiLinkedin } from 'react-icons/fi'
import { FaGithub } from 'react-icons/fa'


type PropsType = {
    linkdin:string
    github : string
    facebook : string
}

export const SocialWebIcon:React.FC<PropsType> = React.memo ( ({linkdin, github, facebook}) => {
    return (
        <div className={style.container}>
            
                <div className = {style.iconWrapper}>
                    <a target="_blank"  href = {facebook} 
                       className = { `${style.link} ${style.linkFacebook}`}
                       rel="noreferrer"
                    >
                      <CgFacebook />
                    </a>
                </div>
            
                <div className = {style.iconWrapper}>
                    <a target="_blank" href = {github}
                       className = {`${style.link} ${style.linkGithub}`}
                       rel="noreferrer"
                    >
                        <FaGithub />
                   </a>
                </div>

                <div className = {style.iconWrapper}>
                    <a target="_blank" href = {linkdin} 
                      className = {`${style.link} ${style.linkLinkedin}` }
                      rel="noreferrer"
                    >
                        <FiLinkedin />
                   </a>
                </div>
        </div>
    )
})

