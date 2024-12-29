import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

import SearchTickers from "@components/SearchTickers/SearchTickers";

function Header() {
  return (
    <header className="mt-4">
      <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
        <Container className="d-flex">
          <Nav className="">
            <Nav.Link as={NavLink} to="/stock-market-app">
              Home
            </Nav.Link>
          </Nav>
          <div style={{ margin: "auto" }}>
            <SearchTickers />
          </div>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
