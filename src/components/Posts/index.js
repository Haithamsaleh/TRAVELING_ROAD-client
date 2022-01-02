import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import travel from "../Home/travel.jpg";
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
  Image,
  Badge,
  Avatar,
  AvatarBadge,
  AvatarGroup,
  WrapItem,
  GridItem,
  Flex,
  Wrap,
} from "@chakra-ui/react";
import { AiFillHeart } from "react-icons/ai";

import {
  PhoneIcon,
  AddIcon,
  WarningIcon,
  ChatIcon,
  Icon,
} from "@chakra-ui/icons";

import "./style.css";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Posts = () => {
  const { id } = useParams();
  const [Post, setPost] = useState("");
  const [newcomment, setNewComment] = useState("");

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
          postId: postId,
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
          postId: postId,
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
      <Wrap>
        {/* {console.log(Post.titel)} */}

        <WrapItem>
          

            <Box
              mt="100"
              boxShadow="dark-lg"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              ml="20px"
              w="800px"
            >
             
              <Text fontSize="6xl">{Post.titel}</Text>
              <Text fontSize="4xl">{Post.post}</Text>
              <Image
                boxSize="100px"
                objectFit="cover"
                src="{Post.img}"
                alt="post image"
              />
                

              <Box ml='10px'>
              <Button 
               
          colorScheme="red"
          onClick={() => {
            addlike(Post._id);
          }}
        >
          like  {Post && Post.like.length}

         
          <AiFillHeart />
          

        </Button>
        </Box>
        
            </Box>
            <Box
              mt="100"
              ml="40"
              boxShadow="2xl"
              maxW={"330px"}
              w={"330px"}
              bg={"gray.100"}
              rounded={"md"}
              overflow={"hidden"}
            >
              <Image
                h={"120px"}
                w={"full"}
                src={
                  "https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                }
                objectFit={"cover"}
              />
              <Flex justify={"center"} mt={-12}>
                <Avatar
                  size={"xl"}
                  src={
                    "https://cicloposse.com/wp-content/uploads/2016/03/blank-profile-picture-973460_960_720.png"
                  }
                  alt={"Author"}
                  css={{
                    border: "2px solid white",
                  }}
                />
              </Flex>
              <Box p={6}>
                <Stack spacing={0} align={"center"} mb={5}>
                  <Heading
                    fontSize={"2xl"}
                    fontWeight={500}
                    fontFamily={"body"}
                  >
                      {Post &&
          Post.userId.map((I) => (
            <>
              {I.username}
              
            </>
          ))}{" "}
                  </Heading>
                  <Text color={"gray.500"}>user bio</Text>
                </Stack>

                <Stack direction={"row"} justify={"center"} spacing={6}>
                  <Stack spacing={0} align={"center"}>
                    <Text fontWeight={600}>0</Text>
                    <Text fontSize={"sm"} color={"gray.500"}>
                      Posts
                    </Text>
                  </Stack>
                  <Stack spacing={0} align={"center"}>
                    <Text fontWeight={600}>0</Text>
                    <Text fontSize={"sm"} color={"gray.500"}>
                      Meets up
                    </Text>
                    </Stack>
                    <Stack spacing={0} align={"center"}>

                    <Text fontWeight={600}>1</Text>
                    <Text fontSize={"sm"} color={"gray.500"}>
                      Services
                    </Text>
                  </Stack>
                </Stack>
                <Stack mt='10' direction={"row"} justify={"center"} spacing={6}>
                <Stack spacing={0} align={"center"}>
                    <Text fontWeight={600}>0</Text>
                    <Text fontSize={"sm"} color={"gray.500"}>
                      Followers
                    </Text>
                  </Stack>
                  <Stack spacing={0} align={"center"}>
                    <Text fontWeight={600}>0</Text>
                    <Text fontSize={"sm"} color={"gray.500"}>
                      Followers
                    </Text>
                    </Stack>
               </Stack>


                <Button
                  w={"full"}
                  mt={8}
                  bg={("#151f21", "gray.900")}
                  color={"white"}
                  rounded={"md"}
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "lg",
                  }}
                >
                  Follow
                </Button>
              </Box>
            </Box>

            
        </WrapItem>
        <Box>
        {Post &&
          Post.comment.map((s) => (
            <>
              <Box
                              mt="40px"

                ml="20px"
                w="1000px"
                boxShadow="outline"
                p="6"
                rounded="md"
                bg="white"
              >
                {s.desc}
                <p> by: {s.userid}</p>
              </Box>

              {/* <p> Comment: {s.desc}</p> */}
            </>
          ))}
          </Box>
      

        



      
         

 
        <Input
          placeholder="large size"
          w='1000px'
          size="lg"
          onChange={(e) => {
            setNewComment(e.target.value);
          }}
        />
        

        <Button
        ml='10px'
          colorScheme="teal"
          variant="solid"
          onClick={() => {
            addcomment(Post._id);
          }}
        >
          {" "}
          <Icon  as={ChatIcon} mr="10px" />
          post Comment
        </Button>
        
        <br />
        
      </Wrap>
    </ChakraProvider>
  );
};

export default Posts;
