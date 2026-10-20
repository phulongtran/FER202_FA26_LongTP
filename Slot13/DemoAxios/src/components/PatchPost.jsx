
import { useState } from 'react';
import axios from 'axios';

const URL = 'https://jsonplaceholder.typicode.com/posts/1';

const PatchPost = () => {
  const [title, setTitle] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handlePatch = () => {
    if (!title.trim() || submitting) return;

    setSubmitting(true);
    setError(null);
    setResult(null);

    axios
      .patch(URL, { title: title.trim() })
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
        setSubmitting(false);
      });
  };

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-success text-white">
        PATCH – Sửa tiêu đề bài viết #1
      </div>

      <div className="card-body">
        <div className="mb-3">
          <label htmlFor="patch-title" className="form-label">
            Tiêu đề mới
          </label>

          <input
            id="patch-title"
            type="text"
            className="form-control"
            placeholder="Nhập tiêu đề mới"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <button
          type="button"
          className="btn btn-success"
          onClick={handlePatch}
          disabled={!title.trim() || submitting}
        >
          {submitting ? 'Đang cập nhật...' : 'Cập nhật (PATCH)'}
        </button>

        {error && (
          <div className="alert alert-danger mt-3" role="alert">
            Error: {error}
          </div>
        )}

        {result && (
          <div className="mt-4">
            <div className="alert alert-success">
              PATCH thành công! Status: {result.status}
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

export default PatchPost;
