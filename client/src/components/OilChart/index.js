import React from 'react';
import { Table } from 'react-bootstrap';

function OilChart({product}) {

	console.log(product[0]);

	const { damperUpperVolume, damperUpperOilWt, damperLowerVolume, damperLowerOilWt, springUpperVolume, springUpperOilWt, springLowerVolume, springLowerOilWt } = product[0];
 
	return (
		<Table>
			<thead>
				<tr>
					<th>Damper Side</th>
					<th>Spring Size</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Upper Tube</td>
					<td>Lower Tube</td>
					<td>Upper Tube</td>
					<td>Lower Tube</td>
				</tr>
				<tr>
					<td>{damperUpperVolume} mL</td>
					<td>{damperLowerVolume} mL</td>
					<td>{springUpperVolume} mL</td>
					<td>{springLowerVolume} mL</td>
				</tr>
				<tr>
					<td>{damperUpperOilWt} wt</td>
					<td>{damperLowerOilWt} wt</td>
					<td>{springUpperOilWt}</td>
					<td>{springLowerOilWt} wt</td>
				</tr>
			</tbody>
		</Table>
	);
}

export default OilChart;
