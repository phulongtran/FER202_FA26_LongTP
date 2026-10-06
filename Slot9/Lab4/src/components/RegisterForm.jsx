import { useState } from 'react';
import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  Row,
} from 'react-bootstrap';

import InputField from './InputField';
import {
  fields,
  genders,
  majors,
  initialValues,
} from '../data/registerConfig';

const REQUIRED_MESSAGES = {
  fullName: 'Vui lòng nhập họ và tên',
  email: 'Vui lòng nhập email',
  password: 'Vui lòng nhập mật khẩu',
  confirmPassword: 'Vui lòng nhập lại mật khẩu',
  major: 'Vui lòng chọn chuyên ngành',
  agree: 'Bạn cần đồng ý điều khoản',
};

function validate(values) {
  const errors = {};

  Object.entries(REQUIRED_MESSAGES).forEach(
    ([field, message]) => {
      if (field === 'agree') {
        if (!values[field]) {
          errors[field] = message;
        }

        return;
      }

      if (!values[field]?.trim()) {
        errors[field] = message;
      }
    }
  );

  if (
    values.confirmPassword &&
    values.password &&
    values.confirmPassword !== values.password
  ) {
    errors.confirmPassword = 'Mật khẩu nhập lại không khớp';
  }

  return errors;
}

function RegisterForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validate(values);

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setSubmitted(values);
  };

  const handleReset = () => {
    setValues(initialValues);
    setErrors({});
    setSubmitted(null);
  };

  return (
    <Row className="justify-content-center">
      <Col md={8} lg={6}>
        <Card className="shadow-sm">
          <Card.Body className="p-4">
            <Card.Title className="text-center mb-4">
              Đăng ký tài khoản
            </Card.Title>

            <Form noValidate onSubmit={handleSubmit}>
              {fields.map((field) => (
                <InputField
                  key={field.id}
                  {...field}
                  name={field.id}
                  value={values[field.id]}
                  onChange={handleChange}
                  error={errors[field.id]}
                />
              ))}

              <Form.Group className="mb-3">
                <Form.Label>Giới tính</Form.Label>

                <div>
                  {genders.map((gender) => (
                    <Form.Check
                      inline
                      key={gender}
                      type="radio"
                      id={`gender-${gender}`}
                      label={gender}
                      name="gender"
                      value={gender}
                      checked={values.gender === gender}
                      onChange={handleChange}
                    />
                  ))}
                </div>
              </Form.Group>

              <Form.Group className="mb-3" controlId="major">
                <Form.Label>
                  Chuyên ngành
                  <span className="text-danger"> *</span>
                </Form.Label>

                <Form.Select
                  name="major"
                  value={values.major}
                  onChange={handleChange}
                  isInvalid={Boolean(errors.major)}
                >
                  <option value="">
                    -- Chọn chuyên ngành --
                  </option>

                  {majors.map((major) => (
                    <option key={major} value={major}>
                      {major}
                    </option>
                  ))}
                </Form.Select>

                <Form.Control.Feedback type="invalid">
                  {errors.major}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Check
                className="mb-3"
                type="checkbox"
                id="agree"
                label="Tôi đồng ý điều khoản"
                name="agree"
                checked={values.agree}
                onChange={handleChange}
                isInvalid={Boolean(errors.agree)}
                feedback={errors.agree}
                feedbackType="invalid"
              />

              <div className="d-flex gap-2">
                <Button
                  type="submit"
                  variant="primary"
                  className="flex-grow-1"
                >
                  Đăng ký
                </Button>

                <Button
                  type="button"
                  variant="outline-secondary"
                  onClick={handleReset}
                >
                  Làm lại
                </Button>
              </div>
            </Form>

            {submitted && (
              <Alert variant="success" className="mt-4">
                <Alert.Heading>
                  Đã nhận đăng ký của {submitted.fullName}
                </Alert.Heading>

                <pre className="mb-0">
                  {JSON.stringify(submitted, null, 2)}
                </pre>
              </Alert>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default RegisterForm;