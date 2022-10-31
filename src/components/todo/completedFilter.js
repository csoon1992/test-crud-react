import { Form } from 'react-bootstrap';

export function CompletedFilter({ onChange }) {
  const handleChange = (e) => {
    if (e.target.value === 'none') {
      onChange(null);
      return;
    }

    onChange(e.target.value === 'true');
  };

  return (
    <Form.Select aria-label="Default select example" onChange={handleChange}>
      <option value="none">Select one</option>
      <option value={'true'}>Yes</option>
      <option value={'false'}>No</option>
    </Form.Select>
  );
}
