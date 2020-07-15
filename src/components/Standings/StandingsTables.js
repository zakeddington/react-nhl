import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Shared/Icon/Icon';
import { IconType } from '../../config/ImageIconConfig';
import {
	StyledStandingsTable,
	StandingsTableContainer,
	StandingsTableTitle,
	StandingsTable,
	StandingsTableRow,
	StandingsTableTh,
	StandingsTableTd,
	StandingsTableTeamName,
} from './StandingsTablesStyle';
import {
	Tooltip,
	TooltipContent,
} from '../../globalStyles/Tooltip/Tooltip';
import { TEAM_NAME } from '../../globalStyles/Tables/StatsTableModifiers';
import { ALIGN_LEFT } from '../../globalStyles/Utilities/Modifiers';

function renderStandingsTable(standingsName, division) {
	const {
		divisionName,
		isWildCard,
		teams,
	} = division;

	return (
		<StandingsTableContainer key={`${standingsName}-${divisionName}`} $isWildcard={isWildCard}>
			<StandingsTable>
				<thead>
					<StandingsTableRow>
						<StandingsTableTh modifiers={[ALIGN_LEFT]} colSpan="2">{divisionName}</StandingsTableTh>
						<StandingsTableTh><Tooltip>GP <TooltipContent>Games Played</TooltipContent></Tooltip></StandingsTableTh>
						<StandingsTableTh><Tooltip>W <TooltipContent>Wins (2pts)</TooltipContent></Tooltip></StandingsTableTh>
						<StandingsTableTh><Tooltip>L <TooltipContent>Losses (0pts)</TooltipContent></Tooltip></StandingsTableTh>
						<StandingsTableTh><Tooltip>OT <TooltipContent>Overtime/Shootout Loss (1pt)</TooltipContent></Tooltip></StandingsTableTh>
						<StandingsTableTh><Tooltip>PTS <TooltipContent>Points</TooltipContent></Tooltip></StandingsTableTh>
					</StandingsTableRow>
				</thead>
				<tbody>
				{
					teams.map((team) => {
						return (
							<StandingsTableRow key={team.name}>
								<StandingsTableTd>{team.rank}</StandingsTableTd>
								<StandingsTableTd modifiers={[TEAM_NAME, ALIGN_LEFT]}>
									<Icon iconId={`${team.id}`} iconType={IconType.logo} />
									<StandingsTableTeamName>{team.name}</StandingsTableTeamName>
								</StandingsTableTd>
								<StandingsTableTd>{team.games}</StandingsTableTd>
								<StandingsTableTd>{team.wins}</StandingsTableTd>
								<StandingsTableTd>{team.losses}</StandingsTableTd>
								<StandingsTableTd>{team.ot}</StandingsTableTd>
								<StandingsTableTd>{team.points}</StandingsTableTd>
							</StandingsTableRow>
						)
					})
				}
				</tbody>
			</StandingsTable>
		</StandingsTableContainer>
	)
}

function StandingsTables(props) {
	const {
		standingsName,
		standings,
	} = props;

	return (
		<>
			{
				standings.map((conference) => {
					return (
						<StyledStandingsTable key={`${standingsName}-${conference.conferenceName}`}>
							<StandingsTableTitle>{conference.conferenceName}</StandingsTableTitle>
							{
								conference.divisions.map((division) => {
									return renderStandingsTable(standingsName, division)
								})
							}
						</StyledStandingsTable>
					)
				})
			}
		</>
	)
}

StandingsTables.propTypes = {
	standingsName: PropTypes.string,
	standings: PropTypes.arrayOf(PropTypes.shape({
		conferenceName: PropTypes.string,
		divisions: PropTypes.arrayOf(PropTypes.shape({
			divisionName: PropTypes.string,
			isWildCard: PropTypes.bool,
			teams: PropTypes.arrayOf(PropTypes.shape({
				games: PropTypes.number,
				id: PropTypes.number,
				losses: PropTypes.number,
				name: PropTypes.string,
				ot: PropTypes.number,
				points: PropTypes.number,
				rank: PropTypes.number,
				wins: PropTypes.number,
			})),
		})),
	})),
}

export default StandingsTables;
