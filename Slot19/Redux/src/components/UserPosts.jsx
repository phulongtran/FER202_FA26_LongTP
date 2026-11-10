
import { useSelector } from 'react-redux';
import {
  Card,
  Spinner,
  Alert,
} from 'react-bootstrap';

export default function UserPosts() {
  const {
    selectedId,
    posts,
    postsLoading,
    postsError,
    items,
  } = useSelector((state) => state.users);

  // Tìm User đang được chọn
  const user = items.find(
    (u) => u.id === selectedId
  );

  // Chưa chọn User
  if (!selectedId) {
    return (
      <p className="text-muted">
        ← Chọn một User để xem bài viết
      </p>
    );
  }

  // Đang tải Posts
  if (postsLoading) {
    return (
      <div className="text-center p-3">
        <Spinner animation="border" size="sm" />
        <p className="mt-2">Đang tải bài viết...</p>
      </div>
    );
  }

  // Có lỗi khi tải Posts
  if (postsError) {
    return (
      <Alert variant="danger">
        {postsError}
      </Alert>
    );
  }

  return (
    <>
      <h5 className="mb-3">
        Bài viết của {user?.name} ({posts.length})
      </h5>

      {posts.map((post) => (
        <Card key={post.id} className="mb-2">
          <Card.Body>
            <Card.Title className="fs-6 text-capitalize">
              {post.title}
            </Card.Title>

            <Card.Text className="small text-muted">
              {post.body}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </>
  );
}
