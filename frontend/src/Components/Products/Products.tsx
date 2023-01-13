import React from 'react'
import style from './Products.module.css'
import Pagination from '../Common/Pagination/Pagination'
import { ProductCard } from './ProductCard/ProductCard'
import { OrderType, ProductType } from '../../Types/Types'
import { MatrixRain } from '../Common/MatrixEffect/MatrixRain'

type PropsType = {
  products : ProductType[]
  pageSize : number
  totalProductsCount : number
  portionNumber : number
  currentPage : number
  onPageChanged : (pageNumber: number) => void
  setPortionNumber : (portionNumber: number) => void
  setNewOrder : (order:OrderType) => void
}

export const Products:React.FC<PropsType> = React.memo(({ products,pageSize,totalProductsCount,portionNumber,
                                                          currentPage,setPortionNumber,onPageChanged,setNewOrder
                                                      }) => {

  return (

    <div className={style.container}>
        <MatrixRain />
        <div className={style.productsContainer}>
           {products.map((product) => (
              <div key={product._id} className={style.productCardContainer}>
                 <ProductCard  product = {product}
                               setNewOrder={setNewOrder}
                 />  
             </div>
            ))}
            </div>
            <div className = {style.paginationWrapper}>
              <Pagination totalItemsCount={totalProductsCount}
                          pageSize={pageSize}
                          portionNumber={portionNumber}
                          currentPage={currentPage}
                          onPageChanged={onPageChanged}
                          setPortionNumber={setPortionNumber}
              />
            </div>
     
    </div>
  )
})

