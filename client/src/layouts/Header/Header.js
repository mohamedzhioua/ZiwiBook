import React, { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";
import {
  FaSignInAlt,
  FaUserCircle,
  FaRegUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { AiOutlineHome, AiFillHome } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../../app/features/auth/authSlice";

const Header = () => {
  const [home, setHome] = useState(true);
  const [profile, setProfile] = useState(false);
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
    <Navbar className="Navbar" expand="lg" variant="light">
      <Container fluid>
        <Navbar.Brand className="Nav-Brand">Memories</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className="hamburger" id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className="Nav-link" as={Link} to="/" onClick={homeClick}>
              {!home ? <AiOutlineHome size={20} /> : <AiFillHome size={20} />}{" "}
              <b>Home</b>
            </Nav.Link>
            {(isConnected || token) && (
              <>
                {" "}
                <Nav.Link
                  className="Nav-link"
                  as={Link}
                  to="/profile"
                  onClick={profileClick}
                >
                  {profile ? (
                    <FaUserCircle size={20} />
                  ) : (
                    <FaRegUserCircle size={20} />
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
                  <FaSignInAlt size={20} /> <b>login</b>
                </Nav.Link>
              </>
            ) : (
              <>
                {home ? (
                  <>
                    <form class="d-flex" id="Search">
                      <input
                        class="form-control me-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                      />
                      <button class="btn btn-light" type="submit">
                        search
                      </button>
                    </form>
                  </>
                ) : (
                  <Nav.Link
                    className="Nav-link"
                    as={Link}
                    to="#"
                    onClick={LogoutHandler}
                  >
                    <FaSignOutAlt size={20} /> <b>logout</b>
                  </Nav.Link>
                )}
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
