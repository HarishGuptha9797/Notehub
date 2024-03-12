import "./components/styles/HomePage.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { auth } from "./firebase/Config";
import {
  getAuth,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [show, setShow] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const checkShow = () => {
    if (show === "password") {
      setShow("text");
    } else {
      setShow("password");
    }
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCred) => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user.emailVerified) {
          setEmail("");
          setPassword("");
          navigate("/dashboard");
        } else {
          alert("Please Verify Your EmailId.");
          const check = prompt("Enter 'yes' ,If You need to verify..");
          if (check.toLocaleLowerCase() === "yes") {
            const user = userCred.user;
            await sendEmailVerification(user).then(() => {
              alert("Check your inbox to verify account.");
            });
          }
        }
      })
      .catch((error) => {
        alert(error.message);
      });
    //createUserWithEmailAndPassword(auth, email, password);
  };

  return (
    <>
      <div className="body">
        <div className="sign-in-class">
          <h1>Login</h1>
          <div className="input-box">
            <input
              type="email"
              placeholder="Username"
              value={email}
              onChange={handleEmail}
            />
          </div>
          <div className="input-box" style={{ position: "relative" }}>
            <input
              type={show}
              name=""
              placeholder="Password"
              value={password}
              onChange={handlePassword}
            />

            <input
              type="checkBox"
              name=""
              id=""
              className="password-show"
              onClick={checkShow}
            />
          </div>
          <div className="remember-class">
            <Link to="reset_password">Forgot Password?</Link>
          </div>
          <button onClick={handleSignIn}>Login</button>
          <div className="register-class">
            <span>Don't have an account? </span>
            <Link to="register">Register</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
