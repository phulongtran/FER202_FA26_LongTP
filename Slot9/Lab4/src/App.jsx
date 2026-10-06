import 'bootstrap/dist/css/bootstrap.min.css';
import QuantityPicker from './components/QuantityPicker';
import MiniCart from './components/MiniCart';
import ProfilePreview from './components/ProfilePreview';
import ProductFilter from './components/ProductFilter';
import { products } from './data/products';
import RegisterForm from './components/RegisterForm';
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
    </div>
  );
}

export default App;