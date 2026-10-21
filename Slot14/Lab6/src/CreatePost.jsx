
import { useState } from 'react';
import postApi from './api/postApi';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setResult(null);

    try {
      const response = await postApi.create({
        title,
        body,
        userId: 1
      });

      setResult({
        status: response.status,
        data: response.data
      });

      setTitle('');
      setBody('');
    } catch (err) {
      setError(err.userMessage || err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container my-3">
      <h2>POST – Tạo bài viết</h2>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          className="form-control mb-2"
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />

        <button
          className="btn btn-success"
          type="submit"
          disabled={submitting}
        >
          {submitting ? 'Đang gửi...' : 'Tạo bài viết'}
        </button>
      </form>

      {error && (
        <p className="text-danger mt-2">Error: {error}</p>
      )}

      {result && (
        <div className="mt-3">
          <p>Status: {result.status}</p>
          <pre>{JSON.stringify(result.data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default CreatePost;
