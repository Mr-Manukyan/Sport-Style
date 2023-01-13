import React from 'react'
import style from './AnimatedPage.module.css'
import { motion } from 'framer-motion'


const animationsTop = {
  initial : {
      opacity : 0,
      x: '-100%',
  },
  animate : {
      opacity : 1,
      x: 0
  },
  exit : {
      opacity: 0,
      x : '-100%',
  }
}

type PropsType = {
  children : React.ReactNode
  duration? : number
}

export const AnimatedPage:React.FC<PropsType> = ({children,duration = 0.3}) => {

  return (
    <motion.div
      className = {style.container}
      initial = 'initial'
      animate = 'animate'
      exit = 'exit'
      variants={  animationsTop }
      transition={{duration}}
    >
      {children}
    </motion.div>
  )
}

