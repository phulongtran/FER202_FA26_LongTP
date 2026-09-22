import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

const StudentCard = ({ student }) => {
  const {
    id,
    name,
    major,
    gpa,
    avatar,
    contact: {
      email: studentEmail,
      phone,
    },
  } = student;

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img
        variant="top"
        src={avatar}
        alt={name}
        style={{
          width: '120px',
          height: '120px',
          objectFit: 'cover',
          borderRadius: '50%',
          margin: '20px auto 10px',
        }}
      />

      <Card.Body className="text-center">
        <Card.Title>{name}</Card.Title>

        <Card.Subtitle className="mb-2 text-muted">
          {id}
        </Card.Subtitle>

        <Card.Text>
          {major}
        </Card.Text>
      </Card.Body>

      <ListGroup variant="flush" className="text-center">
        <ListGroup.Item>
          GPA: {gpa}
        </ListGroup.Item>

        <ListGroup.Item>
          Email: {studentEmail}
        </ListGroup.Item>

        <ListGroup.Item>
          Số điện thoại: {phone}
        </ListGroup.Item>
      </ListGroup>

      <Card.Body className="text-center">
        <Button variant="primary">
          Xem hồ sơ
        </Button>
      </Card.Body>
    </Card>
  );
};

export default StudentCard;