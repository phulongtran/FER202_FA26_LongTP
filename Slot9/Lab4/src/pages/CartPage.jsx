import { Alert, Button, Card } from 'react-bootstrap';
import CartSummary from '../components/CartSummary';
import { useCart } from '../context/CartContext';

function CartPage({ onNavigate }) {
  const { cart, dispatch } = useCart();

  if (cart.items.length === 0) {
    return (
      <Card className="shadow-sm">
        <Card.Body className="text-center py-5">
          <Alert variant="info">
            Giỏ hàng đang trống.
          </Alert>

          <Button onClick={() => onNavigate('shop')}>
            Tiếp tục mua sắm
          </Button>
        </Card.Body>
      </Card>
    );
  }

  return (
    <div>
      <h1 className="mb-4">
        Giỏ hàng
      </h1>

      <CartSummary
        cart={cart}
        dispatch={dispatch}
      />

      <div className="text-end mt-4">
        <Button
          variant="primary"
          onClick={() => onNavigate('checkout')}
        >
          Tiến hành thanh toán
        </Button>
      </div>
    </div>
  );
}

export default CartPage;