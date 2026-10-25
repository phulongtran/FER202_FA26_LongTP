
import { useState } from 'react';
import {
  Card,
  ListGroup,
  Button,
  Toast,
  ToastContainer,
} from 'react-bootstrap';
import useAxios from '../../hooks/useAxios';
import AsyncContent from '../common/AsyncContent';
import postApi from '../../api/postApi';
import ConfirmModal from '../ConfirmModal';

export default function DeletePostCard() {
  const {
    data: posts,
    setData: setPosts,
    loading,
    error,
    refetch,
  } = useAxios(
    (signal) => postApi.getAll({ _limit: 5 }, signal),
    [],
    { initialData: [] }
  );

  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState(null);

  const handleDelete = async () => {
    if (!toDelete) return;

    setDeleting(true);

    try {
      const res = await postApi.remove(toDelete.id);

      setPosts((prev) =>
        prev.filter((post) => post.id !== toDelete.id)
      );

      setToast({
        bg: 'success',
        message: `DELETE /posts/${toDelete.id} → ${res.status}`,
      });

      setToDelete(null);
    } catch (err) {
      setToast({
        bg: 'danger',
        message: `Xóa thất bại: ${
          err.userMessage || err.message
        }`,
      });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Card className="h-100 shadow-sm">
      <Card.Header>
        <strong>2.5 · DELETE</strong> /posts/:id
      </Card.Header>

      <Card.Body>
        <AsyncContent
          loading={loading}
          error={error}
          data={posts}
          onRetry={refetch}
          emptyText="Đã xóa hết bài viết"
        >
          {(items) => (
            <ListGroup variant="flush">
              {items.map((post) => (
                <ListGroup.Item
                  key={post.id}
                  className="d-flex justify-content-between align-items-center gap-2"
                >
                  <span>
                    #{post.id} – {post.title}
                  </span>

                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => setToDelete(post)}
                  >
                    Xóa
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </AsyncContent>
      </Card.Body>

      <ConfirmModal
        show={!!toDelete}
        title="Xóa bài viết"
        message={`Bạn có chắc muốn xóa bài viết #${toDelete?.id}?`}
        confirmText="Xóa"
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setToDelete(null)}
      />

      <ToastContainer
        position="bottom-end"
        className="p-3 position-fixed"
      >
        <Toast
          show={!!toast}
          bg={toast?.bg}
          onClose={() => setToast(null)}
          delay={3500}
          autohide
        >
          <Toast.Body className="text-white">
            {toast?.message}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </Card>
  );
}
