import { Button, Col, Row } from 'react-bootstrap';

function ProductList({ products, onAddToCart }) {
  return (
    <Row className="g-4">
      {products.map((product) => (
        <Col key={product.id} md={6} lg={4} xl={3}>
          <div className="border rounded p-3 h-100 d-flex flex-column">
            <h5 className="mb-3">{product.name}</h5>

            <p className="mb-2">
              Giá: {product.price.toLocaleString('vi-VN')} ₫
            </p>

            <p className="mb-2">
              Đánh giá: {product.rating?.rate ?? 0}
            </p>

            <p className="mb-3">
              {product.inStock ? (
                <span className="text-success">Còn hàng</span>
              ) : (
                <span className="text-danger">Hết hàng</span>
              )}
            </p>

            {onAddToCart && (
              <Button
                variant="primary"
                className="mt-auto w-100"
                onClick={() => onAddToCart(product)}
              >
                Thêm vào giỏ
              </Button>
            )}
          </div>
        </Col>
      ))}
    </Row>
  );
}

export default ProductList;