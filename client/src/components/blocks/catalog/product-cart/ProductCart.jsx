import React from 'react'
import { hostName } from '../../../../constants'
import './styles.scss'
import { useDispatch } from 'react-redux'
import { addProduct } from '../../../../store/basketSlice'

export default function ProductCart({ product }) {

	const dispatch = useDispatch()

	return (
		<div className='product-cart-container'>
			<div className='product-cart-gallery'>
				<img src={hostName + '/product/image/' + product.gallery} alt='' />
			</div>
			<div className='product-cart-inf-block'>
				<h4>{product.name}</h4>
				<p>{product.price}₽</p>
			</div>
			<div className='product-cart-add-cart' onClick={() => {dispatch(addProduct(product))}}>
				<img src='/icons/catalog/product-cart/add-cart.svg' alt='' />
			</div>
		</div>
	)
}
