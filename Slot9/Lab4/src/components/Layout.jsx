import { Container } from 'react-bootstrap';
import Header from './Header';
import { useTheme } from '../context/ThemeContext';

function Layout({ children, currentPage, onNavigate }) {
  const { theme } = useTheme();

  return (
    <div
      data-bs-theme={theme}
      className="bg-body text-body min-vh-100"
    >
      <Header
        currentPage={currentPage}
        onNavigate={onNavigate}
      />

      <Container className="py-4">
        {children}
      </Container>
    </div>
  );
}

export default Layout;