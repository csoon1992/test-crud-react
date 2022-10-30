import { Form } from 'react-bootstrap';

export function Search({ value, onChange }) {
  return (
    <Form.Control
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value.trim())}
      placeholder="search..."
    />
  );
}
