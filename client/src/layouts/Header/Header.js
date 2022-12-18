import React, { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./index.css";
import { FaSignInAlt, FaUserCircle, FaRegUserCircle } from "react-icons/fa";
import { AiOutlineHome, AiFillHome } from "react-icons/ai";

function Header() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  return (
    <Navbar className="Navbar" expand="lg">
      <Container fluid>
        <Navbar.Brand className="Nav-Brand">Memories</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="hamburger" id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              className="Nav-link"
              as={Link}
              to="/"
              onClick={handleClick}
            >
              {click ? <AiOutlineHome size={20} /> : <AiFillHome size={20}/>} Home
            </Nav.Link>
            <Nav.Link
              className="Nav-link"
              as={Link}
              to="/profile"
              onClick={handleClick}
            >
              {click ? <FaUserCircle size={20}/> : <FaRegUserCircle size={20} />} profile
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link className="Nav-link" as={Link} to="/login">
              <FaSignInAlt size={20} /> Sign In
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
