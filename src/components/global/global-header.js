import React, { Component } from 'react';
import CONSTANTS from '../../config/Constants';
import './global-header.scss';

class GlobalHeader extends Component {
	render() {
		return (
			<header className="site-header">
				<div className="container">
					<a href="/" className="site-header--link">
						<img className="site-header--logo" src={`${CONSTANTS.imgUrl.base}logo-nhl.svg`} alt="NHL logo" />
						<span className="offscreen">NHL Stats</span>
					</a>
				</div>
			</header>
		);
	}
}

export default GlobalHeader;
