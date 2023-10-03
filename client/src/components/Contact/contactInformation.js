import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

function ContactCard() {
	return (
		<div className='contact-cards d-flex col-8 col-md-4 col-lg-4'>
			<div>
				<ul
					style={{
						listStyleType: 'none',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'flex-start',
					}}>
					<li className='list-item'>
						<Link href='mailto:brahm@brahmvanhouzen.studio'>
							<MdEmail /> Email
						</Link>
					</li>
					<li className='list-item'>
						<Link href='https://github.com/BrahmVanH'>
							<FaGithub /> GitHub
						</Link>
					</li>
					<li className='list-item'>
						<Link href='https://www.linkedin.com/in/brahmvanhouzen/'>
							<FaLinkedin /> LinkedIn
						</Link>
					</li>
					<li className='list-item'>
						<Link href='https://www.instagram.com/instabrahm__/'>
							<FaInstagram /> Instagram
						</Link>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default ContactCard;
