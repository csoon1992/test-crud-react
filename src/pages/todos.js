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
      <div className="mb-3">
        <Search value={search} onChange={setSearch} />
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
