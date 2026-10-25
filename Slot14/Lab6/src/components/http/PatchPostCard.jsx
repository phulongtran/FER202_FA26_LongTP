
import { useEffect, useState } from 'react';
import { Alert, Button, Card, Form, Spinner } from 'react-bootstrap';
import useAxios from '../../hooks/useAxios';
import AsyncContent from '../common/AsyncContent';
import postApi from '../../api/postApi';
import ResultBox from './ResultBox';

const POST_ID = 1;

export default function PatchPostCard() {
  const {
    data: post,
    loading,
    error,
    refetch,
  } = useAxios(
    (signal) => postApi.getById(POST_ID, signal),
    [],
    { initialData: null }
  );

  const [title, setTitle] = useState('');
  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState(null);
  const [saveError, setSaveError] = useState('');

  useEffect(() => {
    if (post) {
      setTitle(post.title ?? '');
    }
  }, [post]);

  async function handlePatch(event) {
    event.preventDefault();

    if (!title.trim()) {
      setSaveError('Vui lòng nhập tiêu đề.');
      return;
    }

    setSaving(true);
    setResult(null);
    setSaveError('');

    try {
      const response = await postApi.patch(POST_ID, {
        title: title.trim(),
      });

      setResult(response);
    } catch (err) {
      setSaveError(
        err.userMessage ?? err.message ?? 'Không thể cập nhật tiêu đề.'
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <Card className="h-100 shadow-sm">
      <Card.Header>
        <strong>2.4 · GET + PATCH</strong> /posts/1
      </Card.Header>

      <Card.Body>
        <AsyncContent
          loading={loading}
          error={error}
          data={post}
          onRetry={refetch}
          emptyText="Không tìm thấy bài viết"
        >
          {() => (
            <Form onSubmit={handlePatch}>
              <Form.Group className="mb-3">
                <Form.Label>Tiêu đề mới</Form.Label>
                <Form.Control
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="Nhập tiêu đề mới"
                />
              </Form.Group>

              <Button type="submit" disabled={saving}>
                {saving ? (
                  <>
                    <Spinner size="sm" className="me-2" />
                    Đang cập nhật...
                  </>
                ) : (
                  'PATCH tiêu đề'
                )}
              </Button>
            </Form>
          )}
        </AsyncContent>

        {saveError && (
          <Alert variant="danger" className="mt-3">
            {saveError}
          </Alert>
        )}

        {result && (
          <div className="mt-3">
            <ResultBox result={result} />
          </div>
        )}
      </Card.Body>
    </Card>
  );
}
