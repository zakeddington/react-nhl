import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import CONSTANTS from '../../config/Constants';
import Drawer from '../shared/drawer/drawer';
import DrawerStandings from '../shared/drawer/drawer-standings';
import Icon from '../shared/icon/icon';
import './global-header.scss';

class GlobalHeader extends Component {
	render() {
		console.log(this.props);
		return (
			<header className="site-header">
				<div className="flex-container">
					{
						this.props.location.pathname.length > 1 &&
						<button className="site-header--back button button--icon-left" onClick={this.props.history.goBack}>
							<Icon iconId="arrow-left" />
							Back
						</button>
					}

					<a href="/" className="site-header--link">
						<img className="site-header--logo" src={`${CONSTANTS.imgUrl.base}logo-nhl.svg`} alt="NHL logo" />
						<span className="offscreen">NHL Stats</span>
					</a>

					<Drawer label="Standings" content={<DrawerStandings />} iconId="standings" />
				</div>
			</header>
		);
	}
}

export default withRouter(GlobalHeader);
