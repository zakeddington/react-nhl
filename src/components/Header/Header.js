import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {IconType,} from '../../config/ImageIconConfig';
import Drawer from '../Shared/Drawer/Drawer';
import Standings from '../../containers/Standings';
import ThemePicker from '../ThemePicker/ThemePicker';
import Icon from '../Shared/Icon/Icon';
import { HeaderStyled, ContainerStyled, HomeLink, BackButton } from './HeaderStyled';
import { Offscreen } from '../../globalStyles/Utilities/Utilities';

function Header(props) {
	const { themeId } = props;

	return (
		<HeaderStyled>
			<ContainerStyled>
				<>
					{
						props.location.pathname.length > 1 &&
						<BackButton onClick={props.history.goBack}>
							<Icon iconId="arrow-left" />
							Back
						</BackButton>
					}
				</>

				<HomeLink to="/">
					<Icon iconId="0" iconType={IconType.logo} />
					<Offscreen>NHL Stats</Offscreen>
				</HomeLink>

				<Drawer label="Theme" iconType={IconType.logo} iconId={`${themeId}`} content={
					<ThemePicker themeId={themeId} />
				} />

				<Drawer label="Standings" content={<Standings />} iconId="standings" />
			</ContainerStyled>
		</HeaderStyled>
	)
}

export default withRouter(Header);

Header.propTypes = {
	themeId: PropTypes.number,
}
