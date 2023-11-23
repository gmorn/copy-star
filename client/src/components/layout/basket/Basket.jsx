import React from 'react'
import { useSelector } from 'react-redux'
import BasketList from '../../blocks/basket/basket-list/BasketList'
import './styles.scss'

export default function Basket({ setBasketState, basketState }) {
	const { productInBasket } = useSelector((state) => state.basket)

	return (
		<>
			<div
				className={`basket-background ${basketState && 'active'}`}
				onClick={() => setBasketState(false)}
			></div>
			<div className={`basket-container ${basketState && 'active'}`}>
				{productInBasket.length === 0 ? (
					<div className='basket-message'>
						<h1>
							Корзина
							<br />
							Пуста
						</h1>
					</div>
				) : (
					<BasketList setBasketState={setBasketState} />
				)}
			</div>
		</>
	)
}
