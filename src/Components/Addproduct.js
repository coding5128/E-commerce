import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { storage, auth, db } from "../FirebaseConfigs/FirebaseConfig";
import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import "./Css/Addproduct.css";
export default function Addproduct() {
  const [producttitle, setProductTitle] = useState("");
  const [producttype, setProductType] = useState("");
  const [description, setDescription] = useState("");
  const [keyspecs, setKeyspecs] = useState("");
  const [brand, setBrand] = useState("");
  const [customersupport, setCustomersupport] = useState("");
  const [price, setPrice] = useState("");
  const [warranty, setWarranty] = useState("");
  const [productimage, setProductImage] = useState("");

  const [imageError, setImageError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [uploadError, setUploadError] = useState("");

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
  const types = ["image/jpg", "image/jpeg", "image/png", "image/PNG"];
  const handleProductImg = (e) => {
    e.preventDefault();
    let selectedFile = e.target.files[0];

    if (selectedFile) {
      if (selectedFile && types.includes(selectedFile.type)) {
        setProductImage(selectedFile);
        setImageError("");
      } else {
        setProductImage(null);
        setImageError("please select a valid image file type(png or jpg)");
      }
    } else {
      setImageError("please select your file");
    }
  };
  const loggeduser = GetCurrentUser();
  //   if (loggeduser) {
  //     console.log(loggeduser[0].password);
  //   }
  const handleAddProduct = (e) => {
    e.preventDefault();
    const stroageRef = ref(
      storage,
      `product-image${producttype.toUpperCase()}/${Date.now()}`
    );

    uploadBytes(stroageRef, productimage).then(() => {
      getDownloadURL(stroageRef).then((url) => {
        addDoc(collection(db, `products-${producttype.toUpperCase()}`), {
          producttitle,
          producttype,
          description,
          brand,
          customersupport,
          price,
          warranty,
          productimage: url,
          keyspecs: keyspecs,
        });
      });
    });
  };
  return (
    <div>
      <Navbar />
      {loggeduser && loggeduser[0].email == "raisandeep232329@gmail.com" ? (
        <div className="addprod-container">
          <form className="addprod-from" onSubmit={handleAddProduct}>
            <p>Add Data</p>
            {successMsg && <div className="success-msg">{successMsg}</div>}
            {uploadError && <div className="error-msg">{uploadError}</div>}

            <label>Product Title</label>
            <input
              type="text"
              onChange={(e) => {
                setProductTitle(e.target.value);
              }}
              placeholder="Product Title.."
            />

            <label>Product Type</label>
            <input
              type="text"
              onChange={(e) => {
                setProductType(e.target.value);
              }}
              placeholder="Product Type."
            />
            <label>Brand Name</label>
            <input
              type="text"
              onChange={(e) => {
                setBrand(e.target.value);
              }}
              placeholder="Brand Name"
            />
            <label>Warranty</label>
            <input
              type="text"
              onChange={(e) => {
                setWarranty(e.target.value);
              }}
              placeholder="Product Warranty"
            />
            <label>Image</label>
            <input type="file" onChange={handleProductImg} />
            {imageError && (
              <>
                <div className="error-msg">{imageError}</div>
              </>
            )}
            <label>key Specifications</label>
            <textarea
              onChange={(e) => setKeyspecs(e.target.value)}
              placeholder="Enter some key specification"
            ></textarea>
            <label>Description</label>
            <textarea
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              placeholder="Describe your Product in breif"
            ></textarea>
            <label>Price Without Tax</label>
            <input
              type="text"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              placeholder="Enter Price without tax.."
            />
            <label>Customer Support</label>
            <input
              type="text"
              onChange={(e) => {
                setCustomersupport(e.target.value);
              }}
              placeholder="Customer Support Email,Phone or Address"
            />
            <button type="submit">Add</button>
          </form>
        </div>
      ) : (
        <div>You don't have access to add producats</div>
      )}
    </div>
  );
}
