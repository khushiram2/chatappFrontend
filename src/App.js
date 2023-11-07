
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './conponents/Home';
import { Loginpage } from './conponents/Loginpage';
import { Registerpage } from './conponents/Registerpage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { Chat } from './conponents/Chat';
import { ChatContextProvider } from './context.js';

function App() {

   
//   const navigate=useNavigate()
// const checkJWTExpiration=async()=>{
//   const res= await axiosInstance.get(`${Api}/chat/checktoken`)
//   if(res.status!==200){
//     navigate("/login")
//   }

// }

// useEffect(()=>{
//   checkJWTExpiration()
//   // eslint-disable-next-line
// },[])
  
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
