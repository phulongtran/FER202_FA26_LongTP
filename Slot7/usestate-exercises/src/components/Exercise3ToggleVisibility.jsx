import { useState } from 'react'
import { Card, Button } from 'react-bootstrap'

function Exercise3ToggleVisibility() {
  const [isVisible, setIsVisible] = useState(false)

  const handleToggle = () => {
    setIsVisible(!isVisible)
  }

  return (
    <Card className="mb-4 shadow-sm text-dark">
      <Card.Body className="text-center">
        <Card.Title className="mb-4 text-dark">
          Bài 3: Toggle Visibility
        </Card.Title>

        {isVisible && (
          <p className="text-dark mb-4">
            Đây là nội dung được hiển thị khi bạn nhấn nút.
          </p>
        )}

        <Button
          variant={isVisible ? 'danger' : 'primary'}
          onClick={handleToggle}
        >
          {isVisible ? 'Hide' : 'Show'}
        </Button>
      </Card.Body>
    </Card>
  )
}

export default Exercise3ToggleVisibility