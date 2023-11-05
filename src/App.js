
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { Home } from './conponents/Home';
import { Loginpage } from './conponents/Loginpage';
import { Registerpage } from './conponents/Registerpage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { Chat } from './conponents/Chat';
import { ChatContextProvider } from './context.js';
import { axiosInstance } from './conponents/AxiosInstance';
import { Api } from './conponents/GlobalApi';
import { useEffect } from 'react';
import { socket } from './conponents/Socket.js/socket';
function App() {
  const data = window.localStorage.getItem("data");
  const userData = JSON.parse(data);
  useEffect(() => {
    socket.emit("setup", userData);
    socket.on("connection", () => {
      console.log("Connected to socket.io");    
    });
  }, []);
  const navigate=useNavigate()
const checkJWTExpiration=async()=>{
  const res= await axiosInstance.get(`${Api}/chat/checktoken`)
  if(res.status!==200){
    navigate("/login")
  }

}

useEffect(()=>{
  checkJWTExpiration()
},[])
  
  return (
   
    <div className="App">
       <ChatContextProvider>
      <div>
      <ToastContainer /> 
    </div>
      <Routes>
      <Route  path='/' element={<Navigate replace to="/login"/>}  />
      <Route  path='/home' Component={Home}  />
      <Route  path='/login' Component={Loginpage}  />
      <Route  path='/register' Component={Registerpage}  />
      <Route  path='/chat' Component={Chat}  />
      </Routes>
      </ChatContextProvider>
    </div>
   
   
  );
}

export default App;
