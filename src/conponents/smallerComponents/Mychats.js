import React, { useContext, useState } from 'react'
import { ChatContext } from '../../context'
import { Avatar, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import { getSecondUserInChat } from './function';
import { GroupChatCreateForm } from './GroupChatCreateForm';





export const Mychats = () => {
  const [open, setOpen] = useState(false)
    const chatAppState=useContext(ChatContext)
    const allChats=chatAppState.allChats
    const setMySelectedChatStateFromSearch=chatAppState.setMySelectedChatStateFromSearch
    const dataFromL=window.localStorage.getItem("data")
    const userData=JSON.parse(dataFromL)




  return (
    <div className='chatsColumn'>
     
        <header style={{display:"flex", justifyContent:"space-between"}}>
            <p>All Chats</p>
            {open&&<GroupChatCreateForm open={open} setOpen={setOpen}/>}
            <Button onClick={()=>setOpen(true)} variant='contained'>New Group Chat <AddIcon/> </Button>         
        </header>
      
        {allChats.length>0&&allChats?.map((e)=>{
          return(  <div onClick={()=>setMySelectedChatStateFromSearch(e)} className='chatboxinmychat' key={e._id}>
            <div>
            <p style={{fontWeight:"bold"}} >{e.isGroupChat?e.chatName :getSecondUserInChat(e.users,userData)}</p>
            <p></p>
            </div>
            <div>
                <Avatar src={e.users[0].picture}/>
            </div>
                

            </div>
     )   })}
</div>

  )
}
