import ProductCard from './components/ProductCard';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const productA = {
  id: 1,
  name: 'Tai nghe Bluetooth',
  price: 590000,
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuvbGj_iMdSpUmMsCBCC9G90WlEsOQ5JVSigrqmdnHpw&s=10',
  rating: {
    rate: 4.5,
    count: 120,
  },
  category: {
    name: 'Âm thanh',
  },
};

const productB = {
  id: 2,
  name: 'Chuột không dây',
  price: 0,
  image: 'https://file.hstatic.net/1000129940/file/logitech_g502_x_plus_wireless_rgb_a6ee322046c5442fbb65c4afe9cda068_grande.png',
  rating: {
    rate: 4.2,
    count: 80,
  },
  category: null,
};

const productC = {
  id: 3,
  name: 'Bàn phím cơ',
  price: 890000,
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkaHe1Y5-SXMoyM8pwv7qF9iUo3HtcXJPXQfm3bcm6aQ&s=10',
  rating: {
    rate: 4.8,
    count: 200,
  },
  category: {
    name: 'Phụ kiện',
  },
};

function App() {
  return (
    <div className="container my-4">
      <h1 className="mb-4">Danh Sách Sản Phẩm</h1>

      <Row className="g-4">
        <Col md={4}>
          <ProductCard product={productA} />
        </Col>

        <Col md={4}>
          <ProductCard product={productB} />
        </Col>

        <Col md={4}>
          <ProductCard product={productC} />
        </Col>
      </Row>
    </div>
  );
}

export default App;