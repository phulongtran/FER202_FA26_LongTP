import { Container, Navbar, Nav } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="app-layout">
      <Navbar bg="white" expand="lg" className="main-navbar shadow-sm">
        <Container>
          <Navbar.Brand as={NavLink} to="/" className="brand-name">
            FPT University Library
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="main-navbar-nav" />

          <Navbar.Collapse id="main-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={NavLink} to="/" end>
                Trang chủ
              </Nav.Link>

              <Nav.Link as={NavLink} to="/books" end>
                Sách
              </Nav.Link>

              <Nav.Link as={NavLink} to="/help">
                Hướng dẫn
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container as="main" className="main-content">
        <Outlet />
      </Container>

      <footer className="main-footer">
        <Container>
          <p>
            © 2026 Thư viện FPT University. All rights reserved.
          </p>
        </Container>
      </footer>
    </div>
  );
}

export default MainLayout;