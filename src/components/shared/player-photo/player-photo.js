import React from 'react';
import './player-photo.scss';
import CONSTANTS from "../../../config/Constants";

function PlayerPhoto(props) {
	const url = `${CONSTANTS.imgUrl.player.base}${CONSTANTS.imgUrl.player.headshot}${props.playerId}${CONSTANTS.imgUrl.player.ext}`;

	return (
		<div className="player-photo">
			<div className="photo" style={{backgroundImage: `url(${url})`}} />
		</div>
	)
}

export default PlayerPhoto;
