import { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';

const initialTodos = [
  { id: 1, title: 'Ôn lại ES6', done: true },
  { id: 2, title: 'Làm bài tập useState', done: false },
];

const FILTERS = {
  all: 'Tất cả',
  active: 'Chưa xong',
  completed: 'Đã xong',
};

function TodoList() {
  const [todos, setTodos] = useState(initialTodos);
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  // Validate nội dung Todo
  const validateTitle = (text, ignoreId = null) => {
    const trimmedText = text.trim();

    if (!trimmedText) {
      return 'Nội dung không được để trống';
    }

    if (trimmedText.length > 60) {
      return 'Nội dung không được quá 60 ký tự';
    }

    const isDuplicate = todos.some(
      (todo) =>
        todo.id !== ignoreId &&
        todo.title.trim().toLowerCase() === trimmedText.toLowerCase()
    );

    if (isDuplicate) {
      return 'Công việc đã tồn tại';
    }

    return '';
  };

  // Thêm Todo
  const handleAdd = (e) => {
    e.preventDefault();

    const validationError = validateTitle(title);

    if (validationError) {
      setError(validationError);
      return;
    }

    setTodos((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: title.trim(),
        done: false,
      },
    ]);

    setTitle('');
    setError('');
  };

  // Hoàn thành / chưa hoàn thành
  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              done: !todo.done,
            }
          : todo
      )
    );
  };

  // Xóa Todo
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // Bắt đầu sửa
  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.title);
    setError('');
  };

  // Lưu Todo sau khi sửa
  const saveEdit = () => {
    if (editingId === null) {
      return;
    }

    const validationError = validateTitle(editText, editingId);

    if (validationError) {
      setError(validationError);
      return;
    }

    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === editingId
          ? {
              ...todo,
              title: editText.trim(),
            }
          : todo
      )
    );

    setEditingId(null);
    setEditText('');
    setError('');
  };

  // Hủy sửa
  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
    setError('');
  };

  // Xử lý Enter / Escape khi sửa
  const handleEditKeyDown = (e) => {
    if (e.key === 'Enter') {
      saveEdit();
    }

    if (e.key === 'Escape') {
      cancelEdit();
    }
  };

  // Todo hiển thị theo filter
  const visibleTodos = todos.filter((todo) => {
    if (filter === 'active') {
      return !todo.done;
    }

    if (filter === 'completed') {
      return todo.done;
    }

    return true;
  });

  // Số Todo chưa hoàn thành
  const remaining = todos.filter((todo) => !todo.done).length;

  // Xóa tất cả Todo đã hoàn thành
  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.done));
  };

  return (
    <Card className="shadow-sm">
      <Card.Body className="p-4">
        <Card.Title className="mb-4 text-center">
          Todo List
        </Card.Title>

        {/* Form thêm Todo */}
        <Form noValidate onSubmit={handleAdd}>
          <Form.Group className="mb-3">
            <div className="d-flex gap-2">
              <Form.Control
                type="text"
                placeholder="Nhập công việc..."
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setError('');
                }}
                isInvalid={Boolean(error)}
              />

              <Button type="submit">
                Thêm
              </Button>
            </div>

            {error && (
              <Form.Control.Feedback type="invalid" className="d-block">
                {error}
              </Form.Control.Feedback>
            )}
          </Form.Group>
        </Form>

        {/* Bộ lọc */}
        <div className="d-flex flex-wrap gap-2 mb-3">
          {Object.entries(FILTERS).map(([key, label]) => (
            <Button
              key={key}
              variant={
                filter === key
                  ? 'primary'
                  : 'outline-primary'
              }
              onClick={() => setFilter(key)}
            >
              {label}
            </Button>
          ))}
        </div>

        {/* Danh sách Todo */}
        <div className="mb-3">
          {visibleTodos.length === 0 ? (
            <div className="text-muted text-center py-3">
              Không có công việc
            </div>
          ) : (
            visibleTodos.map((todo) => (
              <div
                key={todo.id}
                className="d-flex align-items-center justify-content-between border-bottom py-2"
              >
                <div className="d-flex align-items-center gap-2 flex-grow-1">
                  <Form.Check
                    type="checkbox"
                    checked={todo.done}
                    onChange={() => toggleTodo(todo.id)}
                  />

                  {editingId === todo.id ? (
                    <Form.Control
                      autoFocus
                      type="text"
                      value={editText}
                      onChange={(e) => {
                        setEditText(e.target.value);
                        setError('');
                      }}
                      onKeyDown={handleEditKeyDown}
                      onBlur={saveEdit}
                      isInvalid={Boolean(error)}
                    />
                  ) : (
                    <span
                      onDoubleClick={() => startEdit(todo)}
                      style={{
                        textDecoration: todo.done
                          ? 'line-through'
                          : 'none',
                        cursor: 'pointer',
                      }}
                    >
                      {todo.title}
                    </span>
                  )}
                </div>

                <Button
                  variant="outline-danger"
                  size="sm"
                  className="ms-2"
                  onClick={() => deleteTodo(todo.id)}
                >
                  Xóa
                </Button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
          <span className="text-muted">
            Còn {remaining} việc chưa xong
          </span>

          {todos.some((todo) => todo.done) && (
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={clearCompleted}
            >
              Xóa việc đã xong
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default TodoList;