import ProductCard from './components/ProductCard';
import { products } from './data/products';

function App() {
  const product = products[0];

  return (
    <div className="container my-4">
      <ProductCard
        product={{
          ...product,
          discount: 30,
        }}
      />
    </div>
  );
}

export default App;