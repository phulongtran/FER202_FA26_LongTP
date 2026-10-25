
import { Container, Nav, Navbar as BootstrapNavbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function Navbar() {
  const apiUrl =
    import.meta.env.VITE_API_URL || "http://localhost:3001";

  const linkClass = ({ isActive }) =>
    `nav-link ${isActive ? "active fw-bold text-success" : ""}`;

  return (
    <BootstrapNavbar bg="light" expand="lg" className="border-bottom">
      <Container>
        <BootstrapNavbar.Brand as={NavLink} to="/">
          DemoAxios
        </BootstrapNavbar.Brand>

        <BootstrapNavbar.Toggle aria-controls="main-navbar" />

        <BootstrapNavbar.Collapse id="main-navbar">
          <Nav className="ms-auto align-items-lg-center">
            <Nav.Link as={NavLink} to="/" className={linkClass}>
              Axios Demo
            </Nav.Link>

            <Nav.Link as={NavLink} to="/http" className={linkClass}>
              HTTP Requests
            </Nav.Link>

            <Nav.Link as={NavLink} to="/posts" className={linkClass}>
              Posts
            </Nav.Link>

            <span className="text-muted small ms-lg-3 mt-2 mt-lg-0">
              API: {apiUrl}
            </span>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}

export default Navbar;
