import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React from 'react'

export const ProfileView = ({user,open,setOpen}) => {

    const handleClose = () => {
      setOpen(false);
    };
  return (
    <Dialog open={open} onClose={handleClose}>
    <DialogTitle color="brown">User Info</DialogTitle>
    <DialogContent sx={{display:"flex"}} >
        <div>
       <div> Name: {user.name}</div>
       <div> e-mail:{user.email}</div>
       </div>
        <Avatar src={user.picture}></Avatar>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        Close
      </Button>
    </DialogActions>
  </Dialog>
  )
}
