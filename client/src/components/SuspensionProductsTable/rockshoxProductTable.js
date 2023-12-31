import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { FaSearch } from 'react-icons/fa';
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.min.css';
import './style.css';

const RockshoxProductTable = (props) => {
	const customButtonRenderer = (instance, td, row, col, prop, value, cellProperties) => {
		const button = document.createElement('button');
		const searchIcon = <FaSearch style={{backgroundColor: 'black', color: 'white'}} size={12} />;
		button.addEventListener('click', () => {
			props.sendSelectedProductInformation(instance.getSourceDataAtRow(row));
		});
		button.style.borderRadius = '5px'
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
			fork: item.fork,
			model: item.model,
			damperType: item.damperType,
			springType: item.springType,
		}));

		// Define the columns for Handsontable
		const hotColumns = [
			{ data: 'year', title: 'Year', width: '45px' },
			{ data: 'fork', title: 'Fork', width: '65px' },
			{ data: 'model', title: 'Model', width: '60px' },
			{ data: 'damperType', title: 'Damper', width: '70px' },
			{ data: 'springType', title: 'Spring', width: '70px' },
			{ renderer: customButtonRenderer, title: ' ', width: '37px' },
		];

		// Initialize the Handsontable instance
		const hot = new Handsontable(containerRef.current, {
			className: 'product-table',
			data: hotData,
			// tableClassName: 'product-table',
			columns: hotColumns,
			colHeaders: true,
			readOnly: true,
			licenseKey: 'non-commercial-and-evaluation', // Replace with your license key or leave empty for non-commercial use
		});

		return () => {
			// Ensure you destroy the Handsontable instance when the component unmounts
			hot.destroy();
		};
	}, [props.searchResults]);

	return <div ref={containerRef}></div>;
};

export default RockshoxProductTable;
