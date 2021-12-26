import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Loginn } from "./../../reducers/Login";
import Swal from 'sweetalert2'
import "./style.css";

const popupTools = require("popup-tools");
const BASE_URL = "http://localhost:4000";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [emilOrUserName, setEmilOrUserName] = useState("");
  // const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const state = useSelector((state) => {
    return {
      token: state.Login.token,
    };
  });
  console.log(state);
  const login = async () => {
    setMessage("");
    try {
      const res = await axios.post(`${BASE_URL}/login`, {
        email: emilOrUserName,
        password,
        userName: emilOrUserName,
      });
      console.log(res.data.result.role);
      dispatch(Loginn({ role: res.data.result.role, token: res.data.token }));
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'make sure the email & the password are correct',
        footer: '<a href="">Why do I have this issue?</a>'
      })
      setMessage(error.response.data.message);
    }
  };

  // const googleLogin = () => {
  //   popupTools.popup(
  //     `${BASE_URL}/auth/google`,
  //     "Google Login",
  //     { width: 400, height: 600 },
  //     function (err, user) {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         dispatch(
  //           Loginn({
  //             role: user.data.result.role,
  //             token: user.data.token,
  //           })
  //         );
  //         navigate("/");
  //       }
  //     }
  //   );
  // };

  return (
    <div className="loginWrapper">
      {state.token ? (
        <>
          <div>
            <div>
              <p>You already loggedin, you don't need to login</p>
            </div>
            <div>
              <button onClick={() => navigate("/home")}>home</button>
            </div>
          </div>
        </>
      ) : (
        <main className="panel">
          <div>
            <h2>Login</h2>
            {message ? <div className="message">{message}</div> : ""}
            <form
              className="input"
              onSubmit={(e) => {
                e.preventDefault();
                login(e);
              }}
            >
              <input
                type="text"
                placeholder="Email/Username"
                onChange={(e) => setEmilOrUserName(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input id="submitButton" type="submit" value="Submit" />
            </form>
            <button
              type="button"
              className="login-with-google-btn"
              // onClick={googleLogin}
            >
              Or Login with Google
            </button>
          </div>
          <div className="signUpDiv">
            <h2 className="gotosignUp">Hello, friend!</h2>
            <p className="gotosignUp">
              if you haven't registered yet, sign up to receive our weekly
              offers
            </p>
            <button
              className="gotosignUp"
              id="signupButton"
              onClick={() => navigate("/Singup")}
            >
              Sign up
            </button>
          </div>
        </main>
      )}
    </div>
  );
};

export default Login;
