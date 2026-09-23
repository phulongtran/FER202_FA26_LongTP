import Form from 'react-bootstrap/Form';

function InputField({
  id,
  label,
  type,
  placeholder,
  required,
  helpText,
}) {
  return (
    <Form.Group className="mb-3" controlId={id}>
      <Form.Label>{label}</Form.Label>

      <Form.Control
        type={type}
        placeholder={placeholder}
        required={required}
      />

      {helpText && (
        <Form.Text className="text-muted">
          {helpText}
        </Form.Text>
      )}
    </Form.Group>
  );
}

export default InputField;