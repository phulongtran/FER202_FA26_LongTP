import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';

const MENU = [
  { to: '/', label: 'Trang chủ' },
  { to: '/skills', label: 'Kỹ năng' },
  { to: '/projects', label: 'Dự án' },
  { to: '/contact', label: 'Liên hệ' },
];

export const AppNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Trần Phú Long</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {MENU.map((item) => (
              <Nav.Link
                key={item.to}
                as={NavLink}
                to={item.to}
                end={item.to === '/'}
              >
                {item.label}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};