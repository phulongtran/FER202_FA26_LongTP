import Card from 'react-bootstrap/Card';

const fullName = 'Trần Phú Long';
const birthYear = 2004;
const currentYear = 2022;
const major = 'Software Engineering';
const hour = new Date().getHours();

let session = 'sáng';

if (hour >= 12) {
  session = 'chiều';
}

if (hour >= 18) {
  session = 'tối';
}

const age = currentYear - birthYear;

const greeting = `Chào buổi ${session}, ${fullName}!`;

const borderClass = age >= 18 ? 'border-success' : 'border-warning';

function WelcomeCard() {
  return (
    <Card
      className={`shadow-sm ${borderClass}`}
      style={{
        maxWidth: '400px',
        textAlign: 'center',
      }}
    >
      <Card.Header>Thẻ sinh viên</Card.Header>

      <Card.Body>
        <Card.Title>{greeting}</Card.Title>

        <Card.Text>
          Tuổi: {age} tuổi
          <br />
          Chuyên ngành: {major}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default WelcomeCard;