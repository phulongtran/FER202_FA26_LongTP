import { useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

function QuantityPicker({ min = 1, max = 10 }) {
  const [quantity, setQuantity] = useState(min);

  console.log(quantity);

  const decrease = () => {
    setQuantity((q) => Math.max(q - 1, min));
  };

  const increase = () => {
    setQuantity((q) => Math.min(q + 1, max));
  };

  const addThreeWrong = () => {
    setQuantity(Math.min(quantity + 1, max));
    setQuantity(Math.min(quantity + 1, max));
    setQuantity(Math.min(quantity + 1, max));
  };

  const addThree = () => {
    increase();
    increase();
    increase();
  };

  return (
    <div className="mb-4">
      <h5>Bộ chọn số lượng</h5>

      <ButtonGroup className="mb-2">
        <Button
          variant="outline-secondary"
          onClick={decrease}
          disabled={quantity <= min}
        >
          −
        </Button>

        <Button variant="light" disabled>
          {quantity}
        </Button>

        <Button
          variant="outline-secondary"
          onClick={increase}
          disabled={quantity >= max}
        >
          +
        </Button>
      </ButtonGroup>

      <div className="mb-2">
        <Button
          variant="outline-danger"
          size="sm"
          className="me-2"
          onClick={addThreeWrong}
          disabled={quantity >= max}
        >
          +3 (sai)
        </Button>

        <Button
          variant="outline-success"
          size="sm"
          onClick={addThree}
          disabled={quantity >= max}
        >
          +3 (đúng)
        </Button>
      </div>

      <Button
        variant="outline-primary"
        size="sm"
        onClick={() => setQuantity(min)}
      >
        Đặt lại
      </Button>

      {quantity === max && (
        <div className="text-danger mt-2">
          <small>Tối đa {max} sản phẩm</small>
        </div>
      )}
    </div>
  );
}

export default QuantityPicker;