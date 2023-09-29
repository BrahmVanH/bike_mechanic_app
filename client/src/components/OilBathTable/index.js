import React, { useEffect, useRef } from 'react';
import Handsontable from 'handsontable';

const OilBathTable = (selectedSuspensionFork) => {
	const containerRef = useRef(null);
	useEffect(() => {
		console.log(selectedSuspensionFork);

	}, [selectedSuspensionFork]);

	useEffect(() => {
		if (selectedSuspensionFork) {
			const data = [
				[
					selectedSuspensionFork?.selectedSuspensionFork.damperUpperVolume,
					selectedSuspensionFork?.selectedSuspensionFork.damperUpperOilWt,
					selectedSuspensionFork?.selectedSuspensionFork.damperLowerVolume,
					selectedSuspensionFork?.selectedSuspensionFork.damperLowerOilWt,
					selectedSuspensionFork?.selectedSuspensionFork.springUpperVolume,
					selectedSuspensionFork?.selectedSuspensionFork.springUpperOilWt,
					selectedSuspensionFork?.selectedSuspensionFork.springLowerVolume,
					selectedSuspensionFork?.selectedSuspensionFork.springLowerOilWt,
				],
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
				virtual: true,
				width: 600,
				height: 200,
				columns: [
					{ width: 25 },
					{ width: 25 },
					{ width: 25 },
					{ width: 25 },
					{ width: 25 },
					{ width: 25 },
					{ width: 25 },
					
				],
				nestedHeaders: nestedHeaders,
				colHeaders: true, // Display column headers
				rowHeaders: true, // Display row headers
				contextMenu: true, // Enable context menu
				licenseKey: 'non-commercial-and-evaluation', // Replace with your license key or leave empty for non-commercial use
			});


			return () => {
				// Destroy the Handsontable instance when the component unmounts
				hot.destroy();
			};
		}

		return () => {
			console.log("selectedSuspensionFork variable is undefined");
		};
	}, [selectedSuspensionFork]);

	return <div ref={containerRef}></div>;
};

export default OilBathTable;
