import React from 'react';
import { withRouter } from 'react-router-dom';
import { ImageBasePath } from '../../config/ImageIconConfig';
import Drawer from '../Shared/Drawer/Drawer';
import Standings from '../../containers/Standings';
import Icon from '../Shared/Icon/Icon';
import { HeaderStyled, ContainerStyled, HomeLink, HomeLinkImg, BackButton } from './HeaderStyled';
import { Offscreen } from '../../globalStyles/Utilities/Utilities';

function Header(props) {
	return (
		<HeaderStyled>
			<ContainerStyled>
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
					<HomeLinkImg src={`${ImageBasePath}logo-nhl.svg`} alt="NHL logo" />
					<Offscreen>NHL Stats</Offscreen>
				</HomeLink>

				<Drawer label="Standings" content={<Standings />} iconId="standings" />
			</ContainerStyled>
		</HeaderStyled>
	)
}

export default withRouter(Header);
