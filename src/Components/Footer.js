import React from "react";
import { NavLink } from "react-router-dom";
import { AiFillGithub } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";
import { AiFillYoutube } from "react-icons/ai";
// import { Button } from "bootstrap";
import "../Components/Css/Footer.css";
import styled from "styled-components";
export default function Footer() {
  return (
    <Wrapper>
      <section className="contact-short">
        <div className="grid grid-two-column">
          <div className="wrapper-container">
            <h3>Ready to get started?</h3>
            <h3>Talk to us today</h3>
          </div>
          <div>
            <NavLink to="/">
              <button className="get-btn">Get Started</button>
            </NavLink>
          </div>
        </div>
      </section>
      {/* Footer Section */}
      <footer>
        <div className="container grid grid-four-column">
          <div className="footer-about">
            <h3>MultiShop</h3>
            <p>
              Lorem ipsum dolar, <br />
              sit amet consectetur adipisicing elit.
            </p>
          </div>
          {/* 2nd column */}

          <div className="footer-subscribe">
            <h5>Subscribe to get important updates</h5>
            <form action="#">
              <input
                type="email"
                required
                autoComplete="off"
                placeholder="Email"
              />
              <br />
              <input className="btn" type="submit" value="Subscribe" />
            </form>
          </div>
          <div className="footer-social">
            <h3>Follow Us</h3>
            <div className="footer-social-icon">
              <div>
                <a href="https://github.com/coding5128">
                  <AiFillGithub className="icons" />
                </a>
              </div>
              <div>
                <a href="https://www.instagram.com/">
                  <AiFillInstagram className="icons" />
                </a>
              </div>
              <div>
                <a href="https://www.youtube.com/" target="_blank">
                  <AiFillYoutube className="icons" />
                </a>
              </div>
            </div>
          </div>
          <div className="footer-contact">
            <h5>Call Us</h5>
            <h5>+91 1234567893</h5>
          </div>
        </div>
        <div className="footer-bottom">
          <hr/>
        </div>
      </footer>
    </Wrapper>
  );
}
const Wrapper = styled.section`
  .contact-short {
    max-width: 60vw;
    max-height: 30vw;
    margin: auto;
    padding: 5rem;

    background-color: #d9dddf;
    border-radius: 1rem;
    box-shadow: 0px 0px 3px 0px grey;
    transform: translateY(50%);

    .grid div:last-child {
      justify-self: end;
      align-self: center;
    }
  }
`;
