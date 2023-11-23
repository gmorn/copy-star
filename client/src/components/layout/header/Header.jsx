import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import UserService from '../../../service/userService'
import { setIsLogin, setUserRole } from '../../../store/userSlice'
import MainButton from '../../UI/button/main-button/MainButton'
import './styles.scss'

export default function Header({setBasketState}) {
	const { userRole, isLogin } = useSelector((state) => state.user)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const logout = async () => {
		// запрос на удаление куки
		await UserService.logout()
		// отчистка стора
		dispatch(setIsLogin(false))
		dispatch(setUserRole(null))
		// отправка на страницу "О нас"
		navigate('/')
	}

	return (
		<header className='header'>
			<div className='user-block'>
				{isLogin ? (
					<MainButton onClick={logout}>Выйти</MainButton>
				) : (
					<Link to='/auth/login'>
						<MainButton>Войти</MainButton>
					</Link>
				)}
			</div>
			<div className='navbar'>
				<Link to='/'>
					<p>О нас</p>
				</Link>
				<Link to='/catalog'>
					<p>Каталог</p>
				</Link>
				<Link to='/'>
					<p>Где нас найти</p>
				</Link>
				{userRole === 2 ? (
					<Link to='/admin'>
						<p>Админ панель</p>
					</Link>
				) : null}
			</div>
			{isLogin && (
				<div className='menu'>
					<Link to='/orders'>
					<img src='/icons/header/orders.svg' alt='' />
					</Link>
					<img src='/icons/header/basket.svg' alt='fgd' onClick={() => setBasketState(true)} />
				</div>
			)}
		</header>
	)
}
