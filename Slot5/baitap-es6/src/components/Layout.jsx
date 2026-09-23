import Container from 'react-bootstrap/Container';

import Header from './Header';
import Footer from './Footer';

function Layout({
  children,
  title = 'Trang chủ',
}) {
  return (
    <div className="min-vh-100 d-flex flex-column">

      <Header />

      <main className="flex-grow-1">
        <Container className="py-5">

          <h1 className="text-center mb-5">
            {title}
          </h1>

          <div className="d-flex justify-content-center">
            {children}
          </div>

        </Container>
      </main>

      <Footer />

    </div>
  );
}

export default Layout;