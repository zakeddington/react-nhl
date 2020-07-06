import React from 'react';
import PropTypes from 'prop-types';
import { IconBasePath, TeamLogoBasePath, IconType } from '../../../config/ImageIconConfig';
import { SvgIcon, SvgLogo } from './IconStyle';

function Icon(props) {
	const { iconId, iconType, iconClass } = props;
	let url = IconBasePath + iconId;

	if (iconType === IconType.logo) {
		url = TeamLogoBasePath + iconId;
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
