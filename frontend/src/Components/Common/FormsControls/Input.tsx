import React from 'react'
import style from './Input.module.css'
import { FieldError, UseFormRegister } from 'react-hook-form'
import { motion } from 'framer-motion'
import { FormValuesType } from '../../../Types/Types'

type PropsType = {
    register :UseFormRegister<FormValuesType> 
    placeholder? : string
    id? : string
    requiredMessage? : string
    regex?: RegExp 
    regexMessage? : string
    maxLengthValue? :  number
    maxLengthMessage? : string
    registerName : any
    minLengthValue? : number
    minLengthMessage? : string
    errors : FieldError | undefined 
    type? : string
    autocomplete?: string
}

const Input:React.FC<PropsType> = ({register,requiredMessage,regex = new RegExp(''), 
                                    id,placeholder,registerName,regexMessage='',
                                    maxLengthValue=200,maxLengthMessage='',minLengthValue=1,
                                    minLengthMessage='',errors, type,autocomplete = 'off'
                                   }) => {

  return (
    <div className={style.inputWrapper}>
      <input id={id}
            className = {style.input}
            placeholder={placeholder}
            type = {type}
            autoComplete={autocomplete}
            {...register(registerName,
              {
                required : requiredMessage,
                pattern : {
                  value : regex,
                  message : regexMessage
                },
                maxLength : {
                  value : maxLengthValue,
                  message : maxLengthMessage
                },
                minLength : {
                  value : minLengthValue,
                  message : minLengthMessage 
                },
              }
            )}
      />

      { errors &&
        <motion.div className = {style.errorWrapper}
                    initial = {{ opacity : 0,y: '-30px'}}
                    animate = {{ opacity : 1,y: '0px'}}
                    exit = {{ opacity : 0, y: '-30px'}}
                    transition={{duration :.3}}   
        >
            <p className = {style.errorMessage}>
              {errors?.message}
            </p>
        </motion.div>
      }
</div>
  )
}

export default Input













