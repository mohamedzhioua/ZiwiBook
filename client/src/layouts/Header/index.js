import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//features
import { logout, reset } from "../../app/features/auth/authSlice";

//Styles
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import style from "./Header.module.css";
import ZIWIBook from "../../icons/ZIWIBook.png";
import { SearchBar } from "../../components";
import {
  Home,
  HomeActive,
  Market,
  Watch,
  FriendsActive,
  Friends,
} from "../../svg";
const Header = () => {
  const { token, status, user } = useSelector((state) => state.auth);

  const [expand, updateExpanded] = useState(false);

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
      <div className={style.navbar_left}>
        <Link to="/">
          <img src={ZIWIBook} alt="" className={style.logo} />
        </Link>
        <div className={style.navbar_search}>
          <SearchBar />
        </div>
      </div>
      {/* <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => {
            updateExpanded(expand ? false : "expanded");
          }}
        ></Navbar.Toggle>
        <Navbar.Collapse  className={style.hamburger" id="responsive-navbar-nav"> */}
      <div className={style.navbar_middle}>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${style.active} ${style.navbar_middle_icon}`
              : `${style.navbar_middle_icon} hover1`
          }
          to="/"
          onClick={() => {
            updateExpanded(false);
          }}
        >
          <HomeActive className={style.active_icon} />
          <Home className={style.notActive_icon} />
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${style.active} ${style.navbar_middle_icon}`
              : `${style.navbar_middle_icon} hover1`
          }
          to="/"
          onClick={() => {
            updateExpanded(false);
          }}
        >
          <span className={style.active_icon} style={{ transform: "translateY(5px)" }}>
            <FriendsActive  />
          </span>
          <span className={style.notActive_icon} style={{ transform: "translateY(5px)" }}>
            <Friends  />
          </span>
        </NavLink>
        <NavLink className={`${style.navbar_middle_icon} hover1`} to="#">
          <Watch />
        </NavLink>

        <NavLink className={`${style.navbar_middle_icon} hover1`} to="#">
          <Market />
        </NavLink>
      </div>
      <div className={style.navbar_right}>
        <NavLink
          to={`/profile/${user?.name}`}
          onClick={() => {
            updateExpanded(false);
          }}
        >
          <img
            src="https://thumbs.dreamstime.com/b/businessman-icon-vector-male-avatar-profile-image-profile-businessman-icon-vector-male-avatar-profile-image-182095609.jpg"
            alt=""
            className={style.navbar_profile}
          />
        </NavLink>

        {!(status === "isConnected" || token) ? (
          <>
            <NavLink className={style.navbar_middle_icon} to="/login">
              <FaSignInAlt /> <b>login</b>
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              className={style.navbar_middle_icon}
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
