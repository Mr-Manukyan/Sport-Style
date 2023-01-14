import React from 'react'
import style from './Size.module.css'


type PropsType = {
    sizes : number[] 
    setShoesSize : (size:number) => void
    id? : string
}

export const Size:React.FC<PropsType> = React.memo( ({setShoesSize,sizes}) => {

    
    const [selectedSize, setSelectedSize] = React.useState(0)
   
    const onChangeSize = (size:number, index: number) => {
            setShoesSize(size)
            setSelectedSize(index)
    }

    return (
            <ul className={style.size}>
                {
                    sizes.map( (size, index) => (
                        <li key={index} className={ selectedSize === index ? style.active : style.sizeNumber} 
                            onClick={() => onChangeSize(size, index)}>
                         {size}
                        </li>
                    ))
                }
            </ul>
           )
})

