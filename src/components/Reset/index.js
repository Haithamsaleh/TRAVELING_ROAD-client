import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ReactCodeInput from "react-verification-code-input";
import axios from "axios";
import PasswordChecklist from "react-password-checklist";
import {
  ChakraProvider,
  VStack,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Heading,
} from "@chakra-ui/react";
// import "./style.css";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const MySwal = withReactContent(Swal);
const Reset = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  const resetPass = async () => {
    if (code.length > 0) {
      try {
          // eslint-disable-next-line
        const res = await axios.post(
          `${BASE_URL}/reset_pass`,
          {
            id,
            code,
            password,
          }
        );
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'successfully',
            showConfirmButton: false,
            timer: 1500
          })
        navigate("/login");
      } catch (error) {
        MySwal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!, please try again.",
          confirmButtonColor: "#E07A5F",
        });
      }
    }
  };
  return (
    <ChakraProvider>

    
    <div className="resetPasswordWrapper">
    <div className="resetPasswordBox">
    <VStack>

    <Heading isTruncated>Reset Your Password</Heading>
    
      <PasswordChecklist
        rules={[
          "minLength",
          "specialChar",
          "number",
          "capital",
          "lowercase",
        ]}
        minLength={6}
        value={password}
        onChange={(isValid) => {
          if (isValid) {
            const button = document.querySelector("#resetPasswordButton");
            button.disabled = false;
          } else {
            const button = document.querySelector("#resetPasswordButton");
            button.disabled = true;
          }
        }}
      />
       <ReactCodeInput fields={4} onComplete={(val) => setCode(val)} />
       <br/>
       <InputGroup size='md'>

       <Input
        pr='4.5rem'
        type={show ? 'text' : 'password'}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='Enter password'
      />
      <InputRightElement width='4.5rem'>
        <Button h='1.75rem' size='sm' onClick={handleClick}>
          {show ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
    </InputGroup>

        
      <br/>
      <Button colorScheme='blue' id="resetPasswordButton" onClick={resetPass}>
        Reset
      </Button>
      </VStack>

    </div>
  </div>

</ChakraProvider>

);
};
export default Reset;



















