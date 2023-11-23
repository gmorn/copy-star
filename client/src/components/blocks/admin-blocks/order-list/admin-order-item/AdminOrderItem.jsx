import React, { useEffect, useState } from 'react'
import ProductService from '../../../../../service/productService'
import MainButton from '../../../../UI/button/main-button/MainButton'
import './styles.scss'

export default function AdminOrderItem({ order, cancellationOrder ,completeOrder }) {
	const [products, setProducts] = useState([])

	useEffect(() => {
		const fetchProduct = async (id) => {
			const response = await ProductService.getProductById(id)
			return response.data
		}

		const loadProducts = async () => {
			try {
				const jsonArrayString =
					'[' + order.products.slice(1, -1).split(',').join(',') + ']'
				const objects = JSON.parse(jsonArrayString)
				const products = objects.map((str) => JSON.parse(str))

				// Use Promise.all to wait for all fetchProduct promises to resolve
				const productsData = await Promise.all(
					products.map(async (item) => {
						const product = await fetchProduct(item.id)
						return { ...product, count: item.count }
					})
				)

				setProducts(productsData)
			} catch (error) {
				console.error('Error loading products:', error)
			}
		}
		loadProducts()
		console.log(order)
	}, [order])

	return (
		<div className='order-items'>
			{products.map((item) => (
				<div className='order-item'>
					<p>Название: {item.name}</p>
					<p>Цена за шт.: {item.price}</p>
					<p>Количество: {item.count}</p>
				</div>
			))}
			<div className='order-item-nav'>
				<h3>
					Cтатус заказа:{' '}
					{order.order_status_id === 1
						? 'Новое'
						: order.order_status_id === 2
						? 'Подтверждено'
						: order.order_status_id === 3 && 'Отклонен'}
				</h3>
				{order.order_status_id === 1 && (
					<>
						<MainButton onClick={() => completeOrder(order.id)}>
							Подтвердить
						</MainButton>
						<MainButton onClick={() => cancellationOrder(order.id)}>
							Отменить
						</MainButton>
					</>
				)}
			</div>
		</div>
	)
}
