import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { ImageBasePath } from '../../config/ImageIconConfig';
import Drawer from '../Shared/Drawer/Drawer';
import { IconType } from '../../config/ImageIconConfig';
import Standings from '../../containers/Standings';
import ThemePicker from '../ThemePicker/ThemePicker';
import Icon from '../Shared/Icon/Icon';
import './GlobalHeader.scss';

function GlobalHeader(props) {
	const { themeId } = props;

	return (
		<header className="site-header">
			<div className="site-header--container">
				{
					props.location.pathname.length > 1 &&
					<button className="site-header--back text-button flex-button" onClick={props.history.goBack}>
						<Icon iconId="arrow-left" />
						Back
					</button>
				}

				<Link to="/" className="site-header--link">
					<img className="site-header--logo" src={`${ImageBasePath}logo-nhl.svg`} alt="NHL logo" />
					<span className="offscreen">NHL Stats</span>
				</Link>

				<Drawer label="Theme" iconType={IconType.logo} iconId={`${themeId}`} content={
					<ThemePicker themeId={themeId} />
				} />

				<Drawer label="Standings" content={<Standings />} iconId="standings" />
			</div>
		</header>
	)
}

export default withRouter(GlobalHeader);
