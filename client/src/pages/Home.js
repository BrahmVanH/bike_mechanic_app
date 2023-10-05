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
	const [selectedYear, setSelectedYear] = useState('');
	const [searchButtonDisabled, setSearchButtonDisabled] = useState(true);
	const [searchResults, setSearchResults] = useState([]);
	const [displayRockshoxSearchResults, setDisplayRockshoxSearchResults] = useState(false);
	const [displayFoxSearchResults, setDisplayFoxSearchResults] = useState(false);
	const [displayRockshoxOilBathTable, setDisplayRockshoxOilBathTable] = useState(false);
	const [displayFoxOilBathTable, setDisplayFoxOilBathTable] = useState(false);
	const [hasUserSelectedProduct, setHasUserSelectedProduct] = useState(false);
	const [isSelectedProductSet, setIsSelectedProductSet] = useState(false);
	const [isOkayToDisplaySearchResults, setIsOkayToDisplaySearchResults] = useState(false);
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
		setSelectedYear(selectedValue);
	};

	const handleGoBackToSearchParameters = (event) => {
		event.preventDefault();
		if (displayRockshoxSearchResults || displayFoxSearchResults) {
			setDisplayFoxSearchResults(false);
			setDisplayRockshoxSearchResults(false);
			setHideSearchOptions(false);
			setIsOkayToDisplaySearchResults(false);
			clearSearchParametersAndQueryResponse();
		} else {
			return;
		}
	};

	const handleGoBackToSearchResults = (event) => {
		event.preventDefault();
		if (displayRockshoxOilBathTable || displayFoxOilBathTable) {
			setDisplayFoxOilBathTable(false);
			setDisplayRockshoxOilBathTable(false);
			clearSelectedProduct();
			if (selectedManufacturer === 'fox') {
				setDisplayFoxSearchResults(true);
			} else {
				setDisplayRockshoxSearchResults(true);
			}
		}
	};

	const clearSearchParametersAndQueryResponse = () => {
		setSelectedYear('');
		setSelectedManufacturer('');
		setInitialQueryResponse([]);
		
	};

	const clearSelectedProduct = () => {
		setSelectedRockshoxProduct({
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
		setSelectedFoxProduct({
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
	}

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
			setIsOkayToDisplaySearchResults(true);
		} else if (selectedManufacturer === 'fox' && selectedYear !== '') {
			queryFoxProductsByYear(selectedYear);
			setIsOkayToDisplaySearchResults(true);
		} else if (selectedManufacturer === '' || selectedYear === '') {
			console.log('No manufacturer or year has been set');
		} else {
			throw new Error('There was an unexpected error in querying the database');
		}
	};

	// Set associated state variables with product listings when data from queries is available
	useEffect(() => {
		if (rockshoxProductData && !loadingRockshoxProducts && !rockshoxProductError && isOkayToDisplaySearchResults) {
			setInitialQueryResponse(rockshoxProductData.rockshoxProductsByYear);
			setHideSearchOptions(true);
			setDisplayRockshoxSearchResults(true);
		} else if (foxProductData && !loadingFoxProducts && !foxProductError && isOkayToDisplaySearchResults) {
			setInitialQueryResponse(foxProductData.foxProductsByYear);
			setHideSearchOptions(true);
			setDisplayFoxSearchResults(true);
		}
	}, [foxProductData, rockshoxProductData]);

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
		if (hasUserSelectedProduct && selectedManufacturer === 'rockshox') {
			const userSelectedProduct = initialQueryResponse?.filter(
				(product) =>
					product.year === selectedRockshoxProduct.year &&
					product.fork === selectedRockshoxProduct.fork &&
					product.model === selectedRockshoxProduct.model &&
					product.springType === selectedRockshoxProduct.springType &&
					product.damperType === selectedRockshoxProduct.damperType
			);
			if (Array.isArray(userSelectedProduct) && userSelectedProduct.length > 0) {
				setSelectedRockshoxProduct(userSelectedProduct[0]);
			} else {
				setSelectedRockshoxProduct(null);
			}
		} else if (hasUserSelectedProduct && selectedManufacturer === 'fox') {
			const userSelectedProduct = initialQueryResponse?.filter(
				(product) =>
					product.year === selectedFoxProduct.year &&
					product.model === selectedFoxProduct.model &&
					product.springType === selectedFoxProduct.springType &&
					product.damperType === selectedFoxProduct.damperType
			);
			if (Array.isArray(userSelectedProduct) && userSelectedProduct.length > 0) {
				setSelectedFoxProduct(userSelectedProduct[0]);
			} else {
				setSelectedFoxProduct(null);
			}
		}
	}, [hasUserSelectedProduct]);

	//Sets state variable to tell oil bath volume chart that data is ready to render
	useEffect(() => {
		if (selectedManufacturer === 'rockshox' && selectedRockshoxProduct.damperUpperVolume !== '') {
			setIsSelectedProductSet(true);
			setDisplayRockshoxOilBathTable(true);
		} else if (selectedManufacturer === ' fox' && selectedFoxProduct.damperUpperVolume !== '') {
			setIsSelectedProductSet(true);
			setDisplayFoxOilBathTable(true);
		}
	}, [selectedRockshoxProduct, selectedFoxProduct]);

	return (
		<div className='main-container'>
			{!hideSearchOptions ? (
				<div className='welcome-message'>
					<p>Welcome to Plush Lab. Please search for your suspension fork below.</p>
				</div>
			) : (
				<></>
			)}
			{!hideSearchOptions ? (
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
			) : (
				<></>
			)}
			<div>
				{displayRockshoxSearchResults ? (
					<div>
						<Button onClick={handleGoBackToSearchParameters}>Go Back</Button>
						<RockshoxProductTable searchResults={initialQueryResponse} sendSelectedProductInformation={sendSelectedProductInformation} />{' '}
					</div>
				) : (
					<></>
				)}
			</div>
			<div>
				{displayFoxSearchResults ? (
					<div>
						<Button onClick={handleGoBackToSearchParameters}>Go Back</Button>
						<FoxProductTable searchResults={initialQueryResponse} sendSelectedProductInformation={sendSelectedProductInformation} />{' '}
					</div>
				) : (
					<></>
				)}
			</div>

			{isSelectedProductSet && displayRockshoxOilBathTable ? (
				<div className='oil-bath-table-container'>
					<div>
						<Button onClick={handleGoBackToSearchResults}>Go Back</Button>
						<ProductCard manufacturer={selectedManufacturer} product={selectedRockshoxProduct} />
						<OilBathTable selectedSuspensionFork={selectedRockshoxProduct} />
					</div>
				</div>
			) : (
				<></>
			)}
			{isSelectedProductSet && displayFoxOilBathTable ? (
				<div style={{ width: '100%' }}>
					<Button onClick={handleGoBackToSearchResults}>Go Back</Button>
					<ProductCard manufacturer={selectedManufacturer} product={selectedFoxProduct} />
					<OilBathTable selectedSuspensionFork={selectedFoxProduct} />
				</div>
			) : (
				<></>
			)}
			{/* <div className='featured-forks-container'>
				<div className='featured-rockshox-fork'>
					Randomly selected rockshox fork from DB
					2020 Rockshox Lyrik Ultimate
				</div>
				<div className='featured-fox-forks'>
					2020 Fox 36 Factory
				</div>
				<div className='featured-marzocchi-fork'>
					2020 Marzocchi Bomber
				</div>
			</div> */}
		</div>
	);
}

export default HomeRedo;
