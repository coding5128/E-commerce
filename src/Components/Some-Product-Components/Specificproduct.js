import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { auth, db } from "../../FirebaseConfigs/FirebaseConfig";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  addDoc,
} from "firebase/firestore";
import Navbar from "../Navbar";
import "../Css/Specifice.css";
import ProductSlider from "./ProductSlider";
import Pic1 from "../assets/money.png";
import Pic2 from "../assets/replace.png";
import Pic3 from "../assets/warranty1.jpg";

export default function Specificproduct() {
  const { id, type } = useParams();

  const [product, setProduct] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  let overalltax = 10 / 100;
  let overallcommission = 10 / 100;
  let extraforfun = 10 / 100;

  let mrp = parseInt(product.price);
  mrp = mrp + overalltax * mrp + overallcommission * mrp + extraforfun * mrp;
  const saleprice = mrp - extraforfun * mrp;

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

  function GetCurrentProduct() {
    useEffect(() => {
      const getProduct = async () => {
        const docRef = doc(db, `/products-${type.toUpperCase()}`, id);
        const docSnap = await getDoc(docRef);
        setProduct(docSnap.data());
      };
      getProduct();
    }, []);
    return product;
  }
  GetCurrentProduct();
  // let p = product.price;

  const addtocart = () => {
    if (loggeduser) {
      addDoc(collection(db, `cart-${loggeduser[0].uid}`), {
        product,
        quantity: 1,
      })
        .then(() => {
          setSuccessMsg("Product added to cart");
        })
        .catch((error) => {
          setErrorMsg(error.message);
        });
    } else {
      setErrorMsg("You need to login first");
    }
  };
  return (
    <div>
      <Navbar />
      {product ? (
        <div className="myprod-container">
          <div className="prod-img-cont">
            <img src={product.productimage} />
          </div>
          <div className="prod-data">
            <p className="prod-head">{product.producttitle}</p>
            <p className="prod-keyspecs">{product.kespecs}</p>

            <div className="specific-price-container">
              <p className="mrp">
                MRP:<p className="rate">₹{mrp}</p>
              </p>
              <p className="saleprice">
                Discount Price:<p className="rate">₹{saleprice}</p>
              </p>
              <p className="yousave">You Save:₹{mrp - saleprice}</p>
            </div>
            <p className="prod-details-head">Details</p>
            <p className="prod-description">{product.description}</p>

            <div className="row-cont">
              <div classNane="warranty-replacement">
                <div className="cod">
                  <img src={Pic1} className="img-cricle" />
                  <p>Cash on Delivery</p>
                </div>

                <div className="warranty">
                  <div className="img-cricle">
                    <img src={Pic3} />
                  </div>
                  <p>{product.warranty} your warranty</p>
                </div>
                <div className="replacement">
                  <div className="img-cricle">
                    <img src={Pic2} />
                  </div>
                  <p>10 Days replacement</p>
                </div>
              </div>
              <div className="buy-cart">
                <button className="btn">Buy Now</button>
                <button className="btn" onClick={addtocart}>
                  add to cart
                </button>
              </div>
            </div>
            {successMsg && (
              <>
                <div className="success-msg">{successMsg}</div>
              </>
            )}
            {errorMsg && (
              <>
                <div classNmae="error-msg">{errorMsg}</div>
              </>
            )}
          </div>
        </div>
      ) : (
        <div>Loding...</div>
      )}
      <p className="prod-details-head2">Similar Item</p>
      <ProductSlider type={type}></ProductSlider>
    </div>
  );
}
