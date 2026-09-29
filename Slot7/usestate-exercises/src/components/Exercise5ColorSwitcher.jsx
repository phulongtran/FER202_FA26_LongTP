import { useState } from 'react'
import { Card, Form } from 'react-bootstrap'

function Exercise5ColorSwitcher() {
  const [color, setColor] = useState('white')

  const handleColorChange = (event) => {
    setColor(event.target.value)
  }

  return (
    <Card className="mb-4 shadow-sm text-dark">
      <Card.Body>
        <Card.Title className="mb-4 text-dark">
          Bài 5: Color Switcher
        </Card.Title>

        <Form.Group className="mb-4">
          <Form.Label className="text-dark">
            Chọn màu nền:
          </Form.Label>

          <Form.Select
            value={color}
            onChange={handleColorChange}
          >
            <option value="white">White</option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="yellow">Yellow</option>
          </Form.Select>
        </Form.Group>

        <div
          className="d-flex justify-content-center align-items-center rounded border"
          style={{
            height: '150px',
            backgroundColor: color,
          }}
        >
          <span
            style={{
              color:
                color === 'blue' || color === 'green'
                  ? 'white'
                  : 'black',
              fontWeight: 'bold',
            }}
          >
            Background: {color}
          </span>
        </div>
      </Card.Body>
    </Card>
  )
}

export default Exercise5ColorSwitcher