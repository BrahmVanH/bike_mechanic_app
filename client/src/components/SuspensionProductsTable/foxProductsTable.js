import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { FaSearch } from 'react-icons/fa';
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.min.css';

const FoxProductTable = (props) => {

const customButtonRenderer = (instance, td, row, col, prop, value, cellProperties) => {
	const button = document.createElement('button');
	const searchIcon = <FaSearch style={{ backgroundColor: 'black', color: 'white' }} size={12} />;
	button.addEventListener('click', () => {
		props.sendSelectedProductInformation(instance.getSourceDataAtRow(row));
	});
	button.style.borderRadius = '5px';
	ReactDOM.render(searchIcon, button);

	// Clear the cell content
	td.innerHTML = '';

	// Append the button to the cell
	td.appendChild(button);
};

	const containerRef = useRef(null);

	useEffect(() => {
		// Prepare the data for Handsontable
		const hotData = props.searchResults.map((item) => ({
			year: item.year,
			model: item.model,
			damperType: item.damperType,
			springType: item.springType,
		}));

		// Define the columns for Handsontable
		const hotColumns = [
			{ data: 'year', title: 'Year', width: '45px', backgroundColor: 'black', color: 'white'},
			{ data: 'model', title: 'Model', width: '135px' },
			{ data: 'damperType', title: 'Damper' },
			{ data: 'springType', title: 'Spring' },
			{ renderer: customButtonRenderer, title: ' ', width: "35px" },
		];

		// Initialize the Handsontable instance
		const hot = new Handsontable(containerRef.current, {
			className: 'product-table',
			data: hotData,
			columns: hotColumns,
			colHeaders: true, 
			readOnly: true,
			tableClassName: 'custom-handsontable-selection',
			outsideClickDeselects: false,
			licenseKey: 'non-commercial-and-evaluation', 
		});

		return () => {
			// Ensure you destroy the Handsontable instance when the component unmounts
			hot.destroy();
		};
	}, [props.searchResults]);

	return <div ref={containerRef}></div>;
};

export default FoxProductTable;
