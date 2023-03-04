import React, { useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

//Styles
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
  Notifications,
} from "../../svg";
import HeaderMenu from "./HeaderMenu";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import NotificationMenu from "./NotificationMenu/NotificationMenu";
const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const [showHeaderMenu, setShowHeaderMenu] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const notificationMenu = useRef(null);
  const headerMenu = useRef(null);

  useOnClickOutside(headerMenu, showHeaderMenu, () => {
    setShowHeaderMenu(false);
  });
  useOnClickOutside(notificationMenu, showNotification, () => {
    setShowNotification(false);
  });

  return (
    <header className={style.header}>
      <div className={style.navbar_left}>
        <Link to="/">
          <img src={ZIWIBook} alt="" className={style.logo} />
        </Link>
        <div className={style.navbar_search}>
          <SearchBar />
        </div>
      </div>
      <div className={style.navbar_middle}>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${style.active} ${style.navbar_middle_icon}`
              : `${style.navbar_middle_icon} hover1`
          }
          to="/"
        >
          <HomeActive className={style.active_icon} />
          <Home className={style.notActive_icon} />
        </NavLink>
        <NavLink  className={`${style.navbar_middle_icon} hover1`} to="#">
          <span
            className={style.active_icon}
            style={{ transform: "translateY(10%)" }}
          >
            <FriendsActive />
          </span>
          <span
            className={style.notActive_icon}
            style={{ transform: "translateY(10%)" }}
          >
            <Friends />
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
        <div ref={notificationMenu}>
          <div
            className={style.circle_icons}
            onClick={() => {
              setShowNotification((prev) => !prev);
            }}
          >
            <Notifications />
          </div>
          {showNotification && <NotificationMenu />}
        </div>
        <div ref={headerMenu}>
          <div
            className={style.circle_icons}
            onClick={() => {
              setShowHeaderMenu((prev) => !prev);
            }}
          >
            <img
              src="https://thumbs.dreamstime.com/b/businessman-icon-vector-male-avatar-profile-image-profile-businessman-icon-vector-male-avatar-profile-image-182095609.jpg"
              alt=""
              className={style.navbar_profile}
            />
          </div>
          {showHeaderMenu && (
            <HeaderMenu setShowHeaderMenu={setShowHeaderMenu} user={user} />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
