
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './conponents/Home';
import { Loginpage } from './conponents/Loginpage';
import { Registerpage } from './conponents/Registerpage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { Chat } from './conponents/Chat';

function App() {
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
