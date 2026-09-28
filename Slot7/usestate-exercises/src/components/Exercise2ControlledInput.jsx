import { useState } from 'react'
import { Card, Form } from 'react-bootstrap'

function Exercise2ControlledInput() {
  const [text, setText] = useState('')

  const handleChange = (event) => {
    setText(event.target.value)
  }

  return (
    <Card className="mb-4 shadow-sm text-dark">
      <Card.Body>
        <Card.Title className="mb-4 text-dark">
          Bài 2: Controlled Input
        </Card.Title>

        <Form.Group>
          <Form.Label className="text-dark">
            Nhập nội dung:
          </Form.Label>

          <Form.Control
            type="text"
            placeholder="Nhập text vào đây..."
            value={text}
            onChange={handleChange}
          />
        </Form.Group>

        <div className="mt-4">
          <h5 className="text-dark">
            Nội dung bạn nhập:
          </h5>

          <p className="text-dark">
            {text || 'Chưa có nội dung'}
          </p>
        </div>
      </Card.Body>
    </Card>
  )
}

export default Exercise2ControlledInput