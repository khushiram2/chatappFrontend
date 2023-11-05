import {  Box, Button, Dialog, DialogActions, DialogTitle, TextField } from '@mui/material';
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify';
import { axiosInstance } from '../AxiosInstance';
import { Api } from '../GlobalApi';
import { Close } from '@mui/icons-material';
import { ChatContext } from '../../context';

export const GroupChatCreateForm  = ({open,setOpen}) => {
    const [groupChatName, setGroupChatName] = useState("")
    const [result, setResult] = useState([])
    const [selectedUsers, setSelectedUsers] = useState([])
    const appChatContext=useContext(ChatContext)
    const setMySelectedChatStateFromSearch=appChatContext.setMySelectedChatStateFromSearch
    const handleClose = () => {
        setOpen(false);
      };
    const handleSearchUser=async (val)=>{
        if(val){
            try {
                const { data } = await axiosInstance.get(`${Api}/user/getallusers?name=${val}`)
                setResult(data)
            } catch (error) {
                toast.error("error occured while searching user", { autoClose: 5000 })
                console.log(error)
            }
        }      
    }
    const handleSubmit=async ()=>{
        if(groupChatName===""){
            toast.error("Please name the group chat",{autoClose:5000})
        }else if(selectedUsers.length<1){
            toast.error("there should be atleast 3 users in a group chat",{autoClose:5000})
        }else{
            const users=selectedUsers.map((e)=>e._id)
          const {data}= await  axiosInstance.post(`${Api}/chat/new/group/chat`,{groupName:groupChatName,users:users})
          toast.success("Group chat created sucessfully",{autoClose:5000})
        setMySelectedChatStateFromSearch(data)
        setGroupChatName("")
        handleClose()
        }

    }
    const removeUserFromArray=(e)=>{

        const filredArr=selectedUsers.filter((user)=>user!==e)
    //    selectedUsers.splice(selectedUsers.indexOf(e),1)
        setSelectedUsers(filredArr)
    }


  return (
    <Dialog   open={open} onClose={handleClose}>
        

        <Box sx={{display:"flex",flexDirection:"column", alignItems:"center",justifyContent:"center",height:"fit-content",width:"fit-content"}}>
        <DialogTitle color="brown">Group Chat</DialogTitle>
            <Box sx={{display:"flex", flexWrap:"wrap"}}>
            {selectedUsers&&selectedUsers.map((e)=>{
                return(
                    <Box sx={{display:"flex", alignItems:"center",gap:"8px",width:"fit-content",height:"fit-content", margin:"5px", border:"1px solid black",padding:"0px 15px",background:"#7fffd4",borderRadius:"5px"}} key={e._id}>
                    <p>{e.name}</p>
                    <Close onClick={()=>removeUserFromArray(e)} />
                </Box>
                )
               
            })}
            
   
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center", width:"100%"}}>
        <div style={{margin:"20px",width:"80%" }}> <TextField sx={{width:"100%"}} onChange={(e) => setGroupChatName(e.target.value)} id="filled-basic" label="Group Chat Name" variant="filled" /></div>
       <div style={{margin:"20px",width:"80%"}}> <TextField sx={{width:"100%"}} onChange={(e) => handleSearchUser(e.target.value)} id="filled-basic" label="Username or email" variant="filled" /></div>
       </div>
       <Box sx={{display:"flex", flexWrap:"wrap"}}>
            { result?.map((e)=>{
                return(   
             <Box onClick={()=>setSelectedUsers([...selectedUsers,e])} sx={{width:"fit-content",height:"fit-content", margin:"5px", border:"1px solid black",padding:"0px 15px",background:"#54eb78",borderRadius:"5px"}} key={e._id}>
                    <p>{e.name}</p>
                </Box>)
            
            })}
        </Box>
        </Box>
    <DialogActions>
    <Button onClick={handleSubmit} color="primary">
        Create group chat
      </Button>
      <Button onClick={handleClose} color="primary">
        Close
      </Button>
    </DialogActions>
    </Box>
  </Dialog>
  )
}
