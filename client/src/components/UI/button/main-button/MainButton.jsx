import React from 'react'
import './styles.scss'

export default function MainButton({ children, onClick }) {
	return (
		<button className='main-button' onClick={onClick}>
			{children}
		</button>
	)
}
