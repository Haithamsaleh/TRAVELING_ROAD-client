import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
import { storage } from '../../firebase'

import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  Button,
  HStack,
  Input,
  FormLabel,
  InputGroup,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Textarea,
  Stack,
  Avatar,
  Tag,
  chakra,
  Flex
} from "@chakra-ui/react";
import { FaHeart,FaComment } from "react-icons/fa";


const BASE_URL = process.env.REACT_APP_BASE_URL;

const MeetsupList = () => {
  const [meetsup, setmeetsup] = useState([]);
  const [title, setTitle] = useState("");
  const [Post, setPost] = useState("");// eslint-disable-next-line
  const [postImg, setPostImg] = useState("");
  const [date, setDate] = useState("");
  const [dateE, setDateE] = useState("");

  const [local, setLocal] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();// eslint-disable-next-line
  const [message, setMessage] = useState("");
  const [logedin, setLogedin] = useState(false);// eslint-disable-next-line
  const [value, onChangev] = useState(null);
  const [img, setImages] = useState("");// eslint-disable-next-line
  const [progress, setProgress] = useState(0);
  const [searchField, setSearchField] = useState("");
  const [searchShow, setSearchShow] = useState(false);

  const firstField = React.useRef();
  const navigate = useNavigate();

  const state = useSelector((state) => {
    return{
       state,
      token: state.Login.token,

    }
  });
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
        getDownloadURL(uploadImamge.snapshot.ref)
        .then((url) => {
          setImages([...img, url]);
        });
      }
    );
  };
  useEffect(() => {
    setProgress(0);
    getPosts();
  }, [img]);


  useEffect(() => {

    if (state.token) {
      setLogedin(true);
      const getToken = localStorage.getItem("token");
    setLocal(getToken);
    } else {
      setLogedin(false);
      const getToken = localStorage.getItem("token");
    setLocal(getToken);
    }// eslint-disable-next-line
  }, [state]);
  const getPosts = async () => {
    const result = await axios.get(`${BASE_URL}/meetup`, {
      headers: {
        Authorization: `Bearer ${state.token}`,
      },
    });
    setmeetsup(result.data);
  };
  const handleChange = (e) => {
    setSearchField(e.target.value);
    if (e.target.value === "") {
      setSearchShow(false);
      getPosts();

    } else {
      setSearchShow(true);
      getPostsBySearch();
    }
  };
  const getPostsBySearch = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/meetup`);
      setmeetsup(
        result.data.filter((item) => {
          return (
            item.titel.toLowerCase().includes(searchField.toLowerCase()) ||
            item.desc.toLowerCase().includes(searchField.toLowerCase())
          );
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const addPost = async () => {
    try{
    await axios.post(
      `${BASE_URL}/newmeetup`,
      {
        
        titel: title,
        desc: Post,
        img: img[0],
        dateofA:date,
        dateofE:dateE,

      },
      {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      }
    );
   

    getPosts(local);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "logged in successfully ",
      showConfirmButton: false,
      timer: 2500,
    });
    navigate(`/`);

  }catch(error){ Swal.fire({
    position: "center",
    icon: "error",
    title: "lxxxxxxxx ",
    showConfirmButton: false,
    timer: 2500,
  });}
  navigate(`/`);

  };


  return (
    <ChakraProvider>
      <Box bg="gray.600">
      <VStack>
      <HStack>

      <Input
      
      alignItems="center"
      textAlign="center"
        width="80"
        mt="39"
        bg="#444"
        placeholder="🔍 looking for something..."
        fontSize="1.5rem"
        color="white"
        onChange={handleChange}
      />      </HStack>

      </VStack>
      </Box>
        {!logedin ? (<p></p>
                  ):(
                    <Box bg='gray.600'>
      <Button  ml="3" mt="3" colorScheme="blue" onClick={onOpen}>
        New Meet Up
      </Button>
      </Box>
      )}

      {meetsup.map((item, i) => (
        <>
          <Link to={`/meetup/${item._id}`}>
            
          <Flex
              bg="gray.600"
              p={50}
              w="full"
              alignItems="center"
              justifyContent="center"
            >
              <Box
                w="full"
                mx="auto"
                py={4}
                px={8}
                bg="gray.800"
                shadow="lg"
                rounded="lg"
              >
                {item.userId.map((u) => (
                  <>
                    <Flex
                      justifyContent={{ base: "center", md: "end" }}
                      mt={-16}
                    >
                      <Avatar
                        w={20}
                        h={20}
                        fit="cover"
                        rounded="full"
                        borderStyle="solid"
                        borderWidth={2}
                        borderColor="brand.400"
                        alt={u.username}
                        src={`${u.avatar}`}
                      />
                    </Flex>
                    <Tag size='md'  variant='solid' colorScheme='teal'>
      Meetup
    </Tag>
    <Tag ml='1' size='md'  variant='solid' colorScheme='red'>
      Hot
    </Tag>
    <Tag ml='1' size='md'  variant='solid' colorScheme='green'>
      NEW
    </Tag>
                    <chakra.h2
                      color="white"
                      fontSize={{ base: "2xl", md: "3xl" }}
                      mt={{ base: 2, md: 0 }}
                      fontWeight="bold"
                    >
                      {item.titel}
                    </chakra.h2>
                    <HStack>
                      <FaHeart color="white" />
                      <Text color="white">{item.like.length}</Text>

                      <FaComment color="white" />
                      <Text color="white">{item.comment.length}</Text>
                    </HStack>
                    <chakra.p mt={2} color="gray.200">
                      {item.desc}
                    </chakra.p>
                    <chakra.p mt={2} color="gray.200">
                      {item.date}{" "}
                    </chakra.p>

                    <Flex justifyContent="end" mt={4}>
                      <Text fontSize="xl" color="#888EC5">
                        {u.username}
                      </Text>
                    </Flex>
                  </>
                ))}
              </Box>
            </Flex>
            {/* ------------------------------------------------- */}
           
        
            

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
          <DrawerContent bg="gray.600">
            <DrawerCloseButton  color="white" />
            <DrawerHeader color="white" borderBottomWidth="1px">Meet Up </DrawerHeader>

            <DrawerBody>
              <Stack spacing="24px">
                <Box>
                  <FormLabel color='white' htmlFor="text"> titel</FormLabel>
                  <Input
                  bg="white"
                    id="text"
                    type="text"
                    placeholder="could you please tell us the city you going to"
                    onChange={(e) => setTitle(e.target.value)}
                    />
                </Box>

                <Box>
                  <FormLabel color='white' htmlFor="text">tell us more About what looking ...</FormLabel>
               
                  <Textarea
                  bg="white"
           onChange={(e) => setPost(e.target.value)}
           placeholder="tell us more About what looking ..."
                    size="lg"
                  />
                  <FormLabel color='white' htmlFor="text" onChange={(e) => setPostImg(e.target.value)}>Post imege</FormLabel>
                  
                  <InputGroup>
                  <Input   
                  bg='white'
            type="file"
            accept=".gif,.jpg,.jpeg,.png"
            onChange={(e) => {
              uploadPictures(e);
            }}
            id="img"
          />
          
                    
     
         
                  </InputGroup>
                  <Box mt={5} w={250} >
                    <VStack>
                        <FormLabel color='white' htmlFor="url">Date of arrival</FormLabel>

                      <Input
                      bg='white'
                      type="date"
                      id="date"
                      onChange={(e) => setDate(e.target.value)}
                      placeholder="Please enter domain"
                      />
                      <FormLabel color='white' htmlFor="url">TO</FormLabel>

                     <Input
                                           bg='white'

                      type="date"
                      id="date"
                      onChange={(e) => setDateE(e.target.value)}
                      placeholder="Please enter domain"
                       />
                       </VStack>
                       </Box>
                </Box>
              </Stack>
            </DrawerBody>

            <DrawerFooter borderTopWidth="1px">
              <Button bg='white' variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button
                id="signupSubmitButton"
                colorScheme="blue"
                onClick={addPost}
             
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

export default MeetsupList;
