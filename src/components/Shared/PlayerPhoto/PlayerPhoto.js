import React from 'react';
import PropTypes from 'prop-types';
import { PlayerImagePath } from '../../../config/ImageIconConfig';
import { StyledPlayerPhoto, PlayerPhotoImage } from './PlayerPhotoStyle';

function PlayerPhoto(props) {
	const { playerId, photoClass } = props;
	const url = `${PlayerImagePath.base}${PlayerImagePath.headshot}${playerId}${PlayerImagePath.ext}`;

	return (
		<StyledPlayerPhoto className={photoClass}>
			<PlayerPhotoImage style={{backgroundImage: `url(${url})`}} />
		</StyledPlayerPhoto>
	)
}

PlayerPhoto.propTypes = {
	playerId: PropTypes.number,
	photoClass: PropTypes.string,
}

export default PlayerPhoto;
