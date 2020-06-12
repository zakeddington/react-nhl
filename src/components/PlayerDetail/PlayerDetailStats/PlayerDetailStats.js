import React from 'react';
import PropTypes from 'prop-types';
import Loader from '../../Shared/Loader/Loader';
import Tabs from '../../Shared/Tabs/Tabs';
import Tab from '../../Shared/Tabs/Tab';
import PlayerDetailGoalieStats from './PlayerDetailGoalieStats';
import PlayerDetailSkaterStats from './PlayerDetailSkaterStats';

function renderContent(props) {
	const { playerPosition, playerStatsByType } = props;

	return (
		<Tabs key="tabs-player-details">
			{
				playerStatsByType.map((type) => {
					let content;

					if (playerPosition === 'G') {
						content = <PlayerDetailGoalieStats statsBySeason={type.statsBySeason} />;
					} else {
						content = <PlayerDetailSkaterStats statsBySeason={type.statsBySeason} />;
					}

					return (
						<Tab key={type.typeName} id={`tab-player-details-${type.typeName}`} tabTitle={type.typeName}>
							{content}
						</Tab>
					)
				})
			}
		</Tabs>
	);
}

function PlayerDetailStats(props) {
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

PlayerDetailStats.propTypes = {
	showLoader: PropTypes.bool,
	showNoResults: PropTypes.bool,
	playerPosition: PropTypes.string,
	playerStatsByType: PropTypes.arrayOf(PropTypes.shape({
		typeName: PropTypes.string,
		statsBySeason: PropTypes.arrayOf(PropTypes.object),
	})),
}

export default PlayerDetailStats;
