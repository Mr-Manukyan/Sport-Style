import React from 'react'
import { useAppSelector } from '../../Hooks/hooks'
import { getIsAuth } from '../../Redux/selectors/auth-selector'
import { AnimatedPage } from '../Common/AnimatedPage/AnimatedPage'
import { Home } from './Home'

const HomeContainer:React.FC = React.memo( () => {
  
  const isAuth = useAppSelector(getIsAuth)

  return (
    <AnimatedPage>
       <Home isAuth = {isAuth}/>
    </AnimatedPage>
  )
})

export default HomeContainer