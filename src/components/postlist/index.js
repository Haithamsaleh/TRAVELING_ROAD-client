import React, { useState, useEffect } from "react";
import axios from "axios";
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
import { storage } from "../../firebase";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  ChakraProvider,
  Box,
  chakra,
  VStack,
  Flex,
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
  Textarea,
  Stack,
  Avatar,
  Tag,
  CircularProgress,
  Skeleton,
  Spinner,
} from "@chakra-ui/react";
import { FaHeart, FaComment } from "react-icons/fa";
import { DeleteIcon } from '@chakra-ui/icons'

const BASE_URL = process.env.REACT_APP_BASE_URL;

const PostsList = () => {

  





  const [posts, setposts] = useState([]);
  const [title, setTitle] = useState("");
  const [Post, setPost] = useState(""); // eslint-disable-next-line
  const [postImg, setPostImg] = useState("");
  const [local, setLocal] = useState("");
  const {
    isOpen: isOpenReportModal,
    onOpen: onOpenReportModal,
    onClose: onCloseReportModal,
  } = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure(); // eslint-disable-next-line
  const [message, setMessage] = useState("");
  const [logedin, setLogedin] = useState(false); // eslint-disable-next-line
  const [progress, setProgress] = useState(0);
  const [img, setImages] = useState("");
  const [searchField, setSearchField] = useState("");
  const [searchShow, setSearchShow] = useState(false);

  const firstField = React.useRef();
  const navigate = useNavigate();

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
    getPosts();

  }, [img]);

  const state = useSelector((state) => {
    return {
      state,
      token: state.Login.token,
    };
  });
  useEffect(() => {
    if (state.token) {
      setLogedin(true);
      const getToken = localStorage.getItem("token");
      setLocal(getToken);
    } else {
      setLogedin(false);
      const getToken = localStorage.getItem("token");
      setLocal(getToken);
    } // eslint-disable-next-line
    // eslint-disable-next-line
  }, [state]);

  const getPosts = async () => {
    const result = await axios.get(`${BASE_URL}/posts`, {
      headers: {
        Authorization: `Bearer ${state.token}`,
      },
    });
    setposts(result.data);
  };

  const addPost = async () => {
    try {
      await axios.post(
        `${BASE_URL}/newPost`,
        {
          titel: title,
          post: Post,
          img: img[0],
        },
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );

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

  const updatePost = async (id) => {
    await axios.put(
      `${BASE_URL}/updatepost/${id}`,
      {
        post: Post,
      },
      {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      }
    );
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
      const result = await axios.get(`${BASE_URL}/posts`);
      setposts(
        result.data.filter((item) => {
          return (
            item.titel.toLowerCase().includes(searchField.toLowerCase()) ||
            item.post.toLowerCase().includes(searchField.toLowerCase())
          );
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
  const updatePosttitel = async (id) => {
    await axios.put(
      `${BASE_URL}/updateposttitel/${id}`,
      {
        titel: title,
      },
      {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      }
    );
  };
  const updatePostimg = async (id) => {
    await axios.put(
      `${BASE_URL}/updateimg/${id}`,
      {
        img: img[0],
      },
      {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      }
    );
  };

  const deletePost = async (id) => {
    const res = await axios.delete(`${BASE_URL}/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${state.token}`,
      },
    });
    getPosts();
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

        {!logedin ? (
          <p></p>
        ) : (
          <>
                  <Box bg="gray.600">

            <Button ml="3" mt="3" colorScheme="blue" onClick={onOpen}>
              new post
            </Button>
            </Box>
          </>
        )}
                {posts.map((item, i) => (
                  <>
          <Link to={`/post/${item._id}`}>

        {/* -------------------------------- */}

        <Flex
              bg="gray.600"
              p={50}
              w="full"
              alignItems="center"
              justifyContent="center"
            >
              {item.userId.map((u) => (
                <>
              <Box
                w="full"
                mx="auto"
                py={4}
                px={8}
                bg="gray.800"
                shadow="lg"
                rounded="lg"
              >
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
                      <Tag ml="1" size="md" variant="solid" colorScheme="red">
                  most like
                </Tag>
                <Tag ml="1" size="md" variant="solid" colorScheme="pink">
                  WOW{" "}
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
                      {item.post}
                    </chakra.p>
                    <chakra.p mt={2} color="gray.200">
                      {item.date}{" "}
                    </chakra.p>
           
                    <Flex justifyContent="end" mt={4}>
                      <Text fontSize="xl" color="#888EC5">
                        {u.username}
                      </Text>
                    </Flex>
                    <Flex justifyContent="start" >
                    {!logedin ? (
          <p></p>
        ) : (
<Text

color="white"
onClick={() => {
deletePost(item._id);
}}
>
<DeleteIcon />

</Text>
        )}
</Flex>
              </Box>
                  </>
                ))}
            </Flex>
        {/* ----------------------------------------- */}

        
 {/* <Input
                id="btubdat"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                placeholder="edit post Desc"
              />

              <Button
                className="edit"
                onClick={() => updatePosttitel(item._id)}
              >
                Edit titel
              </Button>
<Button mt="3" colorScheme="green" onClick={onOpenReportModal}>
  Edit Post
</Button> */}
            {/* <div className="box">
              <input
                id="btubdat"
                onChange={(e) => {
                  setPost(e.target.value);
                }}
                placeholder="edit post Desc"
              />

              <button className="edit" onClick={() => updatePost(item._id)}>
                Edit Desc
              </button>
            </div>
            <div className="box">
              <input
                id="btubdat"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                placeholder="edit post Desc"
              />

              <Button
                className="edit"
                onClick={() => updatePosttitel(item._id)}
              >
                Edit titel
              </Button>

              
            </div> */}


            {/* <button
              className="delete"
              onClick={() => {
                deletePost(item._id);
              }}
            >
              Delete
            </button> */}


              {/* <Box
                w="80%"
                mt="10"
                mb="10"
                ml="10"
                boxShadow="2xl"
                p="6"
                rounded="md"
                bg="#ffff"
                _hover={{ boxShadow: "outline" }}
              >
                {item.userId.map((u) => (
                  <>
                    <Avatar src={`${u.avatar}`} alt={`${u.username}`} mb={2} />

                    <Text fontWeight={600}>{u.username}</Text>
                  </>
                ))}

                <Text fontSize="6xl">{item.titel}</Text>

                <HStack>
                  <FaHeart /> <p>{item.like.length}</p>
                  <FaComment />
                  <p>{item.comment.length}</p>
                </HStack>
                <Tag ml="1" size="md" variant="solid" colorScheme="red">
                  most like
                </Tag>
                <Tag ml="1" size="md" variant="solid" colorScheme="pink">
                  WOW{" "}
                </Tag>
                <Text fontSize="xs">{item.date}</Text>
                   <button
              className="delete"
              onClick={() => {
                deletePost(item._id);
              }}
            >
              Delete
            </button>
              </Box> */}
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
              <DrawerCloseButton color="white" />
              <DrawerHeader color="white" borderBottomWidth="1px">New Post </DrawerHeader>

              <DrawerBody>
                <Stack spacing="24px">
                  <Box>
                    <FormLabel color="white" htmlFor="text">Post titel</FormLabel>
                    <Input
                    bg="white"
                      id="text"
                      type="text"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </Box>

                  <Box>
                    <FormLabel color="white" htmlFor="text">Post descreption</FormLabel>

                    <Textarea
                    bg="white"
                      onChange={(e) => setPost(e.target.value)}
                      placeholder="Post descreption"
                      size="lg"
                    />
                    <FormLabel color="white" htmlFor="text">Post imege</FormLabel>
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

export default PostsList;
