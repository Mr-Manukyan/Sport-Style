import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useAppDispatch } from '../../../Hooks/hooks'
import { searchOrdersByPrice } from '../../../Redux/reducers/OrdersHistory-reducer'
import { SearchOrderByPriceDataType } from '../../../Types/Types'
import { NeonAnimationButton } from '../../Buttons/NeonAnimationButton/NeonAnimationButton'
import { InputAnimation } from '../FormsControls/InputAnimation'
import style from './SearchByPrice.module.css'


export const SearchByPrice:React.FC = React.memo( () => {

    const dispatch = useAppDispatch()
   
    const {
        register,
        formState: {errors},
        watch,
        handleSubmit
    } = useForm<SearchOrderByPriceDataType>({ mode: "all" })

    const onSubmit: SubmitHandler<SearchOrderByPriceDataType> = (data) => {
        dispatch( searchOrdersByPrice(data,1 ) )
    }

    return (
        <form className = {style.form} onSubmit={handleSubmit(onSubmit)}>
           <h4 className = {style.paragraph}>{'Please enter the amount'}</h4>
           <InputAnimation id = 'start'
                           type = 'number'
                           label = 'Min'
                           watch = {watch}
                           register={register}
                           registerName = 'min'
                           errors={errors.min}
                           maxLengthMessage="Maximum` 10.000.000 AMD"
                           maxLengthValue = {8}
           />
           <InputAnimation id = 'end'
                           type = 'number'
                           label = 'Max'
                           watch = {watch}
                           register={register}
                           registerName = 'max'
                           maxLengthValue = {8}
                           maxLengthMessage="Maximum` 10.000.000 AMD"
                           errors={errors.max}  
           />
           <NeonAnimationButton name = {'Search'} 
                                margin = '20px'
                                width = '40%'
                                height = '50px'
                                textColor = '#f0f403'
                                hoverColor = '#f0f403'
                                animationColor = '#f0f403'
           />
        </form>
    )
})

