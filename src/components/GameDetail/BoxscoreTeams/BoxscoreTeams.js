import React from 'react';
import PropTypes from 'prop-types';
import { IconType } from '../../../config/ImageIconConfig';
import Loader from '../../Shared/Loader/Loader';
import ErrorMessage from '../../Shared/ErrorMessage/ErrorMessage';
import Icon from '../../Shared/Icon/Icon';
import {
	StyledBoxscoreTeams,
	BoxscoreTeamsTable,
	BoxscoreTeamsRow,
	BoxscoreTeamsTh,
	BoxscoreTeamsTd,
	BoxscoreTeamsTdName,
	BoxscoreTeamName,
} from './BoxscoreTeamsStyle';
import {
	PINNED,
	SPACER,
} from '../../../globalStyles/Tables/StatsTableModifiers';
import { Tooltip, TooltipContent } from '../../../globalStyles/Tooltip/Tooltip';

function renderBoxscoreTeamRow(team) {
	return (
		<BoxscoreTeamsRow key={team.name}>
			<BoxscoreTeamsTdName modifiers={[PINNED]}>
				<Icon iconId={`${team.id}`} iconType={IconType.logo} />
				<BoxscoreTeamName >{team.name}</BoxscoreTeamName>
			</BoxscoreTeamsTdName>
			<BoxscoreTeamsTd modifiers={[SPACER]}>{team.shots}</BoxscoreTeamsTd>
			<BoxscoreTeamsTd>{team.faceOffWinPercentage}</BoxscoreTeamsTd>
			<BoxscoreTeamsTd>{team.powerPlayGoals}/{team.powerPlayOpportunities}</BoxscoreTeamsTd>
			<BoxscoreTeamsTd>{team.pim}</BoxscoreTeamsTd>
			<BoxscoreTeamsTd>{team.hits}</BoxscoreTeamsTd>
			<BoxscoreTeamsTd>{team.blocked}</BoxscoreTeamsTd>
			<BoxscoreTeamsTd>{team.giveaways}</BoxscoreTeamsTd>
			<BoxscoreTeamsTd>{team.takeaways}</BoxscoreTeamsTd>
		</BoxscoreTeamsRow>
	)
}

function renderContent(data) {
	return (
		<StyledBoxscoreTeams>
			<BoxscoreTeamsTable>
				<thead>
					<BoxscoreTeamsRow>
						<BoxscoreTeamsTh modifiers={[PINNED]}>&nbsp;</BoxscoreTeamsTh>
						<BoxscoreTeamsTh modifiers={[SPACER]}><Tooltip>SOG <TooltipContent>Shots on Goal</TooltipContent></Tooltip></BoxscoreTeamsTh>
						<BoxscoreTeamsTh><Tooltip>FO% <TooltipContent>Faceoff Win Percentage</TooltipContent></Tooltip></BoxscoreTeamsTh>
						<BoxscoreTeamsTh><Tooltip>PP <TooltipContent>Power Play Goals/Opportunities</TooltipContent></Tooltip></BoxscoreTeamsTh>
						<BoxscoreTeamsTh><Tooltip>PIM <TooltipContent>Penalty Minutes</TooltipContent></Tooltip></BoxscoreTeamsTh>
						<BoxscoreTeamsTh><Tooltip>HT <TooltipContent>Hits</TooltipContent></Tooltip></BoxscoreTeamsTh>
						<BoxscoreTeamsTh><Tooltip>BS <TooltipContent>Blocked Shots</TooltipContent></Tooltip></BoxscoreTeamsTh>
						<BoxscoreTeamsTh><Tooltip>GV <TooltipContent>Giveaways</TooltipContent></Tooltip></BoxscoreTeamsTh>
						<BoxscoreTeamsTh><Tooltip>TK <TooltipContent>Takeaways</TooltipContent></Tooltip></BoxscoreTeamsTh>
					</BoxscoreTeamsRow>
				</thead>
				<tbody>
				{
					data.map((team) => {
						return renderBoxscoreTeamRow(team);
					})
				}
				</tbody>
			</BoxscoreTeamsTable>
		</StyledBoxscoreTeams>
	)
}

function BoxscoreTeams(props) {
	const {
		showLoader,
		showNoResults,
		boxscoreTeams,
	} = props;
	let content;

	if (showLoader) {
		content = <Loader/>;
	} else {
		if (showNoResults) {
			content = <ErrorMessage errorMsg="No team boxscore available."/>;
		} else {
			content = renderContent(boxscoreTeams);
		}
	}

	return (
		<>
		{content}
		</>
	)
}

BoxscoreTeams.propTypes = {
	showLoader: PropTypes.bool,
	showNoResults: PropTypes.bool,
	gameStatus: PropTypes.string,
	boxscoreTeams: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
		shots: PropTypes.number,
		faceOffWinPercentage: PropTypes.string,
		powerPlayGoals: PropTypes.number,
		powerPlayOpportunities: PropTypes.number,
		pim: PropTypes.number,
		hits: PropTypes.number,
		blocked: PropTypes.number,
		giveaways: PropTypes.number,
		takeaways: PropTypes.number,
	})),
}

export default BoxscoreTeams;
