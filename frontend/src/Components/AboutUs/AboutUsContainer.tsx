import React from 'react'
import { useAppSelector } from '../../Hooks/hooks'
import { getIsAuth } from '../../Redux/selectors/auth-selector'
import { AnimatedPage } from '../Common/AnimatedPage/AnimatedPage'
import { AboutUs } from './AboutUs'
import { aboutUsData } from './aboutUsDataInfo'
import style from './AboutUs.module.css'
import { Footer } from '../Footer/Footer'


const AboutUsContainer:React.FC = React.memo(() => {

   const isAuth = useAppSelector(getIsAuth)

    return (
      <AnimatedPage>
         <div className = {style.aboutUsContainer}>
           <AboutUs isAuth = {isAuth} infoData = { aboutUsData }/>
           <Footer />
       </div>
      </AnimatedPage>
    )
})

export default AboutUsContainer