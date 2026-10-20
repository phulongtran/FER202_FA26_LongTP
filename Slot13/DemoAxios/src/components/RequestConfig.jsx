import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import Badge from 'react-bootstrap/Badge';
import Spinner from 'react-bootstrap/Spinner';
import ListGroup from 'react-bootstrap/ListGroup';

const RequestConfig = () => {
  const [info, setInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios({
      method: 'get',
      url: 'https://jsonplaceholder.typicode.com/posts',
      params: {
        _page: 1,
        _limit: 3,
      },
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer demo-token-123',
      },
      timeout: 5000,
    })
      .then((response) => {
        setInfo({
          status: response.status,
          contentType: response.headers['content-type'],
          total: response.headers['x-total-count'],
          data: response.data,
        });
      })
      .catch((err) => {
        if (err.code === 'ECONNABORTED' || err.code === 'ETIMEDOUT') {
          setError('Request quá thời gian (timeout)');
        } else if (err.response) {
          setError(`Server trả lỗi ${err.response.status}`);
        } else {
          setError(`Lỗi mạng hoặc kết nối: ${err.message}`);
        }
      });
  }, []);

  return (
    <div className="container py-4">
      <Card className="shadow-sm">
        <Card.Body>
          <Card.Title className="mb-3">
            Cấu hình request – Axios
          </Card.Title>

          {error && <Alert variant="danger">Error: {error}</Alert>}

          {!error && !info && (
            <div className="d-flex align-items-center gap-2">
              <Spinner animation="border" size="sm" />
              <span>Loading...</span>
            </div>
          )}

          {info && (
            <>
              <p>
                **Status:** <Badge bg="success">{info.status}</Badge>
              </p>

              <p>
                <strong>Content-Type:</strong>{' '}
                {info.contentType || 'Không có header này'}
              </p>

              <p>
                <strong>Tổng số bài viết (x-total-count):</strong>{' '}
                {info.total ?? 'Header không được trả về'}
              </p>

              <h5 className="mt-4">Dữ liệu trả về</h5>

              <ListGroup>
                {info.data.map((post) => (
                  <ListGroup.Item key={post.id}>
                    <strong>#{post.id}</strong> – {post.title}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default RequestConfig;