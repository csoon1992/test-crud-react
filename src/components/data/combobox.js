import { createRef, useState } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead'; // ES2015
import uniqid from 'uniqid';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

export function Combobox({ onChange, fetchFn, value, labelKey, id, placeholder }) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching, refetch } = fetchFn(
    { search, page },
    {
      refetchOnMountOrArgChange: true
    }
  );
  const ref = createRef();
  const [uniqueId] = useState(id ?? uniqid());

  const handleSearch = async (query) => {
    setPage(1);
    setSearch(query);
  };

  const handlePaginate = async () => {
    setPage(page + 1);
    refetch();
  };

  const handleSelection = (selectedItem) => {
    console.log({ selectedItem });
    onChange(selectedItem?.[0] ?? null);
  };

  const options = Array.from(new Set([value, ...(data ?? [])].filter((item) => !!item)));

  if (!data) {
    return <div>loading...</div>;
  }

  console.log({ data });

  return (
    <Typeahead
      id={uniqueId}
      ref={ref}
      isLoading={isLoading || isFetching}
      filterBy={() => true}
      defaultSelected={value}
      labelKey={labelKey}
      options={options}
      paginate
      onPaginate={handlePaginate}
      onSearch={handleSearch}
      onChange={handleSelection}
      renderInput={({ inputRef, referenceElementRef, ...inputProps }) => (
        <InputGroup>
          <Form.Control
            {...inputProps}
            ref={(input) => {
              // Be sure to correctly handle these refs. In many cases, both can simply receive
              // the underlying input node, but `referenceElementRef can receive a wrapper node if
              // your custom input is more complex (See TypeaheadInputMulti for an example).
              inputRef(input);
              referenceElementRef(input);
            }}
          />
          <Button
            variant="outline-secondary"
            onClick={() => ref?.current.toggleMenu()}
            onMouseDown={(e) => {
              // Prevent input from losing focus.
              e.preventDefault();
            }}
            aria-label="open dropdown">
            <ChevronDownIcon style={{ width: '1rem', height: '1rem' }}></ChevronDownIcon>
          </Button>
        </InputGroup>
      )}
      placeholder={placeholder}></Typeahead>
  );
}
