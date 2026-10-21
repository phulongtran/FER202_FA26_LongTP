
import { useState, useEffect } from 'react';
import postApi from './api/postApi';

const DeletePost = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await postApi.getAll({ _limit: 5 });
        setPosts(response.data);
      } catch (err) {
        setError(err.userMessage || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm(`Xóa bài viết #${id}?`)) return;

    setDeletingId(id);
    setError(null);
    setMessage('');

    try {
      const response = await postApi.remove(id);

      setPosts((prev) => prev.filter((p) => p.id !== id));
      setMessage(`Đã xóa bài #${id} – Status: ${response.status}`);
    } catch (err) {
      setError(err.userMessage || err.message);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error && posts.length === 0) {
    return <p className="text-danger">Error: {error}</p>;
  }

  return (
    <div className="container my-3">
      <h2>DELETE – Xóa bài viết</h2>

      {message && <p className="text-success">{message}</p>}
      {error && <p className="text-danger">Error: {error}</p>}

      <ul>
        {posts.map((post) => (
          <li key={post.id} className="mb-2">
            #{post.id} – {post.title}{' '}
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleDelete(post.id)}
              disabled={deletingId === post.id}
            >
              {deletingId === post.id ? 'Đang xóa...' : 'Xóa'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeletePost;
