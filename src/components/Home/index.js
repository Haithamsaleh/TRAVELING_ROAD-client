import React from 'react'
import {Route,Routes, useNavigate  } from "react-router-dom";
import'./style.css'
import Login from '../Login';
import {Link} from "react-router-dom";
import travel from './travel.jpg'
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
} from "@chakra-ui/react";
const Home = () => {
        
    return (
      <ChakraProvider>

        <Image
    src={travel}
    alt='Dan Abramov'
  />         
  <Box>
    <VStack>
      <Box marginBottom={100}>
      <HStack>

  <Button colorScheme="teal"
             marginRight={100}   ><Link className='text' to="/Posts">Posts</Link>
          </Button>
          <Box>
          <Button colorScheme="teal"
             marginRight={100}  ><Link className='text' to="/Meetup">Meetup</Link>
          </Button>
          </Box>
          <Button colorScheme="teal"
             marginLeft={10}  ><Link className='text' to="/Service">Service</Link>
          </Button>
          </HStack>

          </Box>
          </VStack>
          </Box>
      
            <br/>
        
        </ChakraProvider>

      );
    }
    
export default Home;
