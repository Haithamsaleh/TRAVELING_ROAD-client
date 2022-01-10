// import './App.css';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
import { storage } from "../../firebase";
import PasswordChecklist from "react-password-checklist";
import Swal from "sweetalert2";
import axios from "axios";
import themee from '../theme/theme'
import { useSelector } from "react-redux";
import { Loginn } from "./../../reducers/Login";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import logo from "./logo.png";
import { Logoutt } from "../../reducers/Login";
import {
  extendTheme,
  chakra,
  Flex,
  useColorModeValue,
  VisuallyHidden,
  HStack,
  IconButton,
  CloseButton,
  ChakraProvider,
  Box,
  VStack,
  Button,
  Input,
  FormLabel,
  FormHelperText,
  InputGroup,
  InputRightElement,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Stack,
  Tab,
  InputLeftElement,
  Tabs,
  Spacer,
  TabList,
  Avatar,
} from "@chakra-ui/react";
import withReactContent from "sweetalert2-react-content";
import { AiOutlineMenu,
  AiFillHome,
  AiOutlineInbox,
  AiFillBell, } from "react-icons/ai";
  import { BsFillCameraVideoFill, BsPlus } from "react-icons/bs";

  const colors = {
    brand: {
      50: "#ecefff",
      100: "#cbceeb",
      200: "#a9aed6",
      300: "#888ec5",
      400: "#666db3",
      500: "#4d5499",
      600: "#3c4178",
      700: "#2a2f57",
      800: "#181c37",
      900: "#080819"
     },
   }
const BASE_URL = process.env.REACT_APP_BASE_URL;
const MySwal = withReactContent(Swal); // eslint-disable-next-line
const popupTools = require("popup-tools");
const theme = extendTheme({ colors })

