
import { useState } from 'react';
import axios from 'axios';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitting(true);
    setError(null);
    setResult(null);

    axios
      .post('https://jsonplaceholder.typicode.com/posts', {
        title: title,
        body: body,
        userId: 1,
      })
      .then((response) => {
        setResult({
          status: response.status,
          data: response.data,
        });

        setTitle('');
        setBody('');
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-success text-white">
        POST – Tạo bài viết
      </div>

      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>

            <input
              id="title"
              type="text"
              className="form-control"
              placeholder="Nhập tiêu đề bài viết"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="body" className="form-label">
              Body
            </label>

            <textarea
              id="body"
              className="form-control"
              rows="4"
              placeholder="Nhập nội dung bài viết"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-success"
            disabled={submitting}
          >
            {submitting ? 'Đang gửi...' : 'Tạo bài viết'}
          </button>
        </form>

        {error && (
          <div className="alert alert-danger mt-3" role="alert">
            Error: {error}
          </div>
        )}

        {result && (
          <div className="mt-4">
            <div className="alert alert-success">
              Tạo bài viết thành công! Status: {result.status}
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

export default CreatePost;
