import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import AppNavbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import About from './pages/About';
import New from './pages/New';
import Contact from './pages/Contact';

function App() {
  return (
    <BrowserRouter>
      <AppNavbar />

      <Container className="mt-4 text-end">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/new" element={<New />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Container>

      <Footer />
    </BrowserRouter>
  );
}

export default App;