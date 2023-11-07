import { createContext,useEffect,useState } from "react";
import { axiosInstance } from "./conponents/AxiosInstance";
import { Api } from "./conponents/GlobalApi";



export const ChatContext=createContext()
export const ChatContextProvider=(props)=>{
    const [mySelectedChatstateFromSearch,setMySelectedChatStateFromSearch]=useState({})
    const [allChats,setAllChats]=useState([])
    const [notification, setNotification] = useState([])
const token=window.localStorage.getItem("token")

    const getAllChats=async()=>{
        try {
            const res=await axiosInstance.get(`${Api}/chat/all/chats`)
            if(res.status===200){
                setAllChats(res.data)
            }else{
                setAllChats([])         
            }
        
        } catch (error) {
         setAllChats([])   
        }
        
    }
    useEffect(()=>{
        if(allChats.length===0&&token){
            getAllChats()
        }
    },[allChats.length,token])
    return(
        <ChatContext.Provider value={{setAllChats,notification,setNotification,mySelectedChatstateFromSearch,setMySelectedChatStateFromSearch,allChats,getAllChats}}>
            {props.children}
        </ChatContext.Provider>
    )
}