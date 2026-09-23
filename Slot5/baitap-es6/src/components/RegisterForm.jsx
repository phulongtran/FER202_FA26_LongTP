import Form from 'react-bootstrap/Form';

import InputField from './InputField';
import AppButton from './AppButton';

import {
  fields,
  genders,
  majors,
} from '../data/registerConfig';

function RegisterForm() {
  const handleSubmit = (event) => {
    event.preventDefault();

    alert('Đăng ký thành công!');
  };

  return (
    <div className="d-flex justify-content-center">
      <div style={{ width: '350px' }}>
        <Form onSubmit={handleSubmit}>

          <h6 className="text-center mb-3">
            Đăng ký tài khoản
          </h6>

          {fields.map((field) => (
            <InputField
              key={field.id}
              {...field}
            />
          ))}

          <Form.Group className="mb-3">
            <Form.Label className="d-block text-center">
              Giới tính
            </Form.Label>

            <div className="d-flex justify-content-center gap-3">
              {genders.map((gender) => (
                <Form.Check
                  key={gender}
                  type="radio"
                  id={`gender-${gender}`}
                  name="gender"
                  label={gender}
                  value={gender}
                />
              ))}
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              Chuyên ngành
            </Form.Label>

            <Form.Select name="major" required>
              <option value="">
                -- Chọn chuyên ngành --
              </option>

              {majors.map((major) => (
                <option key={major} value={major}>
                  {major}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <div className="d-flex justify-content-center">
              <Form.Check
                type="checkbox"
                id="terms"
                label="Tôi đồng ý với các điều khoản sử dụng"
                required
              />
            </div>
          </Form.Group>

          <div className="text-center">
            <AppButton type="submit">
              Đăng ký
            </AppButton>
          </div>

        </Form>
      </div>
    </div>
  );
}

export default RegisterForm;