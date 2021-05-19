import React, { Component } from 'react';
import '../../css/main.css';
import Navbar from '../../global-components/Navbar/Navbar'
import Footer from '../../global-components/Footer/Footer'
export default class HomePage extends Component {
	render() {
		return (
			<div className="homepagebody theme--light">
				<Navbar/>
				<div>
					HI everybody
				</div>
				<Footer/>
			</div>

		)
	}
}