 
import { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Card,
  Form,
  Spinner,
  ListGroup,
} from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import postApi from '../api/postApi';

export default function PostDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [title, setTitle] = useState('');

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadData() {
      setLoading(true);
      setError('');
      setPost(null);
      setComments([]);

      try {
        const postResponse = await postApi.getById(
          id,
          controller.signal
        );

        setPost(postResponse.data);
        setTitle(postResponse.data.title);

        const commentsResponse = await postApi.getComments(
          id,
          controller.signal
        );

        setComments(commentsResponse.data);
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError(
            err.userMessage ||
              'Không thể tải bài viết hoặc bình luận.'
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => controller.abort();
  }, [id]);

  async function handlePatch(event) {
    event.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Tiêu đề không được để trống.');
      return;
    }

    try {
      setSaving(true);

      const response = await postApi.patch(id, {
        title: title.trim(),
      });

      setPost((current) => ({
        ...current,
        ...response.data,
        title: title.trim(),
      }));

      setTitle(title.trim());
    } catch (err) {
      setError(
        err.userMessage || 'Không thể cập nhật tiêu đề.'
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      `Bạn có chắc muốn xóa bài viết #${id} không?`
    );

    if (!confirmed) return;

    setError('');

    try {
      setDeleting(true);

      await postApi.remove(id);

      navigate('/posts', {
        state: {
          flash: {
            type: 'success',
            message: `Đã xóa bài viết #${id}.`,
          },
        },
      });
    } catch (err) {
      setError(
        err.userMessage || 'Không thể xóa bài viết.'
      );
    } finally {
      setDeleting(false);
    }
  }

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="success" />
        <p className="mt-2">Đang tải dữ liệu...</p>
      </div>
    );
  }

  if (error && !post) {
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

  if (!post) {
    return (
      <Alert variant="warning">
        Không tìm thấy bài viết.
      </Alert>
    );
  }

  return (
    <div className="mx-auto" style={{ maxWidth: '900px' }}>
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
        <h2 className="mb-0">
          Chi tiết bài viết #{post.id}
        </h2>

        <div className="d-flex gap-2">
          <Button
            as={Link}
            to={`/posts/${id}/edit`}
            variant="outline-success"
          >
            Sửa bài viết
          </Button>

          <Button
            variant="danger"
            onClick={handleDelete}
            disabled={deleting || saving}
          >
            {deleting ? 'Đang xóa...' : 'Xóa bài viết'}
          </Button>
        </div>
      </div>

      {error && (
        <Alert
          variant="danger"
          dismissible
          onClose={() => setError('')}
        >
          {error}
        </Alert>
      )}

      <Card className="shadow-sm mb-4">
        <Card.Body className="p-4">
          <div className="text-muted small mb-2">
            Tác giả #{post.userId}
          </div>

          <h4>{post.title}</h4>

          <p
            className="mb-0"
            style={{ whiteSpace: 'pre-wrap' }}
          >
            {post.body}
          </p>
        </Card.Body>
      </Card>

      <Card className="shadow-sm mb-4">
        <Card.Header>
          <strong>PATCH · Sửa nhanh tiêu đề</strong>
        </Card.Header>

        <Card.Body>
          <Form onSubmit={handlePatch}>
            <Form.Group className="mb-3">
              <Form.Label>Tiêu đề mới</Form.Label>

              <Form.Control
                value={title}
                onChange={(event) =>
                  setTitle(event.target.value)
                }
                maxLength={200}
                required
              />
            </Form.Group>

            <Button
              type="submit"
              variant="success"
              disabled={saving || deleting}
            >
              {saving
                ? 'Đang cập nhật...'
                : 'Cập nhật tiêu đề'}
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <Card className="shadow-sm">
        <Card.Header>
          <strong>
            Bình luận ({comments.length})
          </strong>
        </Card.Header>

        {comments.length > 0 ? (
          <ListGroup variant="flush">
            {comments.map((comment) => (
              <ListGroup.Item
                key={comment.id}
                className="py-3"
              >
                <div className="fw-semibold">
                  {comment.name}
                </div>

                <div className="small text-muted mb-2">
                  {comment.email}
                </div>

                <p className="mb-0">
                  {comment.body}
                </p>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <Card.Body>
            Không có bình luận hoặc chưa tải được bình luận.
          </Card.Body>
        )}
      </Card>

      <div className="mt-4">
        <Button
          as={Link}
          to="/posts"
          variant="outline-secondary"
        >
          Quay lại danh sách
        </Button>
      </div>
    </div>
  );
}
