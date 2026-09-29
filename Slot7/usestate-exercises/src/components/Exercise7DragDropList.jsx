import { useState } from 'react'
import { Card, ListGroup } from 'react-bootstrap'

function Exercise7DragDropList() {
  const [items, setItems] = useState([
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
    'Item 5',
  ])

  const [draggingItem, setDraggingItem] = useState(null)

  const handleDragStart = (index) => {
    setDraggingItem(index)
  }

  const handleDragOver = (event) => {
    event.preventDefault()
  }

  const handleDrop = (dropIndex) => {
    if (
      draggingItem === null ||
      draggingItem === dropIndex
    ) {
      return
    }

    const updatedItems = [...items]

    const draggedItem = updatedItems.splice(
      draggingItem,
      1
    )[0]

    updatedItems.splice(
      dropIndex,
      0,
      draggedItem
    )

    setItems(updatedItems)
    setDraggingItem(null)
  }

  const handleDragEnd = () => {
    setDraggingItem(null)
  }

  return (
    <Card className="mb-4 shadow-sm text-dark">
      <Card.Body>
        <Card.Title className="mb-4 text-dark">
          Bài 7: Drag and Drop List
        </Card.Title>

        <p className="text-dark">
          Kéo và thả các item để thay đổi thứ tự.
        </p>

        <ListGroup>
          {items.map((item, index) => (
            <ListGroup.Item
              key={item}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(index)}
              onDragEnd={handleDragEnd}
              style={{
                cursor: 'grab',
                opacity:
                  draggingItem === index ? 0.5 : 1,
              }}
            >
              {item}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  )
}

export default Exercise7DragDropList