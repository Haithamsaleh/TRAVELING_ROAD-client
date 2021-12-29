import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PasswordChecklist from "react-password-checklist";
import axios from "axios";
import "./style.css";
import Swal from 'sweetalert2'

import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
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
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)
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
    <ChakraProvider>
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
        <main >
          
          <Box>
            <VStack>
            <h1>check Password:</h1>
            <VStack>
 <PasswordChecklist

              rules={[
                "minLength",
                "specialChar",
                "number",
                "capital",
                "lowercase",
              ]}
              minLength={8}
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
            />    </VStack>

                        </VStack>

           
          </Box>
          <Box >
          <VStack>
            <h2>Signup</h2>
            {message ? <Box >{message}</Box> : ""}
            
            <form
            
              onSubmit={(e) => {
                e.preventDefault();
                signup(e);
              }}
            >         <Box></Box> <VStack>

<FormControl>
                
                <FormLabel htmlFor='text'>User name</FormLabel>
                <Input id='text' type='text' onChange={(e) => setUsername(e.target.value)} />
              </FormControl>
              {/* <input
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                required
              /> */}
              <FormControl>
                
  <FormLabel htmlFor='email'>Email address</FormLabel>
  <Input id='email' type='email' onChange={(e) => setEmail(e.target.value)} />
  <FormHelperText>We'll never share your email.</FormHelperText>
</FormControl>
              {/* <input
                type="text"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              /> */}
              {/* <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
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
              <Button colorScheme='green'> <input
                id="signupSubmitButton"
                type="submit"n
                value="Submit"
                disabled
              /></Button>
                        </VStack>

            </form>
            </VStack>
          </Box>
        </main>
      )}
    </div>
    <VStack><Button mt='10' mb='10' colorScheme='blue' onClick={() => navigate("/login")}>
              or go to login
            </Button> </VStack>
    </ChakraProvider>
  );
};

export default Signup;
