import { MenuOutlined, NotificationAddOutlined, SearchOutlined } from '@mui/icons-material'
import { Avatar, Badge, Box, Button,  Menu, MenuItem, Tooltip, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ProfileView } from './ProfileView'
import { SideBar } from './SideBar'
import { ChatContext } from '../../context'
import { socket } from '../Socket.js/socket'

export const Header = () => {
    const navigate=useNavigate()
    const chatappContext=useContext(ChatContext)
    const setMySelectedChatStateFromSearch=chatappContext.setMySelectedChatStateFromSearch;
    const setAllChats=chatappContext.setAllChats;
    const notification=chatappContext.notification;
    const setNotification=chatappContext.setNotification;
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const [notificationOpen, setNotificationOpen] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const data=window.localStorage.getItem("data")
    const chatAppUSerdata= JSON.parse(data)
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
     
    };
   const handleNotificationClick= (event)=>{
    setNotificationOpen(event.currentTarget)
   }
  const handleNotificationClose = ()=>{
    setNotificationOpen(null)
  }
  const logout=()=>{
    setAnchorEl(null);
    window.localStorage.clear()
    socket.emit('logout');
    setMySelectedChatStateFromSearch({})
    setAllChats([])
    navigate("/login")
  }
    const handleClose = () => {
      setAnchorEl(null);
    };
  return (
    <div style={{with:"100%",height:"62px",background:"#E0E0E0",display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px"}}>
        {open&&<ProfileView user={chatAppUSerdata} open={open} setOpen={setOpen} />}
        <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
    <Tooltip title="Search users here" placement="bottom">
    <Button onClick={()=>setSidebarOpen(!sidebarOpen)} variant="action" sx={{  height:"50px",padding:"5px"}}>
        <SearchOutlined/>
        <p>Search users</p>
    </Button>  
    </Tooltip>
    <Typography>My Chat App</Typography>
    <Box sx={{display:"flex"}}>
    <Box sx={{cursor:"pointer"}}>
    <Badge color='error' badgeContent={notification.length}>
    <Button sx={{padding:"0px"}} onClick={handleNotificationClick}><NotificationAddOutlined/></Button>
    </Badge>
     <Menu
        anchorEl={notificationOpen}
        open={Boolean(notificationOpen)}
        onClose={handleNotificationClose}
        sx={{
        marginRight:"50px"
        }}
      >
      <div className='notification' style={{    width: "300px", height: "300px", padding: "10px"}}>
        { (notification.length===0) ?
         <MenuItem onClick={handleClose}>no new Message</MenuItem> :
        notification.map((e,i)=>(
          <MenuItem key={e._id} onClick={()=>{
            setMySelectedChatStateFromSearch(e.chat)
            setNotification(notification.filter((ele)=>ele!==e))
          }}>
          {e.isGroupChat?`New Message in ${e.chat.chatName}`:` ${e.sender.name} sent a Message`}
          </MenuItem>
        ))
        }
      
      </div>
      </Menu>
    
      <Button onClick={handleClick}><MenuOutlined/></Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>My Profile</MenuItem>
        <MenuItem onClick={logout}>Log Out</MenuItem>
      </Menu>
        
        
    </Box>
    <Box sx={{marginRight:"40px",paddingLeft:"3px"}}>

    <Avatar  onClick={()=>setOpen(!open)} src={chatAppUSerdata?.picture}></Avatar>
    </Box>
    </Box>
    </div>
  )
}
