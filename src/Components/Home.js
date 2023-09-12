import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Products from "./Products";
import "./Css/Home.css";
import Banner from "./Banner";
import { auth, db } from "../FirebaseConfigs/FirebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import ProductSlider from "./Some-Product-Components/ProductSlider";
import Footer from "./Footer";
export default function Home() {
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
  // if (loggeduser) {
  //   console.log(loggeduser[0].email);
  // }

  return (
    <div>
      <Navbar />
      <Banner />
      <div className="slider-head">
        <p>Limited Time Deals</p>
      </div>
      <ProductSlider type={"Mobile"} />
      <ProductSlider type={"Laptop"} />
      <ProductSlider type={"Headphone"} />
      <Footer />
    </div>
  );
}
