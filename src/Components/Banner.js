import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import slide1 from "./assets/boat.webp";

import React, { useState } from "react";
import "../Components/Css/Banner.css";

function Banner() {
  return (
    <div className="banner">
      <div className="left-side">
        <img src={slide1} />
      </div>
      <div className="right-side">
        <div className="right-bottom">
          <h1>
            Welcome To Multi<span className="span">Shop</span>
          </h1>
          <p className="para">
            (electronic commerce) is the buying and selling of goods and
            services,
            <br />
            or the transmitting of funds or data,
            <br />
            over an electronic network, primarily the internet.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Banner;
