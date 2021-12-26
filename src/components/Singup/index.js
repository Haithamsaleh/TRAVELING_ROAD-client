import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PasswordChecklist from "react-password-checklist";
import axios from "axios";
import "./style.css";
import Swal from 'sweetalert2'
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const state = useSelector((state) => {
    return {
      token: state.Login.token,
    };
  });

  const signup = async () => {
    setMessage("");
    const res = await axios.post(`${BASE_URL}signUp`, {
      username: username,
      email: email,
      password: password,
      
    });
    if (res.status === 201) {
      Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'you will receive a confirmation email ',
          showConfirmButton: true,
          timer: 1500
        })
      navigate("/login");
    } else {
      setMessage(res.data.message);
        Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'make sure the email & the password are correct',
        footer: '<a href="">Why do I have this issue?</a>'
      })
    }
  };

  return (
    <div className="signupWrapper">
      {state.token ? (
        <h1>
          <div className="centerWrapper">
            <div className="homeSignupTitle">
              <p>You already loggedin, you don't need to signup</p>
            </div>
            <div className="homeSignupButtons">
              <button onClick={() => navigate("/")}>HOME</button>
            </div>
          </div>
        </h1>
      ) : (
        <main className="signupPanel">
          
          <div className="loginDiv">
            <h1>check Password:</h1>
            <PasswordChecklist
              rules={[
                "minLength",
                "specialChar",
                "number",
                "capital",
                "lowercase",
              ]}
              minLength={6}
              value={password}
              onChange={(isValid) => {
                if (isValid) {
                  const button = document.querySelector("#signupSubmitButton");
                  button.disabled = false;
                } else {
                  const button = document.querySelector("#signupSubmitButton");
                  button.disabled = true;
                }
              }}
            />
            <button id="loginButton" className="btnBK" onClick={() => navigate("/login")}>
              or go to login
            </button>
          </div>
          <div  className="signupDiv">
            <h2>Signup</h2>
            {message ? <div className="message">{message}</div> : ""}
            <form
              className="signupInput"
              onSubmit={(e) => {
                e.preventDefault();
                signup(e);
              }}
            >
              <input
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                id="signupSubmitButton"
                type="submit"
                value="Submit"
                disabled
              />
            </form>
          </div>
        </main>
      )}
    </div>
  );
};

export default Signup;
