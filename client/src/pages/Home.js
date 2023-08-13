// import React, { useEffect, useState } from 'react';
// import { Button, Form, Dropdown, Alert } from 'react-bootstrap';

// import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
// import { allRockshoxForkOilBathInfo, allFoxForkOilBathInfo, rockshoxForkOilBathInfoByYear, foxForkOilBathInfoByYear } from '../utils/queries';

// import './home.css';

// function Home() {
// 	const [showAlert, setShowAlert] = useState(false);
// 	const [initialQueryParameters, setInitialQueryParameters] = useState({
// 		year: '',
// 		manufacturer: '',
// 	});
// 	const [yearInput, setYearInput] = useState({
// 		year: '',
// 	});
// 	const [selectedManufacturer, setSelectedManufacturer] = useState('');
// 	const [selectedRockshoxFork, setSelectedRockshoxFork] = useState('');
// 	const [selectedModel, setSelectedModel] = useState('');
// 	const [selectedDamperType, setSelectedDamperType] = useState('');
// 	const [selectedSpringType, setSelectedSpringType] = useState('');
// 	const [selectedWheelSize, setSelectedWheelSize] = useState('');
// 	const [selectedProduct, setSelectedProduct] = useState({});
// 	const [initialRockshoxQuery, setinitialRockshoxQuery] = useState(null);
// 	const [initialFoxQuery, setInitialFoxQuery] = useState(null);
// 	const [dropdownListRockshoxForks, setDropdownListRockshoxForks] = useState([]);
// 	const [dropdownListRockshoxModels, setDropdownListRockshoxModels] = useState([]);
// 	const [dropdownListFoxModels, setDropdownListFoxModels] = useState([]);
// 	const [dropdownListDamperTypes, setDropdownListDamperTypes] = useState([]);
// 	const [dropdownListSpringTypes, setDropdownListSpringTypes] = useState([]);
// 	const [dropdownListWheelSizes, setDropdownListWheelSizes] = useState([]);

// 	// Filters through array to remove repeating elements

// 	const removeRepeatingItemsFromList = (array) => {
// 		console.log(array);
// 		console.log([...new Set(array)]);
// 		return [...new Set(array)];
// 	};

// 	// Handles the user input change in the year input

// 	const handleInputChange = (event) => {
// 		const { name, value } = event.target;
// 		setYearInput({ ...yearInput, [name]: value });
// 	};

// 	// Sets the manufacturer selected by user in dropdown menu

// 	const handleManufacturerMenuSelect = (selectedValue) => {
// 		setSelectedManufacturer(selectedValue);
// 	};

// 	// Sets the initial query parameters for querying the database for forks

// 	const handleManufacturerYearSearch = () => {
// 		setInitialQueryParameters({
// 			year: yearInput.year.toString(),
// 			manufacturer: selectedManufacturer,
// 		});
// 	};

	

// 	// When the user clicks a rockshox fork from the list sets the state variable for the selected fork

// 	const handleRockshoxForkSelect = (selectedValue) => {
// 		setSelectedRockshoxFork(selectedValue);
// 	};

// 	// When user clicks on fork model, sets model state

// 	const handleRockshoxModelSelect = (selectedValue) => {
// 		console.log(selectedValue);
// 		setSelectedModel(selectedValue);
// 	};

// 	// When model is selected, filter through forks and set damper, spring, wheelsize states for oil bath volume chart

// 	const compileForkInformation = () => {
// 		if (selectedModel != '') {
// 			const selectedRockshoxProduct = initialRockshoxQuery?.filter((fork) => fork.fork === selectedRockshoxFork || fork.model === selectedModel || fork.year === initialQueryParameters.year);
// 			console.log(selectedRockshoxProduct);
// 			setSelectedProduct(selectedRockshoxProduct);
// 		}
// 	};

// 	useEffect(() => {
// 		compileForkInformation();
// 	}, [selectedModel]);

// 	// Filter through initial rockshox query to find all forks based on selected rockshox fork

// 	useEffect(() => {
// 		const forkModels = [];
// 		console.log(selectedRockshoxFork);
// 		const selectedForkOptions = initialRockshoxQuery?.filter((fork) => fork.fork === selectedRockshoxFork);
// 		selectedForkOptions?.map((fork) => {
// 			console.log(fork.model);
// 			forkModels.push(fork.model);
// 		});
// 		console.log(forkModels);
// 		setDropdownListRockshoxModels(forkModels);
// 	}, [selectedRockshoxFork]);

// 	useEffect(() => {});

// 	// Sets the state variable of products for rockshox query if there is a positive response from db query

// 	useEffect(() => {
// 		if (rockshoxQueryResults.data) {
// 			setinitialRockshoxQuery(rockshoxQueryResults.data);
// 		}
// 	}, [rockshoxQueryResults]);

// 	useEffect(() => {
// 		if (rockshoxQueryResults.loading) {
// 			// handle loading state
// 		} else if (rockshoxQueryResults.error) {
// 			console.log('error querying rockshox fork oil bath volume by year');
// 		} else if (rockshoxQueryResults.data) {
// 			setinitialRockshoxQuery(rockshoxQueryResults?.data?.rockshoxForkOilBathInfoByYear);
// 		}
// 	}, [rockshoxQueryResults]);



