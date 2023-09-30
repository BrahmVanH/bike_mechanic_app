import React, { useEffect, useState } from 'react';
import { Button, Form, Dropdown, Alert } from 'react-bootstrap';
import RockshoxProductTable from '../components/SuspensionProductsTable/rockshoxProductTable';
import FoxProductTable from '../components/SuspensionProductsTable/foxProductsTable';
import OilBathTable from '../components/OilBathTable';
import ProductCard from '../components/ProductCard';

import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import { allRockshoxForkOilBathInfo, allFoxForkOilBathInfo, rockshoxForkOilBathInfoByYear, foxForkOilBathInfoByYear } from '../utils/queries';

import './home.css';

function HomeRedo() {
	const [showAlert, setShowAlert] = useState(false);
	const [selectedManufacturer, setSelectedManufacturer] = useState('');
	const [initialQueryResponse, setInitialQueryResponse] = useState([]);
	const [selectedYear, setSelectedYear] = useState('');
	const [yearDropdownOptions, setYearDropdownOptions] = useState([]);
	const [searchButtonDisabled, setSearchButtonDisabled] = useState(true);
	const [searchResults, setSearchResults] = useState([]);
	const [selectedModel, setSelectedModel] = useState('');
	const [selectedRockshoxFork, setSelectedRockshoxFork] = useState('');
	const [selectedSpringType, setSelectedSpringType] = useState('');
	const [selectedDamperType, setSelectedDamperType] = useState('');
	const [startRockshoxSearch, setStartRockshoxSearch] = useState(false);
	const [startFoxSearch, setStartFoxSearch] = useState(false);
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

	const yearsSupported = [];
	const listYearsSupported = () => {
		for (let i = 2019; i > 2012; i--) {
			yearsSupported.push(i);
		}
	};
	listYearsSupported();

	const enableSearchButton = () => {
		setSearchButtonDisabled(false);
	}

	
	useEffect(() => {
		if (selectedManufacturer !== '' && selectedYear !== ''){
			enableSearchButton();
		}
	}, [selectedManufacturer, selectedYear])

	// Utility functions

	const removeRepeatingItemsFromList = (array) => {
		console.log(array);
		console.log([...new Set(array)]);
		return [...new Set(array)];
	};

	// Define the initiation function and data variable name for querying products from db
	const [queryRockshoxProducts, rockshoxQueryResults] = useLazyQuery(allRockshoxForkOilBathInfo);
	const [queryFoxProducts, foxQueryResults] = useLazyQuery(allFoxForkOilBathInfo);

	// Sets the manufacturer selected by user in dropdown menu

	const handleManufacturerMenuSelect = (selectedValue) => {
		setSelectedManufacturer(selectedValue);
	};

	// Sets year selected by user in dropdown menu

	const handleYearSelect = (selectedValue) => {
		console.log(selectedValue);
		setSelectedYear(selectedValue);
	};

	useEffect(() => {
		console.log(selectedYear);
	}, [handleYearSelect, selectedYear])

	// Function passed into products table and used to send user selected product information back to home component to set selected product state

	const sendSelectedProductInformation = (productInformation) => {
		if (selectedManufacturer === 'rockshox') {
			console.log(productInformation);
			setSelectedRockshoxFork(productInformation.fork);
			setSelectedModel(productInformation.model);
			setSelectedDamperType(productInformation.damperType);
			setSelectedSpringType(productInformation.springType);
			setSelectedYear(productInformation.year);
			setHasUserSelectedProduct(true);
			setStartRockshoxSearch(false);
		} else {
			setSelectedModel(productInformation.model);
			setSelectedSpringType(productInformation.springType);
			setSelectedDamperType(productInformation.damperType);
			setSelectedYear(productInformation.year);
			setHasUserSelectedProduct(true);
			setStartFoxSearch(false);
		}
	};

	//Sets startSearch state to true, populating and revealing suspension products table with search results

	const handleProductSearchByMfgAndYear = (event) => {
		event.preventDefault();
		if (selectedManufacturer === 'rockshox') {
			setStartRockshoxSearch(true);
		} else {
			setStartFoxSearch(true);
		}
		setHideSearchOptions(true);
	};
	// Sets wheel size by user in dropdown menu

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
	}, [selectedManufacturer]);

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
						{yearDropdownOptions.length > 0 ? (
							<Form.Group>
								<Form.Select style={{ userSelect: 'all' }} type='text' size='sm' name='year' value={selectedYear} onChange={(event) => handleYearSelect(event.target.value)}>
									<option value=''>Year</option>
									{yearsSupported.map((year) => (
										<option key={year} value={year}>
											{year}
										</option>
									))}
								</Form.Select>
							</Form.Group>
						) : (
							<></>
						)}
						<Button disabled={true} onClick={handleProductSearchByMfgAndYear}>Search </Button>
					</Form>
				</div>
			)}
			<div>{startRockshoxSearch ? <RockshoxProductTable searchResults={searchResults} sendSelectedProductInformation={sendSelectedProductInformation} /> : <></>}</div>
			<div>{startFoxSearch ? <FoxProductTable searchResults={searchResults} sendSelectedProductInformation={sendSelectedProductInformation} /> : <></>}</div>

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
