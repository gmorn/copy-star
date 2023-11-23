import React, { useState } from 'react'
import './styles.scss'

export default function Dropdown({ placeholder, items, value, setValue }) {
	const [menuState, setMenuState] = useState(false)

	const newValue = (value) => {
		setValue(value)
		setMenuState(false)
	}

	return (
		<div className='dropdown-container'>
			<div
				className={`dropdown-value ${menuState && 'focus'}`}
				onClick={() => setMenuState(!menuState)}
			>
				{!value ? placeholder : value}
			</div>
			<div
				className={`dropdown-items-block  ${menuState && 'focus'} ${
					menuState && 'active'
				}`}
			>
				{items.map((item) => (
					<div
						key={item.id}
						className='dropdown-item'
						onClick={() => newValue(item)}
					>
						{item.name}
					</div>
				))}
			</div>
		</div>
	)
}
