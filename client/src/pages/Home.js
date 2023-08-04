import React, { useState } from 'react';
import { Button, Form, Dropdown, Alert } from 'react-bootstrap';

function Home() {
	const [showAlert, setShowAlert] = useState(false);
  const [userSearchInput, setUserSearchInput] = useState({
    year: '',
    manufacturer: '',
    fork: '',
    model: ''
  })
  const handleInputChange = (event) => {
		const { name, value } = event.target;
		setUserSearchInput({ ...userSearchInput, [name]: value });
	};

	return (
		<div className='main-container'>
			<div className='welcome-message'>
				<p>The Bike Guru welcomes you. Please search for your fork below</p>
			</div>

			<div className='search-container'>
				<Form>
					<Alert dismissible onClose={() => setShowAlert(true)} show={showAlert} variant='danger'>
						You must complete all fields before searching
					</Alert>
					<Form.Group>
						<Form.Control style={{ userSelect: 'all' }} type='text' size='sm' placeholder='Year' name='year' onChange={handleInputChange} value={userSearchInput.year} />
						<Form.Control.Feedback type='invalid'>Year is required for search</Form.Control.Feedback>
					</Form.Group>
					<Form.Group>{/* Add form group dropdown menu for manufacturer */}</Form.Group>
					<Form.Group>{/* Add form group dropdown menu for fork name */}</Form.Group>
					<Form.Group>{/* Add form group dropdown menu for model */}</Form.Group>
          
				</Form>
			</div>
		</div>
	);
}
