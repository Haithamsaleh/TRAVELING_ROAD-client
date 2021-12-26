import React from "react";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import Swal from 'sweetalert2'
import axios from "axios";
import './style.css';



const Login = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [emali, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const getData = async () => {
    const items = await axios.get("http://localhost:4000");
    setUsers(items.data);
  };

  useEffect(() => {
    getData();
  }, []);

  

  const registerPage = () => {
    navigate("/Singup");
  };

  const ckeck = (e) => {
    e.preventDefault();
    let ckeck = false;
    users.map((item) => {
      if (item.emali == emali && item.password == password) {
        ckeck = true;

      }
    });
    if (ckeck) {
      try {
        axios.post("http://localhost:4000/login", {
      
          emali,
          password,
        });
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'logged in successfully ',
          showConfirmButton: false,
          timer: 1500
        })
        localStorage.setItem(
          "newUser",
          JSON.stringify({ emali })
          
        );
        navigate("/home");
      } catch (error) {
        console.log("error ", error);
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'make sure the email & the password are correct',
        footer: '<a href="">Why do I have this issue?</a>'
      })
      
    }
  };

  return (
    <>
  
    <div className='ee'>    

    <div className="login-box ">
      
      <h2>Login</h2>
      <form onSubmit={ckeck}>
        <div className='user-box'>
        <input
          type="text"
          name="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        </div>
        <br/>
        <div className='user-box'>
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        </div>
        <br/>
        
        <input className='submit' type="submit"/>
        <div className="App container">
      </div>
        <div>
        <span></span>
      <span></span>
      <span></span>
      <span></span>
      </div>
      </form>
      <br/>
      <a className='register' onClick={registerPage}>Forget password?</a>
      <br/>
      <br/>
      <a className='register' onClick={registerPage}>Don't have an account ?</a>
    </div>

   

  </div>
  </>
  );
};

export default Login;
