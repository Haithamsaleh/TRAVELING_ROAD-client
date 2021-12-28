//import './App.css';
import React from 'react'
import {Link} from "react-router-dom";
// import Home from './../Home';
// import Posts from './../Posts';
// import Navbar from './../navbar';
// import Login from './../Login';
// import Singup from './../Singup';
import { useNavigate } from "react-router";
import {useDispatch} from "react-redux";
import logo from "./logo.png"
import { Logoutt } from "../../reducers/Login";

// import Account from './../../components/Account'
const NavBar = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const logOut =()=>{
 
    dispatch(Logoutt({role:"",token:""}));
  localStorage.clear()
  navigate('/login')

 }
  return (

    <>
  
    <div className="container">
      <ul>

    <li><img src={logo} alt="error" width={100} height={100} /></li>

     <li><Link to="/">home</Link></li>
     
     
     <li><Link to="/Posts">Posts</Link></li>

     <li><Link to="/Meetup">meetup</Link></li>

     <li><Link to="/Service">Service</Link></li>
     
     <li className="li1"><Link to="/Login">login</Link></li>

     <li className="li1"> <Link to="/Singup">Sing up</Link></li>

     
     <li className="li1"> <button  id="btnLogout"onClick={logOut}>logout</button>

</li>
    
     </ul>
     </div>
  
   
  
     </>
  
    
     
  
  
  
    
    )
  
  
  
  }
  
export default NavBar;
