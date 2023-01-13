import { ResponseMeType } from "../Types/Types"
import { instance } from "./axios_instance"

export const profileAPI = {

    getMyProfile() {
        return instance.get<ResponseMeType>(`auth/me`, { headers: { "Authorization": localStorage.getItem('jwtToken') } })
                       .then((response) => response.data)
    },

    updateProfilPhoto(photoFile:File) {
        const formData = new FormData()
        formData.append('image', photoFile)
        return instance.patch<ResponseMeType>(`auth/profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": localStorage.getItem('jwtToken')
            }
        }).then((res) => res.data)
    },

    updateUserName(newUserName:string) {
        return instance.patch<ResponseMeType>(`auth/profile/userName`, { userName: newUserName },
            { headers: { "Authorization": localStorage.getItem('jwtToken') } }).then((res) => res.data)
    },

}

