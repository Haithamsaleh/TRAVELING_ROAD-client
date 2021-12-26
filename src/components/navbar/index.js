//import './App.css';
import React from 'react'
import {Link} from "react-router-dom";
// import Home from './../Home';
// import Posts from './../Posts';
// import Navbar from './../navbar';
// import Login from './../Login';
// import Singup from './../Singup';
import logo from "./logo.png"
// import Account from './../../components/Account'
const NavBar = () => {
  return (

    <>
  
    <div className="container">
      <ul>

    <li><img src={logo} alt="error" width={100} height={100} /></li>

     <li><Link to="/">home</Link></li>
     
     <li> <Link to="/Singup">Sing up</Link></li>
     
     <li><Link to="/Posts">Posts</Link></li>
     
     <li><Link to="/Login">login</Link></li>
     
    
     {/* <button className='submit1'  onClick={()=>{localStorage.removeItem("newUser")}}>logout</button> */}
    
     </ul>
     </div>
  
   
  
     </>
  
    
     
  
  
  
    
    )
  
  
  
  }
  
export default NavBar;
