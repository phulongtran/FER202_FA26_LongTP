import { useState } from 'react'
import { Card, Form, Button, ListGroup } from 'react-bootstrap'

function Exercise4TodoList() {
  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState([])

  const handleChange = (event) => {
    setTodo(event.target.value)
  }

  const handleAddTodo = (event) => {
    event.preventDefault()

    if (todo.trim() === '') {
      return
    }

    setTodos([...todos, todo.trim()])
    setTodo('')
  }

  const handleDeleteTodo = (indexToDelete) => {
    setTodos(
      todos.filter((_, index) => index !== indexToDelete)
    )
  }

  return (
    <Card className="mb-4 shadow-sm text-dark">
      <Card.Body>
        <Card.Title className="mb-4 text-dark">
          Bài 4: Todo List
        </Card.Title>

        <Form onSubmit={handleAddTodo}>
          <div className="d-flex gap-2">
            <Form.Control
              type="text"
              placeholder="Nhập công việc..."
              value={todo}
              onChange={handleChange}
            />

            <Button
              type="submit"
              variant="primary"
            >
              Thêm
            </Button>
          </div>
        </Form>

        <div className="mt-4">
          <h5 className="text-dark">
            Danh sách công việc
          </h5>

          {todos.length === 0 ? (
            <p className="text-dark">
              Chưa có công việc nào.
            </p>
          ) : (
            <ListGroup>
              {todos.map((item, index) => (
                <ListGroup.Item
                  key={index}
                  className="d-flex justify-content-between align-items-center"
                >
                  <span>{item}</span>

                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteTodo(index)}
                  >
                    Xóa
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </div>
      </Card.Body>
    </Card>
  )
}

export default Exercise4TodoList