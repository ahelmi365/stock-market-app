import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

import styles from "./styles.module.css";

function Header() {
  return (
    <header className="mt-4">
      <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/categories">
                Categories
              </Nav.Link>
              <Nav.Link as={NavLink} to="/about-us">
                About Us
              </Nav.Link>
            </Nav>
            <Nav className="">
              <Nav.Link as={NavLink} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={NavLink} to="/register">
                Register
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
