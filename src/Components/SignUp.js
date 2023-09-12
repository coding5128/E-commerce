import React, { useState } from "react";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../FirebaseConfigs/FirebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import "./Css/Signup.css";

export default function SignUp() {
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        const user = userCredential.user;
        const initialcartvalue = 0;
        console.log(user);

        addDoc(collection(db, "Users"), {
          userName: userName,
          email: email,
          phoneNumber: phoneNumber,
          password: password,
          cart: initialcartvalue,
          address: address,
          uid: user.uid,
        })
          .catch((error) => {
            if (error.message == "Firebase:Error(auth/invalid-email).") {
              setErrorMsg("Please fill all required fields");
            }
            if (error.message == "Firebase:Error(auth/email-already-exists)") {
              setErrorMsg("User already exists");
            }
          })
          .then(() => {
            setSuccessMsg(
              "New user added successfully,You will now be automtically redirected to login page."
            );
            setUserName("");
            setPhoneNumber("");
            setEmail("");
            setPassword("");
            setAddress("");
            setErrorMsg("");
            setTimeout(() => {
              setSuccessMsg("");
              navigate("/login");
            }, 3000);
          })
          .catch((error) => {
            setErrorMsg(error.message);
          });
      }
    );
  };

  return (
    <div className="main-container">
      <Navbar />
      <div>
        <div className="signup-container  flex min-h-full flex-col  items-center justify-center h-screen px-6 py-12 lg:px-8">
          <form className="signup-form " onSubmit={handleSubmit}>
            <p className=" border-b   text-3xl border-gray-900/10  pb-12">
              Create Account
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
              Your Name
            </label>
            <input
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              placeholder="Frist and Last name"
              className=" flex-1 border-1 bg-transparent py-1.5 pl-1 text-black placeholder:text-black  sm:text-lg sm:leading-6"
            />
            <label className="block text-lg font-medium leading-6 text-gray-900">
              Mobile Number
            </label>
            <input
              onChange={(e) => setPhoneNumber(e.target.value)}
              type="tel"
              placeholder="MobileNumber"
              className=" flex-1 border-1 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-black  sm:text-lg sm:leading-6"
            />
            <label className="block text-lg font-medium leading-6 text-gray-900">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email"
              className=" flex-1 border-1 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-black sm:text-lg sm:leading-6"
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
            <label className="block text-lg font-medium leading-6 text-gray-900">
              Address
            </label>
            <textarea
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
              className=" flex-1 border-1 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-black sm:text-lg sm:leading-6"
            ></textarea>
            <button
              className="signup-btn flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              type="submit"
            >
              SignUp
            </button>
            <div>
              <span className="text-black">Already have an Account?</span>
              <Link to="/login" className="sign">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
