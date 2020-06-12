import React from 'react';
import PropTypes from 'prop-types';
import Loader from '../Shared/Loader/Loader';
import PlayerPhoto from '../Shared/PlayerPhoto/PlayerPhoto';


function renderContent(props) {
	const { playerInfo } = props;

	return (
		<>
			<div className="player-detail--hero" style={{backgroundImage: 'url(' + playerInfo.heroImg + ')'}} />
			<div className="player-detail--bio">
				<PlayerPhoto playerId={playerInfo.id} />
				<div className="player-detail--bio-info">
					<div className="player-detail--bio-name">{playerInfo.name} #{playerInfo.number}</div>
					<div>
						<span className="player-detail--bio-stat">{playerInfo.pos} | {playerInfo.height} | {playerInfo.weight} lbs</span>
					</div>
					<div>
						<span className="player-detail--bio-stat">
							<span className="player-detail--bio-label">Shoots:</span> {playerInfo.shoots}
						</span>
					</div>
					<div>
						<span className="player-detail--bio-stat">
							<span className="player-detail--bio-label">Born:</span> {playerInfo.birthDate}
						</span>
						<span className="player-detail--bio-stat">
							<span className="player-detail--bio-label">Age:</span> {playerInfo.age}
						</span>
					</div>
					<div>
						<span className="player-detail--bio-stat">
							<span className="player-detail--bio-label">Birthplace:</span> {playerInfo.birthPlace}
						</span>
					</div>
				</div>
			</div>
		</>
	)
}

function PlayerDetailHero(props) {
	const {
		showLoader,
		showNoResults,
	} = props;
	let content;

	if (showLoader) {
		content = <Loader />;
	} else {
		if (showNoResults) {
			content = null;
		} else {
			content = renderContent(props);
		}
	}

	return (
		<>
			{content}
		</>
	)
}

PlayerDetailHero.propTypes = {
	showLoader: PropTypes.bool,
	showNoResults: PropTypes.bool,
	playerInfo: PropTypes.shape({
		age: PropTypes.number,
		birthDate: PropTypes.string,
		birthPlace: PropTypes.string,
		height: PropTypes.string,
		heroImg: PropTypes.string,
		id: PropTypes.number,
		name: PropTypes.string,
		number: PropTypes.string,
		pos: PropTypes.string,
		shoots: PropTypes.string,
		weight: PropTypes.number,
	}),
}

export default PlayerDetailHero;
