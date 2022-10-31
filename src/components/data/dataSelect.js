import { Form } from 'react-bootstrap';

export function DataSelect({ onChange, fetchFn, valueKey, labelKey }) {
  const { data, isLoading } = fetchFn();

  const handleChange = (e) => {
    onChange(e.target.value);
  };

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <Form.Select aria-label="Default select example" onChange={handleChange}>
      {data.map((item) => (
        <option key={item[valueKey]} value={item[valueKey]}>
          {item[labelKey]}
        </option>
      ))}
    </Form.Select>
  );
}
