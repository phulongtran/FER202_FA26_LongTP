import { Button, Card, Container } from "react-bootstrap";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

function SuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state;

  if (!data) {
    return <Navigate to="/register" replace />;
  }

  return (
    <Container className="event-container">
      <Card className="success-card shadow">
        <Card.Body className="text-center p-4 p-md-5">
          <div className="success-mark">✓</div>

          <h1 className="success-title">Đăng ký thành công!</h1>

          <p className="success-message">
            Cảm ơn {data.name}, vé đã gửi tới {data.email}
          </p>

          <p className="session-info">
            Buổi tham dự: <strong>{data.session}</strong>
          </p>

          <div className="d-flex flex-wrap justify-content-center gap-2 mt-4">
            <Button
              variant="primary"
              onClick={() => navigate("/register")}
            >
              Đăng ký thêm người khác
            </Button>

            <Button
              variant="outline-secondary"
              onClick={() => navigate("/", { replace: true })}
            >
              Về trang sự kiện
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default SuccessPage;