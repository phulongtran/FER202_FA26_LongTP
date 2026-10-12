
import { Container, Row, Col, Card, Badge } from "react-bootstrap";

const projects = [
  {
    id: 1,
    name: "PreOnic",
    description:
      "Nền tảng kết nối nông dân và doanh nghiệp thông qua các hợp đồng bao tiêu nông sản trước mùa vụ.",
    technologies: ["React", "Node.js", "MongoDB"],
  },
  {
    id: 2,
    name: "Be.Travel",
    description:
      "Nền tảng hỗ trợ người Việt tìm hiểu pháp luật, xử lý tình huống và tìm kiếm địa điểm hỗ trợ khi đi du lịch nước ngoài.",
    technologies: ["React", "REST API", "AI"],
  },
  {
    id: 3,
    name: "Learning Management System",
    description:
      "Website hỗ trợ quản lý khóa học, nội dung học tập và quá trình học của người dùng.",
    technologies: ["React", "Express", "MongoDB"],
  },
];

function ProjectsPage() {
  return (
    <Container className="page-container">
      <p className="section-label">MY RECENT WORK</p>
      <h1 className="page-title">Dự án của mình</h1>
      <p className="page-description">
        Một số dự án mình đã thực hiện trong quá trình học tập.
      </p>

      <Row className="g-4">
        {projects.map((project) => (
          <Col key={project.id} xs={12} md={6} lg={4}>
            <Card className="project-card h-100">
              <Card.Body className="d-flex flex-column">
                <span className="project-number">
                  PROJECT 0{project.id}
                </span>

                <Card.Title className="project-title">
                  {project.name}
                </Card.Title>

                <Card.Text className="project-description">
                  {project.description}
                </Card.Text>

                <div className="technology-list mt-auto">
                  {project.technologies.map((technology) => (
                    <Badge
                      key={technology}
                      bg="light"
                      text="dark"
                      className="technology-badge"
                    >
                      {technology}
                    </Badge>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ProjectsPage;
