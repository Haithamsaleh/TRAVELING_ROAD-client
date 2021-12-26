import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ReactCodeInput from "react-verification-code-input";
import axios from "axios";
import PasswordChecklist from "react-password-checklist";
// import "./style.css";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const MySwal = withReactContent(Swal);
const Reset = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");

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
      <>
    <div className="resetPasswordWrapper">
    <div className="resetPasswordBox">
      <h1>Reset Your Password</h1>
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
      <input
        type="password"
        placeholder="Password"
        className="resetPassword"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {/* <ReactCodeInput fields={4} onComplete={(val) => setCode(val)} /> */}
      <br/>
      <button id="resetPasswordButton" onClick={resetPass}>
        Reset
      </button>
    </div>
  </div>
</>
);
};
export default Reset;



















