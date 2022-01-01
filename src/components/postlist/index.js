import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
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
} from "@chakra-ui/react";
// import "./style.css";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const PostsList = () => {
  const [posts, setposts] = useState([]);
  const [title, setTitle] = useState("");
  const [Post, setPost] = useState("");
  const [postImg, setPostImg] = useState("");
  const [local, setLocal] = useState("");

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
    const result = await axios.get(`${BASE_URL}/posts`, {
      headers: {
        Authorization: `Bearer ${state.Login.token}`,
      },
    });
    setposts(result.data);
  };
  const addPost = async () => {
    await axios.post(
      `${BASE_URL}/newPost`,
      {
        titel: title,
        post: Post,
        img: postImg,
      },
      {
        headers: {
          Authorization: `Bearer ${state.Login.token}`,
        },
      }
    );

    getPosts(local);
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
  
      <Button onClick={addPost}>Add</Button>
      {posts.map((item, i) => (
        <>
          <Link to={`/post/${item._id}`}>
            {/* {console.log("id=   " + item._id)} */}

            <Box
              w="60%"
              mt="10"
              mb="10"
              ml="10"
              boxShadow="outline"
              p="6"
              rounded="md"
              bg="#ffff"
              _hover={{ boxShadow: "inner" }}
            >
              <h1>{item.titel}</h1>
              <h1>{item.date}</h1>
              {/* {console.log(item)} */}

              {item.like.map((l) => (
                <>
                  <h1> likes: {l._id}</h1>
                  <h1> by: {l.userId}</h1>
                  {console.log(l.userId)}

                </>
              ))}

              {item.userId.map((u) => (
                <>
                  <h1> By: {u.username}</h1>
                </>
              ))}
            </Box>
          </Link>
        </>
      ))}
    </ChakraProvider>
  );
};

export default PostsList;
