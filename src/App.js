import { Navigate, Route, Routes, useNavigate  } from 'react-router-dom';
import './App.css';
import Login from './Component/Login';
import Navbar from './Component/Navbar';
import Register from './Component/Register';
import Home from './Component/Home';
import NotFound from './Component/NotFound';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';


function App() {
  let navigate = useNavigate()
  const [userData, setUserData] = useState(null)
  function saveUserData(){
    let encodeToken = localStorage.getItem('token')
    let decodedToken = jwtDecode(encodeToken) 
    setUserData(decodedToken)
  }

  function ProtectedRoute(props){
    if (localStorage.getItem('token')==null) {

      return <Navigate to='/login'/>

    }else{
      return props.children
    }
  }

  function logOut(){
    setUserData(null);
    localStorage.removeItem('token');
    navigate('/login')
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      saveUserData() 
    }
  },[])

  return (
   <>
    {/* Without Gaurds */}
    <Navbar logOut = {logOut} userData = {userData}/>
    <Routes>
      <Route path='/' element = {<Login/> }/>
      <Route path='/home' element = {<Home/>}/>
      <Route path='/login' element = {<Login saveUserData={saveUserData}/>}/>
      <Route path='/register' element = {<Register/>}/>
      <Route path='*' element = {<NotFound/>}/>
    </Routes>

    {/* With Gaurds */}
    
    {/* <Navbar logOut = {logOut} userData = {userData}/>
    <Routes>
      <Route path='/' element = {<ProtectedRoute><Login/></ProtectedRoute> }/>
      <Route path='/home' element = {<ProtectedRoute><Home/></ProtectedRoute>}/>
      <Route path='/login' element = {<ProtectedRoute><Login/></ProtectedRoute>}/>
      <Route path='/register' element = {<ProtectedRoute><Register/></ProtectedRoute>}/>
      <Route path='*' element = {<ProtectedRoute><NotFound  /></ProtectedRoute>}/>
    </Routes> */}
   </>
  );
}

export default App;
