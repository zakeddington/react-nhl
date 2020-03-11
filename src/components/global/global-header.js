import React from 'react';
import { withRouter } from 'react-router-dom';
import CONSTANTS from '../../config/Constants';
import Drawer from '../shared/drawer/drawer';
import DrawerStandings from '../shared/drawer/drawer-standings';
import Icon from '../shared/icon/icon';
import './global-header.scss';

function GlobalHeader(props) {
	return (
		<header className="site-header">
			<div className="site-header--container">
				<div>
					{
						props.location.pathname.length > 1 &&
						<button className="site-header--back button button--icon-left" onClick={props.history.goBack}>
							<Icon iconId="arrow-left" />
							Back
						</button>
					}
				</div>

				<a href="/" className="site-header--link">
					<img className="site-header--logo" src={`${CONSTANTS.imgUrl.base}logo-nhl.svg`} alt="NHL logo" />
					<span className="offscreen">NHL Stats</span>
				</a>

				<Drawer label="Standings" content={<DrawerStandings />} iconId="standings" />
			</div>
		</header>
	)
}

export default withRouter(GlobalHeader);
