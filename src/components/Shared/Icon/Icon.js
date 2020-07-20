import React from 'react';
import PropTypes from 'prop-types';
import { IconBasePath, TeamLogoBasePath, IconType } from '../../../config/ImageIconConfig';
import './Icon.scss';

function Icon(props) {
	const { iconId, iconType, iconClass } = props;
	let cssClass = 'svg-icon';
	let url = IconBasePath + iconId;

	if (iconClass) {
		cssClass += ` ${iconClass}`;
	}

	if (iconType === IconType.logo) {
		url = TeamLogoBasePath + iconId;
		cssClass += ' team-logo';
	}

	return (
		<svg className={cssClass}>
			<use xlinkHref={url}/>
		</svg>
	)
}

Icon.propTypes = {
	iconId: PropTypes.string,
	iconType: PropTypes.string,
	iconClass: PropTypes.string,
}

export default Icon;
