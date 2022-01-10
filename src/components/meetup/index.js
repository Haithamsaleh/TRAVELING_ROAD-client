import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {  useParams } from "react-router";

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
  Avatar,  WrapItem,
  Flex,
  Wrap,
} from "@chakra-ui/react";
import { AiFillHeart } from "react-icons/ai";

import {
  ChatIcon,
  Icon,
} from "@chakra-ui/icons";

import "./style.css";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Meetup = () => {
  const { id } = useParams();
  const [meetsup, setMeetsup] = useState("");
  const [newcomment, setNewComment] = useState("");
  const [logedin, setLogedin] = useState(false);
const [comments, setComments] = useState("");
// eslint-disable-next-line
  const meetupId = [];

  const state = useSelector((state) => {
    return {
      token: state.Login.token,
    };
  });
  useEffect(() => {
    getMeetsup(id);
    getcomments(id);
    if (state.token) {
      setLogedin(true);
     
    } else {
      setLogedin(false);
      
    }// eslint-disable-next-line
  }, [state]);

  useEffect(() => {// eslint-disable-next-line
    const getToken = localStorage.getItem("token");
    // eslint-disable-next-line
  }, []);
  const getMeetsup = async (id) => {
    try {
      const result = await axios.get(`${BASE_URL}/meetup/${id}`);

      setMeetsup(result.data);

    } catch (error) {
    }
  };
  const getcomments = async (id) => {
    const result = await axios.get(`${BASE_URL}/commentsm/${id}`); 
   

    setComments(result.data);

  };
  const addcomment = async (meetupId) => {
    try {// eslint-disable-next-line
      const res = await axios.post(
        `${BASE_URL}/newcommentmeetup`,
        {
          desc: newcomment,
          meetupId: meetupId,
        },
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  const addlike = async (meetupId) => {
    try {// eslint-disable-next-line
      const res = await axios.post(
        `${BASE_URL}/newlikemeetup`,
        {
          meetupId: meetupId,
        },
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
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
              mt="7%"
              boxShadow="dark-lg"
              borderRadius="lg"
              overflow="hidden"
              ml="2.5%"
              w="60%"
            >
             
              <Text p='10' color="white" fontSize="6xl">{meetsup.titel}</Text>
              <Text p='10' color="white" fontSize="4xl">{meetsup.desc}</Text>
              <Text p='10' color="white" fontSize="xl">Date of arrival: {meetsup.dateofA} TO :</Text>

              <Image
                boxSize="100px"
                objectFit="cover"
                src={meetsup.img}
                alt="post image"
              />
                

              <Box ml='10px'>
              <Button 
               
          colorScheme="red"
          onClick={() => {
            addlike(meetsup._id);
          }}
        >
          like  {meetsup && meetsup.like.length}

         
          <AiFillHeart />
          

        </Button>
        </Box>
        
            </Box>
            
            {meetsup &&
              meetsup.userId.map((item, I) => (
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
                          src={I.avatar}
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
                              0
                            </Text>
                            <Text
                              color="white"
                              fontSize={"sm"}
                            >
                              Posts
                            </Text>
                          </Stack>
                          <Stack spacing={0} align={"center"}>
                            <Text color="white" fontWeight={600}>0</Text>
                            <Text fontSize={"sm"} color="white">
                              Meets up
                            </Text>
                          </Stack>
                          <Stack spacing={0} align={"center"}>
                            <Text color="white" fontWeight={600}>1</Text>
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
          
        { comments &&
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
              addcomment(meetsup._id);

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

export default Meetup;
