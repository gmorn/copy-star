import React from 'react'
import './styles.scss'

export default function Modal({ modalState, setModalState, children }) {
	return (
		<div
			className={`modal-wrapper ${modalState && 'active'}`}
			onClick={() => setModalState(false)}
		>
			<div className='modal-content' onClick={e => e.stopPropagation()} >{children}</div>
		</div>
	)
}
