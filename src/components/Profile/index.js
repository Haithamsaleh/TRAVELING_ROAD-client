import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import axios from "axios";
import {
  ChakraProvider,
  Box,
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

  const [avatar, setAvatar] = useState("");
  const [flag, setFlag] = useState(false);

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
        // headers: { authorization: `Bearer ${state.Login.token}` },
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
        headers: {
          Authorization: `Bearer ${state.Login.token}`,
        },
      }
    );
    setFlag(false);
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
            <Icon
              as={BsFillBriefcaseFill}
              as={BsFillBriefcaseFill}
              h={6}
              w={6}
              mr={2}
            />

            <chakra.h1 px={2} fontSize="sm">
              Choc UI
            </chakra.h1>
          </Flex>

          <Flex
            alignItems="center"
            mt={4}
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
          </Flex>
        </Box>
                   </>   ))}

      </Box>
    </Flex>
    </ChakraProvider>
  );
};
export default Profile;