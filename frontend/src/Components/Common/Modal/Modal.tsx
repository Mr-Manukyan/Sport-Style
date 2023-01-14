import React from "react"
import style from "./Modal.module.css"
import { motion } from "framer-motion"


type PropsType = {
  setShowModal: (show: boolean) => void
  setLogOut : () => void
};

const animateQuestion = {
  hidden: {
    y: "-100%",
    opacity: 0,
  },

  visible: (custom: number) => ({
    y: "0%",
    opacity: 1,
    transition: {
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
}

export const Modal: React.FC<PropsType> = React.memo(({ setShowModal,setLogOut }) => {

  const goOut = () => {
    setLogOut()
  }
  const doNotGoOut = () => {
    setShowModal(false)
  }

  return (
    <div className={style.modalContainer}>
      <motion.div
        className={style.body}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={animateQuestion}
      >
        <div className={style.titleWrapper}>
          <p className={style.title}>{'Are you sure ?'}</p>
        </div>
        <div className={style.buttonWrapper}>
          <button className={style.buttonNo} onClick={doNotGoOut}>
            {'No'}
          </button>
          <button className={style.buttonYes} onClick={goOut}>
            {'Yes'}
          </button>
        </div>
      </motion.div>
    </div>
  )
})
