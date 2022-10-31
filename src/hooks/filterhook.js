import { useState } from 'react';

export function useFilters(initial = {}) {
  const [filters, setFilters] = useState(initial);

  const addFilter = (field, value) => {
    setFilters({ ...filters, [field]: value });
  };

  return [filters, addFilter];
}
