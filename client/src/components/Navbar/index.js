import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Container, Tab } from 'react-bootstrap';
import { disableFragmentWarnings } from '@apollo/client';

import './style.css';

function Navbar() {

	const refreshPage = () => {
		window.location.reload();
	}
	return (
		<Nav className='navbar'>
			<Link onClick={refreshPage} className='brand' to='/'>
				Plush Lab
			</Link>
			<Link onClick={refreshPage} className='home-btn' to='/'>
				Home
			</Link>
		</Nav>
	);
}

export default Navbar;
