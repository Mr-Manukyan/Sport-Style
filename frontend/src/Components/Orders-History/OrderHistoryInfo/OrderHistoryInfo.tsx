import React from "react";
import { motion } from "framer-motion";
import { AiOutlineFieldNumber } from "react-icons/ai";
import { OrderType } from "../../../Types/Types";
import style from "./OrderHistoryInfo.module.css";
import { useAppSelector } from "../../../Hooks/hooks";
import { getOrderHistoryOrderInfoData } from "../../../Redux/selectors/orders-history-selector";

type PropsType = {
  showOrderInfo: (isShow: boolean) => void;
};

const animate = {
  hidden: {
    y: "-100%",
    opacity: 0,
  },

  visible: (custom: number) => ({
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.3,
      // type: "spring",
      // stiffness: 100,
      damping: 9,
    },
  }),
  exit: {
    y: "-100%",
    opacity: 0,
  },
};

export const OrderHistoryInfo: React.FC<PropsType> = React.memo(({showOrderInfo }) => {

    const orderInfo = useAppSelector(getOrderHistoryOrderInfoData)

    return (
      <>
        <div className={style.orderHistoryInfoContainer} onClick={() => showOrderInfo(false)}></div>
        <motion.div
          className={style.orderHistoryInfoBody}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={animate}
        >
            <div className = {style.paragrphBody}>
                <div className = {style.orderNumberWrapper}>
                   <p className = {style.paragraph}>{'ORDER'}
                    <AiOutlineFieldNumber className = {style.fieldNumber}/>
                    {orderInfo.orderNumber}</p>
                </div>
                
                <div  className = {style.historyBodyInfoContainer}>
                    <div className = {style.historyBodyInfoWrapper}>
                        <span> {'Name'}</span>
                        <span> {'Picture'}</span>
                        <span> {'Size'}</span>
                        <span> {'Count'}</span>
                        <span>{'Price'}</span>
                    </div>
                </div>
            </div>
            <div className = {style.ordersWrapper}>
              {
                orderInfo.orders.map( (order) => <OrderInfo order={order} key = {order.id} />)
              }
            </div>
        </motion.div>
      </>
    );
  }
);

type PropsOrderInfoType = {
    order: OrderType
}
const OrderInfo:React.FC<PropsOrderInfoType> = React.memo( ({order}) => {

    return <div className={style.historyBody}>
                <div className = {style.orderName}>{order.name}</div>
                <div className = {style.orderImageWrapper}>
                   <img className={style.orderImage} src = {order.photo} alt = 'orderPhoto'/>
                </div>
                <div className = {style.orderSize}>{order.size}</div>
                <div className = {style.orderQuantity}>{order.quantity}</div>
                <div className = {style.orderPrice}>{order.price * order.quantity + ' AMD'}</div>
           </div>
})
