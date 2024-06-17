import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase/Config";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const handleEmail = (event) => {
    setEmail(event.target.value);
    console.log(email);
  };
  const handleResetPassword = () => {
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Check your inbox to reset your Password.");
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
        // ..
      });
  };
  return (
    <div className="body">
      <div className="sign-in-class">
        <h1>Reset Password</h1>
        <div className="input-box">
          <input
            type="email"
            placeholder="Enter Your Gmail"
            value={email}
            onChange={handleEmail}
          />
        </div>
        <button onClick={handleResetPassword}>Reset</button>
        <div className="register-class">
          <Link to="/">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
