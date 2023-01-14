import React from 'react'
import { Route, Routes, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import { useAppDispatch, useAppSelector } from './Hooks/hooks'
import { withSuspense } from './Components/Common/HOC/withSuspense'
import { initializeApp } from './Redux/reducers/App-reducer'
import { getOrders } from './Redux/selectors/order-selector'
import { getIsAppInitialized } from './Redux/selectors/app-selector'
import { HeaderContainer} from './Components/Header/HeaderContainer'
import { LoadingPage } from './Components/Common/LoadingPage/LoadingPage'
import './App.css'

const HomeContainer = React.lazy( () => import('./Components/Home/HomeContainer'))
const AboutUsContainer = React.lazy( () => import('./Components/AboutUs/AboutUsContainer'))
const ContactUsContainer = React.lazy( () => import('./Components/ContactUs/ContactUsContainer'))
const SingInContainer = React.lazy(() => import('./Components/Authentication/singIn/SingInContainer'))
const SingUpContainer = React.lazy(() => import('./Components/Authentication/singinUp/SingUpContainer'))
const MyProfileEditorContainer = React.lazy(() => import('./Components/Header/ProfileData/MyProfileEditor/MyProfileEditorContainer'))
const OrdersContainer = React.lazy(() => import('./Components/Orders/OrdersContainer'))
const ProductsContainer = React.lazy(() => import('./Components/Products/ProductsContainer'))
const OrdersHistoryContainer = React.lazy(() => import('./Components/Orders-History/OrdersHistoryContainer'))
const NotFound = React.lazy(() => import('./Components/NotFound/NotFound'))
const HomeContainerLazy = withSuspense(HomeContainer)
const AboutUsContainerLazy = withSuspense(AboutUsContainer)
const ContactUsContainerLazy = withSuspense(ContactUsContainer)
const SingInContainerLazy = withSuspense(SingInContainer)
const SingUpContainerLazy = withSuspense(SingUpContainer)
const MyProfileEditorContainerLazy = withSuspense(MyProfileEditorContainer)
const OrdersContainerLazy = withSuspense(OrdersContainer)
const ProductsContainerLazy = withSuspense(ProductsContainer)
const OrdersHistoryContainerLazy = withSuspense(OrdersHistoryContainer)
const NotFoundPageLazy = withSuspense(NotFound)


export const App = React.memo( () => {
  
  const dispatch = useAppDispatch()
  const location = useLocation()
  const initialized = useAppSelector(getIsAppInitialized)
  const orders = useAppSelector(getOrders)

  React.useEffect( () => {
    dispatch( initializeApp() )
  },[])

  React.useEffect(() => {
    sessionStorage.setItem('orders',JSON.stringify(orders))
  },[orders])

  if(!initialized){
    return <LoadingPage />
  }

    return (
      <div className="App-continer">
        <HeaderContainer />
        <AnimatePresence mode='wait'>
          <Routes key={location.pathname} location={location}>
            <Route path='/' element={ <HomeContainerLazy /> } />
            <Route path="/home" element={ <HomeContainerLazy /> } />
            <Route path='/aboutUs' element={ <AboutUsContainerLazy /> } />
            <Route path='/contact' element={ <ContactUsContainerLazy /> } />
            <Route path="/auth/login" element={ <SingInContainerLazy /> } />
            <Route path="/auth/register" element={ <SingUpContainerLazy /> } />
            <Route path="/myProfile/edit" element={ <MyProfileEditorContainerLazy /> } />
            <Route path="/products" element={ <ProductsContainerLazy /> } />
            <Route path="/orders" element={ <OrdersContainerLazy /> } />
            <Route path='/orders/history'  element={ <OrdersHistoryContainerLazy /> }  /> 

            <Route path="*" element={ <NotFoundPageLazy />} />
          </Routes>
        </AnimatePresence>
        <LoadingPage zIndex = {-1000} />
      </div>
    )
})

       
    
        

