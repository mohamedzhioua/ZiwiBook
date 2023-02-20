import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//features
import { logout, reset } from "../../app/features/auth/authSlice";

//Styles
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { AiOutlineHome, AiFillHome } from "react-icons/ai";
import { HiOutlineUsers, HiUsers } from "react-icons/hi";
import "./index.css";
import ZIWIBook from "../../icons/ZIWIBook.png";
import { SearchBar } from "../../components";
const Header = () => {
  const { token, status, user } = useSelector((state) => state.auth);
  const [home, setHome] = useState(true);
  const [users, setUsers] = useState(true);
  const [expand, updateExpanded] = useState(false);

  const homeClick = () => {
    setHome(true);
    setUsers(false);
  };
  const profileClick = () => {
    setHome(false);
    setUsers(true);
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
        <Link to="/">
          <img src={ZIWIBook} alt="" className="logo" />
        </Link>
        <div className="navbar-search">
          <SearchBar />
        </div>
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
          className={({ isActive }) =>
            isActive ? "active-icon  navbar-middle-icon" : "navbar-middle-icon hover1"
          }
          to="/"
          onClick={() => {
            homeClick();
            updateExpanded(false);
          }}
        >
          {!home ? <AiOutlineHome /> : <AiFillHome />}
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "active-icon  navbar-middle-icon" : "navbar-middle-icon hover1"
          }
          to={`/profile/${user?.name}`}
          onClick={() => {
            profileClick();
            updateExpanded(false);
          }}
        >
          {users ? <HiUsers /> : <HiOutlineUsers />}
        </NavLink>
      </div>
      <div className="navbar-right">
        <NavLink
          to={`/profile/${user?.name}`}
          onClick={() => {
            profileClick();
            updateExpanded(false);
          }}
        >
          <img
            src="https://thumbs.dreamstime.com/b/businessman-icon-vector-male-avatar-profile-image-profile-businessman-icon-vector-male-avatar-profile-image-182095609.jpg"
            alt=""
            className="navbar-profile"
          />
        </NavLink>

        {!(status === "isConnected" || token) ? (
          <>
            <NavLink className="navbar-middle-icon" to="/login">
              <FaSignInAlt /> <b>login</b>
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              className="navbar-middle-icon"
              to="#"
              onClick={LogoutHandler}
            >
              <FaSignOutAlt /> <b>logout</b>
            </NavLink>
          </>
        )}
      </div>
      {/* </Navbar.Collapse> */}
    </header>
  );
};

export default Header;
