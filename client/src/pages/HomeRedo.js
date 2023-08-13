import React, { useEffect, useState } from 'react';
import { Button, Form, Dropdown, Alert } from 'react-bootstrap';

import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import { allRockshoxForkOilBathInfo, allFoxForkOilBathInfo, rockshoxForkOilBathInfoByYear, foxForkOilBathInfoByYear } from '../utils/queries';

import './home.css';

function HomeRedo() {
	const [showAlert, setShowAlert] = useState(false);
	const [selectedManufacturer, setSelectedManufacturer] = useState('');
	const [initialQueryResponse, setInitialQueryResponse] = useState([]);
	const [selectedYear, setSelectedYear] = useState('');
	const [yearDropdownOptions, setYearDropdownOptions] = useState([]);
	const [selectedModel, setSelectedModel] = useState('');
	const [modelDropDownOptions, setModelDropdownOptions] = useState([]);
	const [selectedRockshoxFork, setSelectedRockshoxFork] = useState('');
	const [rockshoxForkDropdownOptions, setRockshoxForkDowndownOptions] = useState([]);
	// const [selectedWheelSize, setSelectedWheelsize] = useState('');
	// const [wheelSizeDropdownOptions, setWheelSizeDropdownOptions] = useState([]);
	const [selectedProduct, setSelectedProduct] = useState({});

	// Utility functions

	const removeRepeatingItemsFromList = (array) => {
		console.log(array);
		console.log([...new Set(array)]);
		return [...new Set(array)];
	};

	// Define the initiation function and data variable name for querying products from db
	const [queryRockshoxProducts, rockshoxQueryResults] = useLazyQuery(allRockshoxForkOilBathInfo);
	const [queryFoxProducts, foxQueryResults] = useLazyQuery(allFoxForkOilBathInfo);

	// ** User selects manufacturer from dropdown
	// ** Set selectedManufacturer state

	// Sets the manufacturer selected by user in dropdown menu

	const handleManufacturerMenuSelect = (selectedValue) => {
		setSelectedManufacturer(selectedValue);
	};

	// Sets year selected by user in dropdown menu

	const handleYearSelect = (selectedValue) => {
		setSelectedYear(selectedValue);
	};

	// Sets model by user in dropdown menu

	const handleModelSelect = (selectedValue) => {
		setSelectedModel(selectedValue);
	};

	// Sets rockshox fork by user in dropdown menu

	const handleRockshoxForkSelect = (selectedValue) => {
		setSelectedRockshoxFork(selectedValue);
	};

	// Sets wheel size by user in dropdown menu

	// const handleWheelSizeSelect = (selectedValue) => {
	// 	setSelectedWheelsize(selectedValue);
	// };
	// Query db based on manufacturer

	// Queries database for products based on selected manufacturer

	useEffect(() => {
		if (selectedManufacturer === 'rockshox') {
			queryRockshoxProducts();
			
		} else if (selectedManufacturer === 'fox') {
			queryFoxProducts();
		} else {
			console.log('selectedManufacturer object has unrecognized value...');
		}
	}, [selectedManufacturer]);

	// Set initialQueryResponse state

	useEffect(() => {
		if (rockshoxQueryResults?.data) {
			const data = rockshoxQueryResults.data.allRockshoxForkOilBathInfo;
			setInitialQueryResponse(data);

			const yearOptions = data.map((product) => product.year);
			const yearOptionsWithoutRepeats = removeRepeatingItemsFromList(yearOptions);
			setYearDropdownOptions(yearOptionsWithoutRepeats);
		} else if (foxQueryResults.data) {
			const data = foxQueryResults.data.allFoxForkOilBathInfo;
			setInitialQueryResponse(data);

			const yearOptions = data.map((product) => product.year);
			const yearOptionsWithoutRepeats = removeRepeatingItemsFromList(yearOptions);
			setYearDropdownOptions(yearOptionsWithoutRepeats);
		}
	}, [rockshoxQueryResults, foxQueryResults]);


	// useEffect(() => {
	// 	if (rockshoxQueryResults?.data) {
	// 		console.log(rockshoxQueryResults);
	// 		setInitialQueryResponse(rockshoxQueryResults.data.allRockshoxForkOilBathInfo);
	// 		console.log(initialQueryResponse);
	// 	} else if (foxQueryResults.data) {
	// 		console.log(foxQueryResults);
	// 		setInitialQueryResponse(foxQueryResults.data.allFoxForkOilBathInfo);
	// 		console.log(initialQueryResponse);
	// 	}
	// }, [rockshoxQueryResults, foxQueryResults]);

	// // ** Map through intialQueryReponse and grab all years, filter through years and remove repeats
	// // ** set yearDropdownOptions state
	// // ** Year options dropdown appears

	// // When manufacturer is selected, map through all products in query response and grab the product years that are available
	// useEffect(() => {
	// 	if (selectedManufacturer !== '') {
	// 		console.log(`selected manufacturer: ${selectedManufacturer}, grabbing year options`);
	// 		const yearOptions = [];
	// 		initialQueryResponse?.map((product) => {
	// 			yearOptions.push(product.year);
	// 		});
	// 		const yearOptionsWithoutRepeats = removeRepeatingItemsFromList(yearOptions);
	// 		setYearDropdownOptions(yearOptionsWithoutRepeats);
	// 	} else {
	// 		console.log('no manufacturer selected yet...');
	// 	}
	// }, [selectedManufacturer]);

	// ** User selects year from dropdown
	// ** Set yearInput state
	// ** Filter initialQueryResponse by year
	// ** If manufacturer = fox , filter through initialQueryResponse, add product models to array, set modelDropDownOptions
	// ** if manufacturer = rockshox, filter through "" , add product "forks" to array, set forkDropdownOptions

	// When user selects a year, changes year, or changes manufacturer filters through intitialQuery response to find products based on parameters
	useEffect(() => {
		if (selectedManufacturer === 'fox' && selectedYear !== '') {
			const modelOptions = [];
			const productsByYear = initialQueryResponse?.filter((product) => product.year === selectedYear);
			productsByYear?.map((product) => {
				console.log(product);
				modelOptions.push(product.model);
			});
			const modelOptionsWithoutRepeats = removeRepeatingItemsFromList(modelOptions);
			setModelDropdownOptions(modelOptionsWithoutRepeats);
		} else if (selectedManufacturer === 'rockshox' && selectedYear !== '') {
			const forkOptions = [];
			const productsByYear = initialQueryResponse?.filter((product) => product.year === selectedYear);
			productsByYear?.map((product) => {
				console.log(product);
				forkOptions.push(product.fork);
			});
			const forkOptionsWithoutRepeats = removeRepeatingItemsFromList(forkOptions);
			setRockshoxForkDowndownOptions(forkOptionsWithoutRepeats);
		} else {
			console.log('no year has been selected yet...');
		}
	}, [selectedYear, selectedManufacturer, selectedModel, selectedRockshoxFork]);

	// If manufacturer = rockshox && fork has been selected , filter through initialQueryResponse, add product models to array, set modelDropDownOptions
	useEffect(() => {
		if (selectedManufacturer !== '' && selectedRockshoxFork !== '') {
			const modelOptions = [];
			const rockshoxModelOptions = initialQueryResponse?.filter((product) => product.year === selectedYear && product.fork === selectedRockshoxFork);
			rockshoxModelOptions?.map((model) => {
				console.log(model);
				modelOptions.push(model.model);
			});
			const modelOptionsWithoutRepeats = removeRepeatingItemsFromList(modelOptions);
			setModelDropdownOptions(modelOptionsWithoutRepeats);
		} else {
			console.log('no rockshox fork has been selected...');
		}
	}, [selectedYear, selectedManufacturer, selectedRockshoxFork,]);

	// ** User selects model
	// ** set selectedModel state
	// ** Filter initialQueryResponse by year and model (or year, model, and fork) for wheelSize options if !== null
	// ** set wheelSizeDropdownOptions

	// If a model has been selected,
	// useEffect(() => {
	// 	if (selectedModel !== '') {
	// 		const wheelSizeOptions = [];
	// 		const wheelSizes = initialQueryResponse?.filter((product) => product.year === selectedYear && product.model === selectedModel);
	// 		wheelSizes.map((product) => {
	// 			wheelSizeOptions.push(product.wheelSize);
	// 		});
	// 		const wheelSizeOptionsWithoutRepeats = removeRepeatingItemsFromList(wheelSizeOptions);
	// 		setWheelSizeDropdownOptions(wheelSizeOptionsWithoutRepeats);
	// 	} else {
	// 		console.log('no model has been selected yet...');
	// 	}
	// }, [selectedModel, selectedYear, selectedManufacturer, selectedRockshoxFork]);

	// ** User selects wheelSize
	// ** set selectedWheelSize state
	// ** filter initialQueryResponse by year, model/fork, wheelSize
	// ** set selectedProduct state
	// ** pass selectedProduct object into product information component

	// useEffect(() => {
	// 	if (selectedWheelSize !== '') {
	// 		const matchingProduct = initialQueryResponse?.filter((product) => product.year === selectedYear && product.model === selectedModel && product.wheelSize === selectedWheelSize);
	// 		console.log(matchingProduct);
	// 	} else {
	// 		console.log('wheelSize has not been selected yet...');
	// 	}
	// }, [selectedWheelSize]);

	return (
		<div className='main-container'>
			<div className='welcome-message'>
				<p>The Bike Guru welcomes you. Please search for your fork below</p>
			</div>

			<div className='search-container'>
				<Form className='fork-search-form'>
					<Alert dismissible onClose={() => setShowAlert(true)} show={showAlert} variant='danger'>
						You must complete all fields before searching
					</Alert>
					<Form.Group>
						<Form.Select style={{ userSelect: 'all' }} type='text' size='sm' name='manufacturer' value={selectedManufacturer} onChange={(event) => handleManufacturerMenuSelect(event.target.value)}>
							<option value=''>Manufacturer</option>
							<option value='fox'>Fox</option>
							{/* <option value='marzocchi'>Marzocchi</option> */}
							<option value='rockshox'>Rockshox</option>
						</Form.Select>
					</Form.Group>
					{yearDropdownOptions.length > 0 ? (
						<Form.Group>
							<Form.Select style={{ userSelect: 'all' }} type='text' size='sm' name='year' value={selectedYear} onChange={(event) => handleYearSelect(event.target.value)}>
								{yearDropdownOptions.map((year) => (
									<option key={year} value={year}>
										{year}
									</option>
								))}
							</Form.Select>
						</Form.Group>
					) : (
						<></>
					)}
					{rockshoxForkDropdownOptions.length > 0 ? (
						<Form.Group>
							<Form.Select style={{ userSelect: 'all' }} type='text' size='sm' name='fork' value={selectedRockshoxFork} onChange={(event) => handleRockshoxForkSelect(event.target.value)}>
								{rockshoxForkDropdownOptions.map((fork) => (
									<option key={fork} value={fork}>
										{fork}
									</option>
								))}
							</Form.Select>
						</Form.Group>
					) : (
						<></>
					)}
					{modelDropDownOptions.length > 0 ? (
						<Form.Group>
							<Form.Select style={{ userSelect: 'all' }} type='text' size='sm' name='fork' value={selectedModel} onChange={(event) => handleModelSelect(event.target.value)}>
								{modelDropDownOptions.map((fork) => (
									<option key={fork} value={fork}>
										{fork}
									</option>
								))}
							</Form.Select>
						</Form.Group>
					) : (
						<></>
					)}
					{/* {wheelSizeDropdownOptions.length > 0 ? (
						<Form.Group>
							<Form.Select style={{ userSelect: 'all' }} type='text' size='sm' name='wheelSize' value={selectedWheelSize} onChange={(event) => handleWheelSizeSelect(event.target.value)}>
								{wheelSizeDropdownOptions.map((fork) => (
									<option key={fork} value={fork}>
										{fork}
									</option>
								))}
							</Form.Select>
						</Form.Group>
					) : (
						<></>
					)} */}

					{/* <Button onClick={handleManufacturerYearSearch}>Search</Button> */}
					{/* Button to initiate search */}
				</Form>
			</div>
			<div className='featured-forks-container'>
				<div className='featured-rockshox-fork'>
					{/* Randomly selected rockshox fork from DB */}
					2020 Rockshox Lyrik Ultimate
				</div>
				<div className='featured-fox-forks'>
					{/* Randomly selected fox fork */}
					2020 Fox 36 Factory
				</div>
				<div className='featured-marzocchi-fork'>
					{/* randomly selected Marzocchi fork */}
					2020 Marzocchi Bomber
				</div>
			</div>
		</div>
	);
}

export default HomeRedo;
