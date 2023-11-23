import React, { useEffect, useState } from 'react'
import ProductService from '../../../../service/productService'
import MainButton from '../../../UI/button/main-button/MainButton'
import Modal from '../../../UI/modal/Modal'
import AddProduct from '../../catalog/add-product/AddProduct'
import ProductItemAdmin from './product-item/ProductItemAdmin'
import './styles.scss'

export default function ProductListAdmin() {
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

	const deleteProduct = (id) => {
		const fetchDeleteProduct = async () => {
			const response = await ProductService.delete(id)
			setProducts(response.data)
		}
		fetchDeleteProduct()
	}

	const updateProduct = (product) => {
    const fetchUpdateProduct = async () => {
			const response = await ProductService.update(product)
			setProducts(response.data)
      console.log(response.data);
		}
		fetchUpdateProduct()
  }

	return (
		<div>
			<Modal setModalState={setModalState} modalState={modalState}>
				<AddProduct setModal={setModalState} />
			</Modal>
			<MainButton onClick={() => setModalState(true)}>
				Добавить товар
			</MainButton>
			<div className='product-list-admin'>
				{products.map((item) => (
					<ProductItemAdmin
						product={item}
						key={item.id}
						deleteItem={deleteProduct}
            updateItem={updateProduct}
					/>
				))}
			</div>
		</div>
	)
}
