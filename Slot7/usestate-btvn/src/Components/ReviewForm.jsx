import React, { useState } from 'react';
import { Container, Card, Form, Button, ListGroup } from 'react-bootstrap';
import StarRating from './StarRating';

export default function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([]);

  const canSubmit = rating > 0 && comment.trim().length >= 5;

  const totalReviews = reviews.length;
  const averageRating =
    totalReviews === 0
      ? '0.0'
      : (
          reviews.reduce((acc, item) => acc + item.rating, 0) / totalReviews
        ).toFixed(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    const newReview = {
      id: Date.now(),
      rating,
      comment: comment.trim(),
      createdAt: new Date().toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setReviews((prev) => [newReview, ...prev]);

    setRating(0);
    setComment('');
  };

  return (
    <Container className="my-4" style={{ maxWidth: '600px' }}>
      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Card.Title className="mb-3">Bài 2: Đánh giá & Nhận xét</Card.Title>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">1. Chọn mức độ hài lòng:</Form.Label>
              <StarRating value={rating} onChange={setRating} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">2. Viết nhận xét (tối thiểu 5 ký tự):</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Chia sẻ trải nghiệm của bạn..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Form.Text className={comment.trim().length > 0 && comment.trim().length < 5 ? 'text-danger' : 'text-muted'}>
                {comment.trim().length}/5 ký tự tối thiểu
              </Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit" disabled={!canSubmit}>
              Gửi đánh giá
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <Card className="shadow-sm">
        <Card.Header className="d-flex justify-content-between align-items-center bg-light">
          <h5 className="mb-0">
            Trung bình {averageRating}/5 ({totalReviews} lượt)
          </h5>
        </Card.Header>
        <Card.Body>
          {reviews.length === 0 ? (
            <p className="text-muted text-center my-3">Chưa có đánh giá nào. Hãy là người đầu tiên!</p>
          ) : (
            <ListGroup variant="flush">
              {reviews.map((item) => (
                <ListGroup.Item key={item.id} className="px-0 py-3">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <div>
                      <span className="text-warning me-1">{'★'.repeat(item.rating)}</span>
                      <span className="text-muted">{'★'.repeat(5 - item.rating)}</span>
                    </div>
                    <small className="text-muted">{item.createdAt}</small>
                  </div>
                  <p className="mb-0 text-break">{item.comment}</p>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}