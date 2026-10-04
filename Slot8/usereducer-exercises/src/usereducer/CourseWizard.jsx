import { useReducer } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  Row,
  Col,
  Alert,
} from "react-bootstrap";

import {
  COURSES,
  SCHEDULES,
  STEPS,
  initWizard,
  wizardReducer,
} from "../Data/wizardReducer";

import "./CourseWizard.css";

const CourseWizard = ({
  initialCourseId = "react",
}) => {
  const [state, dispatch] = useReducer(
    wizardReducer,
    initialCourseId,
    initWizard
  );

  const {
    step,
    maxVisited,
    values,
    errors,
    submitted,
  } = state;

  const course = COURSES.find(
    (item) => item.id === values.courseId
  );

  const handleChange = (e) => {
    const { name, type, value, checked } =
      e.target;

    dispatch({
      type: "CHANGE",
      payload: {
        name,
        value: type === "checkbox" ? checked : value,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (step === STEPS.length - 1) {
      dispatch({
        type: "SUBMIT",
      });
    } else {
      dispatch({
        type: "NEXT",
      });
    }
  };

  const handleReset = () => {
    dispatch({
      type: "RESET",
      payload: initialCourseId,
    });
  };

  const field = (
    name,
    label,
    type = "text",
    placeholder = ""
  ) => {
    return (
      <Form.Group
        className="wizard-field"
        controlId={name}
      >
        <Form.Label>{label}</Form.Label>

        <Form.Control
          type={type}
          name={name}
          value={values[name]}
          onChange={handleChange}
          placeholder={placeholder}
          isInvalid={!!errors[name]}
        />

        <Form.Control.Feedback type="invalid">
          {errors[name]}
        </Form.Control.Feedback>
      </Form.Group>
    );
  };

  if (submitted) {
    return (
      <div className="wizard-page">
        <Container>
          <Card className="wizard-card success-card">
            <Card.Body>
              <div className="success-icon">
                ✓
              </div>

              <h1>Đăng ký thành công!</h1>

              <p className="success-message">
                Chúc mừng{" "}
                <strong>{values.fullName}</strong>{" "}
                đã đăng ký khóa học{" "}
                <strong>{course?.name}</strong>.
              </p>

              <div className="success-info">
                <div>
                  <span>Lịch học</span>
                  <strong>{values.schedule}</strong>
                </div>

                <div>
                  <span>Học phí</span>
                  <strong>
                    {course?.fee.toLocaleString("vi-VN")} ₫
                  </strong>
                </div>
              </div>

              <Button
                className="reset-button"
                onClick={handleReset}
              >
                Đăng ký khóa khác
              </Button>
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }

  return (
    <div className="wizard-page">
      <Container>
        <div className="wizard-header">
          <p className="wizard-label">
            COURSE REGISTRATION
          </p>

          <h1>Đăng ký khóa học</h1>

          <p>
            Hoàn thành từng bước để đăng ký khóa
            học phù hợp với bạn.
          </p>
        </div>

        <Card className="wizard-card">
          <Card.Body>
            {/* Step Navigation */}
            <div className="step-navigation">
              {STEPS.map((stepName, index) => {
                const visited =
                  index <= maxVisited;

                const active =
                  index === step;

                return (
                  <div
                    key={stepName}
                    className={`step-wrapper ${
                      active ? "active" : ""
                    } ${
                      visited ? "visited" : "locked"
                    }`}
                  >
                    <button
                      type="button"
                      className="step-button"
                      disabled={!visited}
                      onClick={() =>
                        dispatch({
                          type: "GO_TO",
                          payload: index,
                        })
                      }
                    >
                      <span className="step-number">
                        {index + 1}
                      </span>

                      <span className="step-text">
                        {index + 1}. {stepName}
                      </span>
                    </button>

                    {index < STEPS.length - 1 && (
                      <div className="step-line" />
                    )}
                  </div>
                );
              })}
            </div>

            <div className="wizard-content">
              <Form onSubmit={handleSubmit}>
                {/* STEP 1 */}
                {step === 0 && (
                  <div className="step-content">
                    <div className="content-heading">
                      <span className="heading-number">
                        01
                      </span>

                      <div>
                        <h2>Thông tin cá nhân</h2>
                        <p>
                          Vui lòng nhập thông tin liên
                          hệ của bạn.
                        </p>
                      </div>
                    </div>

                    <Row>
                      <Col md={12}>
                        {field(
                          "fullName",
                          "Họ và tên",
                          "text",
                          "Nguyễn Văn An"
                        )}
                      </Col>

                      <Col md={6}>
                        {field(
                          "email",
                          "Email",
                          "email",
                          "example@email.com"
                        )}
                      </Col>

                      <Col md={6}>
                        {field(
                          "phone",
                          "Số điện thoại",
                          "tel",
                          "0901234567"
                        )}
                      </Col>
                    </Row>
                  </div>
                )}

                {/* STEP 2 */}
                {step === 1 && (
                  <div className="step-content">
                    <div className="content-heading">
                      <span className="heading-number">
                        02
                      </span>

                      <div>
                        <h2>Chọn khóa học</h2>
                        <p>
                          Chọn khóa học và lịch học phù
                          hợp với bạn.
                        </p>
                      </div>
                    </div>

                    <Form.Group className="wizard-field">
                      <Form.Label>
                        Khóa học
                      </Form.Label>

                      <Form.Select
                        name="courseId"
                        value={values.courseId}
                        onChange={handleChange}
                        isInvalid={!!errors.courseId}
                      >
                        {COURSES.map((item) => (
                          <option
                            key={item.id}
                            value={item.id}
                          >
                            {item.name} -{" "}
                            {item.fee.toLocaleString(
                              "vi-VN"
                            )}{" "}
                            ₫
                          </option>
                        ))}
                      </Form.Select>

                      <Form.Control.Feedback type="invalid">
                        {errors.courseId}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <div className="schedule-section">
                      <Form.Label>
                        Lịch học
                      </Form.Label>

                      <div className="schedule-list">
                        {SCHEDULES.map(
                          (schedule) => (
                            <label
                              key={schedule}
                              className={`schedule-card ${
                                values.schedule ===
                                schedule
                                  ? "selected"
                                  : ""
                              }`}
                            >
                              <Form.Check
                                type="radio"
                                name="schedule"
                                value={schedule}
                                checked={
                                  values.schedule ===
                                  schedule
                                }
                                onChange={
                                  handleChange
                                }
                              />

                              <span>
                                {schedule}
                              </span>
                            </label>
                          )
                        )}
                      </div>

                      {errors.schedule && (
                        <div className="field-error">
                          {errors.schedule}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* STEP 3 */}
                {step === 2 && (
                  <div className="step-content">
                    <div className="content-heading">
                      <span className="heading-number">
                        03
                      </span>

                      <div>
                        <h2>Xác nhận đăng ký</h2>
                        <p>
                          Kiểm tra lại thông tin trước
                          khi hoàn tất đăng ký.
                        </p>
                      </div>
                    </div>

                    <div className="summary-card">
                      <div className="summary-row">
                        <span>Họ và tên</span>
                        <strong>
                          {values.fullName}
                        </strong>
                      </div>

                      <div className="summary-row">
                        <span>Email</span>
                        <strong>
                          {values.email}
                        </strong>
                      </div>

                      <div className="summary-row">
                        <span>Số điện thoại</span>
                        <strong>
                          {values.phone}
                        </strong>
                      </div>

                      <div className="summary-row">
                        <span>Khóa học</span>
                        <strong>
                          {course?.name}
                        </strong>
                      </div>

                      <div className="summary-row">
                        <span>Lịch học</span>
                        <strong>
                          {values.schedule}
                        </strong>
                      </div>

                      <div className="summary-row total">
                        <span>Học phí</span>
                        <strong>
                          {course?.fee.toLocaleString(
                            "vi-VN"
                          )}{" "}
                          ₫
                        </strong>
                      </div>
                    </div>

                    <div
                      className={`confirm-box ${
                        errors.confirmed
                          ? "has-error"
                          : ""
                      }`}
                    >
                      <Form.Check
                        type="checkbox"
                        id="confirmed"
                        name="confirmed"
                        checked={values.confirmed}
                        onChange={handleChange}
                        label="Tôi xác nhận thông tin trên là chính xác"
                      />

                      {errors.confirmed && (
                        <div className="field-error">
                          {errors.confirmed}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Buttons */}
                <div className="wizard-actions">
                  <Button
                    type="button"
                    variant="outline-secondary"
                    className="back-button"
                    disabled={step === 0}
                    onClick={() =>
                      dispatch({
                        type: "BACK",
                      })
                    }
                  >
                    ← Quay lại
                  </Button>

                  <Button
                    type="submit"
                    className="next-button"
                  >
                    {step === 2
                      ? "Xác nhận đăng ký"
                      : "Tiếp tục →"}
                  </Button>
                </div>
              </Form>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default CourseWizard;