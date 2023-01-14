import React from 'react'
import { useAppSelector } from '../../Hooks/hooks'
import { getIsAuth } from '../../Redux/selectors/auth-selector'
import { AnimatedPage } from '../Common/AnimatedPage/AnimatedPage'
import { Footer } from '../Footer/Footer'
import { Home } from './Home'
import style from './Home.module.css'

const HomeContainer:React.FC = React.memo( () => {
  
  const isAuth = useAppSelector(getIsAuth)

  return (
    <AnimatedPage>
      <div className = {style.homeContainer}>
        <Home isAuth = {isAuth}/>
        <Footer />
       </div>
    </AnimatedPage>
  )
})

export default HomeContainer