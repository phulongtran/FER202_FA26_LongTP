
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

        <h2></h2>

        <p className="intro-text">
         
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
