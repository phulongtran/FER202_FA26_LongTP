
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Button, InputGroup } from 'react-bootstrap';

import { addTodo } from '../redux/todos/actions';

export default function TodoForm() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedText = text.trim();

    if (!trimmedText) {
      return;
    }

    dispatch(addTodo(trimmedText));
    setText('');
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <InputGroup>
        <Form.Control
          type="text"
          placeholder="Nhập công việc cần làm..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <Button type="submit" variant="primary">
          + Thêm công việc
        </Button>
      </InputGroup>
    </Form>
  );
}
