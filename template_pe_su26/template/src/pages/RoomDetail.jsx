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
  }, [id])

  // TODO-05: Nếu loading → trả về Spinner
  if (loading) return null
  // TODO-05: Nếu error → trả về Alert variant="danger"
  if (error) return null
  if (!room) return null

  const roomTypeName = roomTypes.find((rt) => String(rt.id) === String(room.roomTypeId))?.name ?? '—'

  return (
    <div>
      {/* TODO-05: Nút Back navigate(-1) */}
      <Card className="shadow-sm">
        <Card.Header as="h4">{/* TODO-05: room.name */}</Card.Header>
        <Card.Body>
          {/* TODO-05: ListGroup với Room Type (Badge), Floor, View,
              Price Weekday (formatVND), Price Weekend (formatVND), Last Renovated (formatDateDisplay) */}
        </Card.Body>
      </Card>
    </div>
  )
}
