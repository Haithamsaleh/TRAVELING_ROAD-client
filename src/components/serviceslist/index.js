import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
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
  Stack,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Avatar,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { BsSuitHeartFill } from "react-icons/bs";
import { FaHeart,FaComment } from "react-icons/fa";
import Posts from "../Posts";

// import "./style.css";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const ServicesList = () => {
  const [meetsup, setmeetsup] = useState([]);
  const [title, setTitle] = useState("");
  const [Post, setPost] = useState("");
  const [postImg, setPostImg] = useState("");
  const [local, setLocal] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [message, setMessage] = useState("");
  const firstField = React.useRef();
  const navigate = useNavigate();

  const state = useSelector((state) => {
    return state;
  });
  useEffect(() => {
    getPosts();
  }, []);
  useEffect(() => {
    const getToken = localStorage.getItem("token");
    setLocal(getToken);
    getPosts();
  }, []);
  const getPosts = async () => {
    const result = await axios.get(`${BASE_URL}/service`, {
      headers: {
        Authorization: `Bearer ${state.Login.token}`,
      },
    });
    setmeetsup(result.data);
  };
  const addPost = async () => {
    try{
    await axios.post(
      `${BASE_URL}/newservice`,
      {
        
        titel: title,
        desc: Post,
        img: postImg,
      },
      {
        headers: {
          Authorization: `Bearer ${state.Login.token}`,
        },
      }
    );
   


    getPosts(local);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "logged in successfully ",
      showConfirmButton: false,
      timer: 1500,
    });
    navigate(`/`);

  }catch(error){ Swal.fire({
    position: "center",
    icon: "error",
    title: "lxxxxxxxx ",
    showConfirmButton: false,
    timer: 1500,
  });}
  };

  // const data = async () => {
  //   // eslint-disable-next-line
  //   const posts = await axios
  //     .get(`${BASE_URL}/posts`)
  //     .then((dete) => {
  //       setposts(dete.data);

  //       console.log(dete.data);
  //     });
  // };

  // useEffect(() => {
  //   data();
  // }, []);

  return (
    <ChakraProvider>
      <Button ml="3" mt="3" colorScheme="blue" onClick={onOpen}>
        new post
      </Button>

      {meetsup.map((item, i) => (
        <>
        {console.log(meetsup)}
          <Link to={`/service/${item._id}`}>
            

        
            <Box
              w="60%"
              mt="10"
              mb="10"
              ml="10"
              boxShadow="2xl"
              p="6"
              rounded="md"
              bg="#ffff"
              _hover={{ boxShadow: "inner" }}
            >
              
              {item.userId.map((u) => (
                <>
                {console.log(item ,"==============")}
                   <Avatar
          src={
            `${u.avatar}`
          }
          alt={`${u.username}`}
          mb={2}
        />

        <Text fontWeight={600}>{u.username}</Text>
        
                </>
              ))}
              
             
        
              <Text fontSize="6xl">{item.titel}</Text>

              {/* {console.log(item)} */}
             <HStack>
          
              <FaHeart/> <p>{item.like.length}</p>


               <FaComment/><p>{item.comment.length}</p>
              </HStack>
                            <Text fontSize="xs">{item.date}</Text>
                            
            </Box>
            


          </Link>
        </>
      )
      )}

      <Box>
        {message ? <Box>{message}</Box> : ""}{" "}
        <Drawer
          isOpen={isOpen}
          placement="right"
          initialFocusRef={firstField}
          onClose={onClose}
          size="full"
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">new Post </DrawerHeader>

            <DrawerBody>
              <Stack spacing="24px">
                <Box>
                  <FormLabel htmlFor="text">Post titel</FormLabel>
                  <Input
                    id="text"
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    />
                </Box>

                <Box>
                  <FormLabel htmlFor="text">Post descreption</FormLabel>
                  {/* <Input
                    id="text"
                    type="text"
                    // onChange={(e) => setEmail(e.target.value)}
                  /> */}
                  <Textarea
           onChange={(e) => setPost(e.target.value)}
           placeholder="Post descreption"
                    size="lg"
                  />
                  <FormLabel htmlFor="text">Post imege</FormLabel>
                  <Button variant="outline" mr={3}>
                    Browse
                  </Button>
                  <FormLabel htmlFor="url">img Url</FormLabel>
                  <InputGroup>
                    <Input
                      type="url"
                      id="url"
                      onChange={(e) => setPostImg(e.target.value)}
                      placeholder="Please enter domain"
                    />
                  </InputGroup>
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
                onClick={addPost}
                // onClick={(e) => {
                //   e.preventDefault();
                //   signup(e);
                // }}
              >
                {" "}
                Post
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Box>
    

    </ChakraProvider>
  );
};

export default ServicesList;
