
import { Nav } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";

function HelpLayout() {
  return (
    <section className="help-layout">
      <div className="page-heading">
        <h1>Hướng dẫn sử dụng thư viện</h1>
        <p>
          Tìm hiểu các câu hỏi thường gặp và nội quy khi sử dụng thư viện.
        </p>
      </div>

      <Nav variant="tabs" className="help-tabs">
        <Nav.Item>
          <Nav.Link as={NavLink} to="faq" end>
            Câu hỏi thường gặp
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link as={NavLink} to="rules" end>
            Nội quy
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <div className="help-content">
        <Outlet />
      </div>
    </section>
  );
}

export default HelpLayout;
