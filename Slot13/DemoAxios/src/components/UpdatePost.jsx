
import { useState, useEffect } from 'react';
import axios from 'axios';

const URL = 'https://jsonplaceholder.typicode.com/posts/1';

const UpdatePost = () => {
  const [post, setPost] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // 1. GET dữ liệu bài viết khi component được mount
  useEffect(() => {
    axios
      .get(URL)
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // 2. PUT toàn bộ object bài viết
  const handleUpdate = () => {
    if (!post || updating) return;

    setUpdating(true);
    setError(null);
    setResult(null);

    axios
      .put(URL, {
        id: post.id,
        userId: post.userId,
        title: post.title,
        body: post.body,
      })
      .then((response) => {
        setResult({
          status: response.status,
          data: response.data,
        });
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setUpdating(false);
      });
  };

  if (loading) {
    return <div className="alert alert-info">Loading...</div>;
  }

  if (error && !post) {
    return (
      <div className="alert alert-danger">
        Error: {error}
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-success text-white">
        PUT – Cập nhật bài viết #{post.id}
      </div>

      <div className="card-body">
        {error && (
          <div className="alert alert-danger" role="alert">
            Error: {error}
          </div>
        )}

        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            value={post.title}
            onChange={(e) =>
              setPost({ ...post, title: e.target.value })
            }
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Body</label>
          <textarea
            className="form-control"
            rows="4"
            value={post.body}
            onChange={(e) =>
              setPost({ ...post, body: e.target.value })
            }
            required
          />
        </div>

        <button
          type="button"
          className="btn btn-success"
          onClick={handleUpdate}
          disabled={updating}
        >
          {updating ? 'Đang cập nhật...' : 'Cập nhật (PUT)'}
        </button>

        {result && (
          <div className="mt-4">
            <div className="alert alert-success">
              Cập nhật thành công! Status: {result.status}
            </div>

            <h5>Dữ liệu server trả về:</h5>

            <pre className="bg-light border rounded p-3 text-wrap">
              {JSON.stringify(result.data, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdatePost;
