import React, { useContext, useEffect, useRef, useState } from 'react'
import { toast } from "react-toastify";
import SendIcon from '@mui/icons-material/Send';
import { Api } from '../GlobalApi';
import { ChatContext } from '../../context';
import { Avatar, Box } from "@mui/material";
import { axiosInstance } from '../AxiosInstance';


export const ScrollableMessages = ({messages,setMessages,socket}) => {
    const [typing, setTyping] = useState(false)
    const [newMessage, setNewMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false)
    const messageContainerRef = useRef(null)
    const appChatContext = useContext(ChatContext);
    const data = window.localStorage.getItem("data");
    const userData = JSON.parse(data);
    const mySelectedChatstateFromSearch =
    appChatContext.mySelectedChatstateFromSearch;
    

    useEffect(()=>{
        socket.on("typing", () => setIsTyping(true))
        socket.on("stoptyping", () => setIsTyping(false))
        // eslint-disable-next-line
      },[])

    const sendMessageViaEnter = async (e) => {
        if (e.key === "Enter") {
          if (newMessage.length !== 0) {
            setNewMessage("")
            const { data } = await axiosInstance.post(`${Api}/message/send`, { chatId: mySelectedChatstateFromSearch._id, content: newMessage })
            socket.emit("send-message", JSON.stringify(data))
            setMessages([...messages, data])
          } else {
          toast.error("can't send empty message")
        }
      }
    }
    const sendMessageViaClick = async () => {
      if (newMessage.length !== 0) {
        setNewMessage("")
        const { data } = await axiosInstance.post(`${Api}/message/send`, { chatId: mySelectedChatstateFromSearch._id, content: newMessage })
        
        socket.emit("send-message", JSON.stringify(data))
        setMessages([...messages, data])
      } else {
        toast.error("can't send empty message")
      }
    }
    // const handleMessageInput = (e) => {
    //   setNewMessage(e.target.value)
    //   if (!typing) {
    //     setTyping(true)
    //     socket.emit("typing", mySelectedChatstateFromSearch._id)
    //   }
      

    //   let lastTypingTime = new Date().getTime()
    //   let timerLength = 3000
      
    //   setTimeout(() => {
    //     let timenow = new Date().getTime()
    //     let timeDiff = timenow - lastTypingTime
    //     if (timeDiff > timerLength && typing) {
    //       socket.emit("stoptyping", mySelectedChatstateFromSearch._id)
    //       setTyping(false)    
         
    //     }
    //   }, timerLength);
    // }
    let typingTimeout;
    const handleMessageInput = (e) => {
      setNewMessage(e.target.value);
  
      // Clear the previous timeout (if any)
      clearTimeout(typingTimeout);
  
      if (!typing) {
        setTyping(true);
        socket.emit("typing", mySelectedChatstateFromSearch._id);
      }
  
      // Set a new timeout
      const timerLength = 3000;
      typingTimeout = setTimeout(() => {
        socket.emit("stoptyping", mySelectedChatstateFromSearch._id);
        setTyping(false);
      }, timerLength);
    };
            
    const scrollTOBottom = () => {
        if (messageContainerRef.current) {
          messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
      }

      useEffect(() => {
      scrollTOBottom()
    }, [messages])
  




  return (
    <div           style={{
        background: "#E8E8E8",
        padding: "5px",
        height: "calc(100vh - 200px)",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}>
                  <Box className="messagechatcontainer" ref={messageContainerRef} sx={{ height: "calc(100% - 50px)", width: "100%" }}>
            {messages.length!==0&&messages.map((message, index) => {
              return (
                <div key={index} className={`message ${message?.sender._id === userData.id ? "sent" : "received"}`}
                >
                  {message.sender._id !== userData.id && (
                    <div >
                      <div>
                        {mySelectedChatstateFromSearch.isGroupChat && (
                          <div style={{ marginLeft: "40px" }}> {message.sender.name} </div>
                        )}
                      </div>

                      <div style={{ display: "flex" }}>
                        <Avatar src={message.sender.picture}></Avatar>
                        <div className="message-content">{message.content}</div>
                      </div>
                    </div>
                  )}
                  {message.sender._id === userData.id && (
                    <div className="message-content">{message.content}</div> 
                  )
                  }

                </div>
              );
            })}

          </Box>
          {isTyping===true?<div>typing...</div>:""}
          <div
            style={{
              flex: "1",
              width: "100%",
              display: "flex",
              maxHeight: "50px",
              position: "sticky",
            }}
          >
          
            <input
              onKeyDown={sendMessageViaEnter}
              onChange={handleMessageInput}
              value={newMessage}
              style={{
                flex: "1",
              }}
              type="text"
            />
            <div style={{ background: "grey", borderRadius: "60px", width: "50px", display: "flex", justifyContent: "center" }}>
              <SendIcon onClick={sendMessageViaClick} sx={{ height: "50px", fontSize: "40px" }} />
            </div>
          </div>
    </div>
  )
}
