
import { useState } from 'react';
import { Container } from 'react-bootstrap';

import Toolbar from './components/Toolbar';
import StudentTable from './components/StudentTable';
import StudentFormModal from './components/StudentFormModal';

export default function App() {
  const [show, setShow] = useState(false);
  const [editing, setEditing] = useState(null);

  // Mở form thêm sinh viên
  const openAdd = () => {
    setEditing(null);
    setShow(true);
  };

  // Mở form chỉnh sửa sinh viên
  const openEdit = (student) => {
    setEditing(student);
    setShow(true);
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4">
        🎓 Quản lý Sinh viên — Redux Toolkit
      </h2>

      <Toolbar onAdd={openAdd} />

      <StudentTable onEdit={openEdit} />

      <StudentFormModal
        show={show}
        onHide={() => setShow(false)}
        editing={editing}
      />
    </Container>
  );
}
