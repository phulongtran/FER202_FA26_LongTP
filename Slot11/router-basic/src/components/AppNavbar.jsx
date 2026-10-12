
import { Link, NavLink } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";

const MENU = [
  { to: "/", label: "Trang chủ" },
  { to: "/skills", label: "Kỹ năng" },
  { to: "/projects", label: "Dự án" },
  { to: "/contact", label: "Liên hệ" },
];

function AppNavbar() {
  return (
    <Navbar expand="lg" className="portfolio-navbar" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand-name">
          My Portfolio
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="portfolio-navbar-nav" />

        <Navbar.Collapse id="portfolio-navbar-nav">
          <Nav className="ms-auto">
            {MENU.map((item) => (
              <Nav.Link
                key={item.to}
                as={NavLink}
                to={item.to}
                end={item.to === "/"}
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

export default AppNavbar;
