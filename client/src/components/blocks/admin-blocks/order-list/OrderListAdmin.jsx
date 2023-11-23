import React, { useEffect, useState } from 'react'
import OrderService from '../../../../service/orderService'
import './styles.scss'
import AdminOrderItem from './admin-order-item/AdminOrderItem'

export default function OrderList() {
	const [orders, setOrders] = useState([])

	useEffect(() => {
		const getUserOrders = async () => {
			try {
				const response = await OrderService.getAllOrder()
				setOrders(response.data)
			} catch (error) {
				console.log(error)
			}
		}
		getUserOrders()
	}, [])

	const completeOrder = (id) => {
		const deleteOrder = async () => {
			try {
				const response = await OrderService.complete(id)
				setOrders(response.data)
			} catch (error) {
				console.log(error)
			}
		}
		deleteOrder()
	}
	const cancellationOrder = (id) => {
		const deleteOrder = async () => {
			try {
				const response = await OrderService.cancellation(id)
				setOrders(response.data)
        
			} catch (error) {
				console.log(error)
			}
		}
		deleteOrder()
	}

	return (
		<div className='order-list'>
			{orders.map((item) => (
				<AdminOrderItem
					order={item}
					key={item.id}
					cancellationOrder={cancellationOrder}
					completeOrder={completeOrder}
				/>
			))}
		</div>
	)
}
