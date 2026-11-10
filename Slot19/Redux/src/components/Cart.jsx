
import { useDispatch, useSelector } from 'react-redux';
import {
  Table,
  Button,
  Badge,
} from 'react-bootstrap';

import {
  selectCartItems,
  selectCartTotal,
  increaseQty,
  decreaseQty,
  removeFromCart,
  clearCart,
} from '../features/cart/cartSlice';

function Cart() {
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  const formatPrice = (price) =>
    price.toLocaleString('vi-VN') + ' VNĐ';

  return (
    <div className="mt-4">
      <h3 className="mb-3">
        Giỏ hàng
        <Badge bg="primary" className="ms-2">
          {cartItems.length} sản phẩm
        </Badge>
      </h3>

      {cartItems.length === 0 ? (
        <div className="alert alert-info">
          Giỏ hàng hiện đang trống.
        </div>
      ) : (
        <>
          <Table responsive bordered hover>
            <thead className="table-light">
              <tr>
                <th>Sản phẩm</th>
                <th>Đơn giá</th>
                <th>Số lượng</th>
                <th>Thành tiền</th>
                <th>Thao tác</th>
              </tr>
            </thead>

            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>

                  <td>{formatPrice(item.price)}</td>

                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline-secondary"
                        onClick={() =>
                          dispatch(decreaseQty(item.id))
                        }
                      >
                        -
                      </Button>

                      <span>{item.quantity}</span>

                      <Button
                        size="sm"
                        variant="outline-secondary"
                        disabled={item.quantity >= item.stock}
                        onClick={() =>
                          dispatch(increaseQty(item.id))
                        }
                      >
                        +
                      </Button>
                    </div>
                  </td>

                  <td>
                    {formatPrice(item.price * item.quantity)}
                  </td>

                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() =>
                        dispatch(removeFromCart(item.id))
                      }
                    >
                      Xóa
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="d-flex justify-content-between align-items-center">
            <h5>
              Tổng tiền: {formatPrice(total)}
            </h5>

            <Button
              variant="outline-danger"
              onClick={() => dispatch(clearCart())}
            >
              Xóa toàn bộ giỏ hàng
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
