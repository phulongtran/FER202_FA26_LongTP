
import { Badge } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectCartCount } from '../features/cart/cartSlice';

function CartBadge() {
  const cartCount = useSelector(selectCartCount);

  return (
    <div className="d-flex align-items-center gap-2">
      <span>Giỏ hàng</span>

      <Badge bg="danger" pill>
        {cartCount}
      </Badge>
    </div>
  );
}

export default CartBadge;
