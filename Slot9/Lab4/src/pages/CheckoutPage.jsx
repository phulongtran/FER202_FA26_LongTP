import { useState } from 'react';
import {
  Alert,
  Button,
  Card,
  Form,
} from 'react-bootstrap';

import InputField from '../components/InputField';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const SHIPPING_FEE = 30000;
const FREE_SHIPPING_THRESHOLD = 1000000;

function validateCheckout(values) {
  const errors = {};

  if (!values.receiver.trim()) {
    errors.receiver = 'Vui lòng nhập người nhận';
  } else if (values.receiver.trim().length < 3) {
    errors.receiver = 'Người nhận phải có ít nhất 3 ký tự';
  }

  if (!values.phone.trim()) {
    errors.phone = 'Vui lòng nhập số điện thoại';
  } else if (!/^0\d{9}$/.test(values.phone.trim())) {
    errors.phone =
      'Số điện thoại phải gồm 10 số và bắt đầu bằng 0';
  }

  if (!values.address.trim()) {
    errors.address = 'Vui lòng nhập địa chỉ';
  } else if (values.address.trim().length < 10) {
    errors.address =
      'Địa chỉ phải có ít nhất 10 ký tự';
  }

  if (!values.paymentMethod) {
    errors.paymentMethod =
      'Vui lòng chọn phương thức thanh toán';
  }

  return errors;
}

function CheckoutPage({ onNavigate }) {
  const { user } = useAuth();
  const { cart, totalPrice, clearCart } = useCart();

  const [values, setValues] = useState({
    receiver: user?.name ?? '',
    phone: '',
    address: '',
    paymentMethod: '',
    note: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [order, setOrder] = useState(null);

  const errors = validateCheckout(values);

  const errorOf = (name) => {
    return submitted ? errors[name] : '';
  };

  const shippingFee =
    totalPrice >= FREE_SHIPPING_THRESHOLD
      ? 0
      : SHIPPING_FEE;

  const totalPayment = totalPrice + shippingFee;

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);

    if (Object.keys(errors).length > 0) {
      return;
    }

    const newOrder = {
      id: `DH${Math.floor(
        100000 + Math.random() * 900000
      )}`,
      receiver: values.receiver.trim(),
      phone: values.phone.trim(),
      address: values.address.trim(),
      paymentMethod: values.paymentMethod,
      note: values.note.trim(),
      totalPrice,
      shippingFee,
      totalPayment,
      items: cart.items,
    };

    setOrder(newOrder);
    clearCart();
  };

  if (order) {
    return (
      <Card className="shadow-sm">
        <Card.Body className="text-center p-4">
          <Alert variant="success">
            <h4 className="mb-3">
              Đặt hàng thành công
            </h4>

            <p className="mb-1">
              Mã đơn hàng:{' '}
              <strong>{order.id}</strong>
            </p>

            <p className="mb-1">
              Người nhận:{' '}
              <strong>{order.receiver}</strong>
            </p>

            <p className="mb-0">
              Tổng thanh toán:{' '}
              <strong>
                {order.totalPayment.toLocaleString('vi-VN')} ₫
              </strong>
            </p>
          </Alert>

          <Button
            onClick={() => onNavigate('shop')}
          >
            Tiếp tục mua sắm
          </Button>
        </Card.Body>
      </Card>
    );
  }

  if (cart.items.length === 0) {
    return (
      <Alert variant="info">
        Giỏ hàng đang trống.

        <div className="mt-3">
          <Button onClick={() => onNavigate('shop')}>
            Quay lại cửa hàng
          </Button>
        </div>
      </Alert>
    );
  }

  return (
    <div>
      <h1 className="mb-4">
        Thanh toán
      </h1>

      <div className="row g-4">
        <div className="col-lg-7">
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="mb-4">
                Thông tin giao hàng
              </Card.Title>

              <Form
                noValidate
                onSubmit={handleSubmit}
              >
                <InputField
                  id="receiver"
                  name="receiver"
                  label="Người nhận"
                  type="text"
                  placeholder="Nguyễn Văn A"
                  value={values.receiver}
                  onChange={handleChange}
                  error={errorOf('receiver')}
                  required
                />

                <InputField
                  id="phone"
                  name="phone"
                  label="Số điện thoại"
                  type="tel"
                  placeholder="09xxxxxxxx"
                  value={values.phone}
                  onChange={handleChange}
                  error={errorOf('phone')}
                  required
                />

                <InputField
                  id="address"
                  name="address"
                  label="Địa chỉ"
                  as="textarea"
                  rows={2}
                  placeholder="Nhập địa chỉ giao hàng"
                  value={values.address}
                  onChange={handleChange}
                  error={errorOf('address')}
                  required
                />

                <Form.Group className="mb-3">
                  <Form.Label>
                    Phương thức thanh toán
                    <span className="text-danger"> *</span>
                  </Form.Label>

                  <div>
                    <Form.Check
                      type="radio"
                      name="paymentMethod"
                      id="payment-cod"
                      label="COD"
                      value="COD"
                      checked={
                        values.paymentMethod === 'COD'
                      }
                      onChange={handleChange}
                    />

                    <Form.Check
                      type="radio"
                      name="paymentMethod"
                      id="payment-bank"
                      label="Chuyển khoản"
                      value="Chuyển khoản"
                      checked={
                        values.paymentMethod ===
                        'Chuyển khoản'
                      }
                      onChange={handleChange}
                    />

                    <Form.Check
                      type="radio"
                      name="paymentMethod"
                      id="payment-wallet"
                      label="Ví điện tử"
                      value="Ví điện tử"
                      checked={
                        values.paymentMethod ===
                        'Ví điện tử'
                      }
                      onChange={handleChange}
                    />
                  </div>

                  {errorOf('paymentMethod') && (
                    <div className="text-danger small mt-1">
                      {errorOf('paymentMethod')}
                    </div>
                  )}
                </Form.Group>

                <InputField
                  id="note"
                  name="note"
                  label="Ghi chú"
                  as="textarea"
                  rows={2}
                  placeholder="Ghi chú cho đơn hàng (không bắt buộc)"
                  value={values.note}
                  onChange={handleChange}
                />

                <Button
                  type="submit"
                  className="w-100"
                >
                  Đặt hàng
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>

        <div className="col-lg-5">
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="mb-4">
                Tóm tắt đơn hàng
              </Card.Title>

              {cart.items.map((item) => (
                <div
                  key={item.id}
                  className="d-flex justify-content-between border-bottom py-2"
                >
                  <div>
                    <div>{item.name}</div>
                    <small className="text-body-secondary">
                      {item.quantity} ×{' '}
                      {item.price.toLocaleString('vi-VN')} ₫
                    </small>
                  </div>

                  <strong>
                    {(item.price * item.quantity).toLocaleString(
                      'vi-VN'
                    )}{' '}
                    ₫
                  </strong>
                </div>
              ))}

              <div className="d-flex justify-content-between mt-3">
                <span>Tiền hàng:</span>
                <strong>
                  {totalPrice.toLocaleString('vi-VN')} ₫
                </strong>
              </div>

              <div className="d-flex justify-content-between mt-2">
                <span>Phí giao hàng:</span>
                <strong>
                  {shippingFee === 0
                    ? 'Miễn phí'
                    : `${shippingFee.toLocaleString(
                        'vi-VN'
                      )} ₫`}
                </strong>
              </div>

              <hr />

              <div className="d-flex justify-content-between">
                <strong>Tổng thanh toán:</strong>

                <strong className="text-primary">
                  {totalPayment.toLocaleString('vi-VN')} ₫
                </strong>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;