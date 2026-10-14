import Container from 'react-bootstrap/Container';

function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <Container className="text-center">
        <h5>Lab5</h5>
        <p className="mb-1">
          Website thực hành React Router và React-Bootstrap.
        </p>
        <p className="mb-1">
          Các trang: Home, About, New, Contact.
        </p>
        <p className="mb-0">
          &copy; 2026 Lab5. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}

export default Footer;