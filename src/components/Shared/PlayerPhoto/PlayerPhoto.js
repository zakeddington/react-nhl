import React from 'react';
import PropTypes from 'prop-types';
import { PlayerImagePath } from '../../../config/ImageIconConfig';
import { PlayerPhotoStyled, PlayerPhotoImage } from './PlayerPhotoStyled';

function PlayerPhoto(props) {
	const { playerId } = props;
	const url = `${PlayerImagePath.base}${PlayerImagePath.headshot}${playerId}${PlayerImagePath.ext}`;

	return (
		<PlayerPhotoStyled>
			<PlayerPhotoImage style={{backgroundImage: `url(${url})`}} />
		</PlayerPhotoStyled>
	)
}

PlayerPhoto.propTypes = {
	playerId: PropTypes.number,
}

export default PlayerPhoto;
