import 'bootstrap/dist/css/bootstrap.min.css';

import QuantityPicker from './components/QuantityPicker';
import MiniCart from './components/MiniCart';
import ProfilePreview from './components/ProfilePreview';
import ProductFilter from './components/ProductFilter';
import RegisterForm from './components/RegisterForm';
import ValidatedRegisterForm from './components/ValidatedRegisterForm';
import TodoList from './components/TodoList';
import CartDemoPage from './pages/CartDemoPage';
import LoginForm from './components/LoginForm';
import Layout from './components/Layout';

import { products } from './data/products';

import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';

function HomeContent() {
  const { isLoggedIn, login } = useAuth();

  return (
    <>
      {!isLoggedIn ? (
        <section className="mb-5">
          <h2 className="text-center mb-4">
            Bài 8 - Form đăng nhập với useReducer
          </h2>

          <LoginForm
            onLoginSuccess={(values) => login(values.email)}
          />
        </section>
      ) : (
        <section className="mb-5">
          <div className="text-center py-4">
            <h2>Chào mừng bạn đến trang chủ</h2>
            <p className="text-body-secondary mb-0">
              Bạn đã đăng nhập thành công.
            </p>
          </div>
        </section>
      )}
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Layout>
          <div className="container py-4">

            <HomeContent />

            <hr className="my-5" />

            <h1 className="mb-4">Bài 1 - useState</h1>

            <QuantityPicker />

            <QuantityPicker min={2} max={5} />

            <MiniCart />

            <hr className="my-5" />

            <ProfilePreview />

            <hr className="my-5" />

            <h1 className="mb-4">Bài 3 - Product Filter</h1>

            <ProductFilter products={products} />

            <hr className="my-5" />

            <div className="mb-5">
              <h2 className="text-center mb-4">
                Bài 4 - Register Form
              </h2>

              <RegisterForm />
            </div>

            <hr className="my-5" />

            <div className="mb-5">
              <h2 className="text-center mb-4">
                Bài 5 - Validated Register Form
              </h2>

              <ValidatedRegisterForm />
            </div>

            <hr className="my-5" />

            <div className="mb-5">
              <h2 className="text-center mb-4">
                Bài 6 - Todo List
              </h2>

              <TodoList />
            </div>

            <hr className="my-5" />

            <div className="mb-5">
              <h2 className="text-center mb-4">
                Bài 7 - Giỏ hàng với useReducer
              </h2>

              <CartDemoPage />
            </div>

          </div>
        </Layout>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;