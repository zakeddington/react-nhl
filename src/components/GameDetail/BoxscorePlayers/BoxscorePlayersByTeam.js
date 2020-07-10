import React from 'react';
import PropTypes from 'prop-types';
import { IconType } from '../../../config/ImageIconConfig';
import Loader from '../../Shared/Loader/Loader';
import ErrorMessage from '../../Shared/ErrorMessage/ErrorMessage';
import Tabs from '../../Shared/Tabs/Tabs';
import Tab from '../../Shared/Tabs/Tab';
import { TABS_LOGOS } from '../../Shared/Tabs/TabsModifiers';
import BoxscorePlayersByPosition from './BoxscorePlayersByPosition';

function renderContent(boxscorePlayersByTeam) {
	return (
		<Tabs key="tabs-boxscore-players" modifiers={[TABS_LOGOS]}>
			{
				boxscorePlayersByTeam.map((team) => {
					return (
						<Tab key={team.id} id={`tab-boxscore-players-${team.id}`} tabTitle={team.name} iconId={`${team.id}`}
							iconType={IconType.logo}>
							<BoxscorePlayersByPosition boxscorePlayersByPosition={team.boxscorePlayersByPosition}/>
						</Tab>
					)
				})
			}
		</Tabs>
	);
}

function BoxscorePlayersByTeam(props) {
	const {
		showLoader,
		showNoResults,
		boxscorePlayersByTeam,
	} = props;
	let content;

	if (showLoader) {
		content = <Loader />;
	} else {
		if (showNoResults) {
			content = <ErrorMessage errorMsg="No player boxscore available."/>;
		} else {
			content = renderContent(boxscorePlayersByTeam);
		}
	}

	return (
		<>
			{content}
		</>
	)
}

BoxscorePlayersByTeam.propTypes = {
	showLoader: PropTypes.bool,
	showNoResults: PropTypes.bool,
	boxscorePlayersByTeam: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
		boxscorePlayersByPosition: PropTypes.arrayOf(PropTypes.object),
	})),
}

export default BoxscorePlayersByTeam;
