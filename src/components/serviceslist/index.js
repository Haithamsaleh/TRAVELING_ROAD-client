import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
import { storage } from "../../firebase";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  ChakraProvider,
  Box,
  Text,
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
  Tag,
  Textarea,
  Stack,
  Avatar,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Image,
  chakra,
  Flex,
} from "@chakra-ui/react";
import { FaHeart, FaComment } from "react-icons/fa";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const ServicesList = () => {
  const [meetsup, setmeetsup] = useState([]);
  const [title, setTitle] = useState("");
  const [Post, setPost] = useState(""); // eslint-disable-next-line
  const [postImg, setPostImg] = useState("");
  const [local, setLocal] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure(); // eslint-disable-next-line
  const [message, setMessage] = useState("");
  const [logedin, setLogedin] = useState(false); // eslint-disable-next-line
  const [price, setPrice] = useState("");
  const firstField = React.useRef();
  const [value, setValue] = React.useState("1"); // eslint-disable-next-line
  const [progress, setProgress] = useState(0);
  const [img, setImages] = useState("");

  const navigate = useNavigate();
  const format = (val) => `$` + val;
  const parse = (val) => val.replace(/^\$/, "");

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
      state,
      token: state.Login.token,
    };
  });
  useEffect(() => {
    getPosts();

    if (state.token) {
      setLogedin(true);
      const getToken = localStorage.getItem("token");
      setLocal(getToken);
    } else {
      setLogedin(false);
      const getToken = localStorage.getItem("token");
      setLocal(getToken);
    } // eslint-disable-next-line
  }, [state]);
  const getPosts = async () => {
    const result = await axios.get(`${BASE_URL}/service`, {
      headers: {
        Authorization: `Bearer ${state.token}`,
      },
    });
    setmeetsup(result.data);
  };
  const addPost = async () => {
    try {
      await axios.post(
        `${BASE_URL}/newservice`,
        {
          titel: title,
          desc: Post,
          img: img[0],
          price: value,
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
        title: "posts successfule ",
        showConfirmButton: false,
        timer: 2500,
      });
      navigate(`/`);
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Opss...! ,something wrong",
        showConfirmButton: false,
        timer: 2500,
      });
    }
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
      {!logedin ? (
        <p></p>
      ) : (
        <Box bg="gray.600">
        <Button  ml="3" mt="3" colorScheme="blue" onClick={onOpen}>
          New Service{" "}
        </Button>
        </Box>
      )}

      {meetsup.map((item, i) => (
        <>
          <Link to={`/service/${item._id}`}>
            {/* --------------------------------------- */}
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
                    <Tag size="md" variant="solid" colorScheme="teal">
                      Service
                    </Tag>
                    <Tag ml="1" size="md" variant="solid" colorScheme="red">
                      Hot
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
                      <Text  fontSize="xl" color="#888EC5">
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
      ))}

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
            <DrawerCloseButton  color='white' />
            <DrawerHeader color="white" borderBottomWidth="1px">Service </DrawerHeader>

            <DrawerBody>
              <Stack spacing="24px">
                <Box>
                  <FormLabel color="white" htmlFor="text">
                    What is the service you ready to provided{" "}
                  </FormLabel>
                  <Input
                  bg='white'
                    id="text"
                    type="text"
                    placeholder="like driver ,room to rent...ex  "
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Box>

                <Box>
                  <FormLabel color='white' htmlFor="text">
                    Tell us more About your Service
                  </FormLabel>
                  {/* <Input
                    id="text"
                    type="text"
                    // onChange={(e) => setEmail(e.target.value)}
                  /> */}
                  <Textarea
                  bg='white'
                    onChange={(e) => setPost(e.target.value)}
                    placeholder="Post descreption"
                    size="lg"
                  />
                  <FormLabel color='white' htmlFor="text">imege</FormLabel>

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
                </Box>
              </Stack>
              <FormLabel color='white' >Price/ Day</FormLabel>

              <NumberInput
              color='white'
                onChange={(valueString) => setValue(parse(valueString))}
                value={format(value)}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </DrawerBody>

            <DrawerFooter borderTopWidth="1px">
              <Button bg='white' variant="outline" mr={3} onClick={onClose}>
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