// 	// Queries database for products based on selected manufacturer

// 	useEffect(() => {
// 		if (initialQueryParameters.manufacturer === 'rockshox') {
// 			queryRockshoxForksByYear({
// 				variables: { year: initialQueryParameters.year },
// 			});
// 		} else if (initialQueryParameters.manufacturer === 'fox') {
// 			queryFoxForksByYear({
// 				variables: { year: initialQueryParameters.year },
// 			});
// 		}
// 	}, [initialQueryParameters]);

// 	// Initiates initial db query when user selects a manufacturer

// 	useEffect(() => {
// 		handleManufacturerYearSearch();
// 	}, [selectedManufacturer]);



// 	// Filters through rockshox products and creates list of forks to put in dropdown menu

// 	useEffect(() => {
// 		if (initialRockshoxQuery) {
// 			const listOfForks = [];
// 			initialRockshoxQuery.map((product) => {
// 				console.log(product.fork);
// 				listOfForks.push(product.fork);
// 			});
// 			const filteredRockshoxQuery = removeRepeatingNamesFromList(listOfForks);
// 			setDropdownListRockshoxForks(filteredRockshoxQuery);
// 		}
// 	}, [initialRockshoxQuery]);


// 	useEffect(() => {
// 		if (foxQueryResults.loading) {
// 			// handle loading state
// 		} else if (foxQueryResults.error) {
// 			console.log('Error in loading fox oil bath info by year');
// 		} else if (foxQueryResults.data) {
// 			setInitialFoxQuery(foxQueryResults.data);
// 		}
// 	}, [foxQueryResults]);

// 	useEffect(() => {
// 		console.log(initialRockshoxQuery);
// 	}, [initialRockshoxQuery]);



// 	return (
// 		<div className='main-container'>
// 			<div className='welcome-message'>
// 				<p>The Bike Guru welcomes you. Please search for your fork below</p>
// 			</div>

// 			<div className='search-container'>
// 				<Form className='fork-search-form'>
// 					<Alert dismissible onClose={() => setShowAlert(true)} show={showAlert} variant='danger'>
// 						You must complete all fields before searching
// 					</Alert>
// 					<Form.Group>
// 						<Form.Control style={{ userSelect: 'all' }} type='text' size='sm' placeholder='Year' name='year' onChange={handleInputChange} value={yearInput.year} />
// 						{/* <Form.Control.Feedback type='invalid'>Year is required for search</Form.Control.Feedback> */}
// 					</Form.Group>
// 					<Form.Group>
// 						<Form.Select style={{ userSelect: 'all' }} type='text' size='sm' name='manufacturer' value={selectedManufacturer} onChange={(event) => handleManufacturerMenuSelect(event.target.value)}>
// 							<option value=''>Manufacturer</option>
// 							<option value='fox'>Fox</option>
// 							{/* <option value='marzocchi'>Marzocchi</option> */}
// 							<option value='rockshox'>Rockshox</option>
// 						</Form.Select>
// 					</Form.Group>
// 					{dropdownListRockshoxForks.length > 0 ? (
// 						<Form.Group>
// 							<Form.Select style={{ userSelect: 'all' }} type='text' size='sm' name='fork' value={selectedRockshoxFork} onChange={(event) => handleRockshoxForkSelect(event.target.value)}>
// 								{dropdownListRockshoxForks.map((fork) => (
// 									<option key={fork} value={fork}>
// 										{fork}
// 									</option>
// 								))}
// 							</Form.Select>
// 						</Form.Group>
// 					) : (
// 						<></>
// 					)}
// 					{dropdownListRockshoxModels.length > 0 ? (
// 						<Form.Group>
// 							<Form.Select style={{ userSelect: 'all' }} type='text' size='sm' name='fork' value={selectedRockshoxFork} onChange={(event) => handleRockshoxModelSelect(event.target.value)}>
// 								{dropdownListRockshoxModels.map((fork) => (
// 									<option key={fork} value={fork}>
// 										{fork}
// 									</option>
// 								))}
// 							</Form.Select>
// 						</Form.Group>
// 					) : (
// 						<></>
// 					)}

// 					{/* <Button onClick={handleManufacturerYearSearch}>Search</Button> */}
// 					{/* Button to initiate search */}
// 				</Form>
// 			</div>
// 			<div className='featured-forks-container'>
// 				<div className='featured-rockshox-fork'>
// 					{/* Randomly selected rockshox fork from DB */}
// 					2020 Rockshox Lyrik Ultimate
// 				</div>
// 				<div className='featured-fox-forks'>
// 					{/* Randomly selected fox fork */}
// 					2020 Fox 36 Factory
// 				</div>
// 				<div className='featured-marzocchi-fork'>
// 					{/* randomly selected Marzocchi fork */}
// 					2020 Marzocchi Bomber
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

// export default Home;
