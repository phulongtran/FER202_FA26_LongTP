import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import MyProduct from '../components/MyProduct';
import products from '../data/products';

function Products() {
  return (
    <Container className="my-4">
      <h1 className="mb-4">Danh sách sản phẩm</h1>

      <Row className="g-4">
        {products.map((product) => (
          <Col key={product.id} xs={12} md={6} lg={4}>
            <MyProduct {...product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Products;