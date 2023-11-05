import axios from "axios";
const Token=window.localStorage.getItem("token")

export  const axiosInstance=axios.create({
    headers:{
        Authorization:Token
    }
})