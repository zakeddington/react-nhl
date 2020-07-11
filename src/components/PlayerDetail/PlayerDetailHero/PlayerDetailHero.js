import React from 'react';
import PropTypes from 'prop-types';
import Loader from '../../Shared/Loader/Loader';
import PlayerPhoto from '../../Shared/PlayerPhoto/PlayerPhoto';
import {
	StyledPlayerDetailHero,
	PlayerDetailBio,
	BioContent,
	BioRow,
	BioName,
	BioStat,
	BioLabel,
} from './PlayerDetailHeroStyle';

function renderContent(props) {
	const { playerDetailHero } = props;

	return (
		<>
			<StyledPlayerDetailHero style={{backgroundImage: 'url(' + playerDetailHero.heroImg + ')'}} />
			<PlayerDetailBio>
				<PlayerPhoto playerId={playerDetailHero.id} />
				<BioContent>
					<BioName>{playerDetailHero.name} #{playerDetailHero.number}</BioName>
					<BioRow>
						<BioStat>{playerDetailHero.pos} | {playerDetailHero.height} | {playerDetailHero.weight} lbs</BioStat>
					</BioRow>
					<BioRow>
						<BioStat>
							<BioLabel>Shoots:</BioLabel> {playerDetailHero.shoots}
						</BioStat>
					</BioRow>
					<BioRow>
						<BioStat>
							<BioLabel>Born:</BioLabel> {playerDetailHero.birthDate}
						</BioStat>
						<BioStat>
							<BioLabel>Age:</BioLabel> {playerDetailHero.age}
						</BioStat>
					</BioRow>
					<BioRow>
						<BioStat>
							<BioLabel>Birthplace:</BioLabel> {playerDetailHero.birthPlace}
						</BioStat>
					</BioRow>
				</BioContent>
			</PlayerDetailBio>
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
