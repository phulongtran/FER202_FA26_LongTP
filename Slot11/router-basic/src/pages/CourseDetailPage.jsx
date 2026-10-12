
import { Link, useParams } from "react-router-dom";
import { Container, Card, Badge, Alert, Button } from "react-bootstrap";
import { findCourse } from "../data/courses";

function CourseDetailPage() {
  const { code } = useParams();
  const course = findCourse(code);

  if (!course) {
    return (
      <Container className="page-container">
        <Alert variant="danger">
          Không tìm thấy môn học có mã {code}
        </Alert>

        <Button
          as={Link}
          to="/courses"
          variant="outline-primary"
        >
          ← Quay lại danh sách
        </Button>
      </Container>
    );
  }

  return (
    <Container className="page-container">
      <p className="section-label">COURSE DETAILS</p>

      <h1 className="page-title">Chi tiết môn học</h1>

      <Card className="course-detail-card">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-start flex-wrap gap-3 mb-4">
            <div>
              <Badge bg="primary" className="mb-3">
                {course.code}
              </Badge>

              <h2 className="course-detail-title">
                {course.name}
              </h2>
            </div>
          </div>

          <div className="course-info-grid">
            <div className="course-info-item">
              <span className="course-info-label">Mã môn học</span>
              <strong>{course.code}</strong>
            </div>

            <div className="course-info-item">
              <span className="course-info-label">Học kỳ</span>
              <strong>{course.semester}</strong>
            </div>

            <div className="course-info-item">
              <span className="course-info-label">Số tín chỉ</span>
              <strong>{course.credits}</strong>
            </div>
          </div>

          <hr />

          <h3 className="course-description-heading">
            Mô tả môn học
          </h3>

          <p className="course-detail-description">
            {course.desc}
          </p>

          <Button
            as={Link}
            to="/courses"
            variant="outline-primary"
          >
            ← Quay lại danh sách
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default CourseDetailPage;
