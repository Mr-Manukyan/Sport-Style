import React, { useState } from 'react'
import './Calendar.css'
import Calendar from 'react-calendar'
import { searchOrdersByDate } from '../../../Redux/reducers/OrdersHistory-reducer'
import { useAppDispatch } from '../../../Hooks/hooks'


type PropsType = {
    setIsSearchByDateShow : (show:boolean) => void
}
export const MyCalendar:React.FC<PropsType> = React.memo( ({setIsSearchByDateShow}) => {

 
    const [date, setValue] = useState(new Date())
    const dispatch = useAppDispatch()

    const onChangeDate = (date:Date) => {
        setValue(date)
        let dd:number | string = date.getDate();
        let mm:number | string = date.getMonth() + 1; // January is 0!
        let yyyy = date.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }

        const formattedDate = (yyyy + '-' + mm + '-' + dd)
    
         dispatch( searchOrdersByDate(formattedDate,1) )
         setIsSearchByDateShow(false)
    }
    
    return (
        <Calendar onChange={onChangeDate} 
                  value={date} 
                  maxDate = {new Date()} 
                  locale = "en"
                  />
    )
})








