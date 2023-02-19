import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//features
import { logout, reset } from "../../app/features/auth/authSlice";

//Styles
import { Container, Nav, Navbar } from "react-bootstrap";
import {FaSignInAlt,FaUserCircle,FaRegUserCircle,FaSignOutAlt} from "react-icons/fa";
import { AiOutlineHome, AiFillHome } from "react-icons/ai";
import "./index.css";
import ZIWIBook from "../../icons/ZIWIBook.png"
const Header = () => {
  const { token, status ,user} = useSelector((state) => state.auth);
  const [home, setHome] = useState(true);
  const [profile, setProfile] = useState(false);
  const [expand, updateExpanded] = useState(false);

  const homeClick = () => {
    setHome(true);
    setProfile(false);
  };
  const profileClick = () => {
    setProfile(true);
    setHome(false);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const LogoutHandler = () => {
    dispatch(logout());
    dispatch(reset());
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header expanded={expand}>
         <div className="navbar-left"> 
        <Link to="/" >
           <img src={ZIWIBook} alt="" className="logo"/>
           </Link>
           </div>
         {/* <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => {
            updateExpanded(expand ? false : "expanded");
          }}
        ></Navbar.Toggle>
        <Navbar.Collapse className="hamburger" id="responsive-navbar-nav"> */}
          <div className="navbar-middle">
            <NavLink
              className="navbar-middle-icon"
              as={Link}
              to="/"
              onClick={() => {
                homeClick();
                updateExpanded(false);
              }}
            >
              {!home ? (
                <AiOutlineHome/>
              ) : (
                <AiFillHome/>
              )}{" "}
              <b>Home</b>
            </NavLink>
            {(status==="isConnected" || token) && (
              <>
                {" "}
                <NavLink
                  className="navbar-middle-icon"
                  as={Link}
                  to={`/profile/${user?.name}`}
                  onClick={() => {
                    profileClick();
                    updateExpanded(false);
                  }}
                >
                  {profile ? (
                    <FaUserCircle/>
                  ) : (
                    <FaRegUserCircle/>
                  )}
                  <b>&nbsp;profile</b>
                </NavLink>
              </>
            )}
          </div>
          <div className="navbar-right">
            {!(status==="isConnected" || token) ? (
              <>
                <NavLink className="navbar-middle-icon" as={Link} to="/login">
                  <FaSignInAlt/> <b>login</b>
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  className="navbar-middle-icon"
                  as={Link}
                  to="#"
                  onClick={LogoutHandler}
                >
                  <FaSignOutAlt/> <b>logout</b>
                </NavLink>
              </>
            )}
          </div>
        {/* </Navbar.Collapse> */}
     </header>
  );
};

export default Header;
