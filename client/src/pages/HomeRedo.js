import React, { useEffect, useState } from 'react';
import { Button, Form, Dropdown, Alert } from 'react-bootstrap';

import { listSupportedModelYears } from '../utils/helpers';

import RockshoxProductTable from '../components/SuspensionProductsTable/rockshoxProductTable';
import FoxProductTable from '../components/SuspensionProductsTable/foxProductsTable';
import OilBathTable from '../components/OilBathTable';
import ProductCard from '../components/ProductCard';

import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import { allRockshoxForkOilBathInfo, allFoxForkOilBathInfo, rockshoxProductsByYear, foxProductsByYear } from '../utils/queries';

import './home.css';

function HomeRedo() {
	const [showAlert, setShowAlert] = useState(false);
	const [supportedModelYears, setSupportedModelYears] = useState([]);
	const [selectedManufacturer, setSelectedManufacturer] = useState('');
	const [initialQueryResponse, setInitialQueryResponse] = useState([]);
	// const [initiateInitialQuery, setInitiateInitialQuery] = useState(false);
	// The model year range might change over time as newer models are released and older model information is acquired
	const [yearRange, setYearRange] = useState({
		latestYear: 2019,
		oldestYearMinusOne: 2013,
	});

	// **CONSOLIDATE INTO ONE VARIABLE THAT CONTAINS THIS INFO
	const [selectedYear, setSelectedYear] = useState('');
	const [searchButtonDisabled, setSearchButtonDisabled] = useState(true);
	const [searchResults, setSearchResults] = useState([]);
	const [selectedModel, setSelectedModel] = useState('');
	const [selectedRockshoxFork, setSelectedRockshoxFork] = useState('');
	const [selectedSpringType, setSelectedSpringType] = useState('');
	const [selectedDamperType, setSelectedDamperType] = useState('');
	const [displayRockshoxSearchResults, setDisplayRockshoxSearchResults] = useState(false);
	const [displayFoxSearchResults, setDisplayFoxSearchResults] = useState(false);
	const [hasUserSelectedProduct, setHasUserSelectedProduct] = useState(false);
	const [isSelectedProductSet, setIsSelectedProductSet] = useState(false);
	const [hideSearchOptions, setHideSearchOptions] = useState(false);
	const [selectedRockshoxProduct, setSelectedRockshoxProduct] = useState({
		year: '',
		fork: '',
		model: '',
		damperType: '',
		springType: '',
		damperUpperVolume: '',
		damperUpperOilWt: '',
		damperLowerVolume: '',
		damperLowerOilWt: '',
		springUpperVolume: '',
		springUpperOilWt: '',
		springLowerVolume: '',
		springLowerOilWt: '',
	});
	const [selectedFoxProduct, setSelectedFoxProduct] = useState({
		year: '',
		model: '',
		damperType: '',
		springType: '',
		damperUpperVolume: '',
		damperUpperOilWt: '',
		damperLowerVolume: '',
		damperLowerOilWt: '',
		springUpperVolume: '',
		springUpperOilWt: '',
		springLowerVolume: '',
		springLowerOilWt: '',
	});
	
	//Create an array of model years supported based on yearRange state
	useEffect(() => {
		const supportedModelYears = listSupportedModelYears(yearRange);
		setSupportedModelYears(supportedModelYears);
	}, []);
	
	const enableSearchButton = () => {
		setSearchButtonDisabled(false);
	};
	
	useEffect(() => {
		if (selectedManufacturer !== '' && selectedYear !== '') {
			enableSearchButton();
		}
	}, [selectedManufacturer, selectedYear]);
	
	// Sets the manufacturer selected by user in dropdown menu

	const handleManufacturerMenuSelect = (selectedValue) => {
		setSelectedManufacturer(selectedValue);
	};

	// Sets year selected by user in dropdown menu

	const handleYearSelect = (selectedValue) => {
		console.log(selectedValue);
		setSelectedYear(selectedValue);
	};

	// Define query functions for product queries

	const [queryRockshoxProductsByYear, { loading: loadingRockshoxProducts, data: rockshoxProductData, error: rockshoxProductError }] = useLazyQuery(rockshoxProductsByYear, {
		variables: { year: selectedYear },
	});

	const [queryFoxProductsByYear, { loading: loadingFoxProducts, data: foxProductData, error: foxProductError }] = useLazyQuery(foxProductsByYear, {
		variables: { year: selectedYear },
	});

	// Call query function using manufacturer and year state variables
	const initiateInitialQuery = () => {
		if (selectedManufacturer === 'rockshox' && selectedYear !== '') {
			queryRockshoxProductsByYear(selectedYear);
		} else if (selectedManufacturer === 'fox' && selectedYear !== '') {
			queryFoxProductsByYear(selectedYear);
		} else if (selectedManufacturer === '' || selectedYear === '') {
			console.log('No manufacturer or year has been set');
		} else {
			throw new Error('There was an unexpected error in querying the database');
		}
	};

	// Set associated state variables with product listings when data from queries is available 
	useEffect(() => {
		if (rockshoxProductData && !loadingRockshoxProducts && !rockshoxProductError) {
			setInitialQueryResponse(rockshoxProductData.rockshoxProductsByYear);
			setDisplayRockshoxSearchResults(true);
		} else if (foxProductData && !loadingFoxProducts && !foxProductError) {
			setInitialQueryResponse(foxProductData.foxProductsByYear);
			setDisplayFoxSearchResults(true);
		}
	}, [foxProductData, rockshoxProductData]);

	useEffect(() => {
		console.log(initialQueryResponse);
	}, [initialQueryResponse]);

	// Function passed into products table and used to send user selected product information back to home component to set selected product state
	const sendSelectedProductInformation = (productInformation) => {
		if (selectedManufacturer === 'rockshox') {
			setSelectedRockshoxProduct({
				year: productInformation.year,
				fork: productInformation.fork,
				model: productInformation.model,
				damperType: productInformation.damperType,
				springType: productInformation.springType,
			});
			setHasUserSelectedProduct(true);
			setDisplayRockshoxSearchResults(false);
		} else {
			setSelectedFoxProduct({
				year: productInformation.year,
				model: productInformation.model,
				damperType: productInformation.damperType,
				springType: productInformation.springType,
			});
			setHasUserSelectedProduct(true);
			setDisplayFoxSearchResults(false);
		}
	};


	useEffect(() => {
		console.log('search results:');
		console.log(searchResults);
	}, [searchResults]);

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
			const userSelectedProduct = initialQueryResponse?.filter(
				(product) =>
					product.year === selectedYear &&
					product.model === selectedModel &&
					product.fork === selectedRockshoxFork &&
					product.springType === selectedSpringType &&
					product.damperType === selectedDamperType
			);
			if (Array.isArray(userSelectedProduct) && userSelectedProduct.length > 0) {
				setSelectedProduct(userSelectedProduct[0]);
			} else {
				setSelectedProduct(null);
			}
			console.log(userSelectedProduct);
		} else if (hasUserSelectedProduct && selectedManufacturer === 'fox') {
			const userSelectedProduct = initialQueryResponse?.filter(
				(product) => product.year === selectedYear && product.model === selectedModel && product.springType === selectedSpringType && product.damperType === selectedDamperType
			);
			if (Array.isArray(userSelectedProduct) && userSelectedProduct.length > 0) {
				setSelectedProduct(userSelectedProduct[0]);
			} else {
				setSelectedProduct(null);
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
						{supportedModelYears.length > 0 ? (
							<Form.Group>
								<Form.Select style={{ userSelect: 'all' }} type='text' size='sm' name='year' value={selectedYear} onChange={(event) => handleYearSelect(event.target.value)}>
									<option value=''>Year</option>
									{supportedModelYears.map((year) => (
										<option key={year} value={year}>
											{year}
										</option>
									))}
								</Form.Select>
							</Form.Group>
						) : (
							<></>
						)}
						<Button disabled={searchButtonDisabled} onClick={initiateInitialQuery}>
							Search{' '}
						</Button>
					</Form>
				</div>
			)}
			<div>{displayRockshoxSearchResults ? <RockshoxProductTable searchResults={initialQueryResponse} sendSelectedProductInformation={sendSelectedProductInformation} /> : <></>}</div>
			<div>{displayFoxSearchResults ? <FoxProductTable searchResults={initialQueryResponse} sendSelectedProductInformation={sendSelectedProductInformation} /> : <></>}</div>

			{isSelectedProductSet && selectedProduct?.damperUpperVolume !== '' ? (
				<div style={{ width: '100%' }}>
					<ProductCard manufacturer={selectedManufacturer} product={selectedProduct} />
					<OilBathTable selectedSuspensionFork={selectedProduct} />
				</div>
			) : (
				<></>
			)}
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
