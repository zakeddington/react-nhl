import React from 'react';
import PropTypes from 'prop-types';
import { IconBasePath, TeamLogoBasePath, IconType } from '../../../config/ImageIconConfig';
import { SvgIcon, SvgLogo } from './IconStyled';

function Icon(props) {
	// must pass a "className" prop so extending styles via styled-components will work
	// https://styled-components.com/docs/basics#styling-any-component
	const { iconId, iconType, iconClass = '', className = '' } = props;
	let url = IconBasePath + iconId;

	if (iconType === IconType.logo) {
		url = TeamLogoBasePath + iconId;
		return (
			<SvgLogo className={`${iconClass} ${className}`}>
				<use xlinkHref={url} />
			</SvgLogo>
		)
	}

	return (
		<SvgIcon className={`${iconClass} ${className}`}>
			<use xlinkHref={url} />
		</SvgIcon>
	)
}

Icon.propTypes = {
	iconId: PropTypes.string,
	iconType: PropTypes.string,
	iconClass: PropTypes.string,
	className: PropTypes.string,
}

export default Icon;
