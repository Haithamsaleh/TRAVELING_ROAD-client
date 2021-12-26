import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Swal from 'sweetalert2'
import "./style.css";



const Regestier = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [username, setUserName] = useState("");
  const [emali, setEmail] = useState("");
  const [password, setPassword] = useState("");

 

  const ckeck = (e) => {
    e.preventDefault();

    let check = true;
    // eslint-disable-next-line
    users.map((item) => {
      if (item.emali == emali) {
        check = false;
      }
    });

    if (check) {
      try {
        axios.post("http://localhost:4000/resgister", {
          username,
          emali,
          password,
        }); Swal.fire({
          title: 'your account has been created successfully',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Start browsing '
        })
      } catch (error) {
        console.log(error);
      }}
    // } else {
    //   Swal.fire({
    //     title: 'your account has been created successfully',
    //     icon: 'success',
    //     confirmButtonColor: '#3085d6',
    //     confirmButtonText: 'Start browsing '
    //   })
    // }
  };

  useEffect(() => {
  }, []);

  const loginPage = () => {
    navigate("/Login");
  };

  return (
    <>

    <div className='login-box'>

      <h2>Singup</h2>
      <form onSubmit={ckeck}>
        <div className='user-box'>
        <input
          type="text"
          name="userName"
          placeholder="userName"
          onChange={(e) => setUserName(e.target.value)}
        />
        </div>
        <div className='user-box'>
        <input
          type="emali"
          name="emali"
          placeholder="emali"
          onChange={(e) => setEmail(e.target.value)}
        />
        </div>
        <div className='user-box'>
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        </div>
        <input className='submit' type="submit" value="Register" />
      </form>
      <a className='register' onClick={loginPage}>Already have an account ?</a>
    </div>
    </>
  );
};

export default Regestier;
