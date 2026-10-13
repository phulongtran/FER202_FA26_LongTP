import { useState } from "react";
import { Button, Card, Container, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    session: "Sáng",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const trimmedName = form.name.trim();
    const trimmedEmail = form.email.trim();

    if (!trimmedName) {
      setError("Vui lòng nhập họ tên.");
      return;
    }

    if (!trimmedEmail || !trimmedEmail.includes("@")) {
      setError("Vui lòng nhập email hợp lệ có ký tự @.");
      return;
    }

    const registrationData = {
      name: trimmedName,
      email: trimmedEmail,
      session: form.session,
    };

    setError("");

    navigate("/success", {
      state: registrationData,
      replace: true,
    });
  }

  return (
    <Container className="event-container">
      <Card className="register-card shadow">
        <Card.Body className="p-4 p-md-5">
          <h2 className="mb-2">Đăng ký tham dự</h2>

          <p className="text-secondary mb-4">
            FPTU Tech Day 2026
          </p>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit} noValidate>
            <Form.Group className="mb-3" controlId="registerName">
              <Form.Label>Họ tên</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Nhập họ tên của bạn"
                value={form.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="registerEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                name="email"
                placeholder="example@email.com"
                value={form.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="registerSession">
              <Form.Label>Buổi tham dự</Form.Label>
              <Form.Select
                name="session"
                value={form.session}
                onChange={handleChange}
              >
                <option value="Sáng">Buổi sáng</option>
                <option value="Chiều">Buổi chiều</option>
              </Form.Select>
            </Form.Group>

            <div className="d-flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline-secondary"
                onClick={() => navigate(-1)}
              >
                Quay lại
              </Button>

              <Button type="submit" variant="primary">
                Gửi đăng ký
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default RegisterPage;