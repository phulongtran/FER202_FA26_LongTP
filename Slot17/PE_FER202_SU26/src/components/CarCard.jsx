import { Badge, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { formatVND, getFinalPrice } from '../utils/format';

/**
 * ===================== CarCard – TODO-04 (1.0) · TODO-05 (1.0) =====================
 * Props: car = { id, name, image, price, discount, stock, year, fuel, brand? }, onAddToCart
 * ĐÃ CÓ SẴN: Card + ảnh, tên xe (chữ thường), biến outOfStock, nút "Thêm vào giỏ".
 * Kiểm tra ở /cars: Toyota Vios G (giảm 5%), Honda City RS (không giảm), Toyota Camry 2.5Q (hết xe).
 *
 * TODO-04  Tên là <Link to={`/cars/${id}`}>{name}</Link>;
 *          có brand thì hiện <Badge bg="info">{brand.name}</Badge>;
 *          hiện <small className="text-muted">Đời {year} · {fuel}</small>.
 * TODO-05  Giá sau giảm <span className="text-danger fw-bold">{formatVND(getFinalPrice(car))}</span>;
 *          discount > 0 → giá gốc gạch ngang (text-decoration-line-through) + <Badge bg="danger">-{discount}%</Badge>;
 *          outOfStock → <Badge bg="secondary">Hết xe</Badge>, nút disabled và đổi chữ thành "Hết xe".
 * ======================================================================================
 */
export default function CarCard({ car, onAddToCart }) {
  const { id, name, image, price, discount, stock, year, fuel, brand } = car;
  const outOfStock = stock === 0;

  return (
    <Card className="h-100 shadow-sm">
      <Card.Img variant="top" src={image} alt={name} style={{ height: '180px', objectFit: 'contain', padding: '12px' }}/>
      <Card.Body className="d-flex flex-column">
        {/* TODO-04: đổi tên thành Link tới /cars/{id} */}
     <Card.Title as="h6">
  <Link to={`/cars/${id}`} className="text-decoration-none text-dark">
    {name}
  </Link>
</Card.Title>

<div className="mb-2 d-flex flex-wrap gap-2 align-items-center">
  {brand && (
    <Badge bg="info">{brand.name}</Badge>
  )}

  <small className="text-muted">
    Đời {year} · {fuel}
  </small>
</div>

<div className="mt-auto">
  <div className="mb-2">
    <span className="text-danger fw-bold">
      {formatVND(getFinalPrice(car))}
    </span>

    {discount > 0 && (
      <div className="d-flex align-items-center gap-2 mt-1">
        <small className="text-muted text-decoration-line-through">
          {formatVND(price)}
        </small>

        <Badge bg="danger">-{discount}%</Badge>
      </div>
    )}
  </div>

  {outOfStock && (
    <Badge bg="secondary">Hết xe</Badge>
  )}

  <Button
    className="w-100 mt-2"
    disabled={outOfStock}
    onClick={() => onAddToCart?.(car)}
  >
    {outOfStock ? 'Hết xe' : 'Thêm vào giỏ'}
  </Button>
</div>
      </Card.Body>
    </Card>
  );
}
