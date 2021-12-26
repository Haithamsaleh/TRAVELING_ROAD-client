//import './App.css';
import React from 'react'
import {Route,Routes,Link} from "react-router-dom";
import Home from './../Home';
import Books from './../Books';
import Navbar from './../navbar';
import Login from './../Login';
import Singup from './../Singup';
import logo from "./logo.png"
const NavBar = () => {
  return (

    <>
  
    <div className="container">
      <ul>

    <li><img src={logo} alt="error" width={100} height={100} /></li>

     <li><Link to="/">home</Link></li>
     
     <li> <Link to="/Singup">Sing up</Link></li>
     
     <li><Link to="/Books">Posts</Link></li>
     
     <li><Link to="/Login">login</Link></li>
     
    
     {/* <button className='submit1'  onClick={()=>{localStorage.removeItem("newUser")}}>logout</button> */}
    
     </ul>
     </div>
  
     <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/Books" element={<Books/>} />
          <Route path="/Login" element={<Login/>} />
          <Route path="/Navbar" element={<Navbar/>} />
          <Route path="/Singup" element={<Singup/>} />
     </Routes>
  
     </>
  
    
     
  
  
  
    
    )
  
  
  
  }
  
export default NavBar;
