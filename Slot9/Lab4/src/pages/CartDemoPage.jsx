import { useReducer } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import ProductList from '../components/ProductList';
import CartSummary from '../components/CartSummary';

import { products } from '../data/products';

import {
  CART_ACTIONS,
  cartReducer,
  initialCart,
} from '../reducers/cartReducer';

function CartDemoPage() {
  const [cart, dispatch] = useReducer(
    cartReducer,
    initialCart
  );

  const handleAddToCart = (product) => {
    dispatch({
      type: CART_ACTIONS.ADD,
      payload: product,
    });
  };

  return (
    <Container className="py-4">
      <h1 className="text-center mb-5">
        Giỏ hàng với useReducer
      </h1>

      <Row className="g-4">
        <Col lg={7}>
          <h3 className="mb-4">
            Danh sách sản phẩm
          </h3>

          <ProductList
            products={products}
            onAddToCart={handleAddToCart}
          />
        </Col>

        <Col lg={5}>
          <CartSummary
            cart={cart}
            dispatch={dispatch}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default CartDemoPage;