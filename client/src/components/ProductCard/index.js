import React from 'react';
import './style.css';

const ProductCard = (props) => {
	if (props.manufacturer === 'rockshox') {
		const { fork, model, year, wheelSize, damperType, springType } = props.product;

		return (
			<div className='container'>
				<div className='card'>
					<div className='card-header'>
						<p>
							{fork} {model}
						</p>
						<p>{year}</p>
					</div>
					<div className='product-details'>
						{wheelSize ? <p>{wheelSize}"</p> : <></>}
						<p>{damperType}</p>
						<p>{springType}</p>
					</div>
				</div>
			</div>
		);
	} else if (props.manufacturer === 'fox') {
		const { model, year, wheelSize, damperType, springType } = props.product;
		console.log(model);
		console.log(year);
		console.log(damperType);
		console.log(springType);

		return (
				<div className='card'>
					<div className='card-header'>
						<p>{model}</p>
						<p>{year}</p>
					</div>
					<div className='product-details'>
						{wheelSize ? <p>{wheelSize}"</p> : <></>}
						<p>{damperType}</p>
						<p>{springType}</p>
					</div>
				</div>
		);
	}
};

export default ProductCard;
