import React from 'react';
import { Table } from 'react-bootstrap/Table';

function OilChart(product) {
	return (
		<Table>
			<thead>
				<tr>
					<th>Damper Side</th>
					<th>Spring Size</th>
				</tr>
				<tbody>
					<tr>
						<td>Upper Tube</td>
						<td>Lower Tube</td>
						<td>Upper Tube</td>
						<td>Lower Tube</td>
					</tr>
					<tr>
						<td>{product.damperUpperVolume} mL</td>
						<td>{product.damperLowerVolume} mL</td>
						<td>{product.springUpperVolume} mL</td>
						<td>{product.springLowerVolume} mL</td>
					</tr>
					<tr>
						<td>{product.damperUpperOilWt} wt</td>
						<td>{product.damperLowerWt} wt</td>
						<td>{product.springUpperOilWt}</td>
						<td>{product.springLowerOilWt} wt</td>
					</tr>
				</tbody>
			</thead>
		</Table>
	);
}
