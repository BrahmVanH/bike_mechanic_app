import React from 'react';

import ContactForm from './contactForm';

export default function Contact() {
	return (
		<div style={{backgroundColor: "black", height: "100vh"}}>
			<div
				className='contact-container d-flex justify-content-center row
			align-items-center'>
				<ContactForm />
			</div>
		</div>
	);
}
