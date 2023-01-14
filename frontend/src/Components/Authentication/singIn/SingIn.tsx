import React from 'react'
import style from './SingIn.module.css'
import { useForm,SubmitHandler } from 'react-hook-form'
import { LoginValuesType,FormValuesType } from '../../../Types/Types'
import logo from '../../../Assets/Images/logoLarge.png'
import Input from '../../Common/FormsControls/Input'



type PropsType = {
  setUserLoginData : (loginDataValues:LoginValuesType) => void,
  isLoading : boolean
}

export const SingIn:React.FC<PropsType> = React.memo ( ({setUserLoginData,isLoading}) => {
  
  const { register,
          formState : {errors, isValid},
          handleSubmit,
          reset
        } = useForm<FormValuesType>({mode: 'all'})

  const onSubmit: SubmitHandler<LoginValuesType> = data => {
    setUserLoginData(data)
    reset()
  }

  return  (


    <div className = {style.loginFormContainer}>
        <div className = {style.logowrapper}>
            <img src = {logo} alt = 'logo' className = {style.logo}/>
        </div>
       
        <form className={style.loginForm} onSubmit = {handleSubmit(onSubmit)}>
        
            <div className={style.loginParagraph}>
                <h1>{'LOGIN'}</h1>
            </div>

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
                   autocomplete = 'on'            
            />

           <Input register = {register} 
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
    </div>

    )
})




