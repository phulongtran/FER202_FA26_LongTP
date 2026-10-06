import 'bootstrap/dist/css/bootstrap.min.css';
import QuantityPicker from './components/QuantityPicker';
import MiniCart from './components/MiniCart';
import ProfilePreview from './components/ProfilePreview';

function App() {
  return (
    <div className="container py-4">
      <h1 className="mb-4">Bài 1 - useState</h1>

      <QuantityPicker />

      <QuantityPicker min={2} max={5} />

      <MiniCart />

      <hr className="my-5" />

      <ProfilePreview />
    </div>
  );
}

export default App;