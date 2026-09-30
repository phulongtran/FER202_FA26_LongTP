import { useReducer } from "react";
import {
  Container,
  Card,
  Badge,
  Button,
  Form,
  Alert,
  ListGroup,
  Row,
  Col,
} from "react-bootstrap";

import {
  TRANSITIONS,
  STATUS_INFO,
  EVENT_LABELS,
  initialState,
} from "../Data/orderData";

const orderReducer = (state, action) => {
  switch (action.type) {
    case "SET_REASON":
      return {
        ...state,
        cancelReason: action.payload,
        error: "",
      };

    case "RESET":
      return initialState;

    default: {
      const next = TRANSITIONS[state.status]?.[action.type];

      // Event không hợp lệ
      if (!next) {
        return {
          ...state,
          error: `Không thể "${action.type}" khi đơn đang "${STATUS_INFO[state.status].label}"`,
        };
      }

      // Kiểm tra lý do hủy
      if (
        action.type === "CANCEL" &&
        state.cancelReason.trim().length < 5
      ) {
        return {
          ...state,
          error: "Nhập lý do hủy (ít nhất 5 ký tự)",
        };
      }

      return {
        ...state,
        status: next,
        error: "",
        timeline: [
          ...state.timeline,
          {
            status: next,
            at: action.at,
          },
        ],
      };
    }
  }
};

const now = () => {
  return new Date().toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

function OrderTracker() {
  const [state, dispatch] = useReducer(
    orderReducer,
    initialState
  );

  const {
    status,
    cancelReason,
    error,
    timeline,
  } = state;

  // Các event hợp lệ ở trạng thái hiện tại
  const allowedEvents = Object.keys(
    TRANSITIONS[status]
  );

  // Kiểm tra trạng thái cuối
  const isFinal = allowedEvents.length === 0;

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              {/* Header */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-0">
                  Đơn hàng #DH1024
                </h2>

                <Badge
                  bg={STATUS_INFO[status].variant}
                  className="fs-6"
                >
                  {STATUS_INFO[status].label}
                </Badge>
              </div>

              {/* Error */}
              {error && (
                <Alert
                  variant="danger"
                  className="mb-4"
                >
                  {error}
                </Alert>
              )}

              {/* Event buttons */}
              <div className="mb-4">
                <h5 className="mb-3">
                  Cập nhật trạng thái
                </h5>

                <div className="d-flex flex-wrap gap-2">
                  {Object.keys(EVENT_LABELS).map(
                    (event) => (
                      <Button
                        key={event}
                        variant={
                          event === "CANCEL"
                            ? "outline-danger"
                            : "primary"
                        }
                        disabled={
                          !allowedEvents.includes(event)
                        }
                        onClick={() =>
                          dispatch({
                            type: event,
                            at: now(),
                          })
                        }
                      >
                        {EVENT_LABELS[event]}
                      </Button>
                    )
                  )}
                </div>
              </div>

              {/* Test SHIP */}
              <div className="mb-4">
                <Button
                  variant="dark"
                  onClick={() =>
                    dispatch({
                      type: "SHIP",
                      at: now(),
                    })
                  }
                >
                  Thử gửi SHIP
                </Button>
              </div>

              {/* Cancel reason */}
              {allowedEvents.includes("CANCEL") && (
                <Form.Group className="mb-4">
                  <Form.Label className="fw-semibold">
                    Lý do hủy
                  </Form.Label>

                  <Form.Control
                    type="text"
                    placeholder="Nhập lý do hủy..."
                    value={cancelReason}
                    onChange={(e) =>
                      dispatch({
                        type: "SET_REASON",
                        payload: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              )}

              {/* Timeline */}
              <div className="mb-4">
                <h5 className="mb-3">
                  Lịch sử trạng thái
                </h5>

                <ListGroup>
                  {timeline.map((item, index) => (
                    <ListGroup.Item
                      key={index}
                      className="d-flex justify-content-between align-items-center"
                    >
                      <span>
                        {STATUS_INFO[item.status].label}
                      </span>

                      <small className="text-muted">
                        {item.at}
                      </small>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>

              {/* Create new order */}
              {isFinal && (
                <div className="d-grid">
                  <Button
                    variant="success"
                    onClick={() =>
                      dispatch({
                        type: "RESET",
                      })
                    }
                  >
                    Tạo đơn mới
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default OrderTracker;