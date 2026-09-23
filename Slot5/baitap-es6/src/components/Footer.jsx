import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
function Footer() {
  return (
    <footer className="bg-dark text-white py-3 mt-auto">
      <Container>
        <p className="text-center mb-0">
          © {new Date().getFullYear()} ES6 Shop. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}

export default Footer;