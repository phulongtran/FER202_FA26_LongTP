
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import products from '../data/products';
import MyProduct from '../components/MyProduct';

function ProductList() {
  return (
    <Container fluid className="my-4">
      <h1 className="mb-4 text-start">Danh sách sản phẩm</h1>

      <Row className="g-4">
        {products.map((product) => (
          <Col key={product.id} xs={12} sm={6} lg={4} xl={3}>
            <MyProduct {...product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ProductList;
