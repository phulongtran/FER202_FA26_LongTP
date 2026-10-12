
import { Link } from "react-router-dom";
import { Button, Container } from "react-bootstrap";

function HomePage() {
  return (
    <section className="home-section">
      <Container className="home-content">
        <p className="section-label">WELCOME TO MY PORTFOLIO</p>

        <h1>
          Xin chào, mình là
          <span className="highlight-text"> Trần Phú Long</span>
        </h1>

        <h2>Sinh viên Công nghệ thông tin</h2>

        <p className="intro-text">
          Mình yêu thích lập trình web, xây dựng giao diện hiện đại
          và phát triển những sản phẩm hữu ích cho người dùng.
        </p>

        <Button
          as={Link}
          to="/projects"
          className="primary-button"
        >
          Xem dự án của mình
        </Button>
      </Container>
    </section>
  );
}

export default HomePage;
