import React from 'react';
import PropTypes from 'prop-types';
import CONSTANTS from '../../../config/Constants';
// import './Icon.scss';
import { SvgIcon, SvgLogo } from './IconStyle';

function Icon(props) {
	const { iconId, iconType, iconClass } = props;
	let url = CONSTANTS.imgUrl.icon.base + iconId;

	if (iconType === 'logo') {
		url = CONSTANTS.imgUrl.logoTeams.base + iconId;
		return (
			<SvgLogo className={iconClass}>
				<use xlinkHref={url} />
			</SvgLogo>
		)
	}

	return (
		<SvgIcon className={iconClass}>
			<use xlinkHref={url} />
		</SvgIcon>
	)
}

Icon.propTypes = {
	iconId: PropTypes.string,
	iconType: PropTypes.string,
	iconClass: PropTypes.string,
}

export default Icon;
