
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";

const MENU = [
  { to: "/", label: "Trang chủ", end: true },
  { to: "/books", label: "Sách", end: true },
  { to: "/help", label: "Hướng dẫn", end: false },
];

function MainLayout() {
  return (
    <div className="app-layout">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={NavLink} to="/">
            Trần Phú Long
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="main-navbar-nav" />

          <Navbar.Collapse id="main-navbar-nav">
            <Nav className="ms-auto">
              {MENU.map((item) => (
                <Nav.Link
                  key={item.to}
                  as={NavLink}
                  to={item.to}
                  end={item.end}
                >
                  {item.label}
                </Nav.Link>
              ))}
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
