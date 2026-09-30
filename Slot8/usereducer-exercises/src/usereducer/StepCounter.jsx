import { useReducer } from "react";
import {
  Container,
  Card,
  Button,
  Form,
  ListGroup,
  Row,
  Col,
} from "react-bootstrap";

import {
  MIN,
  MAX,
  ACTIONS,
  initialState,
} from "../Data/counterData";

const clamp = (n) => Math.min(MAX, Math.max(MIN, n));

const counterReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.INCREMENT:
    case ACTIONS.DECREMENT: {
      const delta =
        action.type === ACTIONS.INCREMENT ? state.step : -state.step;

      const next = clamp(state.count + delta);

      if (next === state.count) {
        return state;
      }

      return {
        ...state,
        count: next,
        history: [`${state.count} → ${next}`, ...state.history].slice(0, 5),
      };
    }

    case ACTIONS.SET_STEP:
      return {
        ...state,
        step: action.payload,
      };

    case ACTIONS.RESET:
      return initialState;

    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

function StepCounter() {
  const [state, dispatch] = useReducer(counterReducer, initialState);

  const { count, step, history } = state;

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              <h1 className="text-center mb-4">
                Step Counter
              </h1>

              {/* Count */}
              <div className="text-center mb-4">
                <div className="display-1 fw-bold">
                  {count}
                </div>
              </div>

              {/* Buttons */}
              <div className="d-flex justify-content-center gap-3 mb-4">
                <Button
                  variant="outline-danger"
                  size="lg"
                  disabled={count === MIN}
                  onClick={() =>
                    dispatch({
                      type: ACTIONS.DECREMENT,
                    })
                  }
                >
                  − {step}
                </Button>

                <Button
                  variant="primary"
                  size="lg"
                  disabled={count === MAX}
                  onClick={() =>
                    dispatch({
                      type: ACTIONS.INCREMENT,
                    })
                  }
                >
                  + {step}
                </Button>
              </div>

              {/* Step */}
              <Form.Group className="mb-4">
                <Form.Label className="fw-semibold">
                  Bước nhảy
                </Form.Label>

                <Form.Select
                  value={step}
                  onChange={(e) =>
                    dispatch({
                      type: ACTIONS.SET_STEP,
                      payload: Number(e.target.value),
                    })
                  }
                >
                  <option value="1">1</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="25">25</option>
                </Form.Select>
              </Form.Group>

              {/* Reset */}
              <div className="d-grid mb-4">
                <Button
                  variant="secondary"
                  onClick={() =>
                    dispatch({
                      type: ACTIONS.RESET,
                    })
                  }
                >
                  Đặt lại
                </Button>
              </div>

              {/* History */}
              <div>
                <h5 className="mb-3">
                  5 thay đổi gần nhất
                </h5>

                {history.length === 0 ? (
                  <div className="text-center text-muted py-3">
                    Chưa có thay đổi
                  </div>
                ) : (
                  <ListGroup>
                    {history.map((item, index) => (
                      <ListGroup.Item key={index}>
                        {item}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default StepCounter;