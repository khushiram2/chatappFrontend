import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../context";
import { Box } from "@mui/material";
import { getSecondUserInChat, getSecondUserInChat2 } from "./function";
import { ArrowBack, RemoveRedEye } from "@mui/icons-material";
import { ProfileView } from "./ProfileView";
import { GroupChatDialog } from "./GroupChatDialog";
import { axiosInstance } from "../AxiosInstance";
import { Api } from "../GlobalApi";
import { ScrollableMessages } from "./ScrollableMessages";
export const Messages = ({ socket,messages,setMessages }) => {
  const [showProfile, setShowProfile] = useState(false);
  const data = window.localStorage.getItem("data");
  const userData = JSON.parse(data);
  const appChatContext = useContext(ChatContext);
  const mySelectedChatstateFromSearch =
  appChatContext.mySelectedChatstateFromSearch;
  const setMySelectedChatStateFromSearch =
  appChatContext.setMySelectedChatStateFromSearch;



  
  const getAllMessages = async () => {
    if (mySelectedChatstateFromSearch.chatName) {
      const res = await axiosInstance.get(
        `${Api}/message/all/${mySelectedChatstateFromSearch._id}`
        );
        if (res.status === 200) {
          setMessages(res.data);
          socket.emit("join-chat", mySelectedChatstateFromSearch._id)
        } else {
          console.log(" i can't do it ");
        }
      } else {
        console.log("no chat id is there. what you want me to do?");
      }
    };
    
    
    useEffect(() => {
      getAllMessages();
    }, [mySelectedChatstateFromSearch]);


    // useEffect (  () => {
    //   socket.on("message recieved",async (newMessage) => {
    //     if ( !mySelectedChatstateFromSearch._id ||mySelectedChatstateFromSearch._id !== newMessage.chat._id) {
    //       const {data}= await axiosInstance.post(`${Api}/notification/post`,{chatId:newMessage.chat._id,content:newMessage})
    //       console.log(data)
    //       if(!notification.includes(newMessage)){
    //         setNotification([newMessage,...notification])
    //         console.log(newMessage)
    //         await getAllChats()
    //       }
    //     } else {
    //       setMessages([...messages, newMessage])
    //     }
    //   })
    // })

    
  
  if (mySelectedChatstateFromSearch.chatName) {
    const otherUser = getSecondUserInChat2(
      mySelectedChatstateFromSearch.users,
      userData
    );
    return (
      <div className="messages">
        <header style={{ margin: "3px" }}>
          <Box display={"flex"} alignItems={"center"} gap={"20px"}>
            <ArrowBack onClick={() => setMySelectedChatStateFromSearch("")} />
            <Box sx={{ fontSize: "25px" }}>
              {mySelectedChatstateFromSearch.isGroupChat
                ? mySelectedChatstateFromSearch.chatName
                : getSecondUserInChat(
                  mySelectedChatstateFromSearch.users,
                  userData
                )}
            </Box>
            {showProfile && mySelectedChatstateFromSearch.isGroupChat ? (
              <GroupChatDialog
                setChat={setMySelectedChatStateFromSearch}
                chat={mySelectedChatstateFromSearch}
                open={showProfile}
                setOpen={setShowProfile}
              />
            ) : (
              <ProfileView
                user={otherUser}
                open={showProfile}
                setOpen={setShowProfile}
              />
            )}
            <Box sx={{ marginLeft: "auto" }}>
              <RemoveRedEye onClick={() => setShowProfile(true)} />
            </Box>
          </Box>
        </header>
        <Box
        >
         <ScrollableMessages socket={socket}  setMessages={setMessages} messages={messages}/> 
        </Box>
      </div>
    );
  } else {
    return (
      <div className="messages">
        <Box
          fontSize={"39px"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          Select a User to view the chat
        </Box>
      </div>
    );
  }
};
