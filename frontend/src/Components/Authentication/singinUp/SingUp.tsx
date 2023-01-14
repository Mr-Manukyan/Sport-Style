import React from 'react'
import style from './SingUp.module.css'
import { useForm,SubmitHandler } from 'react-hook-form'
import { RegisterValuesType,FormValuesType } from '../../../Types/Types'
import logo from '../../../Assets/Images/logoLarge.png'
import Input from '../../Common/FormsControls/Input'

type PropsType = {
  setUserRegisterData : (registerDataValues:RegisterValuesType) => void,
  isLoading : boolean
}

export const SingUp:React.FC<PropsType> = React.memo ( ({setUserRegisterData,isLoading}) => {
  
  const { register,
          formState : {errors, isValid},
          handleSubmit,
          reset
        } = useForm<FormValuesType>({mode: 'all'})

  const onSubmit: SubmitHandler<RegisterValuesType> = data => {
          setUserRegisterData(data)
          reset()
  }

  return  (

    <div className = {style.registerFormContainer}>
        <form className={style.registerForm} onSubmit = {handleSubmit(onSubmit)}>
            <div className={style.registerParagraph}>
                <h1>{'REGISTER'}</h1>
            </div>
            <Input register = {register} 
                   id = 'userName'
                   requiredMessage = 'Please enter your name'
                   placeholder = 'Your name'
                   registerName = 'userName'
                   maxLengthMessage = 'Max length 10 symbols'
                   maxLengthValue = {10} 
                   minLengthValue = {2}
                   minLengthMessage  = 'Min length 2 symbols'
                   errors = {errors.userName}            
            />
            <Input register = {register} 
                   id = 'email'
                   requiredMessage = 'Please enter your email address'
                   regex = {/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i}
                   placeholder = 'Your email'
                   registerName = 'email'
                   regexMessage = 'Please enter valid email'
                   maxLengthMessage = 'Max length 40 symbols'
                   maxLengthValue = {40} 
                   errors = {errors.email}            
            />
           <Input  register = {register} 
                   id = 'password'
                   requiredMessage = 'Please enter your password'
                   placeholder = 'Your password'
                   registerName = 'password'
                   maxLengthMessage = 'Max length 12 symbols'
                   maxLengthValue = {12} 
                   minLengthValue = {8}
                   minLengthMessage  = 'Min length 8 symbols'
                   errors = {errors.password}
                   type = 'password'           
            />
              <div className = {style.buttonContainer}>
                  <div className={isValid ? style.buttonWrapper : style.noValidButtonWrapper}>
                    <button className={style.button} disabled = {isLoading}>
                      {'Enter'}
                    </button>
                </div>
              </div>
        </form>
        <div className = {style.logowrapper}>
              <img src = {logo} alt = 'logo' className = {style.logo}/>
        </div>
    </div>
    )
})









