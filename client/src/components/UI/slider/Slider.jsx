import React, { useEffect, useRef, useState } from 'react'
import './styles.scss'

export default function Slider({ children }) {
	const [offset, setOffset] = useState(null)
	const [pages, setPages] = useState([])
	const [pageLength, setPageLength] = useState(0)
	const [transition, setTransition] = useState(false)
	const [disabledState, setDisabledState] = useState(false)

	const sliderPagesRef = useRef()

	useEffect(() => {
		if (sliderPagesRef.current) {
			setPageLength(sliderPagesRef.current.getBoundingClientRect().width)
		}
	}, [])

	useEffect(() => {
		setOffset(pageLength * -1)
		setTimeout(() => {
			setTransition(true)
		}, 100);
	}, [pageLength])

	useEffect(() => {
		setPages([children[children.length - 1], ...children, children[0]])
	}, [children])

	const handleLeftArrowClick = () => {
		if (!disabledState) {
			setDisabledState(true)
			if (offset === pageLength * -1) {
				setOffset(offset + pageLength)
				setTimeout(() => {
					setTransition(false)
					setOffset(pageLength * (pages.length - 2) * -1)
				}, 400)
			} else {
				setOffset(offset + pageLength)
			}
			setTimeout(() => {
				setDisabledState(false)	
			}, 400)
			setTransition(true)
		}
	}

	const handleRightArrowClick = () => {
		if (!disabledState) {
			setDisabledState(true)
			if (offset === (pageLength * (pages.length - 2) * -1)) {
				setOffset(offset - pageLength)
				setTimeout(() => {
					setTransition(false)
					setOffset(pageLength * -1)
				}, 400)
			} else {
				setOffset(offset - pageLength)
			}
			setTimeout(() => {
				setDisabledState(false)	
			}, 400)
			setTransition(true)
		}
	}

	return (
		<div className='slider-container'>
			<img
				src='/icons/slider/left-arrow.svg'
				alt=''
				onClick={handleLeftArrowClick}
			/>
			<div className='slider-window'>
				<div
					className='slider-pages'
					style={{
						transform: `translateX(${offset}px)`,
						transition: transition ? '300ms' : '0ms'
					}}
					ref={sliderPagesRef}
				>
					{pages}
				</div>
			</div>
			<img
				src='/icons/slider/right-arrow.svg'
				alt=''
				onClick={handleRightArrowClick}
			/>
		</div>
	)
}
