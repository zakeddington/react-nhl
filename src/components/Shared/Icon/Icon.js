import React from 'react';
import CONSTANTS from '../../../config/Constants';
import './Icon.scss';

function Icon(props) {
	const {iconId, iconType, iconClass} = props;
	let cssClass = 'svg-icon';
	let url = CONSTANTS.imgUrl.icon.base + iconId;

	if (iconClass) {
		cssClass += ` ${iconClass}`;
	}

	if (iconType === 'logo') {
		url = CONSTANTS.imgUrl.logoTeams.base + iconId;
		cssClass += ' team-logo';
	}

	return (
		<svg className={cssClass}>
			<use xlinkHref={url}/>
		</svg>
	)
}

export default Icon;
