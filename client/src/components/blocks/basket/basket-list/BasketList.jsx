import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MainButton from '../../../UI/button/main-button/MainButton'
import BasketItem from '../basket-item/BasketItem'
import './styles.scss'
import OrderService from '../../../../service/orderService'
import { cleanBasket } from '../../../../store/basketSlice'

export default function BasketList({ setBasketState }) {
	const { productInBasket } = useSelector((state) => state.basket)
	const dispatch = useDispatch()
	const [totalCost, setTotalCost] = useState(0)

	useEffect(() => {
		
			const totalPrice = productInBasket.reduce((total, product) => {
				return total + product.price * product.count
			}, 0)
      setTotalCost(totalPrice)
	}, [productInBasket])

  const createOrder = () => {
    const newOrder = {
      date: new Date(),
      products: productInBasket.map(item => ({ id: item.id, count: item.count }))
    };
    
    const fetchOrder = async () => {
      try {
        await OrderService.create(newOrder)
        setBasketState(false)
				dispatch(cleanBasket())
      } catch (error) {
        console.log(error);
      }
    }
    fetchOrder()
  }

	return (
		<div className='basket-list-container'>
			<h1>Товары в корзине:</h1>
			{productInBasket.map((item) => (
				<BasketItem product={item} />
			))}
			<h2>Стоимость заказа: {totalCost}₽</h2>
			<MainButton onClick={createOrder}>Оформить заказ</MainButton>
		</div>
	)
}
