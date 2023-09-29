import React, { useEffect, useRef } from 'react';
import Handsontable from 'handsontable';

const OilBathTable = ({ selectedSuspensionFork }) => {
	const containerRef = useRef(null);

	const { damperUpperVolume, damperUpperOilWt, damperLowerVolume, damperLowerOilWt, springUpperVolume, springUpperOilWt, springLowerVolume, springLowerOilWt } = selectedSuspensionFork;

	useEffect(() => {
		const data = [
			[damperUpperVolume, damperUpperOilWt, damperLowerVolume, damperLowerOilWt, springUpperVolume, springUpperOilWt, springLowerVolume, springLowerOilWt],
		];

		const nestedHeaders = [
			
			[{ label: 'Oil Bath Volume', colspan: 8 }],
			[
				{ label: 'Damper Side', colspan: 4 },
				{ label: 'Spring Side', colspan: 4 },
			],
			[
				{ label: 'Upper Tube', colspan: 2 },
				{ label: 'Lower Tube', colspan: 2 },
				{ label: 'Upper Tube', colspan: 2 },
				{ label: 'Lower Tube', colspan: 2 },
			],
		];

		// Initialize the Handsontable instance
		const hot = new Handsontable(containerRef.current, {
			data: data,
			nestedHeaders: nestedHeaders,
			colHeaders: true, // Display column headers
			rowHeaders: true, // Display row headers
			contextMenu: true, // Enable context menu
			licenseKey: 'non-commercial-and-evaluation', // Replace with your license key or leave empty for non-commercial use
		});

		// Optionally, you can customize the table's appearance and behavior further.

		return () => {
			// Destroy the Handsontable instance when the component unmounts
			hot.destroy();
		};
	}, []);

	return <div ref={containerRef}></div>;
};

export default OilBathTable;
