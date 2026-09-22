import ProductList from './components/ProductList';
import { products } from './data/products';

function App() {
  return (
    <div className="container my-4">
      <h1 className="mb-4">Danh Sách Sản Phẩm</h1>

      <ProductList products={products} />
    </div>
  );
}

export default App;