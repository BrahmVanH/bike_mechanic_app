import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Container, Tab } from 'react-bootstrap';
import { disableFragmentWarnings } from '@apollo/client';

import "./style.css";

function Navbar() {
	return (
		<Nav className='navbar'>
			<Link className='brand' to='/'>
				Bike Guru
			</Link>
			<Link className='home-btn' to='/'>
				{' '}
				Home{' '}
			</Link>
		</Nav>
	);
}

export default Navbar;
