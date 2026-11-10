
import { Container, Row, Col, Navbar } from 'react-bootstrap';

import Counter from './components/Counter';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import CartBadge from './components/CartBadge';

function App() {
  return (
    <>
      <Navbar bg="dark" variant="dark" className="mb-4">
        <Container>
          <Navbar.Brand>Redux Practice</Navbar.Brand>
          <CartBadge />
        </Container>
      </Navbar>

      <Container className="pb-5">
        {/* Bài 1 */}
        <h2 className="mb-3">Bài 1: Redux Counter</h2>
        <Counter />

        <hr className="my-5" />

        {/* Bài 4 */}
        <h2 className="mb-4">
          Bài 4: Shopping Cart - Redux Toolkit
        </h2>

        <Row>
          <Col lg={12}>
            <ProductList />
          </Col>
        </Row>

        <Cart />
      </Container>
    </>
  );
}

export default App;
