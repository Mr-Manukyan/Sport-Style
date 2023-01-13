import { OrderType, ResponseOrdersType } from "../Types/Types"
import { instance } from "./axios_instance"

export const ordersAPI = {
    setOrders(newOrders:OrderType[],totalPrice: number) {
        return instance.post<ResponseOrdersType>(`orders`,{newOrders,totalPrice},
                                                {headers: { "Authorization": localStorage.getItem('jwtToken') }}
                                                ).then((response) => response.data)      
    },
}