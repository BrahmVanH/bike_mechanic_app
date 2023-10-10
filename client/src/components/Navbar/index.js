import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Container, Tab } from 'react-bootstrap';
import { disableFragmentWarnings } from '@apollo/client';

import './style.css';

function Navbar() {
	const refreshPage = () => {
		window.location.reload();
	};
	return (
		<Nav className='navbar'>
			<Link className='brand' to='/'>
				Plush Lab
			</Link>
			<div>
				<Link className='nav-btns' to='/'>
					Home
				</Link>
				{/* <Link className='nav-btns' to='/contact'>
					Contact
				</Link> */}
			</div>
		</Nav>
	);
}

export default Navbar;
