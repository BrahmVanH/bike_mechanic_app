import React, { useEffect, useState } from 'react';
import { Button, Form, Dropdown, Alert } from 'react-bootstrap';
import OilChart from '../components/OilChart';

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
	const [rockshoxForkDropdownOptions, setRockshoxForkDropdownOptions] = useState([]);
	// const [selectedWheelSize, setSelectedWheelsize] = useState('');
	// const [wheelSizeDropdownOptions, setWheelSizeDropdownOptions] = useState([]);
	const [productSelected, setProductSelected] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState({
		damperUpperVolume: '',
		damperUpperOilWt: '',
		damperLowerVolume: '',
		damperLowerOilWt: '',
		springUpperVolume: '',
		springUpperOilWt: '',
		springLowerVolume: '',
		springLowerOilWt: '',
	});

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
		setRockshoxForkDropdownOptions('');
		setModelDropdownOptions('');
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

	const handleSetSelectedProduct = (event) => {
		event.preventDefault();
		setProductSelected(true);
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
			if (selectedManufacturer === 'fox') {
				setRockshoxForkDropdownOptions('');
			}
		} else if (selectedManufacturer === 'rockshox' && selectedYear !== '') {
			const forkOptions = [];
			const productsByYear = initialQueryResponse?.filter((product) => product.year === selectedYear);
			productsByYear?.map((product) => {
				console.log(product);
				forkOptions.push(product.fork);
			});
			const forkOptionsWithoutRepeats = removeRepeatingItemsFromList(forkOptions);
			setRockshoxForkDropdownOptions(forkOptionsWithoutRepeats);
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
	}, [selectedYear, selectedManufacturer, selectedRockshoxFork]);

	useEffect(() => {
		if (productSelected && selectedManufacturer === 'rockshox') {
			const userSelectedProduct = initialQueryResponse?.filter((product) => product.year === selectedYear && product.model === selectedModel && product.fork === selectedRockshoxFork);
			setSelectedProduct(userSelectedProduct);
			console.log(userSelectedProduct);
			console.log(selectedProduct);
		} else if (productSelected && selectedManufacturer === 'fox') {
			const userSelectedProduct = initialQueryResponse?.filter((product) => product.year === selectedYear && product.model === selectedModel);
			if (userSelectedProduct.length > 0) {
				setSelectedProduct({
					damperUpperVolume: userSelectedProduct[0].damperUpperVolume,
					damperUpperOilWt: userSelectedProduct[0].damperUpperOilWt,
					damperLowerVolume: userSelectedProduct[0].damperLowerVolume,
					damperLowerOilWt: userSelectedProduct[0].damperLowerOilWt,
					springUpperVolume: userSelectedProduct[0].springUpperVolume,
					springUpperOilWt: userSelectedProduct[0].springUpperOilWt,
					springLowerVolume: userSelectedProduct[0].springLowerVolume,
					springLowerOilWt: userSelectedProduct[0].springLowerOilWt,
				});
				console.log(userSelectedProduct);
				console.log(selectedProduct);
			} else {
				setSelectedProduct(userSelectedProduct);
			}
		}
	}, [productSelected]);
	useEffect(() => {
		console.log(selectedProduct);
	}, [selectedProduct]);


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
					{selectedManufacturer === 'rockshox' && rockshoxForkDropdownOptions.length > 0 ? (
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
					

					<Button onClick={handleSetSelectedProduct}>Search </Button>
				</Form>
			</div>
			<div>{productSelected && selectedProduct.damperUpperVolume !== '' ? <OilChart product={selectedProduct} /> : <></>}</div>
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
