import { Form } from 'react-bootstrap';

function InputField({ id, label, helpText, error, ...inputProps }) {
  return (
    <Form.Group className="mb-3" controlId={id}>
      <Form.Label>
        {label}

        {inputProps.required && (
          <span className="text-danger"> *</span>
        )}
      </Form.Label>

      <Form.Control
        {...inputProps}
        isInvalid={Boolean(error)}
      />

      {error ? (
        <Form.Control.Feedback type="invalid">
          {error}
        </Form.Control.Feedback>
      ) : (
        helpText && <Form.Text>{helpText}</Form.Text>
      )}
    </Form.Group>
  );
}

export default InputField;