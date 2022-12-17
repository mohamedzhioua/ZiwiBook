import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <Navbar bg="white" expand="lg">
      <Navbar.Brand>Memories</Navbar.Brand>
      <Container fluid>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="link">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/profile" className="link">
              profile
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/login" className="link">
              login
            </Nav.Link>
            <Nav.Link as={Link} to="/register" className="link">
              register
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
