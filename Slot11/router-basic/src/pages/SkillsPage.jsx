
import { Container, ListGroup } from "react-bootstrap";

const skills = [
  "HTML, CSS, JavaScript",
  "ReactJS và React Hooks",
  "React Router DOM",
  "Bootstrap và thiết kế giao diện responsive",
  "Git và GitHub",
  "REST API và MongoDB",
];

function SkillsPage() {
  return (
    <Container className="page-container">
      <p className="section-label">WHAT I CAN DO</p>
      <h1 className="page-title">Kỹ năng của mình</h1>
      <p className="page-description">
        Những công nghệ và kỹ năng mình đang học tập, phát triển.
      </p>

      <ListGroup className="skills-list">
        {skills.map((skill, index) => (
          <ListGroup.Item key={skill}>
            <span className="skill-number">
              {String(index + 1).padStart(2, "0")}
            </span>
            {skill}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}

export default SkillsPage;
