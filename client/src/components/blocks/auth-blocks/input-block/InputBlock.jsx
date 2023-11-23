import React from 'react'
import FormInput from '../../../UI/input/form-input/FormInput'
import './styles.scss'

// проверки строк
const cyrillicPattern = /^[а-яА-ЯёЁ\s-]+$/
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const latinPattern = /^[a-zA-Z0-9-]+$/

export default function InputBlock({
	pageType,
	user,
	setUser,
	loginState,
	emailState,
	passwordState,
	setLoginState,
	setEmailState,
	setPasswordState
}) {
	const nameValidation = (value) => {
		setUser({
			...user,
			name: { value, isValid: !cyrillicPattern.test(value) }
		})
	}
	const surnameValidation = (value) => {
		setUser({
			...user,
			surname: { value, isValid: !cyrillicPattern.test(value) }
		})
	}
	const patronymicValidation = (value) => {
		setUser({
			...user,
			patronymic: { value, isValid: !cyrillicPattern.test(value) }
		})
	}
	const loginValidation = (value) => {
		setLoginState(false)
		setUser({
			...user,
			login: { value, isValid: !latinPattern.test(value) }
		})
	}
	const emailValidation = (value) => {
		setEmailState(false)
		setUser({
			...user,
			email: { value, isValid: !emailPattern.test(value) }
		})
	}
	const passwordValidation = (value) => {
		setPasswordState(false)
		setUser({
			...user,
			password: {
				value,
				isValid: pageType === 'login' ? false : value.length < 6
			}
		})
	}
	const passwordRepeatValidation = (value) => {
		setUser({
			...user,
			passwordRepeat: { value, isValid: value !== user.password.value }
		})
	}
	const inputData = [
		{
			pageType: ['registration'],
			type: 'text',
			placeholder: 'Имя',
			label: 'Используйте только "а-я", "А-Я"',
			value: user.name.value,
			onChange: nameValidation,
			status: user.name.isValid
		},
		{
			pageType: ['registration'],
			type: 'text',
			placeholder: 'Фамилия',
			label: 'Используйте только "а-я", "А-Я"',
			value: user.surname.value,
			onChange: surnameValidation,
			status: user.surname.isValid
		},
		{
			pageType: ['registration'],
			type: 'text',
			placeholder: 'Отчество (не обязательно)',
			label: 'Используйте только "а-я", "А-Я"',
			value: user.patronymic.value,
			onChange: patronymicValidation,
			status: user.patronymic.isValid
		},
		{
			pageType: ['login', 'registration'],
			type: 'text',
			placeholder: 'Логин',
			label: loginState
				? (pageType === 'login'
						? 'Пользователя с таким логином нет'
						: 'Пользователь с таким логином уже существует')
				: 'Используйте только "a-z", "A-Z", "0-9", "-"',
			value: user.login.value,
			onChange: loginValidation,
			status: loginState ? loginState : user.login.isValid
		},
		{
			pageType: ['registration'],
			type: 'text',
			placeholder: 'Email',
			label: emailState
				? 'Пользователь с такой почтой уже существует'
				: 'Некорректная почта',
			value: user.email.value,
			onChange: emailValidation,
			status: emailState ? emailState : user.email.isValid
		},
		{
			pageType: ['login', 'registration'],
			type: 'password',
			placeholder: 'Пароль',
			label: passwordState ? 'Неверный пароль' : 'Пароль не менее 6 символов',
			value: user.password.value,
			onChange: passwordValidation,
			status: passwordState ? passwordState : user.password.isValid
		},
		{
			pageType: ['registration'],
			type: 'password',
			placeholder: 'Повторите пароль',
			label: 'Пароли не совпадают',
			value: user.passwordRepeat.value,
			onChange: passwordRepeatValidation,
			status: user.passwordRepeat.isValid
		}
	]

	return (
		<div className='input-block-container'>
			{inputData.map(
				(input, index) =>
					input.pageType.includes(pageType) && (
						<FormInput
							key={index}
							type={input.type}
							placeholder={input.placeholder}
							label={input.label}
							value={input.value}
							onChange={(e) => input.onChange(e.target.value)}
							status={input.status}
						/>
					)
			)}
			{pageType === 'registration' && (
				<div className='input-block-checkbox'>
					<p>Я согласен справилами регистрации</p>
					<input
						type='checkbox'
						checked={user.rules.value === 'on'}
						onChange={(e) =>
							setUser({
								...user,
								rules: { ...user.rules, value: e.target.checked ? 'on' : 'off' }
							})
						}
					/>
				</div>
			)}
		</div>
	)
}
