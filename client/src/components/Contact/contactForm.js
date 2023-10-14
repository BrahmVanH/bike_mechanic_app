import React from 'react';
import emailjs from '@emailjs/browser';
import { Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

import './style.css';

// Import EmailJS for form support

function ContactForm() {
	const handleOnSubmit = (e) => {
		e.preventDefault();

		emailjs.sendForm(process.env.REACT_APP_EMAILJS_SERVICE_ID, process.env.REACT_APP_EMAILJS_TEMPLATE_ID, e.target, process.env.REACT_APP_EMAILJS_PUBLIC_KEY).then(
			(result) => {
				console.log(result.test);
				Swal.fire({
					icon: 'success',
					title: 'Message Sent Successfully',
				});
			},
			(error) => {
				Swal.fire({
					icon: 'error',
					title: 'Something went wrong!',
					text: error.text,
				});
			}
		);

		e.target.reset();
	};

	return (
		<div className='contact-cards p-sm-5 col-8 col-md-4 col-lg-4'>
			<h2 className='contact-header-text text-center mb-4'>Contact</h2>
			<Form className='contact-form d-flex' onSubmit={handleOnSubmit}>
				<div className='mb-3'>
					<Form.Group controlId='formBasicName' required>
						<Form.Control type='name' name='from_name' placeholder='Name' />
					</Form.Group>
				</div>
				<div className='mb-3'>
					<Form.Group controlId='formBasicEmail' required>
						<Form.Control type='email' name='from_email' placeholder='Email Address' />
					</Form.Group>
				</div>
				<div className='mb-3'>
					<Form.Group controlId='basicTextArea' required>
						<Form.Control as='textarea' rows={4} placeholder='Your message here' name='message' />
					</Form.Group>
				</div>
				<div>
					<Button className='btn btn-dark d-block w-100' type='submit'>
						Send
					</Button>
				</div>
			</Form>
		</div>
	);
}

export default ContactForm;
