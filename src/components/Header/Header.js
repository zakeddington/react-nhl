import React from 'react';
import { withRouter } from 'react-router-dom';
import CONSTANTS from '../../config/Constants';
import Drawer from '../Shared/Drawer/Drawer';
import Standings from '../../containers/Standings';
import Icon from '../Shared/Icon/Icon';
import { StyledHeader, StyledContainer, HomeLink, HomeLinkImg, BackButton } from './HeaderStyle';
import { Offscreen } from '../../globalStyles/utilities/Utilities';

function Header(props) {
	return (
		<StyledHeader>
			<StyledContainer>
				<div>
					{
						props.location.pathname.length > 1 &&
						<BackButton onClick={props.history.goBack}>
							<Icon iconId="arrow-left" />
							Back
						</BackButton>
					}
				</div>

				<HomeLink to="/">
					<HomeLinkImg src={`${CONSTANTS.imgUrl.base}logo-nhl.svg`} alt="NHL logo" />
					<Offscreen>NHL Stats</Offscreen>
				</HomeLink>

				<Drawer label="Standings" content={<Standings />} iconId="standings" />
			</StyledContainer>
		</StyledHeader>
	)
}

export default withRouter(Header);
