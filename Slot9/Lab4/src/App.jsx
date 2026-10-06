import 'bootstrap/dist/css/bootstrap.min.css';

import { useState } from 'react';

import QuantityPicker from './components/QuantityPicker';
import MiniCart from './components/MiniCart';
import ProfilePreview from './components/ProfilePreview';
import ProductFilter from './components/ProductFilter';
import RegisterForm from './components/RegisterForm';
import ValidatedRegisterForm from './components/ValidatedRegisterForm';
import TodoList from './components/TodoList';
import LoginForm from './components/LoginForm';
import Layout from './components/Layout';

import ShopPage from './pages/ShopPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';

import { products } from './data/products';

import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

function AppContent() {
  const [page, setPage] = useState('shop');

  const { login } = useAuth();

  const handleLoginSuccess = (values) => {
    login(values.email);
    setPage('shop');
  };

  return (
    <Layout
      currentPage={page}
      onNavigate={setPage}
    >
      {page === 'shop' && <ShopPage />}

      {page === 'cart' && (
        <CartPage onNavigate={setPage} />
      )}

      {page === 'checkout' && (
        <CheckoutPage onNavigate={setPage} />
      )}

      {page === 'login' && (
        <section className="mx-auto" style={{ maxWidth: '500px' }}>
          <h2 className="text-center mb-4">
            Đăng nhập
          </h2>

          <LoginForm
            onLoginSuccess={handleLoginSuccess}
          />
        </section>
      )}

      <hr className="my-5" />

      <div className="container">
        <h2 className="mb-4">
          Các bài tập trước
        </h2>

        <section className="mb-5">
          <h3 className="mb-3">
            Bài 1 - useState
          </h3>

          <QuantityPicker />

          <QuantityPicker min={2} max={5} />

          <MiniCart />
        </section>

        <hr className="my-5" />

        <section className="mb-5">
          <h3 className="mb-3">
            Bài 2 - Profile Preview
          </h3>

          <ProfilePreview />
        </section>

        <hr className="my-5" />

        <section className="mb-5">
          <h3 className="mb-3">
            Bài 3 - Product Filter
          </h3>

          <ProductFilter products={products} />
        </section>

        <hr className="my-5" />

        <section className="mb-5">
          <h3 className="mb-3">
            Bài 4 - Register Form
          </h3>

          <RegisterForm />
        </section>

        <hr className="my-5" />

        <section className="mb-5">
          <h3 className="mb-3">
            Bài 5 - Validated Register Form
          </h3>

          <ValidatedRegisterForm />
        </section>

        <hr className="my-5" />

        <section className="mb-5">
          <h3 className="mb-3">
            Bài 6 - Todo List
          </h3>

          <TodoList />
        </section>
      </div>
    </Layout>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;