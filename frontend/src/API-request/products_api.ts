import { ResponseProductsType } from "../Types/Types"
import { instance } from "./axios_instance"

export const productsAPI = {
    getProducts(currentPage : number, pageSize : number) {
        return instance.get<ResponseProductsType>(`products?page=${currentPage}&limit=${pageSize}`)
                       .then((response) => response.data)        
    },
}