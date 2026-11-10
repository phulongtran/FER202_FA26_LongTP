
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Button, Spinner } from 'react-bootstrap';

import {
  addStudent,
  updateStudent,
} from '../features/students/studentsSlice';

const EMPTY = {
  code: '',
  name: '',
  email: '',
  gpa: '',
  major: 'SE',
};

export default function StudentFormModal({ show, onHide, editing }) {
  const dispatch = useDispatch();

  const saving = useSelector((state) => state.students.saving);

  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  // Khi mở modal, nạp dữ liệu cần sửa hoặc form trống
  useEffect(() => {
    if (show) {
      setForm(
        editing
          ? { ...editing, gpa: String(editing.gpa) }
          : EMPTY
      );

      setErrors({});
      setServerError('');
    }
  }, [show, editing]);

  // Cập nhật dữ liệu form
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Kiểm tra dữ liệu
  const validate = () => {
    const e = {};

    if (!/^[A-Z]{2}\d{6}$/i.test(form.code)) {
      e.code = 'Mã SV dạng HE170001';
    }

    if (form.name.trim().length < 2) {
      e.name = 'Họ tên tối thiểu 2 ký tự';
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      e.email = 'Email không hợp lệ';
    }

    const gpa = Number(form.gpa);

    if (
      form.gpa === '' ||
      isNaN(gpa) ||
      gpa < 0 ||
      gpa > 10
    ) {
      e.gpa = 'GPA từ 0 đến 10';
    }

    setErrors(e);

    return Object.keys(e).length === 0;
  };

  // Gửi dữ liệu
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const data = {
      ...form,
      code: form.code.toUpperCase(),
      gpa: Number(form.gpa),
    };

    try {
      if (editing) {
        await dispatch(updateStudent(data)).unwrap();
      } else {
        await dispatch(addStudent(data)).unwrap();
      }

      onHide();
    } catch (err) {
      setServerError(err);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Form onSubmit={handleSubmit} noValidate>
        <Modal.Header closeButton>
          <Modal.Title>
            {editing ? 'Sửa sinh viên' : 'Thêm sinh viên'}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {serverError && (
            <div className="alert alert-danger py-2">
              {serverError}
            </div>
          )}

          <Form.Group className="mb-2">
            <Form.Label>Mã SV</Form.Label>

            <Form.Control
              name="code"
              value={form.code}
              onChange={handleChange}
              isInvalid={!!errors.code}
              disabled={!!editing}
            />

            <Form.Control.Feedback type="invalid">
              {errors.code}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Họ tên</Form.Label>

            <Form.Control
              name="name"
              value={form.name}
              onChange={handleChange}
              isInvalid={!!errors.name}
            />

            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Email</Form.Label>

            <Form.Control
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
            />

            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex gap-2">
            <Form.Group className="flex-fill">
              <Form.Label>GPA</Form.Label>

              <Form.Control
                name="gpa"
                type="number"
                step="0.1"
                value={form.gpa}
                onChange={handleChange}
                isInvalid={!!errors.gpa}
              />

              <Form.Control.Feedback type="invalid">
                {errors.gpa}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="flex-fill">
              <Form.Label>Chuyên ngành</Form.Label>

              <Form.Select
                name="major"
                value={form.major}
                onChange={handleChange}
              >
                <option value="SE">
                  SE – Kỹ thuật phần mềm
                </option>

                <option value="AI">
                  AI – Trí tuệ nhân tạo
                </option>

                <option value="IA">
                  IA – An toàn thông tin
                </option>
              </Form.Select>
            </Form.Group>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={onHide}
          >
            Hủy
          </Button>

          <Button type="submit" disabled={saving}>
            {saving && (
              <Spinner size="sm" className="me-2" />
            )}

            {editing ? 'Cập nhật' : 'Thêm'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
