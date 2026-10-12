
import { Container, Card } from "react-bootstrap";

function ContactPage() {
  return (
    <Container className="page-container">
      <p className="section-label">GET IN TOUCH</p>
      <h1 className="page-title">Liên hệ với mình</h1>
      <p className="page-description">
        Mình luôn sẵn sàng trao đổi về công nghệ và các cơ hội hợp tác.
      </p>

      <Card className="contact-card">
        <Card.Body>
          <p>
            <strong>Email:</strong> your.email@example.com
          </p>
          <p>
            <strong>GitHub:</strong>{" "}
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
            >
              GitHub của mình
            </a>
          </p>
          <p className="mb-0">
            <strong>Định hướng:</strong> Frontend Developer / BrSE
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ContactPage;
