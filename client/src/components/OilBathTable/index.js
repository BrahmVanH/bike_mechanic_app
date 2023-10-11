import React, { useEffect, useRef } from 'react';
import Handsontable from 'handsontable';

import { checkSpringUpperTubeData, checkDamperUpperTubeData } from '../../utils/helpers';
import 'handsontable/dist/handsontable.full.min.css';
import './style.css';

const OilBathTable = (selectedSuspensionFork) => {
	const containerRef = useRef(null);

	const { damperUpperVolume, damperUpperOilWt, damperLowerVolume, damperLowerOilWt, springUpperVolume, springUpperOilWt, springLowerVolume, springLowerOilWt } =
		selectedSuspensionFork?.selectedSuspensionFork;


	useEffect(() => {
		if (selectedSuspensionFork) {
			const { springUpperVolumeUnits, springUpperOilWtUnits } = checkSpringUpperTubeData({ springUpperVolume, selectedSuspensionFork });
			const damperUpperVolumeUnits = checkDamperUpperTubeData(damperUpperVolume);
			let data;
			if (selectedSuspensionFork?.selectedSuspensionFork.fork) {
				data = [
					['Damper', `${damperUpperVolume} ${damperUpperVolumeUnits}`, `${damperUpperOilWt} wt`, `${damperLowerVolume} mL`, `${damperLowerOilWt} wt`],
					['Spring', `${springUpperVolume} ${springUpperVolumeUnits}`, `${springUpperOilWt} ${springUpperOilWtUnits}`, `${springLowerVolume} mL`, `${springLowerOilWt} wt`],
				];
			} else {
				data = [
					['Damper', `${damperUpperVolume} ${damperUpperVolumeUnits}`, damperUpperOilWt, `${damperLowerVolume} mL`, damperLowerOilWt],
					['Spring', `${springUpperVolume} ${springUpperVolumeUnits}`, `${springUpperOilWt} ${springUpperOilWtUnits}`, `${springLowerVolume} mL`, springLowerOilWt],
				];
			}

			const nestedHeaders = [
				[
					{ label: '', colspan: 1 },
					{ label: 'Oil Bath Volume', colspan: 4 },
				],

				[
					{ label: '', colspan: 1 },
					{ label: 'Upper Tube', colspan: 2 },
					{ label: 'Lower Tube', colspan: 2 },
				],
			];

			// Initialize the Handsontable instance
			const hot = new Handsontable(containerRef.current, {
				data: data,
				virtual: true,
				tableClassName: 'oil-bath-table',
				width: '100vw',
				height: 'auto',
				columns: [
					{
						width: 75,
						renderer: function (instance, td, row, col, prop, value, cellProperties) {
							Handsontable.renderers.TextRenderer.apply(this, arguments);
							if (value === 'Damper' || value === 'Spring') {
								// Apply custom CSS style for Male cells
								td.style.color = 'black';
								td.style.fontWeight = '400';
								td.style.backgroundColor = '#f0f0f0';
							}
						},
					},
					{ width: 75 },
					{ width: 75 },
					{ width: 75 },
					{ width: 75 },
				],
				nestedHeaders: nestedHeaders,
				afterGetColHeader: (col, TH) => {
					// Check the column index you want to change the background color for
					TH.style.fontSize = '15px';
					if (col === 0) {
						TH.style.backgroundColor = 'white';
						TH.style.color = 'white';
						TH.style.border = 'none';
					}
				},
				cell: [
					{
						row: 0,
						col: 0,
						className: 'damper-spring-headers',
					},
					{
						row: 1,
						col: 0,
						className: 'damper-spring-headers',
					},
					{
						row: 0,
						col: 1,
						className: 'oil-bath-cells',
					},
					{
						row: 0,
						col: 2,
						className: 'oil-bath-cells',
					},
					{
						row: 0,
						col: 3,
						className: 'oil-bath-cells',
					},
					{
						row: 0,
						col: 4,
						className: 'oil-bath-cells',
					},
					{
						row: 0,
						col: 5,
						className: 'oil-bath-cells',
					},
					{
						row: 1,
						col: 1,
						className: 'oil-bath-cells',
					},
					{
						row: 1,
						col: 2,
						className: 'oil-bath-cells',
					},
					{
						row: 1,
						col: 3,
						className: 'oil-bath-cells',
					},
					{
						row: 1,
						col: 4,
						className: 'oil-bath-cells',
					},
					{
						row: 1,
						col: 4,
						className: 'oil-bath-cells',
					},
				],
				colHeaders: true,
				readOnly: true,
				licenseKey: 'non-commercial-and-evaluation',
			});

			return () => {
				hot.destroy();
			};
		}

		return () => {
			console.log('selectedSuspensionFork variable is undefined');
		};
	}, [selectedSuspensionFork]);

	return <div ref={containerRef}></div>;
};

export default OilBathTable;
