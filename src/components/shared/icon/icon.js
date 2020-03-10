import React, {Component} from 'react';
import CONSTANTS from '../../../config/Constants';
import './icon.scss';

class Icon extends Component {
	render() {
		const {iconId, iconType, iconClass} = this.props;
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
		);
	}
}

export default Icon;
