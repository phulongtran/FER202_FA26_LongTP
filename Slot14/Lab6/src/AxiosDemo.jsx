
import { useState, useEffect } from 'react';
import postApi from './api/postApi';

const AxiosDemo = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await postApi.getById(1);
        setData(res.data);
      } catch (err) {
        setError(err.userMessage || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container my-3">
      <h2>Axios Demo</h2>
      <h3>{data.title}</h3>
      <p>{data.body}</p>
    </div>
  );
};

export default AxiosDemo;
