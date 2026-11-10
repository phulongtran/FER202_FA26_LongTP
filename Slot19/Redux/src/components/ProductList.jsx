
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  Button,
  Row,
  Col,
  Form,
  Badge,
} from 'react-bootstrap';

import {
  selectFilteredProducts,
  selectKeyword,
  setKeyword,
} from '../features/products/productsSlice';

import {
  addToCart,
  selectQtyInCart,
} from '../features/cart/cartSlice';

function ProductList() {
  const dispatch = useDispatch();

  const products = useSelector(selectFilteredProducts);
  const keyword = useSelector(selectKeyword);

  const handleSearch = (e) => {
    dispatch(setKeyword(e.target.value));
  };

  return (
    <div>
      <h3 className="mb-3">Danh sách sản phẩm</h3>

      {/* Tìm kiếm sản phẩm */}
      <Form.Control
        type="text"
        placeholder="Tìm kiếm sản phẩm..."
        value={keyword}
        onChange={handleSearch}
        className="mb-4"
      />

      <Row>
        {products.length > 0 ? (
          products.map((product) => (
            <Col md={6} lg={4} key={product.id} className="mb-4">
              <ProductCard product={product} />
            </Col>
          ))
        ) : (
          <Col>
            <p className="text-muted">
              Không tìm thấy sản phẩm phù hợp.
            </p>
          </Col>
        )}
      </Row>
    </div>
  );
}

function ProductCard({ product }) {
  const dispatch = useDispatch();

  const quantity = useSelector(
    selectQtyInCart(product.id)
  );

  const isOutOfStock = quantity >= product.stock;

  return (
    <Card className="h-100 shadow-sm">
      <Card.Img
        variant="top"
        src={product.image}
        alt={product.name}
        style={{
          height: '180px',
          objectFit: 'cover',
        }}
      />

      <Card.Body className="d-flex flex-column">
        <Card.Title>{product.name}</Card.Title>

        <Card.Text className="text-danger fw-bold">
          {product.price.toLocaleString('vi-VN')} VNĐ
        </Card.Text>

        <div className="mb-3">
          <Badge bg="secondary">
            Trong kho: {product.stock}
          </Badge>

          {quantity > 0 && (
            <Badge bg="success" className="ms-2">
              Trong giỏ: {quantity}
            </Badge>
          )}
        </div>

        <Button
          variant="primary"
          className="mt-auto"
          disabled={isOutOfStock}
          onClick={() => dispatch(addToCart(product))}
        >
          {isOutOfStock ? 'Đã đạt giới hạn kho' : 'Thêm vào giỏ'}
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ProductList;
