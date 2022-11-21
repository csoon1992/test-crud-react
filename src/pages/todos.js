import { useGetAllTodosQuery } from '../state/api/todosSlice';
import Table from 'react-bootstrap/Table';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table';
import { Form } from 'react-bootstrap';
import { useState } from 'react';
import { Search } from '../components/data/search';
import { AddTodoButton } from '../components/todo/addButton';
import { CompletedFilter } from '../components/todo/completedFilter';
import { useFilters } from '../hooks/filterhook';
import { Combobox } from '../components/data/combobox';

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor('title', {
    header: 'Titulo'
  }),
  columnHelper.accessor('completed', {
    header: 'Completo',
    cell: (completed) => <Form.Check checked={completed.getValue()} readOnly />
  })
];

export function Todos() {
  const [search, setSearch] = useState();
  const { data, isLoading } = useGetAllTodosQuery(search);
  const [filters, addFilter] = useFilters();

  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <div>
        <h2>Filtros</h2>
        <Combobox
          onChange={(selected) => addFilter('title', selected?.title)}
          labelKey="title"
          fetchFn={useGetAllTodosQuery}
          placeholder="elige uno..."
        />
        <CompletedFilter onChange={(value) => addFilter('completed', value)} />
        {JSON.stringify(filters)}
      </div>
      <div className="d-flex flex-row">
        <Search value={search} onChange={setSearch} />
        <AddTodoButton />
      </div>
      <Table striped bordered hover>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.footer, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </Table>
    </div>
  );
}
