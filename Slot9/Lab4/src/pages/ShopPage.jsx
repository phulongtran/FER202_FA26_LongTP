import { useState } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import ProductFilter from '../components/ProductFilter';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

function ShopPage() {
  const { addToCart } = useCart();

  const [toastMessage, setToastMessage] = useState('');

  const handleAddToCart = (product) => {
    addToCart(product);

    setToastMessage(`Đã thêm ${product.name} vào giỏ`);
  };

  return (
    <>
      <div className="mb-4">
        <h1 className="text-center mb-2">
          FPT Shop Mini
        </h1>

        <p className="text-center text-body-secondary">
          Cửa hàng công nghệ mini
        </p>
      </div>

      <ProductFilter
        products={products}
        onAddToCart={handleAddToCart}
      />

      <ToastContainer
        position="top-end"
        className="p-3"
      >
        <Toast
          show={Boolean(toastMessage)}
          onClose={() => setToastMessage('')}
          autohide
          delay={2000}
        >
          <Toast.Header>
            <strong className="me-auto">
              Giỏ hàng
            </strong>
          </Toast.Header>

          <Toast.Body>
            {toastMessage}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

export default ShopPage;