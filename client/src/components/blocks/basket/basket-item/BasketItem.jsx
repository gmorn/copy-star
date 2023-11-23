import React from 'react'
import { useDispatch } from 'react-redux'
import { hostName } from '../../../../constants'
import {
	decrementProductCount,
	deleteProduct,
	incrementProductCount
} from '../../../../store/basketSlice'
import './styles.scss'

export default function BasketItem({ product }) {
	const dispatch = useDispatch()

	return (
		<div className='basket-item'>
			<img
				src={hostName + '/product/image/' + product.gallery}
				alt=''
				className='basket-item-gallery'
			/>
			<div className='basket-item-content'>
				<div className='basket-item-top'>
					<h3>{product.name}</h3>
					<img
						src='/icons/basket/delete.svg'
						alt=''
						onClick={() => dispatch(deleteProduct(product.id))}
					/>
				</div>
				<div className='basket-item-bottom'>
        <div className='basket-item-counter'>
						<img
							src='/icons/basket/up.svg'
							alt=''
							onClick={() => dispatch(incrementProductCount(product.id))}
						/>
						<p>{product.count}</p>
						<img
							src='/icons/basket/down.svg'
							alt=''
							onClick={() => dispatch(decrementProductCount(product.id))}
						/>
					</div>
					<div className='basket-item-price'>{
            product.count === 1 ?
            <p>{product.price}₽</p> : <>
            <div className="basket-item-prices">
              <div className="top">{product.price}₽</div>
              <div className="bottom">{product.price * product.count}₽</div>
            </div>
            </>
          }</div>
					
				</div>
			</div>
		</div>
	)
}
