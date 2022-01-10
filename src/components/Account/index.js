import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ReactCodeInput from "react-verification-code-input";
import axios from "axios";
import {
  ChakraProvider,
  VStack,
  Button,
  Heading,
} from "@chakra-ui/react";
// import "./style.css";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const MySwal = withReactContent(Swal);
const Account = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [code, setCode] = useState("");
  const verifyAccount = async () => {
    if (code.length > 0) {
      try {
          // eslint-disable-next-line
        const res = await axios.post(
          `${BASE_URL}/verify_account`,
          {
            id,
            code,
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
    
      <div className="verifyAccountWrapper" >
        <div className="verifyAccountBox">
        <VStack>


        <Heading mb='10' isTruncated> Verify Your Account</Heading>
          
          <ReactCodeInput fields={4} onComplete={(val) => setCode(val)} />
         <br/>
          <Button  mt='10' colorScheme="blue" onClick={verifyAccount}>Verify</Button>
          </VStack>

        </div>
      </div>

    </ChakraProvider>
  );
};
export default Account;
