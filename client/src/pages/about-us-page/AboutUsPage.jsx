import React from 'react'
import Slider from '../../components/UI/slider/Slider'
import './styles.scss'

export default function AboutUsPage() {
	return (
		<div className='about-us-page-container'>
			<h2>Copy Star</h2>
			<h3>"Ваш успех - наша звездная копия"</h3>
			<p>Наши новинки</p>
			<Slider>
				<div className="item item-1"></div>
				<div className="item item-2"></div>
				<div className="item item-3"></div>
				<div className="item item-4"></div>
			</Slider>
		</div>
	)
}
