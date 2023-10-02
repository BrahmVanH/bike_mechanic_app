import React from 'react';
import './style.css';

const ProductCard = (props) => {
	if (props.manufacturer === 'rockshox') {
		const { fork, model, year, wheelSize, damperType, springType } = props.product;

		return (
			<div className='container'>
				<div className='card'>
					
					<div className='product-details-container'>
						<p className='product-details-text'>
							<span className='product-detail-labels'>Model: </span>
							{fork} {model}
						</p>
						<p className='product-details-text'>
							<span className='product-detail-labels'>Year: </span>
							{year}
						</p>
						{wheelSize ? (
							<p className='product-details-text'>
								<span className='product-detail-labels'>Wheel Size:</span> {wheelSize}"
							</p>
						) : (
							<></>
						)}
						<p className='product-details-text'>
							<span className='product-detail-labels'>Damper: </span>
							{damperType}
						</p>
						<p className='product-details-text'>
							<span className='product-detail-labels'>Spring: </span>
							{springType}
						</p>
					</div>
				</div>
			</div>
		);
	} else if (props.manufacturer === 'fox') {
		const { model, year, wheelSize, damperType, springType } = props.product;
		

		return (
			<div className='container'>
				<div className='card'>
					<div className='product-details-container'>
						<p className='card-header-text'>
							<span className='product-detail-labels'>Model: </span>
							{model}
						</p>
						<p className='card-header-text'>
							<span className='product-detail-labels'>Year: </span>
							{year}
						</p>
						{wheelSize ? (
							<p className='product-details-text'>
								<span className='product-detail-labels'>Wheel Size:</span> {wheelSize}"
							</p>
						) : (
							<></>
						)}
						<p className='product-details-text'>
							<span className='product-detail-labels'>Damper: </span>
							{damperType}
						</p>
						<p className='product-details-text'>
							<span className='product-detail-labels'>Spring: </span>
							{springType}
						</p>
					</div>
				</div>
			</div>
		);
	}
};

export default ProductCard;
