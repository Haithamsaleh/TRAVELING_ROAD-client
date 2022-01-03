// import './App.css';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Home from "./../Home";
import Posts from "./../Posts";
import Navbar from "./../navbar";
import Login from "./../Login";
import Singup from "./../Singup";
import PasswordChecklist from "react-password-checklist";
import Swal from "sweetalert2";
import axios from "axios";
import { useSelector } from "react-redux";
import { Loginn } from "./../../reducers/Login";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import logo from "./logo.jpg";
import { Logoutt } from "../../reducers/Login";
import {
  ChakraProvider,
  Box,
  Text,
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
  Center,
  Square,
  Circle,
  Heading,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Textarea,
  Select,
  InputRightAddon,
  InputLeftAddon,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Stack,
} from "@chakra-ui/react";
import withReactContent from "sweetalert2-react-content";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const MySwal = withReactContent(Swal);
const popupTools = require("popup-tools");

const NavBar = () => {
  const [username, setUsername] = useState("");
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const [email, setEmail] = useState("");
  const [emilOrUserName, setEmilOrUserName] = useState("");
  const [passwordd, setPasswordd] = useState("");
  const [message1, setMessage1] = useState("");

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenReportModal,
    onOpen: onOpenReportModal,
    onClose: onCloseReportModal,
  } = useDisclosure();
  const [logedin, setLogedin] = useState(false);

  const firstField = React.useRef();
  const state = useSelector((state) => {
    return {
      token: state.Login.token,
    };
  });
  useEffect(() => {
    if (state.token) {
      setLogedin(true);
    } else {
      setLogedin(false);
    }
  }, [state]);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const logOut = () => {

   
    dispatch(Logoutt({ role: "", token: "" }));
   
    localStorage.clear();
    <Alert
    status='success'
    variant='subtle'
    flexDirection='column'
    alignItems='center'
    justifyContent='center'
    textAlign='center'
    height='200px'
  >
    <AlertIcon boxSize='40px' mr={0} />
    <AlertTitle mt={4} mb={1} fontSize='lg'>
      Application submitted!
    </AlertTitle>
    <AlertDescription maxWidth='sm'>
      Thanks for submitting your application. Our team will get back to you soon.
    </AlertDescription>
  </Alert>
    navigate("/");
  
   
  };
  const login = async () => {
    setMessage("");
    try {
      const res = await axios.post(`${BASE_URL}/login`, {
        email: emilOrUserName,
        password: passwordd,
        username: emilOrUserName,
      });
      dispatch(Loginn({ role: res.data.result.role, token: res.data.token }));
     
     
      Swal.fire({
        position: "center",
        icon: "success",
        title: "logged in successfully ",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/posts");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "make sure the email & the password are correct",
      });
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
          text: "general kenobi",
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

  const signup = async () => {
    setMessage("");
     try {
    const res = await axios.post(`${BASE_URL}/signup`, {
      username: username,
      email: email,
      password: password,
    });
   
      Swal.fire({
        position: "center",
        icon: "success",
        title: "you will receive a confirmation email ",
        showConfirmButton: true,
        timer: 1500,
      });
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "make sure the email & the password are correct",
        footer: '<a href="">Why do I have this issue?</a>',
      });
      setMessage(error.response.data.message);

    }
  };

  // useEffect(() => {
  //   console.log(state);
  //   if (state.Login.token) {
  //     setLogedin(true);
  //   } else {
  //     setLogedin(false);
  //   }
  // }, [state]);
  return (
    <ChakraProvider>
      <>
        <div className="container">
          <ul className="nav">
            <li className="li2">
              <img src={logo} alt="error" width={100} height={100} />
            </li>

            <li className="li2">
              <Link to="/">home</Link>
            </li>

            <li className="li2">
              <Link to="/Posts">Posts</Link>
            </li>

            <li className="li2">
              <Link to="/Meetup">meetup</Link>
            </li>

            <li className="li2">
              <Link to="/Service">Service</Link>
            </li>



            {!logedin ? (
           <>
            <li className="li1">
              {" "}
              <Button mt="3" colorScheme="blue" onClick={onOpen}>
                Sign up
              </Button>
            </li>
            <li className="li1">
              {" "}
              <Button mt="3" colorScheme="blue" onClick={onOpenReportModal}>
                login
              </Button>
            </li>
            </>
            ):(
            <li className="li1">
              {" "}
              <Button mt="3" colorScheme="red" onClick={logOut}>
                logout
              </Button>
              
            </li>
            )}
          </ul>
        </div>
        <Alert status='warning'>
    <AlertIcon />
    The website is currently in beta v.0.6
  </Alert>
      </>

      {/* Sign up */}
      <Box>
      {message1 ? <Box>{message1}</Box> : ""}{" "}

        <Drawer
          isOpen={isOpen}
          placement="right"
          initialFocusRef={firstField}
          onClose={onClose}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">Sign in </DrawerHeader>

            <DrawerBody>
              <Stack spacing="24px">
                <Box>
                  <FormLabel htmlFor="text">User name</FormLabel>
                  <Input
                    id="text"
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Box>

                <Box>
                  <FormLabel htmlFor="email">Email address</FormLabel>
                  <Input
                    id="email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <FormHelperText>We'll never share your email.</FormHelperText>
                </Box>

                <Box>
                  <FormLabel htmlFor="email">Password</FormLabel>
                  <InputGroup>
                    <Input
                      pr="4.5rem"
                      type={show ? "text" : "password"}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </Box>

                <Box>
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
                          const button = document.querySelector(
                            "#signupSubmitButton"
                          );
                          button.disabled = false;
                        } else {
                          const button = document.querySelector(
                            "#signupSubmitButton"
                          );
                          button.disabled = true;
                        }
                      }}
                    />
                  </VStack>
                </Box>
              </Stack>
            </DrawerBody>

            <DrawerFooter borderTopWidth="1px">
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button
                id="signupSubmitButton"
                colorScheme="blue"
                onClick={(e) => {
                  e.preventDefault();
                  signup(e);
                }}
              >
                {" "}
                Sign Up
                
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Box>
      <Box>
        <VStack></VStack>
      </Box>
      <Box>
        <VStack>
          <Box>
            <InputGroup size="md"></InputGroup>
          </Box>
        </VStack>
      </Box>
      {/* login */}
      <Box>
        {message ? { message } : ""}

        <Drawer
          isOpen={isOpenReportModal}
          placement="left"
          initialFocusRef={firstField}
          onClose={onCloseReportModal}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">Login</DrawerHeader>

            <DrawerBody>
              <Stack spacing="24px">
                <Box>
                  <FormLabel htmlFor="email">Email address</FormLabel>
                  <Input
                    id="email"
                    type="email"
                    onChange={(e) => setEmilOrUserName(e.target.value)}
                    required
                  />
                  <FormHelperText>We'll never share your email.</FormHelperText>
                </Box>
                <Box>
                  <FormLabel htmlFor="email">Password</FormLabel>
                  <InputGroup>
                    <Input
                      pr="4.5rem"
                      type={show ? "text" : "password"}
                      onChange={(e) => setPasswordd(e.target.value)}
                      placeholder="Enter password"
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </Box>

                <Button colorScheme="blue" onClick={forgotPassword}>
                  forgot your password?
                </Button>
              </Stack>
            </DrawerBody>

            <DrawerFooter borderTopWidth="1px">
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>

              <Button
                colorScheme="green"
                onClick={(e) => {
                  e.preventDefault();
                  login(e);
                }}
              >
                {" "}
                login
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Box>
      <Box>
        <VStack></VStack>
      </Box>
      <Box>
        <VStack>
          <VStack>
            <Box>
              <InputGroup size="md"></InputGroup>
            </Box>
          </VStack>
        </VStack>
      </Box>
      
    </ChakraProvider>
  );
};

export default NavBar;
