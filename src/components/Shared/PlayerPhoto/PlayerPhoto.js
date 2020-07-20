import React from 'react';
import PropTypes from 'prop-types';
import { PlayerImagePath } from '../../../config/ImageIconConfig';
import './PlayerPhoto.scss';

function PlayerPhoto(props) {
	const { playerId, photoClass } = props;
	const url = `${PlayerImagePath.base}${PlayerImagePath.headshot}${playerId}${PlayerImagePath.ext}`;

	return (
		<div className={`player-photo ${photoClass}`}>
			<div className="player-photo--image" style={{backgroundImage: `url(${url})`}} />
		</div>
	)
}

PlayerPhoto.propTypes = {
	playerId: PropTypes.number,
	photoClass: PropTypes.string,
}

export default PlayerPhoto;
