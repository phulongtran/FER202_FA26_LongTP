
import { useEffect, useState } from 'react';
import { Alert, Button, Card, Form, Spinner } from 'react-bootstrap';

import useAxios from '../../hooks/useAxios';
import AsyncContent from '../common/AsyncContent';
import postApi from '../../api/postApi';
import ResultBox from './ResultBox';

const POST_ID = 1;

export default function UpdatePostCard() {
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

  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState(null);
  const [saveError, setSaveError] = useState('');

  useEffect(() => {
    if (post) {
      setForm({
        title: post.title ?? '',
        body: post.body ?? '',
        userId: post.userId ?? 1,
      });
    }
  }, [post]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: name === 'userId' ? Number(value) : value,
    }));
  }

  async function handleUpdate(event) {
    event.preventDefault();

    if (!form) return;

    setSaving(true);
    setResult(null);
    setSaveError('');

    try {
      const response = await postApi.update(POST_ID, {
        ...form,
        id: POST_ID,
        userId: Number(form.userId),
      });

      setResult(response);
    } catch (err) {
      setSaveError(err.userMessage ?? err.message ?? 'Không thể cập nhật bài viết.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <Card className="h-100 shadow-sm">
      <Card.Header>
        <strong>2.3 · GET + PUT</strong> /posts/1
      </Card.Header>

      <Card.Body>
        <AsyncContent
          loading={loading}
          error={error}
          data={form}
          onRetry={refetch}
          emptyText="Không tìm thấy bài viết"
        >
          {(values) => (
            <Form onSubmit={handleUpdate}>
              <Form.Group className="mb-3">
                <Form.Label>Tiêu đề</Form.Label>
                <Form.Control
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Nội dung</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="body"
                  value={values.body}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>User ID</Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  name="userId"
                  value={values.userId}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button type="submit" variant="success" disabled={saving}>
                {saving ? (
                  <>
                    <Spinner size="sm" className="me-2" />
                    Đang cập nhật...
                  </>
                ) : (
                  'Cập nhật bài viết'
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
