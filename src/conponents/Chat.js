import React, {  useContext, useEffect, useState } from 'react'
import { Header } from './smallerComponents/Header'
import { Mychats } from './smallerComponents/Mychats'
import { Messages } from './smallerComponents/Messages'
import { Api } from './GlobalApi'
import { ChatContext } from '../context'
import { axiosInstance } from './AxiosInstance'
import { socket } from './Socket.js/socket'
export const Chat = () => {

    const appChatContext = useContext(ChatContext);
  const mySelectedChatstateFromSearch =
  appChatContext.mySelectedChatstateFromSearch;
  const notification=appChatContext.notification;
  const setNotification=appChatContext.setNotification;
  const getAllChats=appChatContext.getAllChats;
  const [messages, setMessages] = useState([]);

   
    useEffect(() => {
      const handleReceivedMessage = async (newMessage) => {
        if (!mySelectedChatstateFromSearch._id || mySelectedChatstateFromSearch._id !== newMessage.chat._id) {
          const { data } = await axiosInstance.post(`${Api}/notification/post`, { chatId: newMessage.chat._id, content: newMessage });
          console.log(data);
          if (!notification.includes(newMessage)) {
            setNotification([newMessage, ...notification]);
            console.log(newMessage);
            await getAllChats();
          }
          console.log("pop")
        } else {
          setMessages([...messages, newMessage]);
        }
      };
    
      socket.on("message recieved", handleReceivedMessage);
      return () => {
        socket.off("message recieved");
      };
      // eslint-disable-next-line
    }, []);
    
  return (
    <div style={{width:"100%",height:"100vh"}}>
    <Header/>
    <div style={{display:"flex",gap:"10px"}}>
    <Mychats/>
    <Messages messages={messages} setMessages={setMessages}  socket={socket}/>
    </div>
    

      
      </div>
  )
}