const NavBar = () => {
  const [username, setUsername] = useState("");
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const [email, setEmail] = useState("");
  const [emilOrUserName, setEmilOrUserName] = useState("");
  const [passwordd, setPasswordd] = useState(""); // eslint-disable-next-line
  const [message1, setMessage1] = useState("");

  // eslint-disable-next-line
  const [progress, setProgress] = useState(0);
  const [img, setImages] = useState("");
  const bg = useColorModeValue("#1A202C", "gray.800");
  const mobileNav = useDisclosure();

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
  const uploadPictures = (e) => {
    let image = e.target.files[0];
    const dataType = image.name.match(/\.(jpe?g|png|gif)$/gi);
    if (image == null || dataType == null) return;
    const storageRef = ref(storage, `images/${image.name}`);
    const uploadImamge = uploadBytesResumable(storageRef, image);
    uploadImamge.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadImamge.snapshot.ref).then((url) => {
          setImages([...img, url]);
        });
      }
    );
  };
  useEffect(() => {
    setProgress(0);
  }, [img]);
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
      status="success"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="200px"
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        Application submitted!
      </AlertTitle>
      <AlertDescription maxWidth="sm">
        Thanks for submitting your application. Our team will get back to you
        soon.
      </AlertDescription>
    </Alert>;
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
    // eslint-disable-next-line
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
      // eslint-disable-next-line
      const res = await axios.post(`${BASE_URL}/signup`, {
        username: username,
        email: email,
        password: password,
        avatar: img[0],
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

  return (
    <ChakraProvider theme={theme}>
      <>
     
      <React.Fragment>
      <chakra.header
        bg={'#1A202C'}
        w="full"
        px={{ base: 2, sm: 4 }}
        py={4}
        shadow="md"
      >
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <HStack display="flex" spacing={3} alignItems="center">
            <Box display={{ base: "inline-flex", md: "none" }} zIndex="popover" >
              <IconButton
                display={{ base: "flex", md: "none" }}
                aria-label="Open menu"
                fontSize="20px"
                color={useColorModeValue("gray.800", "inherit")}
                variant="ghost"
                icon={<AiOutlineMenu color="white" />}
                onClick={mobileNav.onOpen}
              />
              <VStack
                pos="absolute"
                top={0}
                left={0}
                right={0}
                display={mobileNav.isOpen ? "flex" : "none"}
                flexDirection="column"
                p={2}
                pb={4}
                m={2}
                bg={bg}
                spacing={3}
                rounded="sm"
                shadow="sm"
              >
                <CloseButton
                color='white'
                  aria-label="Close menu"
                  justifySelf="self-start"
                  onClick={mobileNav.onClose}
                />
                <Button w="full" colorScheme="white" variant="solid" leftIcon={<AiFillHome />}>
                <Link to="/">home</Link>

                </Button>
                <Button
                to="/posts"
                  w="full"
                  variant="solid"
                  colorScheme="brand"
                >
                <Link to="/posts">Posts</Link>
                </Button>
                <Button
                  w="full"
                  variant="solid"
                  
                >
                                  <Link to="/meetup">MeetUp</Link>

                </Button>
                <Button
                  w="full"
                  variant="solid"
                >
                                  <Link to="/Service">service</Link>

                </Button>
              </VStack>
            </Box>
            <chakra.a
              href="/"
              title="TRAVELING ROAD"
              display="flex"
              alignItems="center"
            >
                            <img src={logo} alt="error" width={100} height={40} />

            </chakra.a>

            <HStack spacing={3} display={{ base: "none", md: "inline-flex" }}>
              <Button  variant="solid" leftIcon={<AiFillHome />} size="sm">
                <Link to="/">Home</Link>
              </Button>
              <Button
                variant="solid"
                colorScheme="brand"
                leftIcon={<AiOutlineInbox />}
                size="sm">
                <Link to="/Posts">Posts</Link>
                </Button>
                <Button
                variant="solid"
                colorScheme="brand"
                leftIcon={<AiOutlineInbox />}
                size="sm">
                <Link to="/meetup">MeetUp</Link>
                </Button>
                <Button
                variant="solid"
                colorScheme="brand"
                leftIcon={<AiOutlineInbox />}
                size="sm">
                <Link to="/Service">Service</Link>
                </Button>
            </HStack>
          </HStack>
          <HStack
            spacing={3}
            display={mobileNav.isOpen ? "none" : "flex"}
            alignItems="center"
          >
            {!logedin ? (
              <>
                  <Button  colorScheme="blue" onClick={onOpen}>
                    Sign up
                  </Button>
                  <Button  colorScheme="blue" onClick={onOpenReportModal}>
                    login
                  </Button>
              </>
            ) : (
              <>
                  <Button  colorScheme="red" onClick={logOut}>
                    logout
                  </Button>
                  <Button  colorScheme="green">
                    Profile
                  </Button>
              </>
            )}
            <chakra.a
              p={3}
              color="inherit"
              rounded="sm"
              _hover= "gray.600"
            >
              <AiFillBell />
              <VisuallyHidden>Notifications</VisuallyHidden>
            </chakra.a>

           
          </HStack>
        </Flex>
      </chakra.header>
    </React.Fragment>

        {/* <div className="container">
          <ul className="nav">
            <li className="li2">
              <img src={logo} alt="error" width={200} height={100} />
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
            ) : (
              <>
                <li className="li1">
                  {" "}
                  <Button mt="3" colorScheme="red" onClick={logOut}>
                    logout
                  </Button>
                </li>
                <li className="li1">
                  {" "}
                  <Button mt="3" colorScheme="green">
                    Profile
                  </Button>
                </li>
              </>
            )}
          </ul>
        </div> */}
        {/* <Alert status="warning">
          <AlertIcon />
          The website is currently in alpha V0.8
        </Alert> */}
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
            <DrawerHeader borderBottomWidth="1px">Sign Up </DrawerHeader>

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
                <InputGroup>
                  <FormLabel htmlFor="text">Avatar</FormLabel>
                  <Input
                    type="file"
                    accept=".gif,.jpg,.jpeg,.png"
                    onChange={(e) => {
                      uploadPictures(e);
                    }}
                    id="img"
                  />
                </InputGroup>

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
