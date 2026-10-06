import 'bootstrap/dist/css/bootstrap.min.css';
import QuantityPicker from './components/QuantityPicker';
import MiniCart from './components/MiniCart';
import ProfilePreview from './components/ProfilePreview';
import ProductFilter from './components/ProductFilter';
import { products } from './data/products';
import RegisterForm from './components/RegisterForm';
import ValidatedRegisterForm from './components/ValidatedRegisterForm';
import TodoList from './components/TodoList';
function App() {
  return (
    <div className="container py-4">
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
<div className="mb-5">
        <h2 className="text-center mb-4">
          Bài 6 - Todo List
        </h2>
        <TodoList />
      </div>
    </div>
  );
}

export default App;