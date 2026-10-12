
import { Link } from "react-router-dom";
import { Container, Table, Badge } from "react-bootstrap";
import { courses } from "../data/courses";

function CourseListPage() {
  return (
    <Container className="page-container">
      <p className="section-label">COURSE CATALOG</p>

      <h1 className="page-title">Danh sách môn học</h1>

      <p className="page-description">
        Danh sách các môn học trong chương trình đào tạo.
        Bấm vào mã môn để xem thông tin chi tiết.
      </p>

      <div className="table-responsive">
        <Table bordered hover responsive="md" className="course-table">
          <thead>
            <tr>
              <th>Mã môn</th>
              <th>Tên môn học</th>
              <th>Số tín chỉ</th>
              <th>Học kỳ</th>
            </tr>
          </thead>

          <tbody>
            {courses.map((course) => (
              <tr key={course.code}>
                <td>
                  <Link
                    to={`/courses/${course.code}`}
                    className="course-code-link"
                  >
                    {course.code}
                  </Link>
                </td>

                <td>{course.name}</td>

                <td>
                  <Badge bg="primary">{course.credits} tín chỉ</Badge>
                </td>

                <td>{course.semester}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
}

export default CourseListPage;
