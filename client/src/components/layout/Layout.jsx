import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import UserService from '../../service/userService'
import { setIsLogin, setUserRole } from '../../store/userSlice'
import Header from './header/Header'
import Basket from './basket/Basket'

export default function Layout({ children }) {
	const [basketState, setBasketState] = useState(false)


	const location = useLocation()
	const currentPath = location.pathname
	const pattern = /^\/auth\/\w+$/

	// запрос на проверку токена
	const { isLogin } = useSelector((state) => state.user)

	const dispatch = useDispatch()

	useEffect(() => {
		console.log(isLogin)
	}, [isLogin])

	useEffect(() => {
		const isLogin = async () => {
			try {
				const response = await UserService.isLogin()
				if (response.data.status === true) {
					dispatch(setIsLogin(true))
					dispatch(setUserRole(response.data.roleId))
				}
			} catch (error) {
				console.error(error)
			}
		}

		isLogin()
	}, [])

	return (
		<div className='container'>
			{!pattern.test(currentPath) && <Header setBasketState={setBasketState} />}
			{!pattern.test(currentPath) && <Basket setBasketState={setBasketState} basketState={basketState} />}
			{children}
		</div>
	)
}
