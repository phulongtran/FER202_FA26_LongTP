import Table from 'react-bootstrap/Table';
import ListGroup from 'react-bootstrap/ListGroup';
import { cartItems } from '../data/cart';

function CartTable() {
  const formatVND = (price) => {
    return price.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
  };

  // Sắp xếp sản phẩm theo thành tiền giảm dần
  const sortedItems = [...cartItems].sort((a, b) => {
    return b.price * b.quantity - a.price * a.quantity;
  });

  // Tính tổng tiền
  const totalPrice = cartItems.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  // Tính tổng số lượng
  const totalQuantity = cartItems.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

  // Tìm sản phẩm có đơn giá cao nhất
  const maxPrice = Math.max(
    ...cartItems.map((item) => item.price)
  );

  // Lọc sản phẩm đang giảm giá và còn hàng
  const saleItems = cartItems.filter(
    (item) => item.discount > 0 && item.inStock
  );

  return (
    <div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>STT</th>
            <th>Hình ảnh</th>
            <th>Tên sản phẩm</th>
            <th>Đơn giá</th>
            <th>Số lượng</th>
            <th>Thành tiền</th>
          </tr>
        </thead>

        <tbody>
          {sortedItems.map(
            ({ id, name, price, quantity, image }) => (
              <tr key={id}>
                <td>{id}</td>

                <td>
                  <img
                    src={image}
                    alt={name}
                    width="100"
                    height="70"
                    style={{
                      objectFit: 'cover',
                      borderRadius: '8px',
                    }}
                  />
                </td>

                <td>{name}</td>

                <td>{formatVND(price)}</td>

                <td>{quantity}</td>

                <td>
                  {formatVND(price * quantity)}
                </td>
              </tr>
            )
          )}
        </tbody>

        <tfoot>
          <tr>
            <th colSpan="3">Tổng tiền</th>
            <th>{formatVND(totalPrice)}</th>
            <th>{totalQuantity}</th>
            <th>-</th>
          </tr>

          <tr>
            <th colSpan="5">Đơn giá cao nhất</th>
            <th>{formatVND(maxPrice)}</th>
          </tr>
        </tfoot>
      </Table>

      <h5 className="text-center mt-4">
        Sản phẩm đang giảm giá và còn hàng
      </h5>

      <ListGroup className="mt-3">
        {saleItems.map(
          ({ id, name, discount }) => (
            <ListGroup.Item key={id}>
              {name} - Giảm {discount}%
            </ListGroup.Item>
          )
        )}
      </ListGroup>
    </div>
  );
}

export default CartTable;