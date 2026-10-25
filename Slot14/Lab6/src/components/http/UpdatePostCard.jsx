
import { useState, useEffect } from "react";
import { Card, Form, Button, Spinner, Alert } from "react-bootstrap";
import useAxios from "../../hooks/useAxios";
import AsyncContent from "../common/AsyncContent";
import postApi from "../../api/postApi";
import ResultBox from "./ResultBox";

const POST_ID = 1;

export default function UpdatePostCard() {
  const { data, loading, error, refetch } = useAxios(
    (signal) => postApi.getById(POST_ID, signal),
    []
  );

  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState(null);
  const [saveError, setSaveError] = useState(null);

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    setSaving(true);
    setResult(null);
    setSaveError(null);

    try {
      const response = await postApi.update(POST_ID, {
        ...form,
        id: POST_ID,
        userId: Number(form.userId),
      });

      setResult(response);
    } catch (err) {
      setSaveError(err.userMessage ?? err.message);
    } finally {
      setSaving(false);
    }
  };

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
          {(post) => (
            <Form onSubmit={handleUpdate}>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  name="title"
                  value={post.title ?? ""}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Body</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="body"
                  value={post.body ?? ""}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>User ID</Form.Label>
                <Form.Control
                  type="number"
                  name="userId"
                  min="1"
                  value={post.userId ?? ""}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button type="submit" disabled={saving}>
                {saving ? (
                  <>
                    <Spinner size="sm" className="me-2" />
                    Đang cập nhật...
                  </>
                ) : (
                  "Cập nhật (PUT)"
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
