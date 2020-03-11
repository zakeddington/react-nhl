import React from 'react';
import './loader.scss';

function Loader() {
	return (
		<div className="loader">
			<div className="loader-circle bounce1"/>
			<div className="loader-circle bounce2"/>
			<div className="loader-circle bounce3"/>
		</div>
	)
}

export default Loader;
