
import { useState, useEffect } from 'react';
import axios from 'axios';

const RequestConfig = () => {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWithConfig = async () => {
      try {
        const response = await axios({
          method: 'get',
          url: 'https://jsonplaceholder.typicode.com/posts',
          params: { _page: 1, _limit: 3 },
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer demo-token-123'
          },
          timeout: 5000
        });

        setInfo({
          status: response.status,
          contentType: response.headers['content-type'],
          total: response.headers['x-total-count'],
          data: response.data
        });
      } catch (err) {
        if (err.code === 'ECONNABORTED') {
          setError('Request quá thời gian (timeout)');
        } else if (err.response) {
          setError(`Server trả lỗi ${err.response.status}`);
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWithConfig();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">Error: {error}</p>;

  return (
    <div className="container my-3">
      <h2>Cấu hình request</h2>

      <p>Status: {info.status}</p>
      <p>Content-Type: {info.contentType}</p>
      <p>Tổng số bài viết: {info.total ?? 'Không có header'}</p>

      <ul>
        {info.data.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default RequestConfig;
