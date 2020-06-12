import React from 'react';
import PropTypes from 'prop-types';
import Loader from '../../Shared/Loader/Loader';
import PlayerPhoto from '../../Shared/PlayerPhoto/PlayerPhoto';
import './PlayerDetailHero.scss';

function renderContent(props) {
	const { playerDetailHero } = props;

	return (
		<>
			<div className="player-detail-hero" style={{backgroundImage: 'url(' + playerDetailHero.heroImg + ')'}} />
			<div className="player-detail-bio">
				<PlayerPhoto playerId={playerDetailHero.id} photoClass="player-detail-bio--photo" />
				<div className="player-detail-bio--info">
					<div className="player-detail-bio--name">{playerDetailHero.name} #{playerDetailHero.number}</div>
					<div>
						<span className="player-detail-bio--stat">{playerDetailHero.pos} | {playerDetailHero.height} | {playerDetailHero.weight} lbs</span>
					</div>
					<div>
						<span className="player-detail-bio--stat">
							<span className="player-detail-bio--label">Shoots:</span> {playerDetailHero.shoots}
						</span>
					</div>
					<div>
						<span className="player-detail-bio--stat">
							<span className="player-detail-bio--label">Born:</span> {playerDetailHero.birthDate}
						</span>
						<span className="player-detail-bio--stat">
							<span className="player-detail-bio--label">Age:</span> {playerDetailHero.age}
						</span>
					</div>
					<div>
						<span className="player-detail-bio--stat">
							<span className="player-detail-bio--label">Birthplace:</span> {playerDetailHero.birthPlace}
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
	playerDetailHero: PropTypes.shape({
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
