import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import {
  ChakraProvider,
  Box,
  Text,
  
  Button,
  HStack,
  Input,
  Heading,
  Stack,
  Image,
  Avatar,
  WrapItem,
  Flex,
  Wrap,
} from "@chakra-ui/react";
import { AiFillHeart,AiFillMessage } from "react-icons/ai";

import {

  ChatIcon,
  Icon,
} from "@chakra-ui/icons";

import "./style.css";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Services = () => {
  const { id } = useParams();
  const [Services, setServices] = useState("");
  const [newcomment, setNewComment] = useState("");
  const [logedin, setLogedin] = useState(false);
const [comments, setComments] = useState("");
const navigate = useNavigate();
// eslint-disable-next-line
  const serviceId = [];
// eslint-disable-next-line
  const state = useSelector((state) => {
    return {
      token: state.Login.token,
    };
  });
  useEffect(() => {
    getServices(id);
      getcomments(id)
    if (state.token) {
      setLogedin(true);
      
    } else {
      setLogedin(false);
      
    }// eslint-disable-next-line
  }, [state]);

  useEffect(() => {// eslint-disable-next-line
    const getToken = localStorage.getItem("token");


  }, []);
  const getServices = async (id) => {
    try {
      const result = await axios.get(`${BASE_URL}/service/${id}`);

      setServices(result.data);

    } catch (error) {
      console.log(error);
    }
  };
  const getcomments = async (id) => {
    const result = await axios.get(`${BASE_URL}/commentss/${id}`); 
   

    setComments(result.data);

  };
  const addcomment = async (serviceId) => {
    try {// eslint-disable-next-line
      const res = await axios.post(
        `${BASE_URL}/newcommentservice`,
        {
          desc: newcomment,
          serviceId: serviceId,
        },
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      getServices(id);
    } catch (error) {
      console.log(error);
    }
  };
  const Book = async () => {
    try{
      Swal.fire({
        position: "center",
        icon: "success",
        title: "request send successfully ",
        showConfirmButton: false,
        timer: 2500,
      });
      navigate(`/`)

    }catch(error){
      Swal.fire({
        position: "center",
        icon: "error",
        title: "something goen wrong",
        showConfirmButton: false,
        timer: 2500,
      });
      navigate(`/`)
    }}
  const addlike = async (serviceId) => {
    try {// eslint-disable-next-line
      const res = await axios.post(
        `${BASE_URL}/newlikeservice`,
        {
          serviceId: serviceId,
        },
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      getServices(id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ChakraProvider>
            <Box bg="#4A5568">

      <Wrap>

        <WrapItem>
          

            <Box
              bg="#1A202C"
              mt="100"
              boxShadow="dark-lg"
              borderRadius="lg"
              overflow="hidden"
              ml="20px"
              w="800px"
            >
             
              <Text p='10' color="white" fontSize="6xl">{Services.titel  || <Skeleton/>}</Text>
             
              <Text p='10' color="white" fontSize="4xl">{Services.desc  || <Skeleton count={10} />}</Text>
              <Text p='10' color="white" fontSize="2xl">Price/ Day : {Services.price}$</Text>

              <Image
                boxSize="100px"
                objectFit="cover"
                src={Services.img}
                alt="post image"
              />
                

              <Box ml='10px'>
              <Button 
               
          colorScheme="red"
          onClick={() => {
            addlike(Services._id);
          }}
        >
          like  {Services && Services.like.length}

         
          <AiFillHeart />
          

        </Button>
        

        <Button 
        justify={'center'}
                ml='78%'
               colorScheme="green"
               onClick={() => {
                Book();
              }}             >
               <AiFillMessage/>
               Book
              
               
     
             </Button>
             
        </Box>
        
            </Box>
            {Services &&
              Services.userId.map((item, I) => (
                <>
                    <Box
                      mt="100"
                      ml="40"
                      boxShadow="2xl"
                      maxW={"330px"}
                      w={"330px"}
                      bg="#1A202C"
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
                          src={item.avatar}
                          alt={"Author"}
                          css={{
                            border: "2px solid white",
                          }}
                        />
                      </Flex>
                      <Box p={6}>
                        <Stack spacing={0} align={"center"} mb={5}>
                          <Heading
                            color="white"
                            fontSize={"2xl"}
                            fontWeight={500}
                            fontFamily={"body"}
                          >
                            {item.username}
                            <Text
                              color="white"
                              fontSize={"xl"}
                              fontWeight={100}
                              fontFamily={"body"}
                            >
                              {item.bio}{" "}
                            </Text>
                          </Heading>
                        </Stack>

                        <Stack direction={"row"} justify={"center"} spacing={6}>
                          <Stack spacing={0} align={"center"}>
                            <Text color="white" fontWeight={600}>
                              3
                            </Text>
                            <Text
                              color="white"
                              fontSize={"sm"}
                            >
                              Posts
                            </Text>
                          </Stack>
                          <Stack spacing={0} align={"center"}>
                            <Text color="white" fontWeight={600}>2</Text>
                            <Text fontSize={"sm"} color="white">
                              Meets up
                            </Text>
                          </Stack>
                          <Stack spacing={0} align={"center"}>
                            <Text color="white" fontWeight={600}>2</Text>
                            <Text fontSize={"sm"} color="white">
                              Services
                            </Text>
                          </Stack>
                        </Stack>
                        <Stack
                          mt="10"
                          direction={"row"}
                          justify={"center"}
                          spacing={6}
                        >
                          <Stack spacing={0} align={"center"}>
                            <Text color="white" fontWeight={600}>0</Text>
                            <Text fontSize={"sm"} color="white">
                              Followers
                            </Text>
                          </Stack>
                          <Stack spacing={0} align={"center"}>
                            <Text color="white" fontWeight={600}>0</Text>
                            <Text fontSize={"sm"} color="white">
                              Followers
                            </Text>
                          </Stack>
                        </Stack>
                        {!logedin ? (
                          <p></p>
                        ) : (
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
                        )}
                      </Box>
                    </Box>
                    </>
              ))}{" "}
           
            
        </WrapItem>
        <Box>
        {comments &&
          comments.map((item) => (
            <>
            <Box
              mt="40px"
              ml="20px"
              w="1000px"
              p="6"
              rounded="md"
              bg="#1A202C"

            >
              <HStack>
                
                <Box>
                  <Avatar
                    src={`${item.userId.avatar}`}
                    alt={`${item.userId.username}`}
                    mb={2}
                  />

                  <Text color="white" fontWeight={600}>{item.userId.username}</Text>
                </Box>
              </HStack>

              <Box color="white" justify={"center"} align={"center"}>
                {" "}
                {item.desc}
              </Box>
              <Text color="white">{item.data}</Text>
            </Box>

            {/* <p> Comment: {s.desc}</p> */}
          </>
        ))}
    </Box>

    {!logedin ? (
      <p></p>
    ) : (
      <>
        <Input
        bg="white"
          placeholder="large size"
          w="1000px"
          size="lg"
          onChange={(e) => {
            setNewComment(e.target.value);
          }}
        />

        <Box>
          <Button
            ml="10px"
            colorScheme="teal"
            variant="solid"
            onClick={() => {
              addcomment(Services._id);

              //       toast({
              //   title: 'Account created.',
              //   description: "We've created your account for you.",
              //   status: 'success',
              //   duration: 9000,
              //   isClosable: true,
              // })
            }}
          >
            {" "}
            <Icon as={ChatIcon} mr="10px" />
            post Comment
          </Button>
        </Box>

        <br />
      </>
    )}
      </Wrap>
      </Box>
    </ChakraProvider>
  );
};

export default Services;
