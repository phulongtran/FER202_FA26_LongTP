
import { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Card,
  Form,
  Spinner,
} from 'react-bootstrap';
import {
  Link,
  useNavigate,
  useParams,
} from 'react-router-dom';
import axios from 'axios';

import postApi from '../api/postApi';

export default function EditPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState({
    title: '',
    body: '',
    userId: 1,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadPost() {
      try {
        setLoading(true);
        setError('');

        const response = await postApi.getById(
          id,
          controller.signal
        );

        setPost({
          title: response.data.title || '',
          body: response.data.body || '',
          userId: response.data.userId || 1,
        });
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError(
            err.userMessage || 'Không thể tải bài viết.'
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadPost();

    return () => controller.abort();
  }, [id]);

  function handleChange(event) {
    const { name, value } = event.target;

    setPost((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!post.title.trim() || !post.body.trim()) {
      setError('Tiêu đề và nội dung không được để trống.');
      return;
    }

    try {
      setSaving(true);
      setError('');

      await postApi.update(id, {
        title: post.title.trim(),
        body: post.body.trim(),
        userId: Number(post.userId),
      });

      navigate(`/posts/${id}`, {
        state: {
          flash: {
            type: 'success',
            message: `Đã cập nhật bài viết #${id}.`,
          },
        },
      });
    } catch (err) {
      setError(
        err.userMessage || 'Không thể cập nhật bài viết.'
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="success" />
        <p className="mt-2">Đang tải bài viết...</p>
      </div>
    );
  }

  if (error && !post.title && !post.body) {
    return (
      <div>
        <Alert variant="danger">{error}</Alert>
        <Button
          as={Link}
          to="/posts"
          variant="outline-secondary"
        >
          Quay lại danh sách
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto" style={{ maxWidth: '800px' }}>
      <h2 className="mb-4">
        Chỉnh sửa bài viết #{id}
      </h2>

      <Card className="shadow-sm">
        <Card.Body className="p-4">
          {error && (
            <Alert
              variant="danger"
              dismissible
              onClose={() => setError('')}
            >
              {error}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Tiêu đề</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={post.title}
                onChange={handleChange}
                placeholder="Nhập tiêu đề"
                maxLength={200}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Nội dung</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                name="body"
                value={post.body}
                onChange={handleChange}
                placeholder="Nhập nội dung"
                required
              />
            </Form.Group>

            <div className="d-flex gap-2">
              <Button
                type="submit"
                variant="success"
                disabled={saving}
              >
                {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
              </Button>

              <Button
                as={Link}
                to={`/posts/${id}`}
                variant="outline-secondary"
                disabled={saving}
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
