import React, { useEffect, useState } from 'react'
import OrderService from '../../../../service/orderService'
import OrderItem from '../order-item/OrderItem'
import './styles.scss'

export default function OrderList() {
	const [orders, setOrders] = useState([])

	useEffect(() => {
		const getUserOrders = async () => {
			try {
				const response = await OrderService.getByUserId()
				setOrders(response.data)
			} catch (error) {
				console.log(error)
			}
		}
		getUserOrders()
	}, [])

	const deleteOrder = (id) => {
		const deleteOrder = async () => {
			try {
				const response = await OrderService.delete(id)
				setOrders(response.data)
			} catch (error) {
				console.log(error)
			}
		}
		deleteOrder()
	}

	return (
		<div className='order-list'>
			{Array.isArray(orders) && orders.length > 0 ? (
				orders.map((item) => (
					<OrderItem order={item} key={item.id} deleteOrder={deleteOrder} />
				))
			) : (
				<p>У вас нет заказов</p>
			)}
		</div>
	)
}
