import { Alert, Badge, Button, Table } from 'react-bootstrap';
import {
  CART_ACTIONS,
  MAX_QUANTITY,
  getCartTotals,
} from '../reducers/cartReducer';

const formatVND = (value) => {
  return `${value.toLocaleString('vi-VN')} ₫`;
};

function CartSummary({ cart, dispatch }) {
  const { totalQuantity, totalPrice } =
    getCartTotals(cart);

  const handleIncrease = (id) => {
    dispatch({
      type: CART_ACTIONS.INCREASE,
      payload: id,
    });
  };

  const handleDecrease = (id) => {
    dispatch({
      type: CART_ACTIONS.DECREASE,
      payload: id,
    });
  };

  const handleRemove = (id) => {
    dispatch({
      type: CART_ACTIONS.REMOVE,
      payload: id,
    });
  };

  const handleClear = () => {
    dispatch({
      type: CART_ACTIONS.CLEAR,
    });
  };

  return (
    <div>
      <h3 className="mb-4">
        Giỏ hàng{' '}
        <Badge bg="primary">
          {totalQuantity}
        </Badge>
      </h3>

      {cart.items.length === 0 ? (
        <Alert variant="info">
          Giỏ hàng đang trống
        </Alert>
      ) : (
        <>
          <Table responsive bordered hover>
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>Đơn giá</th>
                <th>Số lượng</th>
                <th>Thành tiền</th>
                <th>Thao tác</th>
              </tr>
            </thead>

            <tbody>
              {cart.items.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>

                  <td>
                    {formatVND(item.price)}
                  </td>

                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() =>
                          handleDecrease(item.id)
                        }
                      >
                        −
                      </Button>

                      <span className="fw-bold">
                        {item.quantity}
                      </span>

                      <Button
                        variant="outline-secondary"
                        size="sm"
                        disabled={
                          item.quantity >= MAX_QUANTITY
                        }
                        onClick={() =>
                          handleIncrease(item.id)
                        }
                      >
                        +
                      </Button>
                    </div>
                  </td>

                  <td>
                    {formatVND(
                      item.price * item.quantity
                    )}
                  </td>

                  <td>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() =>
                        handleRemove(item.id)
                      }
                    >
                      Xóa
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>

            <tfoot>
              <tr>
                <th colSpan="3" className="text-end">
                  Tổng cộng:
                </th>

                <th colSpan="2">
                  {formatVND(totalPrice)}
                </th>
              </tr>
            </tfoot>
          </Table>

          <div className="text-end">
            <Button
              variant="danger"
              onClick={handleClear}
            >
              Xóa toàn bộ giỏ
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartSummary;