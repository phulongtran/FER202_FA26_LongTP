
import { Link } from "react-router-dom";
import { Button, Container } from "react-bootstrap";

function NotFoundPage() {
  return (
    <Container className="not-found-page text-center">
      <p className="section-label">PAGE NOT FOUND</p>
      <h1 className="not-found-code">404</h1>
      <h2>Không tìm thấy trang</h2>
      <p className="page-description">
        Đường dẫn bạn truy cập không tồn tại hoặc đã được thay đổi.
      </p>

      <Button as={Link} to="/" className="primary-button">
        Về trang chủ
      </Button>
    </Container>
  );
}

export default NotFoundPage;
