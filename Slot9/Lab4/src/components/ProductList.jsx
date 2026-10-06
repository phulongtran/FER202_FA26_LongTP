import { Col, Row } from 'react-bootstrap';

function ProductList({ products, onAddToCart }) {
  return (
    <Row className="g-4">
      {products.map((product) => (
        <Col key={product.id} md={6} lg={4} xl={3}>
          <div className="border rounded p-3 h-100">
            <h5>{product.name}</h5>

            <p className="mb-1">
              Giá: {product.price.toLocaleString('vi-VN')} ₫
            </p>

            <p className="mb-1">
              Đánh giá: {product.rating?.rate ?? 0}
            </p>

            <p className="mb-3">
              {product.inStock ? (
                <span className="text-success">
                  Còn hàng
                </span>
              ) : (
                <span className="text-danger">
                  Hết hàng
                </span>
              )}
            </p>

            {onAddToCart && (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => onAddToCart(product)}
              >
                Thêm vào giỏ
              </button>
            )}
          </div>
        </Col>
      ))}
    </Row>
  );
}

export default ProductList;