
import { useState, useEffect } from 'react';
import postApi from './api/postApi';

const POST_ID = 1;

const UpdatePost = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await postApi.getById(POST_ID);
        setPost(response.data);
      } catch (err) {
        setError(err.userMessage || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, []);

  const handleUpdate = async () => {
    setSaving(true);
    setError(null);
    setResult(null);

    try {
      const response = await postApi.update(POST_ID, {
        id: post.id,
        userId: post.userId,
        title: post.title,
        body: post.body
      });

      setResult({
        status: response.status,
        data: response.data
      });
    } catch (err) {
      setError(err.userMessage || err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error && !post) {
    return <p className="text-danger">Error: {error}</p>;
  }
  if (!post) return null;

  return (
    <div className="container my-3">
      <h2>PUT – Cập nhật bài viết #{post.id}</h2>

      <input
        className="form-control mb-2"
        value={post.title}
        onChange={(e) =>
          setPost({ ...post, title: e.target.value })
        }
      />

      <textarea
        className="form-control mb-2"
        value={post.body}
        onChange={(e) =>
          setPost({ ...post, body: e.target.value })
        }
      />

      <button
        className="btn btn-primary"
        onClick={handleUpdate}
        disabled={saving}
      >
        {saving ? 'Đang lưu...' : 'Cập nhật (PUT)'}
      </button>

      {error && <p className="text-danger mt-2">Error: {error}</p>}

      {result && (
        <div className="mt-3">
          <p>Status: {result.status}</p>
          <pre>{JSON.stringify(result.data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default UpdatePost;
