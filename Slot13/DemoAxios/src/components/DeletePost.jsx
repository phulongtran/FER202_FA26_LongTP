import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';

const API = 'https://jsonplaceholder.typicode.com/posts';

const DeletePost = () => {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  // GET: Lấy 5 bài viết đầu tiên
  useEffect(() => {
    axios
      .get(API, { params: { _limit: 5 } })
      .then((response) => {
        setPosts(response.data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // DELETE: Xóa bài viết
  const handleDelete = (id) => {
    const confirmed = window.confirm(`Xóa bài viết #${id}?`);

    if (!confirmed) return;

    setError('');
    setMessage('');
    setDeletingId(id);

    axios
      .delete(`${API}/${id}`)
      .then((response) => {
        // Cập nhật giao diện sau khi xóa thành công
        setPosts((currentPosts) =>
          currentPosts.filter((post) => post.id !== id)
        );

        setMessage(
          `Đã xóa bài #${id} – Status: ${response.status}`
        );
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setDeletingId(null);
      });
  };

  return (
    <div className="container py-4">
      <h2 className="mb-3">DELETE – Xóa bài viết</h2>

      {message && (
        <Alert variant="success" dismissible onClose={() => setMessage('')}>
          {message}
        </Alert>
      )}

      {error && (
        <Alert variant="danger" dismissible onClose={() => setError('')}>
          Lỗi: {error}
        </Alert>
      )}

      {loading ? (
        <div className="d-flex align-items-center gap-2">
          <Spinner animation="border" size="sm" />
          <span>Đang tải bài viết...</span>
        </div>
      ) : posts.length === 0 ? (
        <Alert variant="info">Không còn bài viết nào.</Alert>
      ) : (
        <ListGroup>
          {posts.map((post) => (
            <ListGroup.Item
              key={post.id}
              className="d-flex justify-content-between align-items-center gap-3"
            >
              <div>
                <strong>#{post.id}</strong> – {post.title}
              </div>

              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDelete(post.id)}
                disabled={deletingId !== null}
              >
                {deletingId === post.id ? 'Đang xóa...' : 'Xóa'}
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default DeletePost;