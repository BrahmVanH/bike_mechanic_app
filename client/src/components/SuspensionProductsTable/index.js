import React, { useEffect, useRef } from 'react';
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.min.css';

const SuspensionProductsTable = (searchResults) => {
	

	const customButtonRenderer = (instance, td, row, col, prop, value, cellProperties) => {
		const button = document.createElement('button');
		button.innerText = 'Search';
		button.addEventListener('click', () => {
			// Handle button click here
			alert(`Button clicked in row ${row}`);
			console.log(`cell properties: ${cellProperties}`);
			console.log(cellProperties);
			console.log(`row: ${row}`);
			console.log(`instance ${instance}`);
			console.log(instance.getSourceDataAtRow(row));
			console.log(`value: ${value}`);
		});

		// Clear the cell content
		td.innerHTML = '';

		// Append the button to the cell
		td.appendChild(button);
	};

	const containerRef = useRef(null);

	useEffect(() => {
		// Prepare the data for Handsontable
		const hotData = searchResults.map((item) => ({
			fork: item.fork,
			model: item.model,
			damperType: item.damperType,
			springType: item.springType,
		}));

		// Define the columns for Handsontable
		const hotColumns = [
			{ data: 'fork', title: 'Fork' },
			{ data: 'model', title: 'Model' },
			{ data: 'damperType', title: 'Damper Type' },
			{ data: 'springType', title: 'Spring Type' },
			{ renderer: customButtonRenderer },
		];

		// Initialize the Handsontable instance
		const hot = new Handsontable(containerRef.current, {
			data: hotData,
			columns: hotColumns,
			colHeaders: true, // Display column headers
			rowHeaders: true, // Display row headers
			licenseKey: 'non-commercial-and-evaluation', // Replace with your license key or leave empty for non-commercial use
		});

		return () => {
			// Ensure you destroy the Handsontable instance when the component unmounts
			hot.destroy();
		};
	}, [searchResults]);

	return <div ref={containerRef}></div>;
};

export default SuspensionProductsTable;
