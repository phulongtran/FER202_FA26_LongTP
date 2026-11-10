
import { useSelector, useDispatch } from 'react-redux';
import { ListGroup, Button, Alert } from 'react-bootstrap';

import TodoItem from './TodoItem';
import {
  selectVisibleTodos,
  selectActiveCount,
} from '../redux/todos/selectors';

import { clearCompleted } from '../redux/todos/actions';

export default function TodoList() {
  const dispatch = useDispatch();

  const todos = useSelector(selectVisibleTodos);
  const activeCount = useSelector(selectActiveCount);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <span className="text-muted">
          Còn {activeCount} công việc chưa hoàn thành
        </span>

        <Button
          size="sm"
          variant="outline-danger"
          onClick={() => dispatch(clearCompleted())}
        >
          Xóa công việc đã hoàn thành
        </Button>
      </div>

      {todos.length === 0 ? (
        <Alert variant="info" className="text-center">
          Không có công việc nào!
        </Alert>
      ) : (
        <ListGroup>
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ListGroup>
      )}
    </div>
  );
}
