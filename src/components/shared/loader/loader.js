import React, { Component } from 'react';
import './loader.scss';

class Loader extends Component {

	render() {
		return (
			<div className="loader">
				<div className="loader-circle bounce1"/>
				<div className="loader-circle bounce2"/>
				<div className="loader-circle bounce3"/>
			</div>
		);
	}
}

export default Loader;
