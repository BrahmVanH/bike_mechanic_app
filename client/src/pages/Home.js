import React, { useEffect, useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';

import { listSupportedModelYears } from '../utils/helpers';

import RockshoxSearchResultsTable from '../components/SuspensionProductsTable/RockshoxSearchResultsTable';
import FoxSearchResultsTable from '../components/SuspensionProductsTable/FoxSearchResultsTable';
import RockshoxProductTable from '../components/SuspensionProductsTable/rockshoxProductTable';
import FoxProductTable from '../components/SuspensionProductsTable/foxProductsTable';
import OilBathTable from '../components/OilBathTable';
import ProductCard from '../components/ProductCard';

import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import { rockshoxProductsByYear, foxProductsByYear } from '../utils/queries';
import { LOG_ERROR } from '../utils/mutations';

import './home.css';
// import polishedCopper from'../../public/assets/img/polished-copper.jpg';

function HomeRedo() {
	const [showAlert, setShowAlert] = useState(false);
	const [error, setError] = useState(false);
	const [supportedModelYears, setSupportedModelYears] = useState([]);
	const [selectedManufacturer, setSelectedManufacturer] = useState('');
	const [initialQueryResponse, setInitialQueryResponse] = useState([]);
	// The model year range might change over time as newer models are released and older model information is acquired
	const [yearRange, setYearRange] = useState({
		latestYear: 2019,
		oldestYearMinusOne: 2013,
	});
	const [selectedYear, setSelectedYear] = useState('');
	const [searchButtonDisabled, setSearchButtonDisabled] = useState(true);
	const [isOkayToSetRockshoxAsQueryResponse, setIsOkayToSetRockshoxAsQueryResponse] = useState(false);
	const [isOkayToSetFoxAsQueryResponse, setIsOkayToSetFoxAsQueryResponse] = useState(false);
	const [displayRockshoxSearchResults, setDisplayRockshoxSearchResults] = useState(false);
	const [displayFoxSearchResults, setDisplayFoxSearchResults] = useState(false);
	const [displayRockshoxOilBathTable, setDisplayRockshoxOilBathTable] = useState(false);
	const [displayFoxOilBathTable, setDisplayFoxOilBathTable] = useState(false);
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

	// Style object for user inputs
	const inputStyle = { userSelect: 'all', backgroundColor: 'black', color: 'white', border: '1px solid #2f2f2f' };

	// Mutation for logging error messages

	const [logError] = useMutation(LOG_ERROR);

	//Create an array of model years supported based on yearRange state

	useEffect(() => {
		const supportedModelYears = listSupportedModelYears(yearRange);
		setSupportedModelYears(supportedModelYears);
	}, []);

	// Enables the search button on the initial search parameters view

	const enableSearchButton = () => {
		setSearchButtonDisabled(false);
	};

	const disableSearchButton = () => {
		setSearchButtonDisabled(true);
	};

	// Call enable search button function when manufacturer and year have been selected

	useEffect(() => {
		if (selectedManufacturer !== '' && selectedYear !== '') {
			enableSearchButton();
		} else {
			disableSearchButton();
		}
	}, [selectedManufacturer, selectedYear]);

	// Sets the manufacturer selected by user in dropdown menu and clears any initialQueryResponse data to prevent mis-search

	const handleManufacturerMenuSelect = (selectedValue) => {
		setSelectedManufacturer(selectedValue);
		setInitialQueryResponse([]);
	};

	// Sets year selected by user in dropdown menu and clears any initialQueryResponse data to prevent mis-search

	const handleYearSelect = (selectedValue) => {
		setSelectedYear(selectedValue);
		setInitialQueryResponse([]);
	};

	// Clears all search parameters and query results

	const clearSearchParametersAndQueryResponse = () => {
		setSelectedYear('');
		setSelectedManufacturer('');
		setInitialQueryResponse([]);
		setIsOkayToSetFoxAsQueryResponse(false);
		setIsOkayToSetRockshoxAsQueryResponse(false);
	};

	// Reveal search parameters, hide any irrelevant components and wipe all search parameters/query responses
	const handleGoBackToSearchParameters = (event) => {
		event.preventDefault();
		if (displayRockshoxSearchResults || displayFoxSearchResults || displayFoxOilBathTable || displayRockshoxOilBathTable) {
			setDisplayFoxSearchResults(false);
			setDisplayRockshoxSearchResults(false);
			setHideSearchOptions(false);
			setIsOkayToDisplaySearchResults(false);
			setDisplayRockshoxOilBathTable(false);
			setDisplayFoxOilBathTable(false);
			clearSearchParametersAndQueryResponse();
		} else {
			return;
		}
	};

	// Reveal search results and hide any irrelevant components

	const handleGoBackToSearchResults = (event) => {
		event.preventDefault();
		if (displayRockshoxOilBathTable || displayFoxOilBathTable) {
			setDisplayFoxOilBathTable(false);
			setDisplayRockshoxOilBathTable(false);
			clearSelectedProduct();
			if (selectedManufacturer === 'fox') {
				setDisplayFoxSearchResults(true);
			} else if (selectedManufacturer === 'rockshox') {
				setDisplayRockshoxSearchResults(true);
			}
		}
	};
	// Clear's selectedProduct states to prevent any mis-searching while re-entering search parameters

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
			setIsOkayToDisplaySearchResults(true);
			setIsOkayToSetRockshoxAsQueryResponse(true);
		} else if (selectedManufacturer === 'fox' && selectedYear !== '') {
			queryFoxProductsByYear(selectedYear);
			setIsOkayToDisplaySearchResults(true);
			setIsOkayToSetFoxAsQueryResponse(true);
		} else {
			setError(true);
		}
	};

	// Set associated state variables with product listings when data from queries is available

	useEffect(() => {
		if (rockshoxProductData && !loadingRockshoxProducts && !rockshoxProductError && isOkayToSetRockshoxAsQueryResponse && isOkayToDisplaySearchResults) {
			setInitialQueryResponse(rockshoxProductData.rockshoxProductsByYear);
			setHideSearchOptions(true);
			setDisplayRockshoxSearchResults(true);
		} else if (foxProductData && !loadingFoxProducts && !foxProductError && isOkayToSetFoxAsQueryResponse && isOkayToDisplaySearchResults) {
			setInitialQueryResponse(foxProductData.foxProductsByYear);
			setHideSearchOptions(true);
			setDisplayFoxSearchResults(true);
		} else if (rockshoxProductError || foxProductError) {
			setError(true);
		}
	}, [foxProductData, rockshoxProductData, isOkayToDisplaySearchResults]);

	// Takes in product description, filters query response, returns a product object

	const filterAndSetSelectedProduct = (manufacturer, productInformation) => {
		if (manufacturer === 'rockshox') {
			const filterMatches = initialQueryResponse?.filter(
				(product) =>
					product.year === productInformation.year &&
					product.fork === productInformation.fork &&
					product.model === productInformation.model &&
					product.springType === productInformation.springType &&
					product.damperType === productInformation.damperType
			);
			if (Array.isArray(filterMatches) && filterMatches.length > 0) {
				setSelectedRockshoxProduct(filterMatches[0]);
				setDisplayRockshoxSearchResults(false);
				setIsSelectedProductSet(true);
				setDisplayRockshoxOilBathTable(true);
			} else {
				setSelectedRockshoxProduct(null);
			}
		} else if (manufacturer === 'fox') {
			const filterMatches = initialQueryResponse?.filter(
				(product) =>
					product.year === productInformation.year &&
					product.model === productInformation.model &&
					product.springType === productInformation.springType &&
					product.damperType === productInformation.damperType
			);
			if (Array.isArray(filterMatches) && filterMatches.length > 0) {
				setSelectedFoxProduct(filterMatches[0]);
				setDisplayFoxSearchResults(false);
				setIsSelectedProductSet(true);
				setDisplayFoxOilBathTable(true);
			} else {
				setSelectedFoxProduct(null);
			}
		} else {
			setError(true);
		}
	};

	// Function passed into products table and used to send user selected product information back to home component to set selected product state
	const sendSelectedProductInformation = (productInformation) => {
		filterAndSetSelectedProduct(selectedManufacturer, productInformation);
	};

	return (
		<>
			{error ? (
				<div className='welcome-message d-flex justify-content-center align-items-center p-1 m-1'>
					<h2>Oops... Something went wrong. Please try again later.</h2>
				</div>
			) : (
				<div className='main-container'>
					{!hideSearchOptions ? (
							<div className='welcome-message col-8 col-md-4 col-lg-4'>
								<p className=''>Welcome to Plush Lab. Please search for your suspension fork below.</p>
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
								<Form.Group style={{ padding: '.25rem' }}>
									<Form.Select style={inputStyle} type='text' size='sm' name='manufacturer' value={selectedManufacturer} onChange={(event) => handleManufacturerMenuSelect(event.target.value)}>
										<option value=''>Manufacturer</option>
										<option value='fox'>Fox</option>
										{/* <option value='marzocchi'>Marzocchi</option> */}
										<option value='rockshox'>Rockshox</option>
									</Form.Select>
								</Form.Group>
								{supportedModelYears.length > 0 ? (
									<Form.Group style={{ padding: '.25rem' }}>
										<Form.Select style={inputStyle} type='text' size='sm' name='year' value={selectedYear} onChange={(event) => handleYearSelect(event.target.value)}>
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
								<div className='search-btn-container'>
									<Button className='btn-sm btn-dark' disabled={searchButtonDisabled} onClick={initiateInitialQuery}>
										Search{' '}
									</Button>
								</div>
							</Form>
						</div>
					) : (
						<></>
					)}
					<div>
						{displayRockshoxSearchResults ? (
							<div className='py-2 m-2'>
								<Button className='btn-sm btn-dark' style={{ margin: '0.5rem 0rem' }} onClick={handleGoBackToSearchParameters}>
									Go Back
								</Button>
								<RockshoxSearchResultsTable searchResults={initialQueryResponse} sendSelectedProductInformation={sendSelectedProductInformation} />{' '}
							</div>
						) : (
							<></>
						)}
					</div>
					<div>
						{displayFoxSearchResults ? (
							<div>
								<Button className='btn-sm btn-dark' style={{ margin: '0.5rem 0rem' }} onClick={handleGoBackToSearchParameters}>
									Go Back
								</Button>
								<FoxSearchResultsTable searchResults={initialQueryResponse} sendSelectedProductInformation={sendSelectedProductInformation} />{' '}
							</div>
						) : (
							<></>
						)}
					</div>

					{isSelectedProductSet && displayRockshoxOilBathTable ? (
						<div className='oil-bath-table-container'>
							<div>
								<Button className='btn-sm btn-dark' style={{ margin: '0.5rem 0rem' }} onClick={handleGoBackToSearchParameters}>
									Back to Search
								</Button>
								<Button className='btn-sm btn-dark' style={{ margin: '0.5rem 0rem' }} onClick={handleGoBackToSearchResults}>
									Back to Results
								</Button>
								<ProductCard manufacturer={selectedManufacturer} product={selectedRockshoxProduct} />
								<OilBathTable selectedSuspensionFork={selectedRockshoxProduct} />
							</div>
						</div>
					) : (
						<></>
					)}
					{isSelectedProductSet && displayFoxOilBathTable ? (
						<div style={{ width: '100%' }}>
							<Button className='btn-sm btn-dark' style={{ margin: '0.5rem 0rem' }} onClick={handleGoBackToSearchParameters}>
								Back to Search
							</Button>
							<Button className='btn-sm btn-dark' style={{ margin: '0.5rem 0rem' }} onClick={handleGoBackToSearchResults}>
								Back to Results
							</Button>
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
			)}
		</>
	);
}

export default HomeRedo;
