import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
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
  Image,
} from "@chakra-ui/react";
import { PhoneIcon, AddIcon, WarningIcon ,ChatIcon,Icon } from '@chakra-ui/icons'

import "./style.css";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Posts = () => {
  const { id } = useParams();
  const [Post, setPost] = useState("");
  const [newcomment, setNewComment] = useState('');

  const postId = [];

  const state = useSelector((state) => {
    return state;
  });
  
  useEffect(() => {
    const getToken = localStorage.getItem("token");
    getPost(id);
  }, []);
  const getPost = async (id) => {
    try {
      const result = await axios.get(`${BASE_URL}/post/${id}`);

      setPost(result.data);

      // console.log(result.data,"<<<<<<<<<<");
    } catch (error) {
      console.log(error);
    }
  };
  const addcomment = async (postId) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/newcomment`,
        {
          desc: newcomment,
          postId:postId
        ,
        },
        {
          headers: {
            Authorization: `Bearer ${state.Login.token}`,
          },
        }
      );
      getPost(id);
    } catch (error) {
      console.log(error);
    }
  };
  const addlike = async (postId) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/newlike`,
        {
          postId:postId
        ,
        },
        {
          headers: {
            Authorization: `Bearer ${state.Login.token}`,
          },
        }
      );
      getPost(id);
    } catch (error) {
      console.log(error);
    }
  };
  

  
 

  return (
  <ChakraProvider>
    <div className="mainDivv">
      {/* {console.log(Post.titel)} */}
    
      <div className="list">
        {" "}
        <Box  boxShadow='dark-lg' borderWidth='1px' borderRadius='lg' overflow='hidden' ml="20px" w="90%">

        <Text fontSize='6xl'>{Post.titel}</Text>
        <Text fontSize='4xl'>{Post.post}</Text>
        <Image
    boxSize='100px'
    objectFit='cover'
    src='{Post.img}'
    alt='Dan Abramov'
  />
</Box>

{console.log(Post,"<=======")}
      {Post && Post.comment.map(s => (
    <>
    <Box mt="100px"></Box>
    <Box ml="20px" w="1000px" boxShadow='outline' p='6' rounded='md' bg='white'>
    {s.desc}
    <p> by: {s.userid}</p>

  </Box>
  
     {/* <p> Comment: {s.desc}</p> */}
    </>

   ))}
    {Post && Post.like.map(l => (
    <>
     <p> like: {l._id}</p>
     <p> by: {l.userid}</p>
     <h1> by: {l.userId}</h1>
                  {console.log(l)}

    </>

   ))}
     <Input placeholder='large size' size='lg'  onChange={e => {
                 setNewComment(e.target.value);
               }}/>

             
              <Button colorScheme='teal' variant='solid' onClick={()=>{addcomment(Post._id)}}>  <Icon as={ChatIcon} mr="10px" />

      post Comment
  </Button>
             {/* <button className="addBTN" onClick={()=>{addcomment(Post._id)}}>
               add
             </button> */}
             <br/>
             <button className="addBTN" onClick={()=>{addlike(Post._id)}}>
               like
             </button>
      </div>
    </div>
    </ChakraProvider>
  );
};

export default Posts;
