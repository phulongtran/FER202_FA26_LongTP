
import { useState } from 'react';
import { Card, Form, Button, Spinner, Alert } from 'react-bootstrap';
import postApi from '../../api/postApi';
import ResultBox from './ResultBox';

export default function CreatePostCard() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errs = {};
    if (title.trim().length < 5) {
      errs.title = 'Tiêu đề tối thiểu 5 ký tự';
    }
    if (body.trim().length < 10) {
      errs.body = 'Nội dung tối thiểu 10 ký tự';
    }

    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    setError(null);
    setResult(null);

    try {
      const res = await postApi.create({
        title: title.trim(),
        body: body.trim(),
        userId: 1
      });

      setResult({
        status: res.status,
        duration: res.duration,
        data: res.data
      });

      setTitle('');
      setBody('');
      setErrors({});
    } catch (err) {
      setError(err.userMessage || err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="h-100 shadow-sm">
      <Card.Header>
        <strong>2.2 · POST</strong> /posts
      </Card.Header>

      <Card.Body>
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Tiêu đề</Form.Label>
            <Form.Control
              placeholder="Nhập tiêu đề"
              value={title}
              isInvalid={!!errors.title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Nội dung</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Nhập nội dung"
              value={body}
              isInvalid={!!errors.body}
              onChange={(e) => setBody(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              {errors.body}
            </Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" disabled={submitting}>
            {submitting ? (
              <><Spinner size="sm" /> Đang gửi...</>
            ) : 'Tạo bài viết'}
          </Button>
        </Form>

        {error && (
          <Alert variant="danger" className="mt-3">
            {error}
          </Alert>
        )}

        <ResultBox result={result} />
      </Card.Body>
    </Card>
  );
}
