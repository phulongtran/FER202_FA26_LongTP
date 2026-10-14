import { useReducer, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';

const initialState = {
  values: {
    name: '',
    email: '',
    phone: '',
    message: ''
  },
  errors: {}
};

function validateForm(values) {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = 'Vui lòng nhập họ và tên.';
  }

  if (!values.email.trim()) {
    errors.email = 'Vui lòng nhập email.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Email không đúng định dạng.';
  }

  if (!values.phone.trim()) {
    errors.phone = 'Vui lòng nhập số điện thoại.';
  } else if (!/^0\d{9}$/.test(values.phone)) {
    errors.phone = 'Số điện thoại phải gồm 10 chữ số và bắt đầu bằng 0.';
  }

  if (!values.message.trim()) {
    errors.message = 'Vui lòng nhập nội dung liên hệ.';
  } else if (values.message.trim().length < 10) {
    errors.message = 'Nội dung phải có ít nhất 10 ký tự.';
  }

  return errors;
}

function formReducer(state, action) {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        values: {
          ...state.values,
          [action.name]: action.value
        },
        errors: {
          ...state.errors,
          [action.name]: undefined
        }
      };

    case 'VALIDATE':
      return {
        ...state,
        errors: action.errors
      };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}

function Contact() {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    dispatch({
      type: 'CHANGE',
      name,
      value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const errors = validateForm(state.values);

    dispatch({
      type: 'VALIDATE',
      errors
    });

    if (Object.keys(errors).length === 0) {
      setShowModal(true);
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleReset = () => {
    dispatch({ type: 'RESET' });
  };

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Contact</h1>

      <div className="mx-auto" style={{ maxWidth: '650px' }}>
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="contactName">
            <Form.Label>Họ và tên</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Nhập họ và tên"
              value={state.values.name}
              onChange={handleChange}
              isInvalid={!!state.errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {state.errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="contactEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="example@gmail.com"
              value={state.values.email}
              onChange={handleChange}
              isInvalid={!!state.errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {state.errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="contactPhone">
            <Form.Label>Số điện thoại</Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              placeholder="0123456789"
              value={state.values.phone}
              onChange={handleChange}
              isInvalid={!!state.errors.phone}
            />
            <Form.Control.Feedback type="invalid">
              {state.errors.phone}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="contactMessage">
            <Form.Label>Nội dung liên hệ</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="message"
              placeholder="Nhập nội dung liên hệ (ít nhất 10 ký tự)"
              value={state.values.message}
              onChange={handleChange}
              isInvalid={!!state.errors.message}
            />
            <Form.Control.Feedback type="invalid">
              {state.errors.message}
            </Form.Control.Feedback>
          </Form.Group>

          {Object.keys(state.errors).some(
            (key) => state.errors[key]
          ) && (
            <Alert variant="danger">
              Vui lòng kiểm tra và sửa các thông tin chưa hợp lệ.
            </Alert>
          )}

          <div className="d-flex gap-2">
            <Button type="submit" variant="primary">
              Submit
            </Button>

            <Button
              type="button"
              variant="secondary"
              onClick={handleReset}
            >
              Làm mới
            </Button>
          </div>
        </Form>
      </div>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Completed Lab5</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Alert variant="success">
            Bạn đã gửi form thành công!
          </Alert>

          <h6>Thông tin đã nhập vào form:</h6>

          <p>
            <strong>Họ và tên:</strong> {state.values.name}
          </p>

          <p>
            <strong>Email:</strong> {state.values.email}
          </p>

          <p>
            <strong>Số điện thoại:</strong> {state.values.phone}
          </p>

          <p className="mb-0">
            <strong>Nội dung:</strong> {state.values.message}
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Contact;