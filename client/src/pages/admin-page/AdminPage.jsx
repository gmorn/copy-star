import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import AdminPageSwitcher from '../../components/blocks/admin-blocks/switcher/AdminPageSwitcher'
import ProductListAdmin from '../../components/blocks/admin-blocks/product-list/ProductListAdmin'
import OrderListAdmin from '../../components/blocks/admin-blocks/order-list/OrderListAdmin'

export default function AdminPage() {
	const { userRole } = useSelector((state) => state.user)

	const [pageState, setPageState] = useState('product')

	return (
		<>
			{userRole === 2 ? (
				<>
					<div className='admin-cage-container'>
						<AdminPageSwitcher
							pageState={pageState}
							setPageState={setPageState}
						/>
            {pageState === 'product' ? <>
            <ProductListAdmin/>
            </> : <>
            <OrderListAdmin/>
            </>}
					</div>
				</>
			) : (
				<>
					<div>У вас нет доступа</div>
				</>
			)}
		</>
	)
}
