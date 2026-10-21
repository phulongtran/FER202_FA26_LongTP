
import { useState, useEffect } from 'react';
import axiosClient from './api/axiosClient';

const RequestConfig = () => {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWithConfig = async () => {
      try {
        const res = await axiosClient({
          method: 'get',
          url: '/posts',
          params: { _page: 1, _limit: 3 },
          headers: {
            Accept: 'application/json',
            'X-Client': 'FER202'
          },
          timeout: 5000
        });

        setInfo({
          status: res.status,
          duration: res.duration,
          contentType: res.headers['content-type'],
          total: res.headers['x-total-count'],
          data: res.data
        });
      } catch (err) {
        setError(err.userMessage || err.message);
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

      <p>Status: {info.status} · {info.duration} ms</p>
      <p>Content-Type: {info.contentType}</p>
      <p>
        Tổng số bài viết (x-total-count):{' '}
        {info.total ?? 'Không có header'}
      </p>

      <ul>
        {info.data.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default RequestConfig;
