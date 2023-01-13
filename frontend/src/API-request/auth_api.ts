import { LoginValuesType, RegisterValuesType, 
         ResponseLoginDataType, ResponseRegisterDataType 
       } from "../Types/Types"
import { instance } from "./axios_instance"

export const authAPI = {

    postAuthRegsterData(registerDataValues:RegisterValuesType) {
        return instance.post<ResponseRegisterDataType>(`auth/register`, registerDataValues)
                       .then( res => res.data) 
    },
    
    postAuthLoginData(loginDataValues:LoginValuesType) {
        return instance.post<ResponseLoginDataType>(`auth/login`, loginDataValues)
                       .then(res => {
                             localStorage.setItem('jwtToken',res.data.token)
                             return res.data
                        })
    },
}