import React, { useEffect, useRef} from 'react';
import { Button } from 'react-bootstrap';
import {FaSearch} from 'react-icons/fa';
import './style.css';


import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

const columnHelper = createColumnHelper()

const columns = [
	columnHelper.accessor('year', {
		header: () => <span>Year</span>,
		cell: (info) => info.getValue(),
		width: '45px',
	}),
	columnHelper.accessor('fork', {
		id: 'fork',
		cell: (info) => info.renderValue(),
		header: () => <span>Fork</span>,
		width: '65px',
	}),
	columnHelper.accessor('model', {
		header: () => 'Model',
		cell: (info) => info.renderValue(),
		width: '60px',
	}),
	columnHelper.accessor('damperType', {
		header: () => <span>Damper</span>,
		width: '70px',
	}),
	columnHelper.accessor('springType', {
		header: () => <span>Spring</span>,
		width: '70px',
	}),
];

const RockshoxSearchResultsTable = (props) => {
  const [data, setData] = React.useState(() => [...props.searchResults])
  const rerender = React.useReducer(() => ({}), {})[1]

// const sendSelectedProductInformation = (rowData) => {
//   console.log(rowData);
// }

const handleClick = (rowData) => {
 console.log(rowData);
}

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
		<div className='p-2'>
			<table style={{ backgroundColor: 'black', color: 'white', border: '1px solid whitesmoke', borderRadius: '5px' }}>
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row) => (
						<tr key={row.id}>
							{row.getVisibleCells().map((cell) => (
								<td style={{ padding: '0.25rem', border: '1px solid whitesmoke' }} key={cell.id}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
							<td style={{ width: '30px' }}>
								<Button className='btn-dark' onClick={() => props.sendSelectedProductInformation(row.original)}>
									<FaSearch style={{ backgroundColor: 'transparent', color: 'white' }} size={12} />
								</Button>
							</td>
						</tr>
					))}
				</tbody>
				<tfoot>
					{table.getFooterGroups().map((footerGroup) => (
						<tr key={footerGroup.id}>
							{footerGroup.headers.map((header) => (
								<th key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.footer, header.getContext())}</th>
							))}
						</tr>
					))}
				</tfoot>
			</table>
		</div>
	);
}
export default RockshoxSearchResultsTable;
