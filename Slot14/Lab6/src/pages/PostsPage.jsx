
import { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  InputGroup,
  Row,
  Spinner,
} from 'react-bootstrap';
import { useSearchParams, Link } from 'react-router-dom';

import postApi, { userApi } from '../api/postApi';
import useAxios from '../hooks/useAxios';
import useDebounce from '../hooks/useDebounce';

const PAGE_SIZE = 10;

export default function PostsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Math.max(1, Number(searchParams.get('page')) || 1);
  const userId = searchParams.get('userId') || '';
  const q = searchParams.get('q') || '';

  const [keyword, setKeyword] = useState(q);
  const debounced = useDebounce(keyword.trim(), 500);

  const { data: users } = useAxios(
    (signal) => userApi.getAll(signal),
    [],
    { initialData: [] }
  );

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

  // Đồng bộ từ khóa đã debounce lên URL và đưa trang về 1.
  useEffect(() => {
    if (debounced !== q) {
      changeParams({ q: debounced, page: 1 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  // Nếu URL thay đổi từ bên ngoài, đồng bộ lại ô tìm kiếm.
  useEffect(() => {
    setKeyword(q);
  }, [q]);

  const params = { _page: page, _limit: PAGE_SIZE };

  if (userId) params.userId = userId;
  if (q) params.q = q;

  const {
    data: posts,
    headers,
    loading,
    error,
    refetch,
  } = useAxios(
    (signal) => postApi.getAll(params, signal),
    [page, userId, q],
    { initialData: [] }
  );

  const totalCount = Number(headers['x-total-count'] ?? 0);
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <div>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <h2 className="mb-1">Danh sách bài viết</h2>
          <p className="text-muted mb-0">
            Tìm kiếm, lọc theo tác giả và điều hướng bằng phân trang.
          </p>
        </div>

        <Button as={Link} to="/posts/new" variant="success">
          + Tạo bài viết
        </Button>
      </div>

      <Card className="mb-4">
        <Card.Body>
          <Row className="g-3">
            <Col md={6}>
              <Form.Label>Tìm kiếm bài viết</Form.Label>
              <InputGroup>
                <InputGroup.Text>🔍</InputGroup.Text>
                <Form.Control
                  placeholder="Tìm bài viết..."
                  value={keyword}
                  onChange={(event) => setKeyword(event.target.value)}
                />
                {keyword && (
                  <Button
                    variant="outline-secondary"
                    onClick={() => setKeyword('')}
                  >
                    ✕
                  </Button>
                )}
              </InputGroup>
              <Form.Text className="text-muted">
                Tìm kiếm sau khi bạn ngừng gõ 500ms.
              </Form.Text>
            </Col>

            <Col md={6}>
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
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {error && (
        <Alert variant="danger">
          {error}
          <Button
            variant="outline-danger"
            size="sm"
            className="ms-3"
            onClick={refetch}
          >
            Thử lại
          </Button>
        </Alert>
      )}

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="success" />
          <p className="mt-2">Đang tải bài viết...</p>
        </div>
      ) : !error && posts.length === 0 ? (
        <Alert variant="info">
          {q
            ? 'Không có bài viết phù hợp với từ khóa.'
            : 'Không tìm thấy bài viết nào.'}
        </Alert>
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
                    <Card.Text>{post.body}</Card.Text>

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
              Trang {page}
              {totalPages > 0 ? ` / ${totalPages}` : ''}
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
