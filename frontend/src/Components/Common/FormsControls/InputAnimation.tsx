import React from 'react'
import style from './InputAnimation.module.css'
import { FieldError, UseFormGetValues, UseFormRegister } from 'react-hook-form'
import { motion } from 'framer-motion'




type PropsType = {
    register :UseFormRegister<any> 
    watch : UseFormGetValues<any>
    placeholder? : string
    id? : string
    maxLengthValue? :  number
    maxLengthMessage? : string
    registerName : any
    minLengthValue? : number
    minLengthMessage? : string
    errors : FieldError | undefined 
    type? : string
    label?:string
    isRequired? : boolean
    requiredMessage? : string

}


export const InputAnimation:React.FC<PropsType> = ({register,isRequired = false,
                                    id,placeholder,registerName,requiredMessage ='',
                                    maxLengthValue=10,maxLengthMessage='',minLengthValue=0,
                                    minLengthMessage='',errors, type, label = '',watch
                                   }) => {

  const value = watch(registerName) 
    
  return (
    <div className = {style.inputField}>
        <input id={id}
              className = { errors ? style.inputError : style.input}
              placeholder={placeholder}
              type = {type}
              {...register(registerName,
                {
                  [isRequired ? 'required' : ''] : requiredMessage,
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
        <label htmlFor = {id} className = {errors ? style.labelError : (value ? style.labelActive : style.label )}>
                {label} 
        </label>

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















