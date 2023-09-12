import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Components/Css/Navbar.css";

import { useEffect, useState } from "react";
import Cart from "./assets/icons8-cart-48.png";
import User from "./assets/icons8-user-48.png";
import { AiOutlineMenu } from "react-icons/ai";
import { FaTimesCircle } from "react-icons/fa";

import { auth, db } from "../FirebaseConfigs/FirebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function Navbar() {
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

  const navigate = useNavigate();

  const handlelogout = () => {
    auth.signOut().then(() => {
      navigate("/login");
    });
  };
  const [cartdata, setCartData] = useState("");
  if (loggeduser) {
    const getcartdata = async () => {
      const cartArray = [];
      const path = `cart-${loggeduser[0].uid}`;

      getDocs(collection(db, path))
        .then((querysnapshot) => {
          querysnapshot.forEach((doc) => {
            cartArray.push({ ...doc.data(), id: doc.id });
          });
          setCartData(cartArray);
        })
        .catch("error error error");
    };
    getcartdata();
  }

  return (
    <>
      <div className="Container">
        <div className="logo">
          <h1>
            Multi<span className="span">Shop</span>
          </h1>
        </div>
        <div className="menu-nav">
          {!loggeduser && (
            <nav>
              <Link to="/">
                <button>Home</button>
              </Link>
              <Link to="/signup">
                <button>Register</button>
              </Link>
              <Link to="/login">
                <button>Login</button>
              </Link>

              <div className="cart-btn">
                <img src={Cart} alt="no img" />
                <span className="cart-icon-css">0</span>
              </div>
              <Link to="/userprofile">
                <img src={User} className="profile-icon" />
              </Link>
            </nav>
          )}

          {loggeduser && (
            <nav>
              <Link to="/">
                <button>Home</button>
              </Link>
              <Link to="/sellproduct">
                <button>Sell</button>
              </Link>
              <div className="cart-btn">
                <Link to="/cartdata">
                  <img src={Cart} />
                </Link>
                <button className="cart-icon-css">{cartdata.length}</button>
              </div>
              <Link to="/userprofile">
                <img src={User} className="profile-icon" />
              </Link>
              <button className="logout-btn" onClick={handlelogout}>
                Logout
              </button>
            </nav>
          )}
        </div>
      </div>
      <div className="products-types">
        <a href="/product-type/mobiles">
          <button>Mobiles</button>
        </a>
        <a href="/product-type/laptops">
          <button>Laptops</button>
        </a>
        <a href="/product-type/headphones">
          <button>HeadPhones</button>
        </a>
      </div>
    </>
  );
}
