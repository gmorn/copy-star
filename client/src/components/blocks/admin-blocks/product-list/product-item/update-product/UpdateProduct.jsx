import React, { useEffect, useState } from 'react'
import { hostName } from '../../../../../../constants'
import CategoryService from '../../../../../../service/categoryService'
import MainButton from '../../../../../UI/button/main-button/MainButton'
import Dropdown from '../../../../../UI/dropdown/Dropdown'
import FormInput from '../../../../../UI/input/form-input/FormInput'
import './styles.scss'

export default function UpdateProduct({ setModal, product, updateItem }) {
	const [categories, setCategories] = useState([])
	const [activeCategories, setActiveCategories] = useState({})
	const [selectedImage, setSelectedImage] = useState(null)

	const [newProduct, setNewProduct] = useState({
		id: product.id,
		name: product.name,
		date: product.date,
		model: product.model,
		price: product.price,
		category_id: product.category_id,
		gallery: product.gallery,
		country: product.country
	})

	useEffect(() => {
		setNewProduct({ ...newProduct, category_id: activeCategories.id })
	}, [activeCategories])

	useEffect(() => {
		const fetchCategory = async () => {
			const response = await CategoryService.getAllCategory()
			const productCategory = response.data.filter(
				(item) => item.id === product.category_id
			)
			setActiveCategories(productCategory[0])
			setCategories(response.data)
		}
		fetchCategory()
	}, [])

	const handleImageChange = (event) => {
		const file = event.target.files[0]
		setNewProduct({ ...newProduct, gallery: file })
		setSelectedImage(file)
	}

	const updateNewProduct = () => {
		updateItem(newProduct)
		setModal(false)
	}

	return (
		<div className='update-product-container'>
			<div className='update-product-top'>
				<label htmlFor={`updateImageInput${product.id}`}>
					{selectedImage !== null ? (
						<img
							src={URL.createObjectURL(selectedImage)}
							alt=''
							className='update-product-image'
						/>
					) : (
						<div className='update-product-add-image'>
							<img src={`${hostName}/product/image/${newProduct.gallery}`} alt='' />
						</div>
					)}
				</label>
				<input
					type='file'
					id={`updateImageInput${product.id}`}
					style={{ display: 'none' }}
					onChange={handleImageChange}
				/>
				<div className='update-product-form'>
					<FormInput
						placeholder={'Название'}
						value={newProduct.name}
						onChange={(e) =>
							setNewProduct({ ...newProduct, name: e.target.value })
						}
					/>
					<Dropdown
						items={categories}
						value={activeCategories.name}
						placeholder={'Выберите категорию'}
						setValue={setActiveCategories}
					/>
					<FormInput
						placeholder={'Год выпуска'}
						value={newProduct.date}
						onChange={(e) =>
							setNewProduct({ ...newProduct, date: e.target.value })
						}
					/>
				</div>
			</div>
			<div className='update-product-bottom'>
				<FormInput
					placeholder={'Цена'}
					value={newProduct.price}
					onChange={(e) =>
						setNewProduct({ ...newProduct, price: e.target.value })
					}
				/>
				<FormInput
					placeholder={'Модель'}
					value={newProduct.model}
					onChange={(e) =>
						setNewProduct({ ...newProduct, model: e.target.value })
					}
				/>
				<FormInput
					placeholder={'Страна производитель'}
					value={newProduct.country}
					onChange={(e) =>
						setNewProduct({ ...newProduct, country: e.target.value })
					}
				/>
			</div>
			<div className='update-product-button-block'>
				<MainButton onClick={updateNewProduct}>Сохранить изменения</MainButton>
			</div>
		</div>
	)
}
