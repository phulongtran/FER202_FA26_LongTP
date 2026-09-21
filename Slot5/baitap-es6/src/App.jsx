import StudentCard from './components/StudentCard';

const student1 = {
  id: 'SE1701',
  name: 'Nguyễn Văn An',
  major: 'Software Engineering',
  gpa: 8.5,
  avatar: 'https://i.pravatar.cc/200?img=12',
  contact: {
    email: 'an.nv@fpt.edu.vn',
    phone: '0901 234 567',
  },
};

const student2 = {
  id: 'SE1702',
  name: 'Trần Minh Anh',
  major: 'Software Engineering',
  gpa: 9.0,
  avatar: 'https://i.pravatar.cc/200?img=5',
  contact: {
    email: 'anh.tm@fpt.edu.vn',
    phone: '0902 345 678',
  },
};

const student3 = {
  id: 'SE1703',
  name: 'Lê Hoàng Nam',
  major: 'Software Engineering',
  gpa: 7.8,
  avatar: 'https://i.pravatar.cc/200?img=11',
  contact: {
    email: 'nam.lh@fpt.edu.vn',
    phone: '0903 456 789',
  },
};

function App() {
  return (
    <div className="container my-4">
      <h1 className="mb-4">Danh Sách Sinh Viên</h1>

      <div className="d-flex gap-3 flex-wrap">
        <StudentCard student={student1} />
        <StudentCard student={student2} />
        <StudentCard student={student3} />
      </div>
    </div>
  );
}

export default App;