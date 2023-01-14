import axios from 'axios'

export const instance = axios.create({
    baseURL: "https://sport-style.onrender.com/",
    // withCredentials : true ,
})


