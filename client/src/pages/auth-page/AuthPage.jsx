import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import ButtonBlock from '../../components/blocks/auth-blocks/button-block/ButtonBlock'
import InputBlock from '../../components/blocks/auth-blocks/input-block/InputBlock'
import UserService from '../../service/userService'
import { setIsLogin, setUserRole } from '../../store/userSlice'
import './styles.scss'

export default function AuthPage() {
	const { pageType } = useParams()
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const [user, setUser] = useState({
		name: { value: '', isValid: false },
		surname: { value: '', isValid: false },
		patronymic: { value: '', isValid: false },
		login: { value: '', isValid: false },
		email: { value: '', isValid: false },
		password: { value: '', isValid: false },
		passwordRepeat: { value: '', isValid: false },
		rules: { value: 'off', isValid: false }
	})

	const [loginState, setLoginState] = useState(false)
	const [emailState, setEmailState] = useState(false)
	const [passwordState, setPasswordState] = useState(false)

	useEffect(() => {
		setLoginState(false)
		setEmailState(false)
		setPasswordState(false)
	}, [pageType])

	const fetchUser = async (pageType) => {
		let response
		switch (pageType) {
			case 'login':
				const userDataForLogin = {
					login: user.login.value,
					password: user.password.value
				}
				response = await UserService.login(userDataForLogin)
				if (response.status === 400) {
					switch (response.data) {
						case 'login not available':
							setLoginState(true)
						case 'password not available':
							setPasswordState(true)
					}
				}
				break
			case 'registration':
				const userDataForReg = {
					name: user.name.value,
					surname: user.surname.value,
					patronymic: user.patronymic.value,
					email: user.email.value,
					login: user.login.value,
					password: user.password.value
				}
				response = await UserService.reg(userDataForReg)
				if (response.status === 400) {
					switch (response.data) {
						case 'login not available':
							setLoginState(true)
						case 'email not available':
							setEmailState(true)
					}
				}
		}
		if (response.status === 200) {
			dispatch(setIsLogin(true))
			dispatch(setUserRole(response.data))
			navigate('/')
		}
	}

	return (
		<div className='auth-page-container'>
			<h1>
				{pageType === 'login'
					? 'Вход'
					: pageType === 'registration'
					? 'Регистрация'
					: ''}
			</h1>
			<InputBlock
				pageType={pageType}
				user={user}
				setUser={setUser}
				loginState={loginState}
				emailState={emailState}
				passwordState={passwordState}
				setLoginState={setLoginState}
				setEmailState={setEmailState}
				setPasswordState={setPasswordState}
			/>
			<ButtonBlock
				pageType={pageType}
				user={user}
				fetchUser={fetchUser}
				loginState={loginState}
				emailState={emailState}
				passwordState={passwordState}
			/>
		</div>
	)
}
