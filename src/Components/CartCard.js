import React, { useState } from "react";
import "../Components/Css/CartCard.css";
import { deleteDoc, doc, setdoc, updateDoc } from "firebase/firestore";
import { db } from "../FirebaseConfigs/FirebaseConfig";

export default function CartCard(props) {
  const [productquantity, setProductQuantity] = useState(
    props.itemdata.quantity
  );
  let p = props.itemdata.product.price;
  let overalltax = 10 / 100;
  let overallcommission = 10 / 100;
  let extraforfun = 10 / 100;

  let mrp = parseInt(p);
  mrp = mrp + overalltax * mrp + overallcommission * mrp + extraforfun * mrp;
  const saleprice = (mrp - extraforfun * mrp) * productquantity;

  const increasequantity = async () => {
    setProductQuantity(productquantity + 1);

    const itemref = doc(db, `cart-${props.userid}`, `${props.itemdata.id}`);
    await updateDoc(itemref, {
      quantity: productquantity + 1,
    }).then(() => {
      alert("changed quantity");
    });
  };
  const decreasequantity = async () => {
    if (productquantity >= 1) {
      setProductQuantity(productquantity - 1);

      const itemref = doc(db, `cart-${props.userid}`, `${props.itemdata.id}`);
      await updateDoc(itemref, {
        quantity: productquantity - 1,
      }).then(() => {
        alert("changed quantity");
      });
    }
  };

  const deletcartitem = async () => {
    await deleteDoc(
      doc(db, `cart-${props.userid}`, `${props.itemdata.id}`)
    ).then(() => {
      alert("Cart deleted successfully");
    });
  };
  return (
    <div className="cart-prod-container">
      <div className="cart-prod-imgtitle">
        <div className="prod-image">
          <img src={props.itemdata.product.productimage} />
        </div>
        <div className="prod-title">{props.itemdata.product.producttitle}</div>
      </div>
      <div className="prodquantity-div">
        <button onClick={increasequantity}>+</button>
        <p>{productquantity}</p>
        <button onClick={decreasequantity}>-</button>
      </div>
      <div className="prodprice">₹{saleprice}</div>
      <button className="deletebtn" onClick={deletcartitem}>
        Delete
      </button>
    </div>
  );
}
