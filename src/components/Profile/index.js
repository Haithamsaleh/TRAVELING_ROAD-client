import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
import { storage } from "../../firebase";
import axios from "axios";
import { EditIcon } from '@chakra-ui/icons'

import {
  ChakraProvider,
  Box,
  Textarea,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Portal,
  Icon,
  Text,
  VStack,
  theme,
  Input,
  Flex,
  chakra,
  Button,
  Image,
  SimpleGrid,
} from "@chakra-ui/react";
import { MdHeadset, MdEmail, MdLocationOn ,MdPermIdentity } from "react-icons/md";
import { BsFillBriefcaseFill } from "react-icons/bs";


const BASE_URL = process.env.REACT_APP_BASE_URL;
const Profile = () => {
  const [user, setUser] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [hometown, setHometown] = useState("");
  const [avatar, setAvatar] = useState("");
  const [flag, setFlag] = useState(false);
  const [img, setImages] = useState("");
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
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadImamge.snapshot.ref).then((url) => {
          setAvatar([...avatar, url]);
        });
      }
    );
  };
  useEffect(() => {
  }, [avatar]);
  const state = useSelector((state) => {
    return state;
  });

  const id = localStorage.getItem("id");
  useEffect(() => {
    result();
    // eslint-disable-next-line
  }, []);
  const result = async () => {
    await axios
      .get(`${BASE_URL}/user/${id}`, {
        headers: { authorization: `Bearer ${state.Login.token}` },
      })
      .then((result) => {
        setUser(result.data);
      });
  };
  const updateUser = async () => {
    await axios.put(
      `${BASE_URL}/updateusername/${id}`,
      {
        username: username,
      },
      {
        // headers: {
        //   Authorization: `Bearer ${state.Login.token}`,
        // },
      }
    );
    result();
  };

  const updateavatar = (e) => {
    let image = e.target.files[0];
    const dataType = image.name.match(/\.(jpe?g|png|gif)$/gi);
    if (image == null || dataType == null) return;
    const storageRef = ref(storage, `images/${image.name}`);
    const uploadImamge = uploadBytesResumable(storageRef, image);
    uploadImamge.on(
      "state_changed",
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadImamge.snapshot.ref).then((url) => {
          setAvatar([...img, url]);
        });
      }
    );
    console.log();
  };
  // const updateavatar = async () => {
  //   await axios.put(
  //     `${BASE_URL}/updateavatar/${id}`,
  //     {
  //       avatar: avatar,
  //     },
  //     {
  //       // headers: {
  //       //   Authorization: `Bearer ${state.Login.token}`,
  //       // },
  //     }
  //   );
  //   result();
  // };
  const updateBio = async () => {
    await axios.put(
      `${BASE_URL}/updatebio/${id}`,
      {
        bio: bio,
      },
      {
        // headers: {
        //   Authorization: `Bearer ${state.Login.token}`,
        // },
      }
    );
    result();
  };
  const updatehometown = async () => {
    await axios.put(
      `${BASE_URL}/updatehometown/${id}`,
      {
        hometown: hometown,
      },
      {
        // headers: {
        //   Authorization: `Bearer ${state.token}`,
        // },
      }
    );
    result();
  };
  return (
    <ChakraProvider theme={theme}>
  
      {/* ----------------------------- */}
      <Flex
      bg={ "gray.600"}
      p={50}
      w="full"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        w="sm"
        mx="auto"
        bg={ "gray.800"}
        shadow="lg"
        rounded="lg"
        overflow="hidden"
      >
         {user &&
              user.map((e) => (
                <>
        <Image
          w="full"
          h={56}
          fit="cover"
          objectPosition="center"
          src={e.avatar}
          alt="avatar"
        />

        <Flex alignItems="center" px={6} py={3} bg="gray.900">
          <Icon as={MdPermIdentity} h={6} w={6} color="white" />

          <chakra.h1 mx={3} color="white" fontWeight="bold" fontSize="lg">
            {e.username}
          </chakra.h1>
        </Flex>

        <Box py={2} px={6}>
       

          <chakra.p py={2} color={"gray.400"}>
            {e.bio}
          </chakra.p>

          <Flex
            alignItems="center"
            mt={4}
            color={"gray.200"}
          >
            

            
          </Flex>

          <Flex
            alignItems="center"
            mt={2}
            color={"gray.200"}
          >
            <Icon as={MdLocationOn} h={6} w={6} mr={2} />

            <chakra.h1 px={2} fontSize="sm">
              {e.hometown}
            </chakra.h1>
          </Flex>
          <Flex
            alignItems="center"
            mt={4}
            color={"gray.200"}
          >
            <Icon as={MdEmail} h={6} w={6} mr={2} />

            <chakra.h1 px={2} fontSize="sm">
              {e.email}
            </chakra.h1>
            <Popover size='true'>
  <PopoverTrigger>
    <Button ml='40%' bg='gray.800'   ><EditIcon/></Button>
  </PopoverTrigger>
  <Portal>
    <PopoverContent>
      <PopoverArrow />
      <PopoverHeader>Edit Profile </PopoverHeader>
      <PopoverCloseButton />
      <PopoverBody>
                      {/* <Input
                      bg='white'
                        type="file"
                        accept=".gif,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          updateavatar(e);
                        }}
                        id="img"
                      /> */}
      <Input
                id="btubdat"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                defaultValue={e.username}
                placeholder="edit username"
              />

              <Button
              colorScheme={'green'}
                className="edit"
                onClick={() =>  updateUser(e._id)}
                
              >
                Edit Username
              </Button>
<Textarea
mb={5}
mt={5}
                id="btubdat"
                onChange={(e) => {setBio(e.target.value);}}
                defaultValue={e.bio}

                placeholder="edit bio"
              />

              <Button colorScheme={'green'} className="edit"
                             onClick={(e) => updateBio(e._id)}

              > 
              
                Edit Bio
              </Button>
              <Input
              mb={5}
              mt={5}
                id="btubdat"
                onChange={(e) => {
                  setHometown(e.target.value);
                }}
                defaultValue={e.hometown}
                placeholder="edit hometown"
              />

              <Button
              colorScheme={'green'}
                className="edit"
                onClick={(e) =>  updatehometown(e._id)}
                
              >
                Edit Hometown
              </Button>
      </PopoverBody>
      <PopoverFooter></PopoverFooter>
    </PopoverContent>
  </Portal>
</Popover>
 
          </Flex>
        </Box>
                   </>   ))}

      </Box>
    </Flex>
    {/* ----------------------------------------- */}
    </ChakraProvider>
  );
};
export default Profile;