import React, { useState } from 'react'
import { hostName } from '../../../../../constants'
import MainButton from '../../../../UI/button/main-button/MainButton'
import Modal from '../../../../UI/modal/Modal'
import './styles.scss'
import UpdateProduct from './update-product/UpdateProduct'

export default function ProductItemAdmin({ product, deleteItem, updateItem }) {
	const [modalState, setModalState] = useState(false)

	return (
		<div className='product-item-admin-container'>
			<Modal modalState={modalState} setModalState={setModalState}>
				<UpdateProduct product={product} setModal={setModalState} updateItem={updateItem}/>
			</Modal>
			<div className='product-item-admin-gallery'>
				<img src={hostName + '/product/image/' + product.gallery} alt='' />
			</div>
			<div className='product-item-admin-inf-block'>
				<h4>{product.name}</h4>
				<p>{product.price}₽</p>
			</div>
			<div className='product-item-admin-button-block'>
				<MainButton onClick={() => setModalState(true)}>Изменить</MainButton>
				<MainButton onClick={() => deleteItem(product.id)}>Удалить</MainButton>
			</div>
		</div>
	)
}
