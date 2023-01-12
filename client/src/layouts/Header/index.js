import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//features
import { logout, reset } from "../../app/features/auth/authSlice";

//Styles
import { Container, Nav, Navbar } from "react-bootstrap";
import {
  FaSignInAlt,
  FaUserCircle,
  FaRegUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { AiOutlineHome, AiFillHome } from "react-icons/ai";
import "./index.css";

const Header = () => {
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
  const { token, isConnected } = useSelector((state) => state.auth);

  const LogoutHandler = () => {
    dispatch(logout());
    dispatch(reset());
    localStorage.clear();
    navigate("/login");
  };

 
  return (
    <Navbar
      expanded={expand}
      expand="md"
      className="navbar"
    >
      <Container fluid >
        <Navbar.Brand className="logo" alt="brand">
          ZIWI 
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => {
            updateExpanded(expand ? false : "expanded");
          }}
        />
        <Navbar.Collapse className="hamburger"  id="responsive-navbar-nav" >
          <Nav className="me-auto" >
            <Nav.Link
              className="Nav-link"
              as={Link}
              to="/"
              onClick={() => {
                homeClick();
                updateExpanded(false);
              }}
            >
              {!home ? (
                <AiOutlineHome className="Navbar-icon" />
              ) : (
                <AiFillHome className="Navbar-icon" />
              )}{" "}
              <b>Home</b>
            </Nav.Link>
            {(isConnected || token) && (
              <>
                {" "}
                <Nav.Link
                  className="Nav-link"
                  as={Link}
                  to="/profile"
                  onClick={() => {
                    profileClick();
                    updateExpanded(false);
                  }}
                >
                  {profile ? (
                    <FaUserCircle className="Navbar-icon" />
                  ) : (
                    <FaRegUserCircle className="Navbar-icon" />
                  )}{" "}
                  <b>profile</b>
                </Nav.Link>
              </>
            )}
          </Nav>
          <Nav className="ms-auto">
            {!(isConnected || token) ? (
              <>
                {" "}
                <Nav.Link className="Nav-link" as={Link} to="/login">
                  <FaSignInAlt className="Navbar-icon" /> <b>login</b>
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link
                  className="Nav-link"
                  as={Link}
                  to="#"
                  onClick={LogoutHandler}
                >
                  <FaSignOutAlt className="Navbar-icon" /> <b>logout</b>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
