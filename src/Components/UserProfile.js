import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "./Css/userprofile.css";
import { auth, db } from "../FirebaseConfigs/FirebaseConfig";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import { updateProfile } from "firebase/auth";
export default function UserProfile() {
  function GetCurrentUser() {
    const [user, setUser] = useState("");
    const usersCollectionRef = collection(db, "users");

    useEffect(() => {
      auth.onAuthStateChanged((userlogged) => {
        if (userlogged) {
          const getUsers = async () => {
            const q = query(
              collection(db, "Users"),
              where("uid", "==", userlogged.uid)
            );
            // console.log(q);
            const data = await getDocs(q);
            setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          };
          getUsers();
        } else {
          setUser(null);
        }
      });
    }, []);
    return user;
  }
  const loggeduser = GetCurrentUser();
  if (loggeduser) {
    console.log(loggeduser[0].email);
  }
  return (
    <div>
      <Navbar />
      <div className="userprofile-outercontainer">
        {loggeduser ? (
          <div className="user-profile">
            <p className="heading">Your Account Details</p>
            <div className="data-row">
              <span>Your Name</span>
              <span>{loggeduser[0].userName}</span>
            </div>
            <div className="data-row">
              <span>Your Email</span>
              <span>{loggeduser[0].email}</span>
            </div>
            <div className="data-row">
              <span>Your phone Number</span>
              <span>{loggeduser[0].phoneNumber}</span>
            </div>
            <div className="data-row">
              <span>Your Address</span>
              <span>{loggeduser[0].address}</span>
            </div>
          </div>
        ) : (
          <div>Your are not logged in</div>
        )}
      </div>
    </div>
  );
}
