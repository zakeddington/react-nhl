import React from 'react';
import PropTypes from 'prop-types';
import PlayerStatsSkaters from './PlayerStatsSkaters';
import PlayerStatsGoalies from './PlayerStatsGoalies';

function PlayerStatsByPosition(props) {
	const {
		playerStatsByPosition,
	} = props;

	const content = playerStatsByPosition.map((group) => {
		const key = `${group.position}`;
		if (group.position === 'Goalies') {
			return <PlayerStatsGoalies key={key} position={group.position} playerStats={group.playerStats} />;
		} else {
			return <PlayerStatsSkaters key={key} position={group.position} playerStats={group.playerStats} />;
		}
	});

	return (
		<>
			{content}
		</>
	)
}

PlayerStatsByPosition.propTypes = {
	playerStatsByPosition: PropTypes.arrayOf(PropTypes.shape({
		position: PropTypes.string,
		playerStats: PropTypes.arrayOf(PropTypes.object),
	})),
}

export default PlayerStatsByPosition;
