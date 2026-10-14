import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import AppNavbar from './components/Navbar';
import MyCarousel from './components/MyCarousel';
import Footer from './components/Footer';

import Home from './pages/Home';
import About from './pages/About';
import New from './pages/New';
import Contact from './pages/Contact';
import Products from './pages/Products';
import ProductList from './pages/ProductList';
function App() {
  return (
    <BrowserRouter>
      <AppNavbar />

      <MyCarousel />

      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/new" element={<New />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Container>

      <Footer />
    </BrowserRouter>
  );
}

export default App;