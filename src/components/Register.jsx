import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase/Config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getAuth, sendEmailVerification } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [show, setShow] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const checkShow = () => {
    if (show === "password") {
      setShow("text");
    } else {
      setShow("password");
    }
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
    //console.log(email);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleRegister = () => {
    if (password === confirmPassword && email !== "") {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCred) => {
          const user = userCred.user;
          await sendEmailVerification(user).then(() => {
            alert("Check your inbox to verify account.");
          });
          //alert("account created succesfully");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          navigate("/");
        })
        .catch((error) => {
          const errorMessage = error.message;
          alert(errorMessage);
        });
    } else if (password === "" || confirmPassword == "" || email == "") {
      alert("Fields can't be empty.");
    } else {
      alert("Password is not matched with Confirm Password");
    }
    // setEmail("");
    // setPassword("");
    // setConfirmPassword("");
  };

  return (
    <div className="body">
      <div className="sign-in-class">
        <h1>Register</h1>
        <div className="input-box">
          <input
            type="email"
            placeholder="Enter your Gmail"
            value={email}
            onChange={handleEmail}
          />
        </div>
        <div className="input-box" style={{ position: "relative" }}>
          <input
            type={show}
            name=""
            placeholder="Create Your Password"
            value={password}
            onChange={handlePassword}
          />
          <input
            type="checkBox"
            className="password-show"
            onClick={checkShow}
          />
        </div>
        <div className="input-box" style={{ position: "relative" }}>
          <input
            type={show}
            placeholder="Confirm Your Password"
            value={confirmPassword}
            onChange={handleConfirmPassword}
          />
          <input
            type="checkBox"
            name=""
            id=""
            className="password-show"
            onClick={checkShow}
          />
        </div>

        <div>
          <button onClick={handleRegister}>Register</button>
        </div>
        <div className="register-class">
          <Link to="/">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
