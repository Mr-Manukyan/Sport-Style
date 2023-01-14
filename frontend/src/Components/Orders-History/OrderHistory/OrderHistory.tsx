import React, { MouseEvent } from 'react'
import style from './OrderHistory.module.css'
import { BsTrash } from 'react-icons/bs'
import { HistoryOrderType } from '../../../Types/Types'



type PropsType = {
   order : HistoryOrderType
   removeOrderById : (orderID : string) => void
   showOrderInfo : (isShow:boolean) => void
   setOrderInfo : (ordersInfo: HistoryOrderType) => void
}

export const OrderHistory:React.FC<PropsType> = React.memo(({ order,removeOrderById,
                                                              showOrderInfo,setOrderInfo
                                                            }) => {


    let orderDate = new Date(order.date)
    let dd:string | number = orderDate.getDate()
    let mm:string | number = orderDate.getMonth() + 1 // January is 0!
    let yyyy:string | number = orderDate.getFullYear();         
    if (dd < 10) {
        dd = '0' + dd
    }      
    if (mm < 10) {
        mm = '0' + mm
    }
    let date = ( dd + ' / ' + mm + ' / ' + yyyy )

    let hours:string | number = orderDate.getHours()
    let minutes:string | number = orderDate.getMinutes()
    let seconds:string | number = orderDate.getSeconds()
    if (hours < 10) {
        hours = '0' + hours
    }      
    if (minutes < 10) {
        minutes = '0' + minutes
    }
    if (seconds < 10) {
        seconds = '0' + seconds
    }
    let time =  hours + ' : ' + minutes + ' : ' + seconds 
    

    const removeOneOrderFromHistory = (e:MouseEvent<HTMLSpanElement>) => {
        e.stopPropagation()
        removeOrderById(order._id)
    }

    const setShowOrderAndsetOrderId = () => {
        setOrderInfo(order)
        showOrderInfo(true)
    }

    return (

            <div className={style.historyOrdersWrapper} onClick = {setShowOrderAndsetOrderId}>
            
                    <div className={style.number}>{order.orderNumber}</div>
                    <div className={style.date}>{date}</div>
                    <div className={style.time}>{time}</div>
                    <div className={style.money}>{`${order.money} AMD`}</div>
            
                <div className={style.remove} >
                    <span onClick={removeOneOrderFromHistory}>{<BsTrash />}</span>
                </div>
            </div>
    )
})


