import React, { useState } from "react";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../FirebaseConfigs/FirebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import "../Components/Css/Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const auth = getAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setSuccessMsg(
          "Login successful ,you will be redirected to be homepage"
        );

        setEmail("");
        setPassword("");
        setErrorMsg("");
        setTimeout(() => {
          setSuccessMsg("");
          navigate("/home");
        }, 3000);
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(error.message);
        if (error.message == "Firebase:Error(auth/invalid-email).") {
          setErrorMsg("Please fill all required fields");
        }
        if (error.message == "Firebase:Error(auth/user-not-found).") {
          setErrorMsg("Email not found");
        }
        if (error.message == "Firebase:Error(auth/invalid-password).") {
          setErrorMsg("wrong password");
        }
      });
  };
  return (
    <div className="main-container">
      <Navbar />
      <div>
        <div className="login-container  flex min-h-full flex-col  items-center justify-center h-screen px-6 py-12 lg:px-8">
          <form className="login-form ">
            <p className=" border-b   text-3xl border-gray-900/10  pb-12">
              Login
            </p>

            {successMsg && (
              <>
                <div className="success-msg">{successMsg}</div>
              </>
            )}

            {errorMsg && (
              <>
                <div className="error-msg">{errorMsg}</div>
              </>
            )}

            <label className="block text-lg font-medium leading-6 text-gray-900">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email"
              className=" flex-1 border-1 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-black  sm:text-lg sm:leading-6"
            />
            <label className="block text-lg font-medium leading-6 text-gray-900">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter your password"
              className=" flex-1 border-1 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-black  sm:text-lg sm:leading-6"
            />

            <button
              className="signup-btn flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              type="submit"
              onClick={handleLogin}
            >
              Login
            </button>
            <div>
              <span className="text-black">Don't have an Account?</span>
              <Link to="/signup" className="sign">
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
