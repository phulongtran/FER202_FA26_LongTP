
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

function MyProduct({
  id,
  name,
  description,
  price,
  discount,
  instock,
  rating,
  category,
  image
}) {
  const formatPrice = (amount) =>
    amount.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0
    });

  const discountedPrice = price * (1 - discount / 100);

  const canAddToCart = discount > 0 && instock > 0;

  return (
    <Card className="h-100 shadow-sm">
        <Card.Img
  variant="top"
  src={image}
  alt={name}
  style={{
    height: '220px',
    objectFit: 'contain',
    padding: '12px'
  }}
/>
      <Card.Body className="d-flex flex-column text-start">
        <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
          <Badge bg="secondary">{category}</Badge>
          <small className="text-muted">ID: {id}</small>
        </div>

        <Card.Title>{name}</Card.Title>

        <Card.Text className="text-secondary">
          {description}
        </Card.Text>

        <div className="mb-2">
          {discount > 0 ? (
            <>
              <div className="text-muted text-decoration-line-through">
                {formatPrice(price)}
              </div>

              <div className="text-danger fw-bold fs-5">
                {formatPrice(discountedPrice)}
              </div>

              <Badge bg="danger">-{discount}%</Badge>
            </>
          ) : (
            <div className="fw-bold fs-5">
              {formatPrice(price)}
            </div>
          )}
        </div>

        <p className="mb-2">
          <strong>Đánh giá:</strong>{' '}
          <span className="text-warning">★</span> {rating}/5
        </p>

        <p className="mb-3">
          <strong>Tồn kho:</strong>{' '}
          {instock > 0 ? (
            <Badge bg="success">Còn {instock} sản phẩm</Badge>
          ) : (
            <Badge bg="secondary">Hết hàng</Badge>
          )}
        </p>

        <div className="mt-auto">
          {canAddToCart && (
            <Button
              variant="primary"
              className="w-100"
              onClick={() => alert(`Đã thêm ${name} vào giỏ hàng!`)}
            >
              Thêm vào giỏ
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default MyProduct;
