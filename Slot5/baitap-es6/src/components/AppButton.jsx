import Button from 'react-bootstrap/Button';

function AppButton({
  children,
  type = 'button',
  variant = 'primary',
  className = '',
}) {
  return (
    <Button
      type={type}
      variant={variant}
      className={className}
    >
      {children}
    </Button>
  );
}

export default AppButton;