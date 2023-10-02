import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { FaSearch } from 'react-icons/fa';
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.min.css';
import './style.css';

const RockshoxProductTable = (props) => {
	const customButtonRenderer = (instance, td, row, col, prop, value, cellProperties) => {
		const button = document.createElement('button');
		const searchIcon = <FaSearch size={12} />;
		button.addEventListener('click', () => {
			props.sendSelectedProductInformation(instance.getSourceDataAtRow(row));
			console.log(instance.getSourceDataAtRow(row));
		});
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
			{ data: 'model', title: 'Model', width: '65px' },
			{ data: 'damperType', title: 'Damper Type', width: '80px' },
			{ data: 'springType', title: 'Spring Type', width: '80px' },
			{ renderer: customButtonRenderer, title: ' ' },
		];

		// Initialize the Handsontable instance
		const hot = new Handsontable(containerRef.current, {
			data: hotData,
			// tableClassName: 'search-results-table',
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

	return (
		
				<div ref={containerRef}></div>
			
	);
};

export default RockshoxProductTable;
