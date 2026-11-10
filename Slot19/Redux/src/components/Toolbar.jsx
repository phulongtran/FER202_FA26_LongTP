
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button, Badge } from 'react-bootstrap';

import {
  setKeyword,
  setSortBy,
  selectAverageGpa,
} from '../features/students/studentsSlice';

export default function Toolbar({ onAdd }) {
  const { keyword, sortBy, items } = useSelector(
    (state) => state.students
  );

  const avg = useSelector(selectAverageGpa);

  const dispatch = useDispatch();

  return (
    <div className="d-flex flex-wrap gap-2 align-items-center mb-3">

      {/* Tìm kiếm */}
      <Form.Control
        style={{ maxWidth: 260 }}
        placeholder="Tìm theo tên / mã SV..."
        value={keyword}
        onChange={(e) =>
          dispatch(setKeyword(e.target.value))
        }
      />

      {/* Sắp xếp */}
      <Form.Select
        style={{ maxWidth: 180 }}
        value={sortBy}
        onChange={(e) =>
          dispatch(setSortBy(e.target.value))
        }
      >
        <option value="code">Sắp xếp: Mã SV</option>
        <option value="name">Sắp xếp: Họ tên</option>
        <option value="gpa">Sắp xếp: GPA ↓</option>
      </Form.Select>

      {/* Tổng số sinh viên */}
      <Badge bg="info" className="p-2">
        Tổng: {items.length}
      </Badge>

      {/* GPA trung bình */}
      <Badge bg="success" className="p-2">
        GPA TB: {avg}
      </Badge>

      {/* Nút thêm sinh viên */}
      <Button
        className="ms-auto"
        onClick={onAdd}
      >
        + Thêm sinh viên
      </Button>

    </div>
  );
}
