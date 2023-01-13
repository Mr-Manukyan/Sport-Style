import React from "react"
import style from "./OrdersHistoryBasket.module.css"
import { GoHistory } from "react-icons/go"
import { motion } from "framer-motion"
import { CounterOdometer } from "../../Orders/Odometer/CounterOdometer"
import { FcSearch } from "react-icons/fc"
import { BsTrash } from "react-icons/bs"
import { SearchByPrice } from "../../Common/SearchByPrice/SearchByPrice"
import { useAppDispatch, useAppSelector } from "../../../Hooks/hooks"
import { getOrdersHistoryCurrentPage, getOrdersHistoryPageSize, 
         getOrdersHistoryPortionNumber, getOrdersHistorysearchByDateTotalCount, 
         getOrdersHistorySearchByPirceTotalCount, getOrdersHistoryTotalOrdersCount 
       } from "../../../Redux/selectors/orders-history-selector"
import Pagination from "../../Common/Pagination/Pagination"
import { MyCalendar } from "../../Common/Calendar/Calendar"
import logoBack from '../../../Assets/Images/arrow.png'
import { getOrdersHistory } from "../../../Redux/reducers/OrdersHistory-reducer"
import { playBtnMinusPlus, playBtnSound, playBtnSound2 } from "../../../Utils/helpers/helpers"


type PropsType = {
  children: React.ReactNode
  ordersTotalPrice: number
  ordersLength : number
  onPageChanged : (pageNumber: number) => void
  setPortionNumber : (portionNumber: number) => void
  removeAllOrdersHistory: () => void
};

const animationsTop = {
  initial : {
      opacity : 0,
      y: '-100%',
  
  },
  animate : {
      opacity : 1,
      y: 0
  },
  exit : {
      opacity: 0,
      y : '100%',
  
  }
}

export const OrdersHistoryBasket: React.FC<PropsType> = ({
  children,
  ordersTotalPrice,
  ordersLength,
  onPageChanged,
  setPortionNumber,
  removeAllOrdersHistory,

}) => {
  
  const [isSearchByPriceShow, setIsSearchByPriceShow] = React.useState(false)
  const [isSearchByDateShow, setIsSearchByDateShow] = React.useState(false)


  const dispatch = useAppDispatch()
  const currentPage = useAppSelector(getOrdersHistoryCurrentPage)
  const pageSize = useAppSelector(getOrdersHistoryPageSize)
  const portionNumber = useAppSelector(getOrdersHistoryPortionNumber)
  const totalOrdersCount = useAppSelector(getOrdersHistoryTotalOrdersCount)
  const searchByPirceTotalCount = useAppSelector(getOrdersHistorySearchByPirceTotalCount)
  const searchByDateTotalCount = useAppSelector(getOrdersHistorysearchByDateTotalCount)

  const goToBackAllOrderHistory = () => {
    playBtnSound()
    dispatch( getOrdersHistory(currentPage) ) 
  }




  return (
    <div className={style.container}>

          { isSearchByPriceShow && <>
                                     <div className = {style.searchByPriceWrapper} 
                                          onClick={() => {
                                                   playBtnSound2()
                                                   setIsSearchByPriceShow(false)
                                                  }}>
                                     </div>
                                     <motion.div className = {style.searchByPriceBody}
                                                 initial = 'initial'
                                                 animate = 'animate'
                                                 exit = 'exit'
                                                 variants={  animationsTop }
                                                 transition={{duration: 0.3}}
                                     >
                                      <SearchByPrice /> 
                                     </motion.div>
                                    </>
          }
          { isSearchByDateShow && <>
                                     <div className = {style.searchByDateWrapper} 
                                          onClick={() => {
                                                    playBtnSound2()
                                                    setIsSearchByDateShow(false)
                                                  }}>
                                     </div>
                                     <motion.div className = {style.searchByDateBody}
                                                 initial = 'initial'
                                                 animate = 'animate'
                                                 exit = 'exit'
                                                 variants={  animationsTop }
                                                 transition={{duration: 0.3}}
                                     >
                                       <MyCalendar  setIsSearchByDateShow = {setIsSearchByDateShow}
                                                   
                                       /> 
                                     </motion.div>
                                    </>
          }  

        <motion.div className={ordersLength ? style.bodyWrapper : style.bodyWrapperEmpty} layout 
                    transition={{duration : .4}}>

          { (searchByPirceTotalCount || searchByDateTotalCount) && 
             <div className = {style.logoBackBody} onClick = {goToBackAllOrderHistory}>
              <img src = {logoBack} className = {style.logoBack} alt = 'logoBack'/>
             </div>
          } 

          <div className={style.cartWrapper}>
            <GoHistory className={style.cart} />
            <h4 className={style.paragraph}>{"Orders History Basket"}</h4>
          </div>
          {ordersLength 
          ? <>
              <div className={style.removeButtonWrapper}>
                <button className={style.removeAllOrder} onClick={removeAllOrdersHistory}>
                  {"Remove all orders"}
                </button>
              </div>
               <div className={style.infoContainer}>
                     <div className={style.numberInfo}>{'N'}</div>                             
                        <div className={style.dateInfo}>{'Date'} 
                          <span  onClick={() => {
                                           playBtnMinusPlus()
                                           setIsSearchByDateShow(true)
                                          }}>
                            <FcSearch />
                          </span>
                        </div>
                    <div className={style.timeInfo}>{'Hour'}</div>
                    <div className={style.moneyInfo}>{'Price'}
                        <span onClick={() => {
                                        playBtnMinusPlus()
                                        setIsSearchByPriceShow(true)
                                      }}>
                          <FcSearch />
                        </span>
                    </div>
                    <div className={style.removeOrder}>{<BsTrash />}</div>
                </div>
          
                {children }
                
                <div className={style.totalPriceContainer}>
                  <div className={style.totalPriceWrapper}>
                    <span className={style.totalPrice}>
                      {"Total price `"}
                      <span className={style.odometer}>
                        <CounterOdometer value={ordersTotalPrice} />
                      </span>
                      <span className={style.currency}>{"AMD"}</span>
                    </span>
                  </div>
                </div>

             {(totalOrdersCount || searchByPirceTotalCount || searchByDateTotalCount) > 5 &&
                 <Pagination
                     totalItemsCount={totalOrdersCount || searchByPirceTotalCount || searchByDateTotalCount}
                     pageSize={pageSize}
                     currentPage={currentPage}
                     portionNumber={portionNumber}
                     onPageChanged={onPageChanged}
                     setPortionNumber={setPortionNumber}                 />
            }
              
            
            </>
          : <p className={style.textInfo}>{"Your orders history is empty"}</p>
          }
        </motion.div>

    </div>
  );
};
