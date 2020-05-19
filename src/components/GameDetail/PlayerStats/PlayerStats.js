import React from 'react';
import PropTypes from 'prop-types';
import CONSTANTS from '../../../config/Constants';
import Loader from '../../Shared/Loader/Loader';
import ErrorMessage from '../../Shared/ErrorMessage/ErrorMessage';
import Tabs from '../../Shared/Tabs/Tabs';
import Tab from '../../Shared/Tabs/Tab';
import PlayerStatsSkaters from './PlayerStatsSkaters';
import PlayerStatsGoalies from './PlayerStatsGoalies';
import './PlayerStats.scss';


function renderContent(data) {
	const playerStats = data.map((team) => {
		const players = team.stats.map((group) => {
			const key = `${team.id}-${group.position}`;
			if (group.position === 'Goalies') {
				return <PlayerStatsGoalies key={key} position={group.position} players={group.players} />;
			} else {
				return <PlayerStatsSkaters key={key} position={group.position} players={group.players} />;
			}
		});

		return (
			<Tab key={team.id} id={`tab-player-stats-${team.id}`} tabTitle={team.name} iconId={team.id} iconType={CONSTANTS.iconType.logo}>
				{players}
			</Tab>
		)
	});

	return (
		<Tabs key="tabs-player-stats" tabsClass="player-stats--tabs">
			{playerStats}
		</Tabs>
	);
}

function PlayerStats(props) {
	const {
		showLoader,
		showNoResults,
		playerStats,
	} = props;
	let content;

	if (showLoader) {
		content = <Loader/>;
	} else {
		if (showNoResults) {
			content = <ErrorMessage errorMsg="No team stats available."/>;
		} else {
			content = renderContent(playerStats);
		}
	}

	return (
		<>
			{content}
		</>
	)
}


PlayerStats.propTypes = {
	showLoader: PropTypes.bool,
	showNoResults: PropTypes.bool,
	playerStats: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
		stats: PropTypes.array,
	})),
}

export default PlayerStats;
