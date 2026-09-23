import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

import {
  APP_NAME,
  menuItems,
} from '../data/menu';

function Header() {
  return (
    <Navbar
      bg="dark"
      data-bs-theme="dark"
      expand="lg"
      className="py-3"
    >
      <Container>
        <Navbar.Brand href="#home">
          {APP_NAME}
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />

        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto gap-2">
            {menuItems.map((item) => (
              <Nav.Link
                key={item.href}
                href={item.href}
              >
                {item.label}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;