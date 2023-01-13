import React, { useEffect, useState } from 'react'
import style from './Order.module.css'
import { AiOutlineMinusCircle } from 'react-icons/ai'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { BsTrash } from 'react-icons/bs'
import { OrderType } from '../../../Types/Types'


type PropsType = {
        order : OrderType
        removeOrderById : (orderId:string) => void
        updateOrderCountById : (orderId:string, orderCount: number) => void
}

export const Order:React.FC<PropsType> = React.memo ( ({order,removeOrderById,updateOrderCountById }) => {

    let [orderCount, setOrderCount] = useState(order.quantity)

    useEffect(() => {
        setOrderCount(order.quantity)
    }, [order.quantity])


    const plusOrderCount = () => {

        if (orderCount < 99) {
            setOrderCount(++orderCount)
            updateOrderCountById(order.id, orderCount)
        }
    }
    const minusOrderCount = () => {
        if (orderCount > 1) {
            setOrderCount(--orderCount)
            updateOrderCountById(order.id, orderCount)
        }
    }

    return (
        <div className={style.orderWrapper}>

            <div className={style.nameWrapper}>
                <span className={style.name}>{order.name}</span>
                <img  src = {order.photo} alt = 'product'/>
            </div>

            <div className={style.sizeWrapper}>
                <span className={style.size}>{order.size}</span>
            </div>

            <div className={style.quantityWrapper}>
                <button className={style.minusWrapper} onClick={minusOrderCount}>
                    <AiOutlineMinusCircle className={style.minus} />
                </button>
                <span className={style.quantity}>{orderCount}</span>
                <button className={style.plusWrapper} onClick={plusOrderCount}>
                    <AiOutlinePlusCircle className={style.plus} />
                </button>
            </div>

            <div className={style.priceQuantityWrapper}>
                <span className={style.priceQuantity}>{orderCount * order.price}</span>
                <span className={style.currency}>{'AMD'}</span>
            </div>
            <span className={style.closeOrder} onClick={() => removeOrderById(order.id)} >
                {<BsTrash />}
            </span>

        </div>
    )
})































