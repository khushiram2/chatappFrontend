import { Box, Button, Drawer, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Api } from "../GlobalApi";
import { axiosInstance } from "../AxiosInstance";
import { SingleChatBox } from "./SingleChatBox";
import { ChatContext } from "../../context";

export const SideBar = ({ sidebarOpen, setSidebarOpen }) => {
    const [searchUser, setSearchUser] = useState("")
    const [result,setResult]=useState([])

    const handleClose = () => {
        setSidebarOpen(false);
    };
    const appChatContext=useContext(ChatContext)
    const setMySelectedChatStateFromSearch=appChatContext.setMySelectedChatStateFromSearch
    const handleSearch = async () => {
        if (!searchUser) {
            toast.error("Please fill the inputfield", { autoClose: 5000 })
        } else {
            try {
                const { data } = await axiosInstance.get(`${Api}/user/getallusers?name=${searchUser}`)
                if(data){
                    setResult(data)

                }
                setSearchUser("")
            } catch (error) {
                toast.error("error occured while searching user", { autoClose: 5000 })
                console.log(error)
            }

        }

    }

    const createOrAcessChat=async(id)=>{
        try {
         const {data}=await axiosInstance.post(`${Api}/chat/start/new/chat`,{id:id})
         if(!data){
            toast.error("Failed to load chat", {autoClose:5000})
         }else{
            toast.success("Chat loaded sucessfully", {autoClose:5000})
            setMySelectedChatStateFromSearch(data)
            handleClose()
         }
        } catch (error) {
            console.log(error)
        }

    }


    return (
        <Drawer
            anchor="left"
            open={sidebarOpen}
            onClose={handleClose}
        >
            <Box style={{ width: "240px", padding: "20px", display: "flex", flexDirection: "column", alignItems: "centre" }}>
                <h1 style={{ marginBottom: " 20px" }}>Search User</h1>
                <Box style={{ display: "flex",gap:"5px" }} >

                    <TextField onChange={(e) => setSearchUser(e.target.value)} id="filled-basic" label="Username or email" variant="filled" />
                    <Button onClick={() => handleSearch()} variant="outlined">Go</Button>
                </Box>
                <Box>
                {result?result.map((e)=><SingleChatBox  createOrAcessChat={createOrAcessChat} key={e._id} item={e}/>):"results"}
                </Box>
            </Box>
        </Drawer>
    );
};
