import React, { useEffect, useState } from 'react';
import { Button, Form, Dropdown, Alert } from 'react-bootstrap';
import SuspensionProductsTable from '../components/SuspensionProductsTable';
import OilBathTable from '../components/OilBathTable';

import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import { allRockshoxForkOilBathInfo, allFoxForkOilBathInfo, rockshoxForkOilBathInfoByYear, foxForkOilBathInfoByYear } from '../utils/queries';

import './home.css';

function HomeRedo() {
	const [showAlert, setShowAlert] = useState(false);
	const [selectedManufacturer, setSelectedManufacturer] = useState('');
	const [initialQueryResponse, setInitialQueryResponse] = useState([]);
	const [selectedYear, setSelectedYear] = useState('');
	const [yearDropdownOptions, setYearDropdownOptions] = useState([]);
	const [searchResults, setSearchResults] = useState([]);
	const [selectedModel, setSelectedModel] = useState('');
	const [modelDropDownOptions, setModelDropdownOptions] = useState([]);
	const [selectedRockshoxFork, setSelectedRockshoxFork] = useState('');
	const [rockshoxForkDropdownOptions, setRockshoxForkDropdownOptions] = useState([]);
	const [springDropdownOptions, setSpringDropdownOptions] = useState([]);
	const [selectedSpringType, setSelectedSpringType] = useState('');
	// NEED TO CREATE A SPRINGTYPEDROPDOWNOPTIONS STATE VARIABLE HERE
	// const [selectedWheelSize, setSelectedWheelsize] = useState('');
	// const [wheelSizeDropdownOptions, setWheelSizeDropdownOptions] = useState([]);
	const [startSearch, setStartSearch] = useState(false);
	const [hasUserSelectedProduct, setHasUserSelectedProduct] = useState(false);
	const [isSelectedProductSet, setIsSelectedProductSet] = useState(false);
	const [hideSearchOptions, setHideSearchOptions] = useState(false);
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

	// Sets selected spring type by user from dropdown menu

	const handleSpringTypeSelect = (selectedValue) => {
		setSelectedSpringType(selectedValue);
	};

	// Function passed into products table and used to send user selected product information back to home component to set selected product state

	const sendSelectedProductInformation = (productInformation) => {
		console.log(productInformation);
		setSelectedRockshoxFork(productInformation.fork);
		setSelectedModel(productInformation.model);
		setSelectedSpringType(productInformation.springType);
		setSelectedYear(productInformation.year);
		setHasUserSelectedProduct(true);
		setStartSearch(false);
	}

	//Sets the isProductSelected state to true to initiate search

	// const handleHasUserSelectedProduct = (event) => {
	// 	event.preventDefault();
	// 	setHasUserSelectedProduct(true);
	// 	setHideSearchOptions(true);
	// };

	//Sets startSearch state to true, populating and revealing suspension products table with search results

	const handleProductSearchByMfgAndYear = (event) => {
		event.preventDefault();
		setStartSearch(true);
		setHideSearchOptions(true);
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
	// useEffect(() => {
	// 	if (selectedManufacturer === 'fox' && selectedYear !== '') {
	// 		const modelOptions = [];
	// 		const productsByYear = initialQueryResponse?.filter((product) => product.year === selectedYear);
	// 		productsByYear?.map((product) => {
	// 			console.log(product);
	// 			modelOptions.push(product.model);
	// 		});
	// 		const modelOptionsWithoutRepeats = removeRepeatingItemsFromList(modelOptions);
	// 		setModelDropdownOptions(modelOptionsWithoutRepeats);
	// 		// **What is this? Bug or feature?
	// 		// Feature - sets the fork drop down options to '' because fork options are for rockshox only products
	// 		if (selectedManufacturer === 'fox') {
	// 			setRockshoxForkDropdownOptions('');
	// 		}
	// 	} else if (selectedManufacturer === 'rockshox' && selectedYear !== '') {
	// 		const forkOptions = [];
	// 		const productsByYear = initialQueryResponse?.filter((product) => product.year === selectedYear);
	// 		productsByYear?.map((product) => {
	// 			forkOptions.push(product.fork);
	// 		});
	// 		const forkOptionsWithoutRepeats = removeRepeatingItemsFromList(forkOptions);
	// 		setRockshoxForkDropdownOptions(forkOptionsWithoutRepeats);
	// 	} else {
	// 		console.log('no year has been selected yet...');
	// 	}
	// }, [selectedYear, selectedManufacturer, selectedModel, selectedRockshoxFork]);

	// If manufacturer and year have been selected, set searchResults state to all forks with that mfg and year

	useEffect(() => {
		if (selectedManufacturer !== '' && selectedYear !== '') {
			const searchResults = [];
			const productsByYear = initialQueryResponse?.filter((product) => product.year === selectedYear);
			productsByYear?.map((product) => {
				searchResults.push(product);
			});
			setSearchResults(searchResults);
		} else {
			console.log('no year or manufacturer have been selected yet...');
		}
	}, [selectedYear, selectedManufacturer]);

	useEffect(() => {
		console.log("search results:");
		console.log(searchResults);
	}, [searchResults]);
	// If manufacturer = rockshox && fork has been selected , filter through initialQueryResponse, add product models to array, set modelDropDownOptions
	// useEffect(() => {
	// 	if (selectedManufacturer !== '' && selectedRockshoxFork !== '') {
	// 		const modelOptions = [];
	// 		const rockshoxModelOptions = initialQueryResponse?.filter((product) => product.year === selectedYear && product.fork === selectedRockshoxFork);
	// 		rockshoxModelOptions?.map((model) => {
	// 			console.log(model);
	// 			modelOptions.push(model.model);
	// 		});
	// 		const modelOptionsWithoutRepeats = removeRepeatingItemsFromList(modelOptions);
	// 		setModelDropdownOptions(modelOptionsWithoutRepeats);
	// 	} else {
	// 		console.log('no rockshox fork has been selected...');
	// 	}
	// }, [selectedYear, selectedManufacturer, selectedRockshoxFork]);

	//** Add another dropdown useEffect here to provide springType information to the UI */
	// Make sure to handle empty strings in the spring type string, as there are a few RS forks from <2006 that have empty strings
	// useEffect(() => {
	// 	if (selectedManufacturer === 'rockshox' && selectedModel !== '') {
	// 		console.log('Initiating check for model for multiple spring types...');
	// 		const springOptions = [];
	// 		const rockshoxModelOptions = initialQueryResponse?.filter((product) => product.year === selectedYear && product.model === selectedModel && product.fork === selectedRockshoxFork);
	// 		console.log('Filtering through model options... ');
	// 		rockshoxModelOptions?.map((model) => {
	// 			console.log(model);
	// 			springOptions.push(model.springType);
	// 		});
	// 		const springOptionsWithoutRepeats = removeRepeatingItemsFromList(springOptions);
	// 		setSpringDropdownOptions(springOptionsWithoutRepeats);
	// 		console.log(springOptionsWithoutRepeats);
	// 	}
	// }, [selectedModel, selectedRockshoxFork, selectedManufacturer, selectedYear]);

	useEffect(() => {
		if (hasUserSelectedProduct && selectedManufacturer === 'rockshox' && selectedSpringType !== '') {
			const userSelectedProduct = initialQueryResponse?.filter(
				(product) => product.year === selectedYear && product.model === selectedModel && product.fork === selectedRockshoxFork && product.springType === selectedSpringType
			);
			if (Array.isArray(userSelectedProduct) && userSelectedProduct.length > 0) {
				setSelectedProduct(userSelectedProduct[0]);
				console.log('set selectedProduct t...');
				console.log(userSelectedProduct[0]);
			} else {
				setSelectedProduct(null);
			}
			console.log(userSelectedProduct);
		} else if (hasUserSelectedProduct && selectedManufacturer === 'rockshox') {
			const userSelectedProduct = initialQueryResponse?.filter((product) => product.year === selectedYear && product.model === selectedModel && product.fork === selectedRockshoxFork);
			if (Array.isArray(userSelectedProduct) && userSelectedProduct.length > 0) {
				setSelectedProduct(userSelectedProduct[0]);
			} else {
				setSelectedProduct(null);
			}
			console.log(userSelectedProduct);
		} else if (hasUserSelectedProduct && selectedManufacturer === 'fox') {
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
	}, [hasUserSelectedProduct]);

	//Sets state variable to tell oil bath volume chart that data is ready to render
	useEffect(() => {
		console.log(selectedProduct);
		if (selectedProduct?.id !== '') {
			setIsSelectedProductSet(true);
		}
	}, [selectedProduct]);

	// useEffect(() => {
	// 	if (isSelectedProductSet === true && selectedProduct?.damperUpperVolume !== '') {
	// 		console.log(selectedProduct.damperUpperVolume, selectedProduct.damperUpperOilWt, selectedProduct.damperLowerVolume, selectedProduct.damperLowerOilWt);
	// 	} else {
	// 		console.log('No product has been selected yet... line 253');
	// 	}
	// }, [isSelectedProductSet, selectedProduct]);

	return (
		<div className='main-container'>
			<div className='welcome-message'>
				<p>The Bike Guru welcomes you. Please search for your fork below</p>
			</div>
			{hideSearchOptions ? (
				<></>
			) : (
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
									<option value=''>Year</option>
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
						{/* {selectedManufacturer === 'rockshox' && rockshoxForkDropdownOptions.length > 0 ? (
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
						)} */}
						{/* {modelDropDownOptions.length > 0 ? (
							<Form.Group>
								<Form.Select style={{ userSelect: 'all' }} type='text' size='sm' name='model' value={selectedModel} onChange={(event) => handleModelSelect(event.target.value)}>
									{modelDropDownOptions.map((fork) => (
										<option key={fork} value={fork}>
											{fork}
										</option>
									))}
								</Form.Select>
							</Form.Group>
						) : (
							<></>
						)} */}
						{/* {springDropdownOptions.length > 0 ? (
							<Form.Group>
								<Form.Select style={{ userSelect: 'all' }} type='text' size='sm' name='spring' value={selectedSpringType} onChange={(event) => handleSpringTypeSelect(event.target.value)}>
									{springDropdownOptions?.map((spring) => (
										<option key={spring} value={spring}>
											{spring}
										</option>
									))}
								</Form.Select>
							</Form.Group>
						) : (
							<></>
						)} */}

						<Button onClick={handleProductSearchByMfgAndYear}>Search </Button>
					</Form>
				</div>
			)}
			<div>{startSearch ? <SuspensionProductsTable searchResults={searchResults} sendSelectedProductInformation={sendSelectedProductInformation} /> : <></>}</div>

			<div>{isSelectedProductSet && selectedProduct?.damperUpperVolume !== '' ? <OilBathTable selectedSuspensionFork={selectedProduct} /> : <></>}</div>
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
