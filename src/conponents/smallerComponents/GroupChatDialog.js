import { Close, CloseSharp } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React from "react";
import { axiosInstance } from "../AxiosInstance";
import { Api } from "../GlobalApi";
import { toast } from "react-toastify";
import { ChatContext } from "../../context";

export const GroupChatDialog = ({ setChat, chat, open, setOpen }) => {
    const data=window.localStorage.getItem("data")
    const userData=JSON.parse(data)
  const chatAppState = React.useContext(ChatContext);
  const setMySelectedChatStateFromSearch =
    chatAppState.setMySelectedChatStateFromSearch;
  const [changeName, setChangeName] = React.useState(false);
  const [changedName, setChangedName] = React.useState("");
  const [addParticipants, setAddParticipants] = React.useState(false);
  const [result, setResult] = React.useState([]);
  const [usersToBeAdded, setUsersToBeAdded] = React.useState([]);

  const filterUsers = (usersToSearch, usersInGroupChat) => {
    const usersInGroupSet = new Set(
      usersInGroupChat.map((user) => user._id.toString())
    );
    const filteredUsers = usersToSearch.filter(
      (user) => !usersInGroupSet.has(user._id.toString())
    );
    return filteredUsers;
  };

  let filteredresult = filterUsers(result, chat.users);

  const handleClose = () => {
    setOpen(false);
  };
  const leaveGroup = async () => {
    try {
        const { data } = await axiosInstance.put(
          `${Api}/chat/leave/group/chat`,
          { chatId: chat._id }
        );
        if (data) {
          toast.success("left group sucessfully", { autoClose: 5000 });
          setMySelectedChatStateFromSearch({});
        } else {
          toast.error("try again", { autoClose: 5000 });
        }
      } catch (error) {
        toast.error("try again", { autoClose: 5000 });
      }
    };
  const handleAddParticipants = async () => {
    if(chat.groupAdmin._id===userData.id ||chat.groupAdmin===null){
    if (usersToBeAdded.length === 0) {
      toast.error("please select users ", { autoClose: 5000 });
    } else {
      try {
        const userIds = usersToBeAdded.map((e) => e._id);
        const { data } = await axiosInstance.put(
          `${Api}/chat/group/chat/add/user`,
          { chatId: chat._id, userId: userIds }
        );
        setResult([]);
        filteredresult = [];
        setAddParticipants("");
        setChat(data);
        handleClose();
        toast.success("user added sucessfully", { autoClose: 5000 });
      } catch (error) {
        console.log(error);
        toast.error("some error occured try again", { autoClose: 5000 });
      }
    }}else{
        toast.error("only admin can Add new users", { autoClose: 5000 })
    }
  };

  const removeParticipant = async (id) => {
   if(chat.groupAdmin._id===userData.id ||chat.groupAdmin==="" ){ try {
      const { data } = await axiosInstance.put(
        `${Api}/chat/group/chat/remove/user`,
        { userId: id, chatId: chat._id }
      );
      if (data) {
        toast.success("User removed sucessfully", { autoClose: 5000 });
        setMySelectedChatStateFromSearch(data);
      } else {
        toast.error("try again", { autoClose: 5000 });
      }
    } catch (error) {
      toast.error("try again", { autoClose: 5000 });
    }
  }else{
    toast.error("only admin can remove users", { autoClose: 5000 })
  }};
  const handleSearch = async (val) => {
    if (!val) {
      toast.error("Please fill the inputfield", { autoClose: 5000 });
    } else {
      try {
        const { data } = await axiosInstance.get(
          `${Api}/user/getallusers?name=${val}`
        );
        setResult(data);
      } catch (error) {
        toast.error("error occured while searching user", { autoClose: 5000 });
        console.log(error);
      }
    }
  };
  const nameChanged = async () => {
    try {
      const res = await axiosInstance.put(`${Api}/chat/rename/group/chat`, {
        chatId: chat._id,
        newChatName: changedName,
      });
      if (res.status === 200) {
        setChat(res.data);
        handleClose();
        setChangedName("");
        toast.success("Name changed sucessfully", { autoClose: 5000 });
      } else {
        toast.error("name cannot be changed try again", { autoClose: 5000 });
      }
    } catch (error) {
      console.log(error);
      toast.error("name cannot be changed try again", { autoClose: 5000 });
    }
  };

  const removeUserFromArray = (e) => {
    const filredArr = usersToBeAdded.filter((user) => user !== e);
    setUsersToBeAdded(filredArr);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <div style={{ minWidth: "400px" }}>
        <DialogTitle
          sx={{ display: "flex", justifyContent: "space-between" }}
          color="brown"
        >
          <div>{chat.chatName}</div>{" "}
          {!changeName && (
            <Button variant="contained" onClick={() => setChangeName(true)}>
              Change name
            </Button>
          )}{" "}
        </DialogTitle>
        <Box
          sx={{
            marginLeft: "30px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <p>Admin:</p>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              width: "fit-content",
              height: "fit-content",
              margin: "5px",
              border: "1px solid black",
              padding: "0px 15px",
              background: "#7fffd4",
              borderRadius: "5px",
            }}
          >
            <p style={{ padding: "0px", margin: "5px" }}>
              {chat.groupAdmin?.name}
            </p>
          </Box>
        </Box>
        {changeName && (
          <div
            style={{
              display: "flex",
              gap: "20px",
              margin: "20px",
              width: "80%",
            }}
          >
            {" "}
            <TextField
              sx={{ width: "100%" }}
              onChange={(e) => setChangedName(e.target.value)}
              id="filled-basic"
              label="New Group Chat Name"
              variant="filled"
            />{" "}
            <Button variant="contained" onClick={() => nameChanged()}>
              Change name
            </Button>{" "}
          </div>
        )}
        <DialogContent>
          <Box>
            {usersToBeAdded.length > 0 &&
              usersToBeAdded.map((e) => {
                return (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      width: "fit-content",
                      height: "fit-content",
                      margin: "5px",
                      border: "1px solid black",
                      padding: "0px 15px",
                      background: "#7fffd4",
                      borderRadius: "5px",
                    }}
                    key={e._id}
                  >
                    <p>{e.name}</p>
                    <Close onClick={() => removeUserFromArray(e)} />
                  </Box>
                );
              })}
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <p>{!addParticipants ? "Participants :" : "search result"}</p>
            {!addParticipants && (
              <Button
                sx={{ padding: "0px 10px" }}
                variant="contained"
                onClick={() => setAddParticipants(true)}
              >
                Add Participants
              </Button>
            )}
            {addParticipants && (
              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  margin: "20px",
                  width: "80%",
                }}
              >
                {" "}
                <TextField
                  sx={{ width: "100%" }}
                  onChange={(e) => handleSearch(e.target.value)}
                  id="filled-basic"
                  label="Search with Name "
                  variant="filled"
                />{" "}
                <Button
                  variant="contained"
                  onClick={() => handleAddParticipants()}
                >
                  Add Participants
                </Button>{" "}
              </div>
            )}
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            {filteredresult.map((e) => {
              return (
                <Box
                  onClick={() => setUsersToBeAdded([...usersToBeAdded, e])}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    width: "fit-content",
                    height: "fit-content",
                    margin: "5px",
                    border: "1px solid black",
                    padding: "0px 15px",
                    background: "#7fffd4",
                    borderRadius: "5px",
                  }}
                  key={e._id}
                >
                  <p style={{ padding: "0px", margin: "5px" }}>{e.name}</p>
                </Box>
              );
            })}
          </Box>
          <p>{addParticipants && "participants :"}</p>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            {chat.users.map((e) => {
              return (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    width: "fit-content",
                    height: "fit-content",
                    margin: "5px",
                    border: "1px solid black",
                    padding: "0px 15px",
                    background: "#7fffd4",
                    borderRadius: "5px",
                  }}
                  key={e._id}
                >
                  <p style={{ padding: "0px", margin: "5px" }}>{e.name}</p>
                  <CloseSharp onClick={() => removeParticipant(e._id)} />
                </Box>
              );
            })}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={leaveGroup} variant="contained" color="error">
            Leave Group
          </Button>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};
