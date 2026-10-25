
import { useEffect, useState } from 'react';
import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Form,
  InputGroup,
  Row,
  Spinner,
} from 'react-bootstrap';
import { Link, useOutletContext, useSearchParams } from 'react-router-dom';

import postApi, { userApi } from '../api/postApi';
import useAxios from '../hooks/useAxios';
import useDebounce from '../hooks/useDebounce';
import ConfirmModal from '../components/ConfirmModal';

const PAGE_SIZE = 10;

export default function PostsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { notify } = useOutletContext();

  const page = Math.max(1, Number(searchParams.get('page')) || 1);
  const userId = searchParams.get('userId') || '';
  const q = searchParams.get('q') || '';

  const [keyword, setKeyword] = useState(q);
  const debounced = useDebounce(keyword.trim(), 500);

  const [selectedIds, setSelectedIds] = useState([]);
  const [removed, setRemoved] = useState(0);
  const [toDelete, setToDelete] = useState(null);
  const [confirmBulk, setConfirmBulk] = useState(false);
  const [bulkDeleting, setBulkDeleting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

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

  useEffect(() => {
    if (debounced !== q) {
      changeParams({ q: debounced, page: 1 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  useEffect(() => {
    setKeyword(q);
  }, [q]);

  // Đổi trang hoặc bộ lọc thì bỏ các lựa chọn cũ.
  useEffect(() => {
    setSelectedIds([]);
    setRemoved(0);
  }, [page, userId, q]);

  const params = {
    _page: page,
    _limit: PAGE_SIZE,
  };

  if (userId) params.userId = userId;
  if (q) params.q = q;

  const {
    data: posts,
    setData: setPosts,
    headers,
    loading,
    error,
    refetch,
  } = useAxios(
    (signal) => postApi.getAll(params, signal),
    [page, userId, q],
    { initialData: [] }
  );

  const totalCount = Number(
    headers['x-total-count'] ?? posts.length
  );

  const total = Math.max(0, totalCount - removed);
  const totalPages = Math.ceil(total / PAGE_SIZE);

  const authorName = (id) =>
    users.find((user) => user.id === id)?.name ?? `User ${id}`;

  // ----- Chọn từng bài hoặc chọn tất cả bài trên trang hiện tại -----
  const allChecked =
    posts.length > 0 &&
    posts.every((post) => selectedIds.includes(post.id));

  function toggleSelect(id) {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id]
    );
  }

  function toggleAll() {
    const currentPageIds = posts.map((post) => post.id);

    setSelectedIds((prev) => {
      if (allChecked) {
        return prev.filter((id) => !currentPageIds.includes(id));
      }

      return [
        ...prev,
        ...currentPageIds.filter((id) => !prev.includes(id)),
      ];
    });
  }

  // ----- TODO 10.2: Optimistic update khi xóa một bài -----
  async function handleDeleteOne() {
    const post = toDelete;

    if (!post || deletingId !== null) return;

    setToDelete(null);
    setDeletingId(post.id);

    const backup = posts;

    // Bài viết biến mất ngay khỏi giao diện.
    setPosts((prev) =>
      prev.filter((item) => item.id !== post.id)
    );
    setSelectedIds((prev) =>
      prev.filter((id) => id !== post.id)
    );
    setRemoved((prev) => prev + 1);

    try {
      const response = await postApi.remove(post.id);

      notify(
        'success',
        `Xóa bài viết #${post.id} thành công (HTTP ${response.status})`
      );
    } catch (err) {
      // API lỗi: khôi phục danh sách và tổng số bài.
      setPosts(backup);
      setRemoved((prev) => Math.max(0, prev - 1));

      notify(
        'danger',
        `Xóa bài viết #${post.id} thất bại: ${
          err.userMessage || err.message || 'Lỗi kết nối'
        }. Đã khôi phục bài viết.`
      );
    } finally {
      setDeletingId(null);
    }
  }

  // ----- TODO 10.1: Xóa hàng loạt bằng Promise.allSettled -----
  async function handleDeleteMany() {
    const idsToDelete = [...selectedIds];

    if (idsToDelete.length === 0 || bulkDeleting) return;

    setBulkDeleting(true);

    try {
      const results = await Promise.allSettled(
        idsToDelete.map((id) => postApi.remove(id))
      );

      // Giữ nguyên thứ tự giữa idsToDelete và results.
      const okIds = idsToDelete.filter(
        (_, index) => results[index].status === 'fulfilled'
      );

      const failedIds = idsToDelete.filter(
        (_, index) => results[index].status === 'rejected'
      );

      // Chỉ xóa khỏi giao diện các bài đã xóa thành công.
      setPosts((prev) =>
        prev.filter((post) => !okIds.includes(post.id))
      );

      setRemoved((prev) => prev + okIds.length);

      // Các bài xóa thất bại vẫn được chọn.
      setSelectedIds(failedIds);

      if (okIds.length === idsToDelete.length) {
        notify(
          'success',
          `Xóa thành công ${okIds.length}/${idsToDelete.length} bài viết`
        );
      } else {
        notify(
          'warning',
          `Xóa thành công ${okIds.length}/${idsToDelete.length} bài viết. Các bài thất bại vẫn được giữ lại để thử lại.`
        );
      }
    } finally {
      setBulkDeleting(false);
      setConfirmBulk(false);
    }
  }

  return (
    <div>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div>
          <h2 className="mb-1">
            Danh sách bài viết{' '}
            <Badge bg="secondary">{total}</Badge>
          </h2>
          <p className="text-muted mb-0">
            Tìm kiếm, lọc tác giả và quản lý bài viết.
          </p>
        </div>

        <div className="d-flex flex-wrap gap-2">
          <Button
            variant="danger"
            disabled={selectedIds.length === 0 || bulkDeleting}
            onClick={() => setConfirmBulk(true)}
          >
            Xóa đã chọn ({selectedIds.length})
          </Button>

          <Button as={Link} to="/posts/new" variant="success">
            + Tạo bài viết
          </Button>
        </div>
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
          {error}{' '}
          <Button
            variant="outline-danger"
            size="sm"
            onClick={refetch}
          >
            Thử lại
          </Button>
        </Alert>
      )}

      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
        <Form.Check
          type="checkbox"
          label="Chọn tất cả bài viết trên trang này"
          checked={allChecked}
          disabled={posts.length === 0 || loading}
          onChange={toggleAll}
        />

        <span className="text-muted small">
          Đã chọn {selectedIds.length} bài viết
        </span>
      </div>

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
          <Row className="g-3">
            {posts.map((post) => (
              <Col xs={12} md={6} key={post.id}>
                <Card className="h-100 shadow-sm">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
                      <Form.Check
                        type="checkbox"
                        aria-label={`Chọn bài viết ${post.id}`}
                        checked={selectedIds.includes(post.id)}
                        onChange={() => toggleSelect(post.id)}
                      />

                      <span className="text-muted small">
                        Bài viết #{post.id}
                      </span>
                    </div>

                    <div className="text-muted small mb-2">
                      Tác giả: {authorName(post.userId)}
                    </div>

                    <Card.Title>{post.title}</Card.Title>
                    <Card.Text>{post.body}</Card.Text>

                    <div className="d-flex flex-wrap gap-2">
                      <Button
                        as={Link}
                        to={`/posts/${post.id}`}
                        variant="outline-success"
                        size="sm"
                      >
                        Xem chi tiết
                      </Button>

                      <Button
                        variant="outline-danger"
                        size="sm"
                        disabled={
                          deletingId !== null || bulkDeleting
                        }
                        onClick={() => setToDelete(post)}
                      >
                        Xóa
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mt-4">
            <span className="text-muted">
              Trang {page}
              {totalPages > 0 ? ` / ${totalPages}` : ''}
              {' · '}
              Tổng {total} bài viết
            </span>

            <div className="d-flex gap-2">
              <Button
                variant="outline-success"
                disabled={page <= 1}
                onClick={() =>
                  changeParams({ page: page - 1 })
                }
              >
                Trang trước
              </Button>

              <Button
                variant="outline-success"
                disabled={
                  totalPages === 0 || page >= totalPages
                }
                onClick={() =>
                  changeParams({ page: page + 1 })
                }
              >
                Trang sau
              </Button>
            </div>
          </div>
        </>
      ) : null}

      <ConfirmModal
        show={!!toDelete}
        title="Xóa bài viết"
        message={
          <>
            Bạn có chắc muốn xóa bài viết{' '}
            <strong>
              #{toDelete?.id} {toDelete?.title}
            </strong>
            ?
          </>
        }
        confirmText="Xóa"
        loading={deletingId !== null}
        onConfirm={handleDeleteOne}
        onCancel={() => setToDelete(null)}
      />

      <ConfirmModal
        show={confirmBulk}
        title="Xóa nhiều bài viết"
        message={
          <>
            Bạn có chắc muốn xóa {selectedIds.length} bài viết đã chọn
            {' '}(
            {selectedIds.map((id) => `#${id}`).join(', ')}
            )?
          </>
        }
        confirmText="Xóa tất cả"
        loading={bulkDeleting}
        onConfirm={handleDeleteMany}
        onCancel={() => setConfirmBulk(false)}
      />
    </div>
  );
}
