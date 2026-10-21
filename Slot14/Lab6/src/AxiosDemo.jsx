
import { useState, useEffect } from 'react';
import axios from 'axios';
import postApi from './api/postApi';

const AxiosDemo = () => {
  const [postId, setPostId] = useState(1);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Tạo controller mới cho mỗi request
    const controller = new AbortController();

    const fetchPost = async () => {
      setLoading(true);
      setError(null);

      try {
        // Gọi API thông qua service, truyền signal để có thể hủy
        const res = await postApi.getById(
          postId,
          controller.signal
        );

        setData(res.data);
      } catch (err) {
        // Request bị hủy thì bỏ qua, không hiển thị lỗi
        if (axios.isCancel(err)) return;

        setData(null);
        setError(err.userMessage ?? err.message);
      } finally {
        // Không tắt loading nếu request này đã bị hủy
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchPost();

    // Hủy request cũ khi postId đổi hoặc component unmount
    return () => controller.abort();
  }, [postId]);

  const handlePostIdChange = (e) => {
    const value = Number(e.target.value);

    if (value >= 1 && value <= 100) {
      setPostId(value);
    }
  };

  return (
    <div className="container my-4">
      <h1>Axios Demo</h1>

      <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
        <label htmlFor="postId" className="form-label mb-0">
          Post ID (1–100):
        </label>

        <input
          id="postId"
          className="form-control"
          style={{ width: '120px' }}
          type="number"
          min={1}
          max={100}
          value={postId}
          onChange={handlePostIdChange}
        />

        <button
          className="btn btn-outline-success"
          disabled={postId <= 1}
          onClick={() =>
            setPostId((id) => Math.max(1, id - 1))
          }
        >
          ‹ Trước
        </button>

        <button
          className="btn btn-success"
          disabled={postId >= 100}
          onClick={() =>
            setPostId((id) => Math.min(100, id + 1))
          }
        >
          Sau ›
        </button>
      </div>

      {loading && (
        <div className="alert alert-info">
          Đang tải bài viết #{postId}...
        </div>
      )}

      {!loading && error && (
        <div className="alert alert-danger">
          Error: {error}
        </div>
      )}

      {!loading && data && (
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">
              #{data.id} – {data.title}
            </h2>

            <p className="card-text">{data.body}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AxiosDemo;
