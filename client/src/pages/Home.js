import React, { useState } from 'react';
import { Button, Form, Dropdown, Alert } from 'react-bootstrap';

import './home.css';

function Home() {
	const [showAlert, setShowAlert] = useState(false);
	const [yearInput, setYearInput] = useState('');
	const [selectedManufacturer, setSelectedManufacturer] = useState('');
	const [selectedRockshoxFork, setSelectedRockshoxFork] = useState('');
	const [selectedModel, setSelectedModel] = useState('');
	const [selectedDamperType, setSelectedDamperType] = useState('');
	const [selectedSpringType, setSelectedSpringType] = useState('');
	const [selectedWheelSize, setSelectedWheelSize] = useState('');

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setUserSearchInput({ ...userSearchInput, [name]: value });
	};

	const handleManufacturerMenuSelect = (event) => {
		setSelectedManufacturer(event.target.value);
	};

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
						<Form.Control style={{ userSelect: 'all' }} type='text' size='sm' placeholder='Year' name='year' onChange={handleInputChange} value={userSearchInput.year} />
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
					
					<Form.Group>{/* Add form group dropdown menu for fork name */}</Form.Group>
					<Form.Group>{/* Add form group dropdown menu for model */}</Form.Group>
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
