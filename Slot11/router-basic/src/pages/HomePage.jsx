
import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="home-page">
      <section className="home-hero">
        <p className="hero-label"> </p>
        <h1>Chào mừng đến với Thư viện FPT</h1>
        <p>
          Không gian học tập và khám phá tri thức dành cho sinh viên.
          Tìm kiếm sách, đọc hướng dẫn và sử dụng thư viện hiệu quả.
        </p>

        <Button as={Link} to="/books" variant="light" className="hero-button">
          Khám phá sách
        </Button>
      </section>

      <Row className="g-4 home-features">
        <Col md={6}>
          <Card className="feature-card h-100">
            <Card.Body>
              <h2>Danh sách sách</h2>
              <p>
                Xem danh sách sách, tác giả, thể loại và tình trạng mượn.
              </p>
              <Button as={Link} to="/books" variant="outline-primary">
                Xem sách
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="feature-card h-100">
            <Card.Body>
              <h2>Hướng dẫn sử dụng</h2>
              <p>
                Tìm hiểu câu hỏi thường gặp và nội quy của thư viện.
              </p>
              <Button as={Link} to="/help" variant="outline-primary">
                Xem hướng dẫn
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default HomePage;
