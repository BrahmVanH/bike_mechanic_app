// import React from 'react';
// import { Table } from 'react-bootstrap';

// function OilChart({product}) {

// 	console.log(product[0]);
// if (product[0]?.damperUpperVolume) {
// 	const { damperUpperVolume, damperUpperOilWt, damperLowerVolume, damperLowerOilWt, springUpperVolume, springUpperOilWt, springLowerVolume, springLowerOilWt } = product[0];

// 	return (
// 		<Table>
// 			<thead>
// 				<tr>
// 					<th>Damper Side</th>
// 					<th>Spring Size</th>
// 				</tr>
// 			</thead>
// 			<tbody>
// 				<tr>
// 					<td>Upper Tube</td>
// 					<td>Lower Tube</td>
// 					<td>Upper Tube</td>
// 					<td>Lower Tube</td>
// 				</tr>
// 				<tr>
// 					<td>{damperUpperVolume} mL</td>
// 					<td>{damperLowerVolume} mL</td>
// 					<td>{springUpperVolume} </td>
// 					<td>{springLowerVolume} mL</td>
// 				</tr>
// 				<tr>
// 					<td>{damperUpperOilWt} wt</td>
// 					<td>{damperLowerOilWt} wt</td>
// 					<td>{springUpperOilWt}</td>
// 					<td>{springLowerOilWt} wt</td>
// 				</tr>
// 			</tbody>
// 		</Table>
// 	);
// } else {
// 	return (
// 		<p>Loading Fork Oil Volume information</p>
// 	)
// }
// }

// export default OilChart;

import React from 'react';
import { useTable } from 'react-table';

function OilChart({ product }) {
	const data = React.useMemo(
		() => [
			{
				damper: product.damperUpperVolume,
				spring: product.springUpperVolume,
			},
			{
				damper: product.damperLowerVolume,
				spring: product.springLowerVolume,
			},
			{
				damper: product.damperUpperOilWt,
				spring: product.springUpperOilWt,
			},
			//... add more data rows as needed
		],
		[product]
	);

	const columns = React.useMemo(
		() => [
			{
				Header: 'Type',
				columns: [
					{
						Header: 'Damper',
						accessor: 'damper', // accessor is the "key" in the data
					},
					{
						Header: 'Spring',
						accessor: 'spring',
					},
				],
			},
		],
		[]
	);

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

	return (
		<table {...getTableProps()}>
			<thead>
				{headerGroups.map((headerGroup) => (
					<tr {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map((column) => (
							<th {...column.getHeaderProps()}>{column.render('Header')}</th>
						))}
					</tr>
				))}
			</thead>
			<tbody {...getTableBodyProps()}>
				{rows.map((row) => {
					prepareRow(row);
					return (
						<tr {...row.getRowProps()}>
							{row.cells.map((cell) => (
								<td {...cell.getCellProps()}>{cell.render('Cell')}</td>
							))}
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}

export default OilChart;
