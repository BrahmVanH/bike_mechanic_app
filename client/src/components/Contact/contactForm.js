import React from 'react';
import emailjs from 'emailjs-com';
import { Form, Input, TextArea, Button, FormLabel } from 'semantic-ui-react';
import Swal from 'sweetalert2';

import './style.css';

// Import EmailJS for form support

function ContactForm() {
	const handleOnSubmit = (e) => {
		e.preventDefault();

		emailjs
			.sendForm(
				process.env.SERVICE_ID,
				process.env.TEMPLATE_ID,
				e.target,
				process.env.PUBLIC_KEY
			)
			.then(
				(result) => {
					console.log(result.test);
					Swal.fire({
						icon: 'success',
						title: 'Message Sent Successfully',
					});
				},
				(error) => {
					console.log(error.text);
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
		<div
			
			className='contact-cards p-sm-5 col-8 col-md-4 col-lg-2'>
			<h2 className='contact-header-text text-center mb-4'>Contact</h2>
			<Form className="contact-form d-flex" onSubmit={handleOnSubmit}>
				<div className='contact-form mb-3'>
					<Form.Field
						id='form-input-control-last-name'
						control={Input}
						name='user_name'
						placeholder='Name'
						required
						icon='user_circle'
						iconPosition='left'
					/>
				</div>
				<div className='mb-3'>
					<Form.Field
						id='form-input-control-email'
						className='email-text'
						control={Input}
						name='user_email'
						placeholder='Email Address'
						required
						icon='mail'
						iconPosition='left'
					/>
				</div>
				<div className='mb-3'>
					<Form.Field
						id='form-textarea-control-opinion'
						control={TextArea}
						name='user_message'
						placeholder='Message'
						required
					/>
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
