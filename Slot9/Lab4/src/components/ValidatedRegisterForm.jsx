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

import { validateRegister } from '../utils/validateRegister';

function ValidatedRegisterForm() {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [success, setSuccess] = useState('');

  const errors = validateRegister(values);

  const isValid =
    Object.keys(errors).length === 0;

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? checked
          : value,
    }));

    setSuccess('');
  };

  const handleBlur = (e) => {
    const { name } = e.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const showError = (name) => {
    return touched[name] ? errors[name] : undefined;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const allTouched = Object.keys(values).reduce(
      (result, key) => {
        result[key] = true;
        return result;
      },
      {}
    );

    setTouched(allTouched);

    if (!isValid) {
      return;
    }

    setSuccess(
      `Đăng ký thành công! Chào mừng ${values.fullName}`
    );

    setValues(initialValues);
    setTouched({});
  };

  return (
    <Row className="justify-content-center">
      <Col md={8} lg={6}>
        <Card className="shadow-sm">
          <Card.Body className="p-4">
            <Card.Title className="text-center mb-4">
              Đăng ký tài khoản
            </Card.Title>

            <Form
              noValidate
              onSubmit={handleSubmit}
            >
              {fields.map((field) => (
                <InputField
                  key={field.id}
                  {...field}
                  name={field.id}
                  value={values[field.id]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={showError(field.id)}
                />
              ))}

              <Form.Group className="mb-3">
                <Form.Label>
                  Giới tính
                </Form.Label>

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
                      checked={
                        values.gender === gender
                      }
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  ))}
                </div>
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="major"
              >
                <Form.Label>
                  Chuyên ngành
                  <span className="text-danger">
                    {' '}
                    *
                  </span>
                </Form.Label>

                <Form.Select
                  name="major"
                  value={values.major}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={Boolean(
                    showError('major')
                  )}
                >
                  <option value="">
                    -- Chọn chuyên ngành --
                  </option>

                  {majors.map((major) => (
                    <option
                      key={major}
                      value={major}
                    >
                      {major}
                    </option>
                  ))}
                </Form.Select>

                <Form.Control.Feedback type="invalid">
                  {showError('major')}
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
                onBlur={handleBlur}
                isInvalid={Boolean(
                  showError('agree')
                )}
                feedback={showError('agree')}
                feedbackType="invalid"
              />

              <Button
                type="submit"
                variant="primary"
                className="w-100 mb-3"
              >
                Đăng ký
              </Button>

              <div className="text-center">
                {isValid ? (
                  <span className="text-success">
                    Thông tin hợp lệ
                  </span>
                ) : (
                  <span className="text-danger">
                    Còn {Object.keys(errors).length}{' '}
                    mục chưa hợp lệ
                  </span>
                )}
              </div>
            </Form>

            {success && (
              <Alert
                variant="success"
                className="mt-4 mb-0"
              >
                {success}
              </Alert>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default ValidatedRegisterForm;