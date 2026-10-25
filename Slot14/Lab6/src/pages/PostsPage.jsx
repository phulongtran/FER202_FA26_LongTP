
import { useEffect, useState } from 'react';
import { Alert, Button, Card, Form, Spinner } from 'react-bootstrap';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';

import postApi, { userApi } from '../api/postApi';

const PAGE_SIZE = 10;

export default function PostsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Math.max(1, Number(searchParams.get('page')) || 1);
  const userId = searchParams.get('userId') || '';

  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Lấy danh sách tác giả
  useEffect(() => {
    const controller = new AbortController();

    userApi.getAll(controller.signal)
      .then((res) => setUsers(res.data))
      .catch((err) => {
        if (!axios.isCancel(err)) {
          console.error('Không thể tải danh sách tác giả:', err);
        }
      });

    return () => controller.abort();
  }, []);

  // Lấy bài viết theo trang và tác giả
  useEffect(() => {
    const controller = new AbortController();

    async function loadPosts() {
      setLoading(true);
      setError('');

      try {
        const params = {
          _page: page,
          _limit: PAGE_SIZE,
        };

        if (userId) {
          params.userId = userId;
        }

        const res = await postApi.getAll(params, controller.signal);

        setPosts(res.data);
        setTotalCount(Number(res.headers['x-total-count']) || 0);
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError(err.userMessage || err.message || 'Không thể tải bài viết.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadPosts();

    return () => controller.abort();
  }, [page, userId]);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  function changeParams(nextValues) {
    const nextParams = new URLSearchParams(searchParams);

    Object.entries(nextValues).forEach(([key, value]) => {
      if (value === '' || value == null) {
        nextParams.delete(key);
      } else {
        nextParams.set(key, String(value));
      }
    });

    setSearchParams(nextParams);
  }

  return (
    <div>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <h2 className="mb-1">Danh sách bài viết</h2>
          <p className="text-muted mb-0">
            Lọc bài viết theo tác giả và điều hướng bằng phân trang.
          </p>
        </div>

        <Button as={Link} to="/posts/new" variant="success">
          + Tạo bài viết
        </Button>
      </div>

      <Card className="mb-4">
        <Card.Body>
          <Form.Group>
            <Form.Label>Lọc theo tác giả</Form.Label>

            <Form.Select
              value={userId}
              onChange={(event) =>
                changeParams({
                  userId: event.target.value,
                  page: 1,
                })
              }
            >
              <option value="">Tất cả tác giả</option>

              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Card.Body>
      </Card>

      {error && <Alert variant="danger">{error}</Alert>}

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="success" />
          <p className="mt-2">Đang tải bài viết...</p>
        </div>
      ) : !error && posts.length === 0 ? (
        <Alert variant="info">Không tìm thấy bài viết nào.</Alert>
      ) : !error ? (
        <>
          <div className="row g-3">
            {posts.map((post) => (
              <div className="col-12 col-md-6" key={post.id}>
                <Card className="h-100 shadow-sm">
                  <Card.Body>
                    <div className="text-muted small mb-2">
                      Bài viết #{post.id} · Tác giả #{post.userId}
                    </div>

                    <Card.Title>{post.title}</Card.Title>

                    <Card.Text>
                      {post.body}
                    </Card.Text>

                    <Button
                      as={Link}
                      to={`/posts/${post.id}`}
                      variant="outline-success"
                      size="sm"
                    >
                      Xem chi tiết
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>

          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mt-4">
            <span className="text-muted">
              Trang {page}{totalPages > 0 ? ` / ${totalPages}` : ''}
              {' · '}
              Tổng {totalCount} bài viết
            </span>

            <div className="d-flex gap-2">
              <Button
                variant="outline-success"
                disabled={page <= 1}
                onClick={() => changeParams({ page: page - 1 })}
              >
                Trang trước
              </Button>

              <Button
                variant="outline-success"
                disabled={totalPages === 0 || page >= totalPages}
                onClick={() => changeParams({ page: page + 1 })}
              >
                Trang sau
              </Button>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
