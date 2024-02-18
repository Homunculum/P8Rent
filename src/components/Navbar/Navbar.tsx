/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useState } from "react";
import "./Navbar.css";
import { IoIosCloseCircle, IoIosMenu } from "react-icons/io";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import {  NavDropdown } from "react-bootstrap";
import Login from "../Login/Login";
import Register from "../Register/Register";


const Navbar: React.FC = () => {
  const [navbar, setNavbar] = useState("navbar");

  const showNavbar = () => {
    setNavbar("navbar showNavbar");
  };
  const removeNavbar = () => {
    setNavbar("navbar");
  };

  const [header, setHeader] = useState("header");
  const addBg = () => {
    if (window.scrollY >= 40) {
      setHeader("header addBg");
    }
  };

  const authContext: any = useContext(AuthContext);

  return (
    <>
      <div className={header}>
        <div className="logoDiv">
          <Link to="/" className="link">
            <img src={"/assets/logo.svg"} alt="p8rent-logo" className="logo" />
          </Link>
        </div>

        <div className={navbar}>
          <ul className="menu">
            <li onClick={removeNavbar} className="listItem">
              <Link to="/" className="link">
                Home
              </Link>
            </li>
            
            <li onClick={removeNavbar} className="listItem">
              <Link to="/about" className="link">
                About Us
              </Link>
            </li>
            <li onClick={removeNavbar} className="listItem">
              <Link to="/contact" className="link">
                Contact
              </Link>
            </li>
          </ul>
          <IoIosCloseCircle className="icon closeIcon" onClick={removeNavbar} />
        </div>

        <div className="signUp flex">
          {authContext.isAuthenticated ? (
            <>
              <NavDropdown
                className="textAction text"
                title={
                  <Link className="text btn" to="/profile">
                    My Account
                  </Link>
                }
                id="basic-nav-dropdown"
              >
                <Link className=" text textAction btn" to="/profile">
                  {" "}
                  Profile
                </Link>

                <Link className="  btn text textAction" to="/cart">
                  Reservation
                </Link>
                {authContext.isAuthenticated && (
                <Link className="text textAction btn" onClick={() => {
                  authContext.setIsAuthenticated(false);
                }} to="/">
                  Log Out
                </Link>)}
              </NavDropdown>
            </>
          ) : (
            <>
             <li className="text btn">
                  <Login/>
                </li>
                <li className="text btn">
                  <Register/>
                </li>
            </>
          )}
          <IoIosMenu className="icon toggleNavbarIcon" onClick={showNavbar} />
        </div>
      </div>
    </>
  );
};

export default Navbar;