
import { useState, useEffect } from 'react';
import axios from 'axios';

const AxiosDemo = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts/1')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-success text-white">
        Axios Demo
      </div>

      <div className="card-body">
        {data ? (
          <>
            <h2 className="h4">{data.title}</h2>
            <p className="mb-0">{data.body}</p>
          </>
        ) : (
          <p className="text-muted mb-0">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default AxiosDemo;
