import { Button, Container, Navbar } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

function Header() {
  const { theme, toggleTheme } = useTheme();
  const { user, isLoggedIn, logout } = useAuth();

  return (
    <Navbar
      expand="lg"
      className="border-bottom"
      bg={theme === 'light' ? 'light' : 'dark'}
      variant={theme === 'light' ? 'light' : 'dark'}
    >
      <Container>
        <Navbar.Brand href="#">
          React App
        </Navbar.Brand>

        <div className="d-flex align-items-center gap-2">
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
            <span>Chưa đăng nhập</span>
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
      </Container>
    </Navbar>
  );
}

export default Header;