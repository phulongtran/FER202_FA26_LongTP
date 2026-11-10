
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Table,
  Button,
  Spinner,
  Alert,
  Badge,
} from 'react-bootstrap';

import {
  fetchStudents,
  deleteStudent,
  clearError,
  selectVisibleStudents,
  selectStudentsState,
} from '../features/students/studentsSlice';

export default function StudentTable({ onEdit }) {
  const students = useSelector(selectVisibleStudents);
  const { status, error, saving } = useSelector(selectStudentsState);
  const dispatch = useDispatch();

  // Tự động tải danh sách khi component được mở
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchStudents());
    }
  }, [status, dispatch]);

  // Xử lý xóa sinh viên
  const handleDelete = async (student) => {
    if (!window.confirm(`Xóa sinh viên ${student.name}?`)) {
      return;
    }

    try {
      await dispatch(deleteStudent(student.id)).unwrap();
    } catch {
      // Lỗi đã được lưu vào state.error
    }
  };

  // Đang tải dữ liệu
  if (status === 'loading') {
    return (
      <div className="text-center p-5">
        <Spinner animation="border" />
      </div>
    );
  }

  // Không tải được dữ liệu
  if (status === 'failed') {
    return (
      <Alert variant="danger">
        Không tải được dữ liệu: {error}.
        Bạn đã chạy npm start (hoặc npm run server) chưa?{' '}
        <Button
          size="sm"
          onClick={() => dispatch(fetchStudents())}
        >
          Thử lại
        </Button>
      </Alert>
    );
  }

  return (
    <>
      {error && (
        <Alert
          variant="warning"
          dismissible
          onClose={() => dispatch(clearError())}
        >
          {error}
        </Alert>
      )}

      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Mã SV</th>
            <th>Họ tên</th>
            <th>Email</th>
            <th className="text-center">GPA</th>
            <th>Ngành</th>
            <th className="text-center">Thao tác</th>
          </tr>
        </thead>

        <tbody>
          {students.length === 0 && (
            <tr>
              <td
                colSpan={7}
                className="text-center text-muted"
              >
                Không có dữ liệu
              </td>
            </tr>
          )}

          {students.map((student, index) => (
            <tr key={student.id}>
              <td>{index + 1}</td>
              <td>{student.code}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>

              <td className="text-center">
                <Badge
                  bg={
                    student.gpa >= 8
                      ? 'success'
                      : student.gpa >= 5
                      ? 'primary'
                      : 'danger'
                  }
                >
                  {student.gpa}
                </Badge>
              </td>

              <td>{student.major}</td>

              <td className="text-center text-nowrap">
                <Button
                  size="sm"
                  variant="warning"
                  className="me-1"
                  onClick={() => onEdit(student)}
                >
                  Sửa
                </Button>

                <Button
                  size="sm"
                  variant="danger"
                  disabled={saving}
                  onClick={() => handleDelete(student)}
                >
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
