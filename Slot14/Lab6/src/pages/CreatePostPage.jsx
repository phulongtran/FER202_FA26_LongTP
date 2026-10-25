
import { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Card,
  Form,
  Spinner,
} from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

import postApi, { userApi } from '../api/postApi';

export default function CreatePostPage() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const [loadingUsers, setLoadingUsers] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    userApi.getAll(controller.signal)
      .then((res) => {
        setUsers(res.data);

        if (res.data.length > 0) {
          setUserId(String(res.data[0].id));
        }
      })
      .catch((err) => {
        if (!axios.isCancel(err)) {
          setError('Không thể tải danh sách tác giả.');
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoadingUsers(false);
        }
      });

    return () => controller.abort();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    if (!userId || !title.trim() || !body.trim()) {
      setError('Vui lòng chọn tác giả và nhập đầy đủ tiêu đề, nội dung.');
      return;
    }

    try {
      setSubmitting(true);

      await postApi.create({
        userId: Number(userId),
        title: title.trim(),
        body: body.trim(),
      });

      navigate('/posts', {
        state: {
          flash: {
            type: 'success',
            message: 'Tạo bài viết thành công!',
          },
        },
      });
    } catch (err) {
      setError(
        err.userMessage || err.message || 'Không thể tạo bài viết.'
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto" style={{ maxWidth: '760px' }}>
      <div className="mb-4">
        <h2>Tạo bài viết mới</h2>
        <p className="text-muted">
          Nhập thông tin bài viết và chọn tác giả.
        </p>
      </div>

      <Card className="shadow-sm">
        <Card.Body className="p-4">
          {error && (
            <Alert variant="danger" dismissible onClose={() => setError('')}>
              {error}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Tác giả</Form.Label>

              {loadingUsers ? (
                <div>
                  <Spinner size="sm" animation="border" /> Đang tải tác giả...
                </div>
              ) : (
                <Form.Select
                  value={userId}
                  onChange={(event) => setUserId(event.target.value)}
                  disabled={users.length === 0 || submitting}
                  required
                >
                  {users.length === 0 ? (
                    <option value="">Không có tác giả</option>
                  ) : (
                    users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))
                  )}
                </Form.Select>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tiêu đề</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tiêu đề bài viết"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                maxLength={200}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Nội dung</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                placeholder="Nhập nội dung bài viết"
                value={body}
                onChange={(event) => setBody(event.target.value)}
                required
              />
            </Form.Group>

            <div className="d-flex gap-2">
              <Button
                type="submit"
                variant="success"
                disabled={submitting || loadingUsers || users.length === 0}
              >
                {submitting ? 'Đang tạo...' : 'Tạo bài viết'}
              </Button>

              <Button
                as={Link}
                to="/posts"
                variant="outline-secondary"
                disabled={submitting}
              >
                Hủy
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
