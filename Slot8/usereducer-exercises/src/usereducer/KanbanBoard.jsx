import { useReducer, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Badge,
} from "react-bootstrap";

import {
  COLUMNS,
  PRIORITIES,
  initialTaskState,
  taskReducer,
  addTask,
  moveTask,
  deleteTask,
  togglePriority,
  resetTasks,
} from "../Data/taskReducer";

const KanbanBoard = () => {
  const [state, dispatch] = useReducer(
    taskReducer,
    initialTaskState
  );

  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("low");
  const [filter, setFilter] = useState("all");

  const handleAddTask = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      return;
    }

    dispatch(addTask(title.trim(), priority));

    setTitle("");
    setPriority("low");
  };

  const filteredTasks =
    filter === "all"
      ? state.tasks
      : state.tasks.filter(
          (task) => task.priority === filter
        );

  const getTasksByStatus = (status) => {
    return filteredTasks.filter(
      (task) => task.status === status
    );
  };

  return (
    <Container className="py-4">
      {/* Title */}
      <div className="text-center mb-4">
        <h1 className="fw-bold">Kanban Board</h1>
        <p className="text-muted">
          Quản lý công việc với useReducer
        </p>
      </div>

      {/* Add Task */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Card.Title>Thêm công việc</Card.Title>

          <Form onSubmit={handleAddTask}>
            <Row className="g-3 align-items-end">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Tên công việc</Form.Label>

                  <Form.Control
                    type="text"
                    placeholder="Nhập tên công việc..."
                    value={title}
                    onChange={(e) =>
                      setTitle(e.target.value)
                    }
                  />
                </Form.Group>
              </Col>

              <Col md={3}>
                <Form.Group>
                  <Form.Label>Độ ưu tiên</Form.Label>

                  <Form.Select
                    value={priority}
                    onChange={(e) =>
                      setPriority(e.target.value)
                    }
                  >
                    <option value="low">
                      {PRIORITIES.low}
                    </option>

                    <option value="high">
                      {PRIORITIES.high}
                    </option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={3}>
                <Button
                  type="submit"
                  variant="primary"
                  className="w-100"
                >
                  Thêm công việc
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      {/* Filter */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Form.Select
          style={{ maxWidth: "200px" }}
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value)
          }
        >
          <option value="all">
            Tất cả độ ưu tiên
          </option>

          <option value="high">
            Ưu tiên cao
          </option>

          <option value="low">
            Ưu tiên thấp
          </option>
        </Form.Select>

        <Button
          variant="outline-danger"
          onClick={() => dispatch(resetTasks())}
        >
          Reset
        </Button>
      </div>

      {/* Kanban */}
      <Row className="g-3">
        {Object.entries(COLUMNS).map(
          ([status, columnName]) => {
            const columnTasks =
              getTasksByStatus(status);

            return (
              <Col md={4} key={status}>
                <Card className="h-100 shadow-sm">
                  <Card.Header className="fw-bold text-center">
                    {columnName}

                    <Badge
                      bg="secondary"
                      className="ms-2"
                    >
                      {columnTasks.length}
                    </Badge>
                  </Card.Header>

                  <Card.Body>
                    {columnTasks.length === 0 ? (
                      <p className="text-muted text-center">
                        Chưa có công việc
                      </p>
                    ) : (
                      columnTasks.map((task) => (
                        <Card
                          key={task.id}
                          className="mb-3"
                        >
                          <Card.Body>
                            <div className="d-flex justify-content-between align-items-start">
                              <Card.Title className="fs-6">
                                {task.title}
                              </Card.Title>

                              <Badge
                                bg={
                                  task.priority === "high"
                                    ? "danger"
                                    : "secondary"
                                }
                              >
                                {task.priority === "high"
                                  ? "Cao"
                                  : "Thấp"}
                              </Badge>
                            </div>

                            <div className="d-flex flex-wrap gap-2 mt-3">
                              {/* Move to Todo */}
                              {task.status !== "todo" && (
                                <Button
                                  size="sm"
                                  variant="outline-secondary"
                                  onClick={() =>
                                    dispatch(
                                      moveTask(
                                        task.id,
                                        "todo"
                                      )
                                    )
                                  }
                                >
                                  Cần làm
                                </Button>
                              )}

                              {/* Move to Doing */}
                              {task.status !== "doing" && (
                                <Button
                                  size="sm"
                                  variant="outline-primary"
                                  onClick={() =>
                                    dispatch(
                                      moveTask(
                                        task.id,
                                        "doing"
                                      )
                                    )
                                  }
                                >
                                  Đang làm
                                </Button>
                              )}

                              {/* Move to Done */}
                              {task.status !== "done" && (
                                <Button
                                  size="sm"
                                  variant="outline-success"
                                  onClick={() =>
                                    dispatch(
                                      moveTask(
                                        task.id,
                                        "done"
                                      )
                                    )
                                  }
                                >
                                  Hoàn thành
                                </Button>
                              )}

                              {/* Priority */}
                              <Button
                                size="sm"
                                variant="outline-warning"
                                onClick={() =>
                                  dispatch(
                                    togglePriority(
                                      task.id
                                    )
                                  )
                                }
                              >
                                Đổi ưu tiên
                              </Button>

                              {/* Delete */}
                              <Button
                                size="sm"
                                variant="outline-danger"
                                onClick={() =>
                                  dispatch(
                                    deleteTask(task.id)
                                  )
                                }
                              >
                                Xóa
                              </Button>
                            </div>
                          </Card.Body>
                        </Card>
                      ))
                    )}
                  </Card.Body>
                </Card>
              </Col>
            );
          }
        )}
      </Row>
    </Container>
  );
};

export default KanbanBoard;