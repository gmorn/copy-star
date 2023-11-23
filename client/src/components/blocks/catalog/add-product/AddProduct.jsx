import React, { useEffect, useState } from 'react'
import CategoryService from '../../../../service/categoryService'
import ProductService from '../../../../service/productService'
import MainButton from '../../../UI/button/main-button/MainButton'
import Dropdown from '../../../UI/dropdown/Dropdown'
import FormInput from '../../../UI/input/form-input/FormInput'
import './styles.scss'

export default function AddProduct({ setModal }) {
	const [categories, setCategories] = useState([])
	const [activeCategories, setActiveCategories] = useState({})
	const [selectedImage, setSelectedImage] = useState(null)

	const [newProduct, setNewProduct] = useState({
		name: '',
		date: '',
		date_creation: new Date(),
		model: '',
		price: '',
		category_id: activeCategories.id,
		gallery: null,
		country: ''
	})

	useEffect(() => {
		setNewProduct({ ...newProduct, category_id: activeCategories.id })
	}, [activeCategories])

	useEffect(() => {
		const fetchCategory = async () => {
			const response = await CategoryService.getAllCategory()
			setCategories(response.data)
		}
		fetchCategory()
	}, [])

	const handleImageChange = (event) => {
		const file = event.target.files[0]
		setNewProduct({ ...newProduct, gallery: file })
		setSelectedImage(file)
	}

	const createNewProduct = () => {
		const fetchProduct = async () => {
			try {
				await ProductService.create(newProduct)
				setActiveCategories({})
				setSelectedImage(null)
				setNewProduct({
					name: '',
					date: '',
					date_creation: new Date(),
					model: '',
					price: '',
					category_id: activeCategories.id,
					gallery: null,
					country: ''
				})
				setModal(false)
			} catch (error) {
				console.log(error)
			}
		}
		fetchProduct()
	}

	return (
		<div className='add-product-container'>
			<div className='add-product-top'>
				<label htmlFor='imageInput'>
					{selectedImage ? (
						<img
							src={URL.createObjectURL(selectedImage)}
							alt=''
							className='add-product-image'
						/>
					) : (
						<div className='add-product-add-image'>
							<img src='/icons/catalog/image.svg' alt='' />
						</div>
					)}
				</label>
				<input
					type='file'
					id='imageInput'
					// accept='image/*'
					style={{ display: 'none' }}
					onChange={handleImageChange}
				/>
				<div className='add-product-form'>
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
			<div className='add-product-bottom'>
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
			<div className='add-product-button-block'>
				<MainButton onClick={createNewProduct}>Добавить</MainButton>
			</div>
		</div>
	)
}
