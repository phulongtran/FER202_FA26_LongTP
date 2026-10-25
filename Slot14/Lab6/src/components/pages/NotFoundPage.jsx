
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <Container className="text-center py-5">
      <h1 className="display-4">404</h1>
      <h2>Page Not Found</h2>
      <p className="text-muted">
        Trang bạn đang tìm kiếm không tồn tại.
      </p>

      <Button as={Link} to="/" variant="success">
        Quay về trang chủ
      </Button>
    </Container>
  );
}

export default NotFoundPage;
