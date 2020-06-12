import React from 'react';
import PropTypes from 'prop-types';
import BoxscorePlayersSkaters from './BoxscorePlayersSkaters';
import BoxscorePlayersGoalies from './BoxscorePlayersGoalies';

function BoxscorePlayersByPosition(props) {
	const {
		boxscorePlayersByPosition,
	} = props;

	const content = boxscorePlayersByPosition.map((group) => {
		const key = `${group.position}`;
		if (group.position === 'Goalies') {
			return <BoxscorePlayersGoalies key={key} position={group.position} boxscorePlayers={group.boxscorePlayers} />;
		} else {
			return <BoxscorePlayersSkaters key={key} position={group.position} boxscorePlayers={group.boxscorePlayers} />;
		}
	});

	return (
		<>
			{content}
		</>
	)
}

BoxscorePlayersByPosition.propTypes = {
	boxscorePlayersByPosition: PropTypes.arrayOf(PropTypes.shape({
		position: PropTypes.string,
		boxscorePlayers: PropTypes.arrayOf(PropTypes.object),
	})),
}

export default BoxscorePlayersByPosition;
