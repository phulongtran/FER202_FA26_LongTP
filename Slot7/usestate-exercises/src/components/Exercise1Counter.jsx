import { useState } from 'react'
import { Card, Button } from 'react-bootstrap'

function Exercise1Counter() {
  const [count, setCount] = useState(0)

  const handleIncrease = () => {
    setCount(count + 1)
  }

  const handleDecrease = () => {
    setCount(count - 1)
  }

  const handleReset = () => {
    setCount(0)
  }

  return (
    <Card className="mb-4 shadow-sm text-dark">
      <Card.Body className="text-center">
        <Card.Title className="mb-4 text-dark">
          Bài 1: Tăng - Giảm - Reset
        </Card.Title>

        <h2 className="mb-4 text-dark">
          {count}
        </h2>

        <div className="d-flex justify-content-center gap-2">
          <Button
            variant="success"
            onClick={handleIncrease}
          >
            Tăng
          </Button>

          <Button
            variant="danger"
            onClick={handleDecrease}
          >
            Giảm
          </Button>

          <Button
            variant="secondary"
            onClick={handleReset}
          >
            Reset
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}

export default Exercise1Counter