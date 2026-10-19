
import { useState, useEffect } from 'react';
import axios from 'axios';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts', {
        params: {
          userId: 1,
          _limit: 5,
        },
      })
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="alert alert-info">Loading...</div>;
  }

  if (error) {
    return (
      <div className="alert alert-danger">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-success text-white">
        GET – Danh sách bài viết của user 1
      </div>

      <div className="card-body">
        <ul className="list-group">
          {posts.map((post) => (
            <li className="list-group-item" key={post.id}>
              <strong>#{post.id}</strong> – {post.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PostList;
