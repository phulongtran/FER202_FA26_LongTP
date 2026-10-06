import { useReducer } from 'react';
import { Alert, Button, Card, Form, Spinner } from 'react-bootstrap';
import {
  initialLoginState,
  loginReducer,
  validateLogin,
} from '../reducers/loginReducer';

const fakeLoginApi = (values) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        values.email === 'admin@fpt.edu.vn' &&
        values.password === '12345678'
      ) {
        resolve();
      } else {
        reject(new Error('Email hoặc mật khẩu không đúng'));
      }
    }, 1000);
  });
};

function LoginForm({ onLoginSuccess }) {
  const [state, dispatch] = useReducer(
    loginReducer,
    initialLoginState
  );

  const { values, errors, touched, status, message } = state;

  const isSubmitting = status === 'submitting';

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    dispatch({
      type: 'CHANGE_FIELD',
      payload: {
        name,
        value: type === 'checkbox' ? checked : value,
      },
    });
  };

  const handleBlur = (e) => {
    dispatch({
      type: 'BLUR_FIELD',
      payload: {
        name: e.target.name,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch({
      type: 'SUBMIT',
    });

    const validationErrors = validateLogin(values);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      await fakeLoginApi(values);

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: `Xin chào ${values.email}!`,
      });

      if (onLoginSuccess) {
        onLoginSuccess(values);
      }
    } catch (error) {
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: error.message,
      });
    }
  };

  const handleReset = () => {
    dispatch({
      type: 'RESET',
    });
  };

  if (status === 'success') {
    return (
      <Card className="shadow-sm">
        <Card.Body className="p-4 text-center">
          <Alert variant="success" className="mb-4">
            {message}
          </Alert>

          <Button
            variant="outline-primary"
            onClick={handleReset}
          >
            Đăng nhập lại
          </Button>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm">
      <Card.Body className="p-4">
        <Card.Title className="text-center mb-4">
          Đăng nhập
        </Card.Title>

        {status === 'error' && (
          <Alert variant="danger">
            {message}
          </Alert>
        )}

        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="loginEmail">
            <Form.Label>Email</Form.Label>

            <Form.Control
              type="email"
              name="email"
              placeholder="admin@fpt.edu.vn"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              isInvalid={
                touched.email && Boolean(errors.email)
              }
              isValid={
                touched.email &&
                Boolean(values.email) &&
                !errors.email
              }
            />

            {touched.email && errors.email && (
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="loginPassword">
            <Form.Label>Mật khẩu</Form.Label>

            <Form.Control
              type="password"
              name="password"
              placeholder="Nhập mật khẩu"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isSubmitting}
              isInvalid={
                touched.password && Boolean(errors.password)
              }
              isValid={
                touched.password &&
                Boolean(values.password) &&
                !errors.password
              }
            />

            {touched.password && errors.password && (
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Check
            className="mb-4"
            type="checkbox"
            name="remember"
            label="Ghi nhớ đăng nhập"
            checked={values.remember}
            onChange={handleChange}
            disabled={isSubmitting}
          />

          <Button
            type="submit"
            variant="primary"
            className="w-100"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Spinner
                  animation="border"
                  size="sm"
                  className="me-2"
                />
                Đang đăng nhập...
              </>
            ) : (
              'Đăng nhập'
            )}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default LoginForm;