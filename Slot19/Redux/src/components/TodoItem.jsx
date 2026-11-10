
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form, ListGroup } from 'react-bootstrap';

import {
  toggleTodo,
  deleteTodo,
  editTodo,
} from '../redux/todos/actions';

export default function TodoItem({ todo }) {
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(todo.text);

  const handleEdit = () => {
    const trimmedText = text.trim();

    if (!trimmedText) return;

    dispatch(editTodo(todo.id, trimmedText));
    setIsEditing(false);
  };

  return (
    <ListGroup.Item className="d-flex align-items-center gap-2">
      <Form.Check
        type="checkbox"
        checked={todo.done}
        onChange={() => dispatch(toggleTodo(todo.id))}
      />

      {isEditing ? (
        <>
          <Form.Control
            size="sm"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <Button size="sm" variant="success" onClick={handleEdit}>
            Lưu
          </Button>

          <Button
            size="sm"
            variant="secondary"
            onClick={() => {
              setText(todo.text);
              setIsEditing(false);
            }}
          >
            Hủy
          </Button>
        </>
      ) : (
        <>
          <span
            className={`flex-grow-1 ${
              todo.done ? 'text-decoration-line-through text-muted' : ''
            }`}
          >
            {todo.text}
          </span>

          <Button
            size="sm"
            variant="outline-primary"
            onClick={() => setIsEditing(true)}
          >
            Sửa
          </Button>

          <Button
            size="sm"
            variant="outline-danger"
            onClick={() => dispatch(deleteTodo(todo.id))}
          >
            Xóa
          </Button>
        </>
      )}
    </ListGroup.Item>
  );
}
