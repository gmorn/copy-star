import React, { useEffect, useState } from 'react'
import MainButton from '../../components/UI/button/main-button/MainButton'
import Modal from '../../components/UI/modal/Modal'
import AddProduct from '../../components/blocks/catalog/add-product/AddProduct'
import ProductService from '../../service/productService'
import ProductCart from '../../components/blocks/catalog/product-cart/ProductCart'
import './styles.scss'

export default function CatalogPage() {
	const [modalState, setModalState] = useState(false)
	const [products, setProducts] = useState([])

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await ProductService.getProducts()
				setProducts(response.data)
			} catch (error) {
				console.log(error)
			}
		}
		fetchProducts()
	}, [modalState])

	return (
		<div className='catalog-page-container'>
			<div className="catalog-product-list">
				{
					products.map(item => <ProductCart product={item} key={item.id} />)
				}
			</div>
		</div>
	)
}
