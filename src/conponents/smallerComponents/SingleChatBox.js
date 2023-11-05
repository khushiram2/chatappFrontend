import { Avatar, Box } from '@mui/material'
import React from 'react'

export const SingleChatBox = ({createOrAcessChat, item }) => {
    return (
        <div className='singleChatBox' onClick={()=>createOrAcessChat(item._id)} style={{  display: "flex", justifyContent: "space-between",alignItems:"center",width: "200px", height: "30px" }}>
            <Box sx={{ }}>
                <Box sx={{ fontWeight: "bold" }}>{item.name}</Box>
            </Box>
            <Box>
                <Avatar style={{ width: '50px', height: '50px' }} src={item.picture} />
            </Box>
        </div>
    )
}
