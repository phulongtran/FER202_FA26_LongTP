
import { useState } from 'react';
import axios from 'axios';

const PatchPost = () => {
  const [title, setTitle] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const handlePatch = async () => {
    setSaving(true);
    setError(null);
    setResult(null);

    try {
      const response = await axios.patch(
        'https://jsonplaceholder.typicode.com/posts/1',
        { title }
      );

      setResult({
        status: response.status,
        data: response.data
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container my-3">
      <h2>PATCH – Sửa tiêu đề bài viết #1</h2>

      <input
        className="form-control mb-2"
        placeholder="Tiêu đề mới"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button
        className="btn btn-warning"
        onClick={handlePatch}
        disabled={!title.trim() || saving}
      >
        {saving ? 'Đang lưu...' : 'Cập nhật (PATCH)'}
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

export default PatchPost;
