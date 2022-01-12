import React, { useEffect, useState } from 'react'
import'./style.css'
import travel from './travel.jpg'
import PostsList from '../postlist'
import MeetsupList from '../meetuplist'
import ServicesList from '../serviceslist'
import { Link } from "react-router-dom";

import {
  ChakraProvider,
  Box,
  HStack,
  Stack,
  Image,
  Button,
  Text,
  Tabs, TabList, TabPanels, Tab, TabPanel ,
  chakra,
  Flex,
} from "@chakra-ui/react";
const Home = () => {
  const arrowStyles = {
    cursor: "pointer",
    pos: "absolute",
    top: "50%",
    w: "auto",
    mt: "-22px",
    p: "16px",
    color: "white",
    fontWeight: "bold",
    fontSize: "18px",
    transition: "0.6s ease",
    borderRadius: "0 3px 3px 0",
    userSelect: "none",
    _hover: {
      opacity: 0.8,
      bg: "black",
    },
  };

  const slides = [
    {
      img:'https://firebasestorage.googleapis.com/v0/b/mp-p-7f207.appspot.com/o/images%2FHegra_1281x786.jpg?alt=media&token=0f6f55ac-5357-4738-95de-993b2a8d4af7',
      label : "alula",
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/mp-p-7f207.appspot.com/o/images%2FAlHada_1920x1080_crop-1160x650.webp?alt=media&token=9ed5b8cd-ccaf-4f4f-843a-5bc8b403d014",
      label: "Al-Hadā mountain",
    },
    {
      img:
        "https://images.pexels.com/photos/2878019/pexels-photo-2878019.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
      label: "Third Slide",
      description:
        "Praesent commodo cursus magna, vel scelerisque nisl consectetur.",
    },
    {
      img:
        "https://images.pexels.com/photos/1142950/pexels-photo-1142950.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      label: "Fourth Slide",
      description: "Nulla vitae elit libero, a pharetra augue mollis interdum.",
    },
    {
      img:
        "https://firebasestorage.googleapis.com/v0/b/mp-p-7f207.appspot.com/o/images%2Friyadh_refresh_winter_campaign_card_1.jpg?alt=media&token=2d8b4566-dccd-4c9a-9143-16eaee9595f9",
      label: "Al Masmak Fortress",
    },
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  const slidesCount = slides.length;

  const prevSlide = () => {
    setCurrentSlide((s) => (s === 0 ? slidesCount - 1 : s - 1));
  };
  const nextSlide = () => {
    setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1));
  };
  const setSlide = (slide) => {
    setCurrentSlide(slide);
  };
  const carouselStyle = {
    transition: "all 1.5s",
    ml: `-${currentSlide * 100}%`,
  };

    return (
      <ChakraProvider>

<Flex
      w="full"
      bg="gray.600"
      alignItems="center"
      justifyContent="center"
    >
      <Flex w="full" pos="relative" overflow="hidden">
        <Flex h="400px" w="full" {...carouselStyle}>
          {slides.map((slide, sid) => (
            <Box key={`slide-${sid}`} boxSize="full" shadow="md" flex="none">
              <Text
                color="white"
                fontSize="xs"
                p="8px 12px"
                pos="absolute"
                top="0"
              >
                {sid + 1} / {slidesCount}
              </Text>
              <Image src={slide.img} boxSize="full" backgroundSize="cover" />
              <Stack
                p="8px 12px"
                pos="absolute"
                bottom="24px"
                textAlign="center"
                w="full"
                mb="8"
                color="white"
              >
                <Text fontSize="2xl">{slide.label}</Text>
                <Text fontSize="lg">{slide.description}</Text>
              </Stack>
            </Box>
          ))}
        </Flex>
        <Text {...arrowStyles} left="0" onClick={prevSlide}>
          &#10094;
        </Text>
        <Text {...arrowStyles} right="0" onClick={nextSlide}>
          &#10095;
        </Text>
        <HStack justify="center" pos="absolute" bottom="8px" w="full">
          {Array.from({ length: slidesCount }).map((_, slide) => (
            <Box
              key={`dots-${slide}`}
              cursor="pointer"
              boxSize={["7px", , "15px"]}
              m="0 2px"
              bg={currentSlide === slide ? "blackAlpha.800" : "blackAlpha.500"}
              rounded="50%"
              display="inline-block"
              transition="background-color 0.6s ease"
              _hover={{ bg: "blackAlpha.800" }}
              onClick={() => setSlide(slide)}
            ></Box>
          ))}
        </HStack>
      </Flex>
    </Flex>
    <Flex
      bg={("#F9FAFB", "gray.600")}
      pr={50}
      pb={50}

      w="full"
      alignItems="start"
      justifyContent="start"
    >
      <Box
      mt='10'
        bg={("white", "gray.800")}
        mx={{ lg: 8 }}
        display={{ lg: "flex" }}
        maxW={{ lg: "5xl" }}
        shadow={{ lg: "lg" }}
        rounded={{ lg: "lg" }}
      >
        <Box w={{ lg: "50%" }}>
          <Box
            h={{ base: 64, lg: "full" }}
            rounded={{ lg: "lg" }}
            bgSize="cover"
            style={{
              backgroundImage:
                "url('https://firebasestorage.googleapis.com/v0/b/mp-p-7f207.appspot.com/o/images%2Fezgif-5-926a9031b6.gif?alt=media&token=a5ae92df-7ab4-4a70-91df-8c88c530bee7')",
            }}
          ></Box>
        </Box>

        <Box py={12} px={6} maxW={{ base: "xl", lg: "5xl" }} w={{ lg: "50%" }}>
          <chakra.h2
            fontSize={{ base: "2xl", md: "3xl" }}
            color={("gray.800", "white")}
            fontWeight="bold"
          >
            Build Your New{" "}
            <chakra.span >
              Idea
            </chakra.span>
          </chakra.h2>
          <chakra.p mt={4} color={("gray.600", "gray.400")}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem
            modi reprehenderit vitae exercitationem aliquid dolores ullam
            temporibus enim expedita aperiam mollitia iure consectetur dicta
            tenetur, porro consequuntur saepe accusantium consequatur.
          </chakra.p>

          <Box mt={8}>
            <Button
            
              to="/Posts"
              bg="gray.900"
              color="gray.100"
              px={5}
              py={3}
              fontWeight="semibold"
              rounded="lg"
              _hover={{ bg: "gray.800" }}
            >
          <Link to="/Posts">GO to Posts</Link>
              
            </Button>
          </Box>
        </Box>
      </Box>
    </Flex>
    {/* --------------------------- */}
    <Flex
      bg={("#F9FAFB", "gray.600")}
      
      w="full"
      alignItems="end"
      justifyContent="end"
    >
      <Box
        bg={("white", "gray.800")}
        mx={{ lg: 8 }}
        display={{ lg: "flex" }}
        maxW={{ lg: "5xl" }}
        shadow={{ lg: "lg" }}
        rounded={{ lg: "lg" }}
      >
        

        <Box py={12} px={6} maxW={{ base: "xl", lg: "5xl" }} w={{ lg: "50%" }}>
          <chakra.h2
            fontSize={{ base: "2xl", md: "3xl" }}
            color={("gray.800", "white")}
            fontWeight="bold"
          >
            Build Your New{" "}
            <chakra.span>
              Idea
            </chakra.span>
          </chakra.h2>
          <chakra.p mt={4} color={("gray.600", "gray.400")}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem
            modi reprehenderit vitae exercitationem aliquid dolores ullam
            temporibus enim expedita aperiam mollitia iure consectetur dicta
            tenetur, porro consequuntur saepe accusantium consequatur.
          </chakra.p>

          <Box mt={8}>
            <Button
              bg="gray.900"
              color="gray.100"
              px={5}
              py={3}
              fontWeight="semibold"
              rounded="lg"
              _hover={{ bg: "gray.800" }}
            >
              <Link to='/Meetup'>find a firend</Link>
           </Button>
          </Box>
        </Box>
          <Box w={{ lg: "50%" }}>
          <Box
          
            h={{ base: 64, lg: "full" }}
            rounded={{ lg: "lg" }}
            bgSize="cover"
            style={{
              backgroundImage:
                "url('https://firebasestorage.googleapis.com/v0/b/mp-p-7f207.appspot.com/o/images%2FNAJLA04_crop-1920x1080.webp?alt=media&token=c6c5c34c-6c7f-45bd-9400-4cc8fc2f563f')",
            }}
          ></Box>
        </Box>
      </Box>
    </Flex>
    {/* ------------------------ */}
    <Flex
      bg={("#F9FAFB", "gray.600")}
      pr={50}
      pb={50}
      pt={50}

            w="full"
      alignItems="start"
      justifyContent="start"
    >
      <Box
        bg={("white", "gray.800")}
        mx={{ lg: 8 }}
        display={{ lg: "flex" }}
        maxW={{ lg: "5xl" }}
        shadow={{ lg: "lg" }}
        rounded={{ lg: "lg" }}
      >
        <Box w={{ lg: "50%" }}>
          <Box
            h={{ base: 64, lg: "full" }}
            rounded={{ lg: "lg" }}
            bgSize="cover"
            style={{
              backgroundImage:
                "url('https://firebasestorage.googleapis.com/v0/b/mp-p-7f207.appspot.com/o/images%2Fkfis_wwe_crown_jewel_1920x1080.jpg?alt=media&token=08c2cfac-920a-4955-9137-74d8e6de0c5f')",
            }}
          ></Box>
        </Box>

        <Box py={12} px={6} maxW={{ base: "xl", lg: "5xl" }} w={{ lg: "50%" }}>
          <chakra.h2
            fontSize={{ base: "2xl", md: "3xl" }}
            color={("gray.800", "white")}
            fontWeight="bold"
          >
            Build Your New{" "}
            <chakra.span color={("brand.600", "brand.400")}>
              Idea
            </chakra.span>
          </chakra.h2>
          <chakra.p mt={4} color={("gray.600", "gray.400")}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem
            modi reprehenderit vitae exercitationem aliquid dolores ullam
            temporibus enim expedita aperiam mollitia iure consectetur dicta
            tenetur, porro consequuntur saepe accusantium consequatur.
          </chakra.p>

          <Box mt={8}>
            <Button
              to='/service'
              bg="gray.900"
              color="gray.100"
              px={5}
              py={3}
              fontWeight="semibold"
              rounded="lg"
              _hover={{ bg: "gray.800" }}
            >
              <Link to="/Service">Go to Services</Link>
            </Button>
          </Box>
        </Box>
      </Box>
    </Flex>
      
        
        </ChakraProvider>

      );
    }
    
export default Home;
