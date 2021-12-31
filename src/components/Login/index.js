import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Loginn } from "./../../reducers/Login";
import Swal from 'sweetalert2';
import withReactContent from "sweetalert2-react-content";
// import "./style.css";
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  Heading,
  theme,
  Button,
  HStack,
  Input,
  SimpleGrid,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  InputGroup,
  InputRightElement,
 } from '@chakra-ui/react';

const MySwal = withReactContent(Swal);
// eslint-disable-next-line
const popupTools = require("popup-tools");
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [emilOrUserName, setEmilOrUserName] = useState("");
  // const [userName, setUserName] = useState("");
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)
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
        username: emilOrUserName,
      });
      console.log(res.data.result.role);
      dispatch(Loginn({ role: res.data.result.role, token: res.data.token }));
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'logged in successfully ',
        showConfirmButton: false,
        timer: 1500
      })
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'make sure the email & the password are correct',
      })
      setMessage(error.response.data.message);
    }
  };
  const forgotPassword = async () => {
    const { value: email } = await MySwal.fire({
      title: "Forgot Password",
      input: "email",
      inputPlaceholder: "Enter your email address",
      showCancelButton: true,
      confirmButtonColor: "black",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (email) {
      try {
        await axios.post(`${BASE_URL}/email_check`, {
          email,
        });
        MySwal.fire({
          icon: "success",
          text: "Check your email to reset the password",
          text :"general kenobi",
          confirmButtonColor: "black",
        });
      } catch (error) {
        MySwal.fire({
          icon: "error",
          text: "Something went wrong!",
          confirmButtonColor: "black",
        });
      }
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
    <ChakraProvider>

    <div className="loginWrapper">
      {state.token ? (
        <>
          <div>
            <div>
              <p>You already loggedin</p>
            </div>
            <div>
              <button onClick={() => navigate("/home")}>home</button>
            </div>
          </div>
        </>
      ) : (
        <main >
          <VStack>
           <Heading isTruncated>Login</Heading>

             {message ? <Box >{message}</Box> : ""}
              <form
               className="input"
               onSubmit={(e) => {
                 e.preventDefault();
                 login(e);
               }}
              >   <Box></Box> <VStack>

              <FormControl>
                              
                              <FormLabel htmlFor='text'>User name</FormLabel>
                              <Input id='text' type='text' onChange={(e) => setEmilOrUserName(e.target.value)} required />
                            </FormControl>
                            </VStack>
            
              
              {/* <input
                type="text"
                placeholder="Email/Username"
                onChange={(e) => setEmilOrUserName(e.target.value)}
                required
              /> */}

<Box>
                <FormLabel htmlFor='email'>Password</FormLabel>

                  <InputGroup size='md'>
                    
      <Input
        pr='4.5rem'
        type={show ? 'text' : 'password'}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='Enter password'
      />
      <InputRightElement width='4.5rem'>
        <Button h='1.75rem' size='sm' onClick={handleClick}>
          {show ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
    </InputGroup>
    </Box>
              {/* <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input id="submitButton" type="submit" value="Submit" /> */}
              <input id="submitButton" type="submit" value="Submit" />
            </form>
            {/* <button
              type="button"
              className="login-with-google-btn"
              // onClick={googleLogin}
            >
              Or Login with Google
            </button> */}
           <div className="signUpDiv">
           <Heading isTruncated>Hello there</Heading>
            
            <Button colorScheme='blue' onClick={forgotPassword}>
            forgot your password?
            </Button>
              {/* <h1 className="forgotPassword" onClick={forgotPassword}>
              forgot your password?

              </h1> */}
              
              
            
              
            {/* <button
              className="gotosignUp"
              id="signupButton"
              onClick={() => navigate("/Singup")}
            >
              Sign up
            </button> */}
            <VStack><Button mt='5' mb='5' colorScheme='blue' onClick={() => navigate("/Singup")}>
            Sign up
            </Button> </VStack>
          </div>
          </VStack>
        </main>
      )}
    </div>
    </ChakraProvider>

  );
};

export default Login;
