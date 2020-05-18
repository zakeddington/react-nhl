import React from 'react';
import PropTypes from 'prop-types';
import CONSTANTS from '../../../config/Constants';
import Loader from '../../Shared/Loader/Loader';
import ErrorMessage from '../../Shared/ErrorMessage/ErrorMessage';
import Tabs from '../../Shared/Tabs/Tabs';
import Tab from '../../Shared/Tabs/Tab';
import TeamStatsSkaters from './TeamStatsSkaters';
import TeamStatsGoalies from './TeamStatsGoalies';
import './TeamStats.scss';


function renderContent(data) {
	const teamStats = data.map((team) => {
		const players = team.stats.map((group) => {
			const key = `${team.id}-${group.position}`;
			if (group.position === 'Goalies') {
				return <TeamStatsGoalies key={key} position={group.position} players={group.players} />;
			} else {
				return <TeamStatsSkaters key={key} position={group.position} players={group.players} />;
			}
		});

		return (
			<Tab key={team.id} id={`tab-team-stats-${team.id}`} tabTitle={team.name} iconId={team.id} iconType={CONSTANTS.iconType.logo}>
				{players}
			</Tab>
		)
	});

	return (
		<Tabs key="tabs-team-stats" tabsClass="team-stats--tabs">
			{teamStats}
		</Tabs>
	);
}

function TeamStats(props) {
	const {
		showLoader,
		showNoResults,
		teamStats,
	} = props;
	let content;

	if (showLoader) {
		content = <Loader/>;
	} else {
		if (showNoResults) {
			content = <ErrorMessage errorMsg="No team stats available."/>;
		} else {
			content = renderContent(teamStats);
		}
	}

	return (
		<>
			{content}
		</>
	)
}


TeamStats.propTypes = {
	showLoader: PropTypes.bool,
	showNoResults: PropTypes.bool,
	teamStats: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
		stats: PropTypes.array,
	})),
}

export default TeamStats;
