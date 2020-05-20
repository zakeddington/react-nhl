import React from 'react';
import PropTypes from 'prop-types';
import CONSTANTS from '../../../config/Constants';
import Loader from '../../Shared/Loader/Loader';
import ErrorMessage from '../../Shared/ErrorMessage/ErrorMessage';
import Tabs from '../../Shared/Tabs/Tabs';
import Tab from '../../Shared/Tabs/Tab';
import PlayerStatsByPosition from './PlayerStatsByPosition';
import './PlayerStatsByTeam.scss';

function renderContent(playerStatsByTeam) {
	return (
		<Tabs key="tabs-player-stats" tabsClass="player-stats--tabs">
			{
				playerStatsByTeam.map((team) => {
					return (
						<Tab key={team.id} id={`tab-player-stats-${team.id}`} tabTitle={team.name} iconId={team.id}
							iconType={CONSTANTS.iconType.logo}>
							<PlayerStatsByPosition playerStatsByPosition={team.playerStatsByPosition}/>
						</Tab>
					)
				})
			}
		</Tabs>
	);
}

function PlayerStatByTeam(props) {
	const {
		showLoader,
		showNoResults,
		playerStatsByTeam,
	} = props;
	let content;

	if (showLoader) {
		content = <Loader/>;
	} else {
		if (showNoResults) {
			content = <ErrorMessage errorMsg="No team stats available."/>;
		} else {
			content = renderContent(playerStatsByTeam);
		}
	}

	return (
		<>
			{content}
		</>
	)
}

PlayerStatByTeam.propTypes = {
	showLoader: PropTypes.bool,
	showNoResults: PropTypes.bool,
	playerStatsByTeam: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
		playerStatsByPosition: PropTypes.arrayOf(PropTypes.object),
	})),
}

export default PlayerStatByTeam;
