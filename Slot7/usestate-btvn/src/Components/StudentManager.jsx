import React, { useState } from 'react';
import { Container, Card, Form, Table, Button, Badge, Row, Col, InputGroup } from 'react-bootstrap';

// Dữ liệu ban đầu & Danh sách thành phố
const CITIES = ['Hà Nội', 'Đà Nẵng', 'TP.HCM', 'Cần Thơ'];

const initialStudents = [
  { id: 1, name: 'Nguyễn Văn An', score: 8.5, contact: { city: 'Hà Nội' } },
  { id: 2, name: 'Trần Thị Bình', score: 4.5, contact: { city: 'Đà Nẵng' } },
  { id: 3, name: 'Lê Minh Châu', score: 6, contact: { city: 'TP.HCM' } },
];

export default function StudentManager() {
  // 3 State quản lý
  const [students, setStudents] = useState(initialStudents);
  const [newName, setNewName] = useState('');
  const [sortBy, setSortBy] = useState('none'); // 'none' | 'name' | 'score'

  // 1. Thêm sinh viên mới
  const handleAddStudent = (e) => {
    e.preventDefault();
    if (newName.trim().length < 3) return;

    const newStudent = {
      id: Date.now(),
      name: newName.trim(),
      score: 0,
      contact: { city: CITIES[0] },
    };

    setStudents((prev) => [...prev, newStudent]);
    setNewName('');
  };

  // 2. Cập nhật điểm (kẹp trong khoảng 0 - 10)
  const handleUpdateScore = (id, textValue) => {
    const rawNum = Number(textValue);
    // Kẹp điểm từ 0 đến 10
    const clampedScore = Math.min(10, Math.max(0, isNaN(rawNum) ? 0 : rawNum));

    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, score: clampedScore } : s))
    );
  };

  // 3. Cập nhật thành phố (Deep copy 2 cấp đúng chuẩn bất biến)
  const handleUpdateCity = (id, city) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              contact: {
                ...s.contact,
                city,
              },
            }
          : s
      )
    );
  };

  // 4. Xóa sinh viên
  const handleRemoveStudent = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  // 5. Thưởng +0.5 điểm cho cả lớp (không vượt quá 10)
  const handleBonusAll = () => {
    setStudents((prev) =>
      prev.map((s) => ({
        ...s,
        score: Math.min(10, Number((s.score + 0.5).toFixed(1))),
      }))
    );
  };

  // 6. Dữ liệu dẫn xuất: Sắp xếp (tạo mảng sao chép [...students] để KHÔNG làm biến đổi state gốc)
  const sortedStudents = [...students].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name, 'vi');
    }
    if (sortBy === 'score') {
      return b.score - a.score; // Cao -> Thấp
    }
    return 0; // 'none': giữ nguyên thứ tự nhập
  });

  // 7. Dữ liệu dẫn xuất: Thống kê số liệu
  const totalStudents = students.length;
  const averageScore =
    totalStudents === 0
      ? '0.00'
      : (
          students.reduce((acc, s) => acc + s.score, 0) / totalStudents
        ).toFixed(2);
  const passedCount = students.filter((s) => s.score >= 5).length;

  return (
    <Container className="my-4" style={{ maxWidth: '900px' }}>
      <Card className="shadow-sm">
        <Card.Body>
          <Card.Title className="mb-4 text-center">
            Bài 4: Bảng quản lý điểm sinh viên
          </Card.Title>

          {/* Form thêm sinh viên mới & Thanh điều khiển */}
          <Row className="g-3 mb-4 align-items-end">
            <Col md={5}>
              <Form onSubmit={handleAddStudent}>
                <Form.Label className="fw-semibold">Họ và tên sinh viên:</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Nhập họ tên (ít nhất 3 ký tự)"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={newName.trim().length < 3}
                  >
                    Thêm
                  </Button>
                </InputGroup>
              </Form>
            </Col>

            <Col md={4}>
              <Form.Label className="fw-semibold">Sắp xếp danh sách:</Form.Label>
              <Form.Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="none">Thứ tự nhập</option>
                <option value="name">Theo tên A → Z</option>
                <option value="score">Điểm cao → thấp</option>
              </Form.Select>
            </Col>

            <Col md={3} className="text-end">
              <Button
                variant="success"
                className="w-100"
                onClick={handleBonusAll}
                disabled={totalStudents === 0}
              >
                +0.5 cả lớp
              </Button>
            </Col>
          </Row>

          {/* Bảng danh sách sinh viên */}
          <Table striped bordered hover responsive align="middle">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Họ tên</th>
                <th style={{ width: '130px' }}>Điểm (0–10)</th>
                <th style={{ width: '160px' }}>Thành phố</th>
                <th style={{ width: '110px' }}>Kết quả</th>
                <th style={{ width: '80px' }} className="text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {sortedStudents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center text-muted py-3">
                    Danh sách trống.
                  </td>
                </tr>
              ) : (
                sortedStudents.map((student, index) => (
                  <tr key={student.id}>
                    <td>{index + 1}</td>
                    <td className="fw-semibold">{student.name}</td>
                    <td>
                      <Form.Control
                        type="number"
                        min={0}
                        max={10}
                        step={0.5}
                        value={student.score}
                        onChange={(e) =>
                          handleUpdateScore(student.id, e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <Form.Select
                        value={student.contact.city}
                        onChange={(e) =>
                          handleUpdateCity(student.id, e.target.value)
                        }
                      >
                        {CITIES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </Form.Select>
                    </td>
                    <td>
                      {student.score >= 5 ? (
                        <Badge bg="success">Đạt</Badge>
                      ) : (
                        <Badge bg="danger">K hông đạt</Badge>
                      )}
                    </td>
                    <td className="text-center">
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleRemoveStudent(student.id)}
                      >
                        Xóa
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>

          {/* Thống kê phía dưới bảng */}
          <div className="bg-light p-3 rounded text-center fw-semibold text-secondary">
            Sĩ số: {totalStudents} · Điểm trung bình: {averageScore} · Đạt: {passedCount}/{totalStudents}
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}