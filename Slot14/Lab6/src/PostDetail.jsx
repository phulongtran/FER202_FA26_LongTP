
import { useState, useEffect } from 'react';
import postApi, { userApi } from './api/postApi';

// Đo thời gian gọi API tuần tự và song song
const measure = async (id) => {
  // 1. Gọi tuần tự
  let t0 = performance.now();

  const { data: post1 } = await postApi.getById(id);
  await userApi.getById(post1.userId);
  await postApi.getComments(id);

  const sequential = Math.round(performance.now() - t0);

  // 2. Gọi song song sau khi đã có bài viết
  t0 = performance.now();

  const { data: post2 } = await postApi.getById(id);

  await Promise.all([
    userApi.getById(post2.userId),
    postApi.getComments(id)
  ]);

  const parallel = Math.round(performance.now() - t0);

  return { sequential, parallel };
};

const PostDetail = ({ postId = 1 }) => {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timing, setTiming] = useState(null);
  const [measuring, setMeasuring] = useState(false);
  const [measureError, setMeasureError] = useState(null);

  useEffect(() => {
    const loadDetail = async () => {
      setLoading(true);
      setError(null);
      setDetail(null);

      try {
        // Bước 1: phải lấy bài viết trước để biết userId
        const { data: post } = await postApi.getById(postId);

        // Bước 2: lấy tác giả và bình luận song song
        const [userResult, commentsResult] =
          await Promise.allSettled([
            userApi.getById(post.userId),
            postApi.getComments(postId)
          ]);

        const author =
          userResult.status === 'fulfilled'
            ? userResult.value.data
            : null;

        const comments =
          commentsResult.status === 'fulfilled'
            ? commentsResult.value.data
            : [];

        const warning =
          userResult.status === 'rejected' ||
          commentsResult.status === 'rejected'
            ? 'Một số thông tin phụ (tác giả / bình luận) không tải được.'
            : null;

        setDetail({
          post,
          author,
          comments,
          warning
        });
      } catch (err) {
        // Lỗi khi lấy bài viết chính
        setError(err.userMessage || err.message);
      } finally {
        setLoading(false);
      }
    };

    loadDetail();
  }, [postId]);

  const handleMeasure = async () => {
    setMeasuring(true);
    setMeasureError(null);

    try {
      const result = await measure(postId);
      setTiming(result);
    } catch (err) {
      setMeasureError(err.userMessage || err.message);
    } finally {
      setMeasuring(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  if (error) {
    return <p className="text-danger">Error: {error}</p>;
  }

  if (!detail) return null;

  const { post, author, comments, warning } = detail;

  return (
    <div className="container my-4">
      <h2>Post Detail</h2>

      {warning && (
        <div className="alert alert-warning">
          ⚠️ {warning}
        </div>
      )}

      <h3>{post.title}</h3>

      <p>
        Tác giả:{' '}
        <strong>
          {author?.name ?? `User ${post.userId}`}
        </strong>
        {author && ` (${author.email})`}
      </p>

      <p>{post.body}</p>

      <button
        className="btn btn-success"
        onClick={handleMeasure}
        disabled={measuring}
      >
        {measuring ? 'Đang đo...' : 'Đo thời gian'}
      </button>

      {measureError && (
        <p className="text-danger mt-2">
          Error: {measureError}
        </p>
      )}

      {timing && (
        <div className="alert alert-info mt-3">
          <p className="mb-1">
            Tuần tự: <strong>{timing.sequential} ms</strong>
          </p>
          <p className="mb-1">
            Song song: <strong>{timing.parallel} ms</strong>
          </p>
          <p className="mb-0">
            Chênh lệch:{' '}
            <strong>
              {timing.sequential - timing.parallel} ms
            </strong>
          </p>
        </div>
      )}

      <h4 className="mt-4">
        Bình luận ({comments.length})
      </h4>

      {comments.length === 0 ? (
        <p>Chưa có bình luận hoặc không tải được bình luận.</p>
      ) : (
        <ul className="list-group">
          {comments.map((comment) => (
            <li className="list-group-item" key={comment.id}>
              <strong>{comment.name}</strong>
              <p className="mb-0">{comment.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PostDetail;
