import React, {  useEffect, useState } from 'react'
import { Header } from './smallerComponents/Header'
import { Mychats } from './smallerComponents/Mychats'
import { Messages } from './smallerComponents/Messages'
import { socket } from './Socket.js/socket'
import { setTokenInAxiosInstance } from './AxiosInstance'

export const Chat = () => {
  const [messages, setMessages] = useState([]);
  

  useEffect(()=>{
  const token=window.localStorage.getItem("token")
setTokenInAxiosInstance(token)
},[])
   
  return (
    <div style={{width:"100%",height:"100vh"}}>
    <Header/>
    <div className='container-chat'>
    <Mychats/>
    <Messages messages={messages} setMessages={setMessages}  socket={socket}/>
    </div>
    

      
      </div>
  )
}
