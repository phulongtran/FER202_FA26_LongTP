import { Badge, Button, Container, Nav, Navbar } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

function Header({ currentPage, onNavigate }) {
  const { theme, toggleTheme } = useTheme();
  const { user, isLoggedIn, logout } = useAuth();
  const { totalQuantity } = useCart();

  const menuItems = [
    { key: 'shop', label: 'Cửa hàng' },
    { key: 'cart', label: 'Giỏ hàng' },
    { key: 'checkout', label: 'Thanh toán' },
  ];

  const handleNavigate = (e, key) => {
    e.preventDefault();
    onNavigate(key);
  };

  return (
    <Navbar
      expand="lg"
      className="border-bottom"
      bg={theme === 'light' ? 'light' : 'dark'}
      variant={theme === 'light' ? 'light' : 'dark'}
    >
      <Container>
        <Navbar.Brand href="#" onClick={(e) => handleNavigate(e, 'shop')}>
          FPT Shop Mini
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />

        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            {menuItems.map((item) => (
              <Nav.Link
                key={item.key}
                href="#"
                active={currentPage === item.key}
                onClick={(e) => handleNavigate(e, item.key)}
              >
                {item.label}

                {item.key === 'cart' && totalQuantity > 0 && (
                  <Badge bg="primary" className="ms-2">
                    {totalQuantity}
                  </Badge>
                )}
              </Nav.Link>
            ))}
          </Nav>

          <div className="d-flex align-items-center gap-2 mt-3 mt-lg-0">
            {isLoggedIn ? (
              <>
                <span>
                  Xin chào, {user.name}
                </span>

                <Button
                  variant={
                    theme === 'light'
                      ? 'outline-danger'
                      : 'outline-light'
                  }
                  size="sm"
                  onClick={logout}
                >
                  Đăng xuất
                </Button>
              </>
            ) : (
              <Button
                variant={
                  theme === 'light'
                    ? 'outline-primary'
                    : 'outline-light'
                }
                size="sm"
                onClick={() => onNavigate('login')}
              >
                Đăng nhập
              </Button>
            )}

            <Button
              variant={
                theme === 'light'
                  ? 'outline-dark'
                  : 'outline-light'
              }
              size="sm"
              onClick={toggleTheme}
            >
              {theme === 'light' ? '🌙 Tối' : '☀️ Sáng'}
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;