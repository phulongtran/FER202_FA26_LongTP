import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Badge, Button, Spinner, Alert, ListGroup } from 'react-bootstrap'
import { fetchRoomById } from '../api/roomApi'
import { useRoom } from '../context/RoomContext'
import { formatVND, formatDateDisplay } from '../utils/format'

export default function RoomDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { state } = useRoom()
  const { roomTypes } = state
  const [room, setRoom] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // TODO-05: Gọi fetchRoomById(id), cập nhật state room/loading/error
    useEffect(() => {
  fetchRoomById(id)
    .then((data) => {
      setRoom(data)
      setLoading(false)
    })
    .catch((err) => {
      setError(err.message || 'Failed to load room.')
      setLoading(false)
    })
}, [id])
  }, [id])

  // TODO-05: Nếu loading → trả về Spinner
  if (loading) {
  return (
    <Spinner
      animation="border"
      className="d-block mx-auto mt-5"
    />
  )
}
  if (loading) return null
  // TODO-05: Nếu error → trả về Alert variant="danger"
  if (error) {
  return (
    <Alert variant="danger" role="alert">
      {error}
    </Alert>
  )
}
  if (error) return null
  if (!room) return null

  const roomTypeName = roomTypes.find((rt) => String(rt.id) === String(room.roomTypeId))?.name ?? '—'

  return (
    <div>
      {/* TODO-05: Nút Back navigate(-1) */}
      <Button
  variant="secondary"
  className="mb-3"
  onClick={() => navigate(-1)}
>
  ← Back
</Button>
      <Card className="shadow-sm">
<Card.Header as="h4">
  {room.name}
</Card.Header>

<Card.Body>
  <ListGroup variant="flush">

    <ListGroup.Item>
      Room Type: <Badge bg="primary">{roomTypeName}</Badge>
    </ListGroup.Item>

    <ListGroup.Item>
      Floor: {room.floor}
    </ListGroup.Item>

    <ListGroup.Item>
      View: {room.view}
    </ListGroup.Item>

    <ListGroup.Item>
      Price Weekday: {formatVND(room.priceWeekday)}
    </ListGroup.Item>

    <ListGroup.Item>
      Price Weekend: {formatVND(room.priceWeekend)}
    </ListGroup.Item>

    <ListGroup.Item>
      Last Renovated: {formatDateDisplay(room.lastRenovated)}
    </ListGroup.Item>

  </ListGroup>
</Card.Body>
      </Card>
    </div>
  )
}
