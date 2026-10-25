
import { useEffect, useState, useCallback } from 'react';
import { Alert, Container } from 'react-bootstrap';
import {
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import Navbar from '../components/Navbar';

export default function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [flash, setFlash] = useState(null);

  const notify = useCallback((type, message) => {
    setFlash({ type, message });
  }, []);

  useEffect(() => {
    const message = location.state?.flash;

    if (!message) return;

    setFlash(
      typeof message === 'string'
        ? { type: 'success', message }
        : message
    );

    navigate(
      `${location.pathname}${location.search}${location.hash}`,
      {
        replace: true,
        state: null,
      }
    );
  }, [
    location.key,
    location.state,
    location.pathname,
    location.search,
    location.hash,
    navigate,
  ]);

  return (
    <>
      <Navbar />

      <Container className="py-4">
        {flash && (
          <Alert
            variant={flash.type || 'success'}
            dismissible
            onClose={() => setFlash(null)}
          >
            {flash.message}
          </Alert>
        )}

        <Outlet context={{ notify }} />
      </Container>
    </>
  );
}
