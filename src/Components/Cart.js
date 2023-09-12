import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { auth, db } from "../../src/FirebaseConfigs/FirebaseConfig";
import {
  QuerySnapshot,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import "../Components/Css/Cart.css";
import CartCard from "./CartCard";
const Cart = () => {
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

  const [cartdata, setCartData] = useState([]);
  if (loggeduser) {
    const getcartdata = async () => {
      const cartArray = [];
      const path = `cart-${loggeduser[0].uid}`;

      getDocs(collection(db, path))
        .then((QuerySnapshot) => {
          QuerySnapshot.forEach((doc) => {
            cartArray.push({ ...doc.data(), id: doc.id });
          });
          setCartData(cartArray);
        })
        .catch("error error error");
    };
    getcartdata();
  }

  return (
    <div>
      <Navbar />
      {cartdata.length != 0 ? (
        <div>
          <div className="cart-head">Your cart items</div>
          <div className="allcartitems">
            {cartdata.map((item) => (
              <CartCard
                key={item.id}
                itemdata={item}
                userid={loggeduser[0].uid}
              />
            ))}
          </div>
        </div>
      ) : (
        <p>Your cart is empity</p>
      )}
    </div>
  );
};
export default Cart;
