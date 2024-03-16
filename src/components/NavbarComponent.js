import React from 'react'
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";

function NavbarComponent() {
  return (
    <Navbar expand="lg" variant='dark'>
      <Container>
        <Navbar.Brand href="#home"><strong>Kasir</strong> APP</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {/* <Nav.Link href="/sukses">Link</Nav.Link>
            <Nav.Link href="/about">Link2</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavbarComponent