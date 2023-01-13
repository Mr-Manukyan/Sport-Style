import React from 'react'
import { useAppSelector } from '../../Hooks/hooks'
import { getIsAuth } from '../../Redux/selectors/auth-selector'
import { AnimatedPage } from '../Common/AnimatedPage/AnimatedPage'
import { AboutUs } from './AboutUs'
import { aboutUsData } from './aboutUsDataInfo'


const AboutUsContainer:React.FC = React.memo(() => {

   const isAuth = useAppSelector(getIsAuth)

    return (
      <AnimatedPage>
         <AboutUs isAuth = {isAuth} infoData = { aboutUsData }/>
      </AnimatedPage>
    )
})

export default AboutUsContainer