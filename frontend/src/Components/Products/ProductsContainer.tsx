import React from 'react'
import { Products } from './Products'
import { LoadingPage } from '../Common/LoadingPage/LoadingPage'
import { useAppDispatch, useAppSelector } from '../../Hooks/hooks'
import { requestProducts, onProductsPageChanged, productActions} from '../../Redux/reducers/Products-reducer'
import { getAllProducts,getProductsPageSize,getProductsCurrentPage,
         getTotalProductsCount,getProductsPortionNumber,getProductsIsLoading, getProductsMessageInfo
       } from '../../Redux/selectors/product-selector'
import { OrderType } from '../../Types/Types'
import { orderActions } from '../../Redux/reducers/Orders-reducer'
import { AnimatedPage } from '../Common/AnimatedPage/AnimatedPage'
import { ModalMessageInfo } from '../Common/ModalMessageInfo/ModalMessageInfo'


const ProductsContainer: React.FC = React.memo ( () => {

    const products = useAppSelector(getAllProducts)
    const pageSize = useAppSelector(getProductsPageSize)
    const currentPage = useAppSelector(getProductsCurrentPage)
    const totalProductsCount = useAppSelector(getTotalProductsCount)
    const portionNumber = useAppSelector(getProductsPortionNumber)
    const isLoading = useAppSelector(getProductsIsLoading)
    const messageInfo = useAppSelector(getProductsMessageInfo)
    const dispatch = useAppDispatch()


    React.useEffect( () => {
        dispatch( requestProducts(currentPage,pageSize) )
      
        return () => {
          dispatch( productActions.setProducts([]) )
        }    
    },[currentPage])

    const onPageChanged = (p:number) => {
           dispatch( onProductsPageChanged(p, pageSize) )
    }

    const setPortionNumber = (portionNumber:number) => {
            dispatch( productActions.setPortionNumber(portionNumber) )
    }

    const setNewOrder = (order: OrderType) => {
            dispatch( orderActions.setOrderAC(order) )
    }

    
  const setMessageInfo = (message:string) => {
           dispatch(productActions.setMessageInfo(message))
  }

    if(isLoading){
      return <LoadingPage />
    }
        return (
            <>
              {
                messageInfo && <ModalMessageInfo infoText = {messageInfo} 
                                                 setMessageInfo = {setMessageInfo}
                                />
              }
              <AnimatedPage>
                <Products  products = {products}
                          onPageChanged = {onPageChanged} 
                          portionNumber = {portionNumber}
                          totalProductsCount = {totalProductsCount}
                          pageSize = {pageSize}
                          currentPage = {currentPage}
                          setPortionNumber = {setPortionNumber}
                          setNewOrder = {setNewOrder}
                />
            </AnimatedPage>
           </>
        )

})

export default ProductsContainer





