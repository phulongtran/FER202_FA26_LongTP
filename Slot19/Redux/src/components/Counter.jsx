
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  Card,
  Button,
  Form,
  InputGroup,
  Badge,
} from 'react-bootstrap';

import {
  increment,
  decrement,
  incrementByAmount,
  reset,
} from '../redux/counterActions';

export default function Counter() {
  // Lấy giá trị từ Redux Store
  const count = useSelector((state) => state.counter.value);

  // Gửi Action đến Redux Store
  const dispatch = useDispatch();

  // State cục bộ cho ô nhập số
  const [step, setStep] = useState(2);

  return (
    <Card
      className="mx-auto mt-5 text-center shadow"
      style={{ maxWidth: 420 }}
    >
      <Card.Header as="h4">
        Redux Counter
      </Card.Header>

      <Card.Body>
        <h1 className="display-3">{count}</h1>

        <Badge
          bg={count % 2 === 0 ? 'success' : 'warning'}
          className="mb-3"
        >
          {count % 2 === 0 ? 'Số chẵn' : 'Số lẻ'}
        </Badge>

        <div className="d-flex justify-content-center gap-2 mb-3">
          <Button
            variant="danger"
            onClick={() => dispatch(decrement())}
          >
            -
          </Button>

          <Button
            variant="success"
            onClick={() => dispatch(increment())}
          >
            +
          </Button>

          <Button
            variant="primary"
            onClick={() => dispatch(incrementByAmount(5))}
          >
            +5
          </Button>

          <Button
            variant="secondary"
            onClick={() => dispatch(reset())}
          >
            Reset
          </Button>
        </div>

        <InputGroup>
          <Form.Control
            type="number"
            value={step}
            onChange={(e) => setStep(Number(e.target.value))}
          />

          <Button
            onClick={() => dispatch(incrementByAmount(step))}
          >
            Cộng {step}
          </Button>
        </InputGroup>
      </Card.Body>
    </Card>
  );
}
