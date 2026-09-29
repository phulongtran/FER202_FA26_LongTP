import { useState } from 'react'
import { Card, Form, ListGroup } from 'react-bootstrap'

function Exercise6SearchFilter() {
  const [search, setSearch] = useState('')

  const items = [
    'Apple',
    'Banana',
    'Orange',
    'Mango',
    'Pineapple',
    'Watermelon',
    'Strawberry',
    'Grapes',
  ]

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  )

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  return (
    <Card className="mb-4 shadow-sm text-dark">
      <Card.Body>
        <Card.Title className="mb-4 text-dark">
          Bài 6: Search Filter
        </Card.Title>

        <Form.Group className="mb-4">
          <Form.Label className="text-dark">
            Tìm kiếm:
          </Form.Label>

          <Form.Control
            type="text"
            placeholder="Nhập từ khóa..."
            value={search}
            onChange={handleSearchChange}
          />
        </Form.Group>

        <ListGroup>
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <ListGroup.Item key={index}>
                {item}
              </ListGroup.Item>
            ))
          ) : (
            <ListGroup.Item className="text-dark">
              Không tìm thấy kết quả.
            </ListGroup.Item>
          )}
        </ListGroup>
      </Card.Body>
    </Card>
  )
}

export default Exercise6SearchFilter