import React from "react"
import style from "./ModalMessageInfo.module.css"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"


type PropsType = {
  infoText: string,
  setMessageInfo : (message:string) => void,
  setIsSuccess? : (isSuccess:boolean) => void,
  isSuccess? : boolean,
}

const animateQuestion = {
  hidden: {
    y: "-100%",
    opacity: 0,
  },

  visible: (custom: number) => ({
    y: "0%",
    opacity: 1,
    transition: {
      delay: custom * 0.5,
      duration: 0.7,
      type: "spring",
      // stiffness: 100,
      damping: 9,
    },
  }),
  exit: {
    y: "-100%",
    opacity: 0,
  },
};

export const ModalMessageInfo: React.FC<PropsType> = React.memo(({ 
                                                                   infoText,setMessageInfo,isSuccess = false,
                                                                   setIsSuccess = () => {},
                                                                }) => {

  const navigate = useNavigate();

  const goToLogin = () => {

    if(isSuccess){
      navigate("/auth/login");
      setIsSuccess(false)
      setMessageInfo('')
    }else{
      setMessageInfo('')
    }
  };

  return (
    <div className={style.modalContainer}>
      <motion.div
        className={style.body}
        initial="hidden"
        animate="visible"
        custom={0.3}
        exit="exit"
        variants={animateQuestion}
      >
        <div className={style.titleWrapper}>
          <p className={style.title}>{infoText}</p>
        </div>
        <div className={style.buttonWrapper}>
          <button className={style.button} onClick={goToLogin}>
            OK
          </button>
        </div>
      </motion.div>
    </div>
  )
})
