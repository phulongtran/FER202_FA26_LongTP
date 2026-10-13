import { Button, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function EventPage() {
  const navigate = useNavigate();

  return (
    <Container className="event-container">
      <Card className="event-card shadow">
        <Card.Body className="text-center p-5">
          <p className="event-label">FPT UNIVERSITY</p>

          <h1 className="event-title">FPTU Tech Day 2026</h1>

          <p className="event-description">
            Ngày hội công nghệ dành cho sinh viên với những hoạt động
            khám phá công nghệ mới, giao lưu và chia sẻ kiến thức.
          </p>

          <p className="event-time">
            Thời gian: Năm 2026
          </p>

          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate("/register")}
          >
            Đăng ký ngay
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default EventPage;