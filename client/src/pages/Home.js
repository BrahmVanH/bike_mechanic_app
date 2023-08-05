import React, { useEffect, useState } from 'react';
import { Button, Form, Dropdown, Alert } from 'react-bootstrap';

import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import { allRockshoxForkOilBathInfo, allFoxForkOilBathInfo, rockshoxForkOilBathInfoByYear, foxForkOilBathInfoByYear } from '../utils/queries';

import './home.css';

function Home() {
	const [showAlert, setShowAlert] = useState(false);
	const [initialQueryParameters, setInitialQueryParameters] = useState({
		year: '',
		manufacturer: '',
	});
	const [yearInput, setYearInput] = useState({
		year: '',
	});
	const [selectedManufacturer, setSelectedManufacturer] = useState('');
	const [selectedRockshoxFork, setSelectedRockshoxFork] = useState('');
	const [selectedModel, setSelectedModel] = useState('');
	const [selectedDamperType, setSelectedDamperType] = useState('');
	const [selectedSpringType, setSelectedSpringType] = useState('');
	const [selectedWheelSize, setSelectedWheelSize] = useState('');
	const [initialRockShoxQuery, setInitialRockshoxQuery] = useState(null);
	const [initialFoxQuery, setInitialFoxQuery] = useState(null);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setYearInput({ ...yearInput, [name]: value });
	};

	const handleManufacturerMenuSelect = (event) => {
		setSelectedManufacturer(event.target.value);
	};

	const { data } = useQuery(allRockshoxForkOilBathInfo);

	useEffect(() => {
		console.log(data);
	}, [data]);

	const handleManufacturerYearSearch = (event) => {
		event.preventDefault();
		setInitialQueryParameters({
			year: yearInput,
			manufacturer: selectedManufacturer,
		});
	};

	const [queryFoxForksByYear, { foxQueryResults }] = useLazyQuery(foxForkOilBathInfoByYear);

	const [queryRockshoxForksByYear, { rockshoxQueryResults }] = useLazyQuery(rockshoxForkOilBathInfoByYear);

	useEffect(() => {
		if (initialQueryParameters.manufacturer === 'rockshox') {
			const queriedRockshoxForksByYear = queryRockshoxForksByYear({
				variables: { year: initialQueryParameters.year },
			});
			// setInitialRockshoxQuery(queriedRockshoxForksByYear);
			console.log(queriedRockshoxForksByYear);
		} else if (initialQueryParameters.manufacturer === 'fox') {
			const queriedFoxForksByYear = queryFoxForksByYear({
				variables: { year: initialQueryParameters.year },
			});
			// setInitialFoxQuery(queriedFoxForksByYear);
			console.log(queriedFoxForksByYear);
		}
	}, [initialQueryParameters]);

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
						<Form.Control style={{ userSelect: 'all' }} type='text' size='sm' placeholder='Year' name='year' onChange={handleInputChange} value={yearInput.year} />
						{/* <Form.Control.Feedback type='invalid'>Year is required for search</Form.Control.Feedback> */}
					</Form.Group>
					<Form.Group>
						<Form.Select style={{ userSelect: 'all' }} type='text' size='sm' name='manufacturer' value={selectedManufacturer} onChange={handleManufacturerMenuSelect}>
							<option value=''>Manufacturer</option>
							<option value='fox'>Fox</option>
							{/* <option value='marzocchi'>Marzocchi</option> */}
							<option value='rockshox'>Rockshox</option>
						</Form.Select>
					</Form.Group>

					<Button onClick={handleManufacturerYearSearch}>Search</Button>
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

export default Home;
