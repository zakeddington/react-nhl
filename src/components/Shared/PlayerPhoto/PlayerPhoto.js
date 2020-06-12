import React from 'react';
import PropTypes from 'prop-types';
import './PlayerPhoto.scss';
import CONSTANTS from "../../../config/Constants";

function PlayerPhoto(props) {
	const { playerId, photoClass } = props;
	const url = `${CONSTANTS.imgUrl.player.base}${CONSTANTS.imgUrl.player.headshot}${playerId}${CONSTANTS.imgUrl.player.ext}`;

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
