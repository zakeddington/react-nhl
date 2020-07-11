import React from 'react';
import PropTypes from 'prop-types';
import ErrorMessage from '../../Shared/ErrorMessage/ErrorMessage';
import {
	StatsTableContainer,
	StatsTable,
	StatsTableRow,
	StatsTableTh,
	StatsTableTd,
} from '../../../globalStyles/Tables/StatsTable';
import { ALIGN_LEFT } from '../../../globalStyles/Tables/StatsTableModifiers';
import { Tooltip, TooltipContent } from '../../../globalStyles/Tooltip/Tooltip';

function renderGoalieStats(data, i) {
	return (
		<StatsTableRow key={`player-detail-goalie-stats-${i}`}>
			<StatsTableTd modifiers={[ALIGN_LEFT, data.cellModifier]}>{data.season}</StatsTableTd>
			<StatsTableTd modifiers={[ALIGN_LEFT, data.cellModifier]}>{data.team}</StatsTableTd>
			<StatsTableTd modifiers={[data.cellModifier]}>{data.games}</StatsTableTd>
			<StatsTableTd modifiers={[data.cellModifier]}>{data.gamesStarted}</StatsTableTd>
			<StatsTableTd modifiers={[data.cellModifier]}>{data.wins}</StatsTableTd>
			<StatsTableTd modifiers={[data.cellModifier]}>{data.losses}</StatsTableTd>
			<StatsTableTd modifiers={[data.cellModifier]}>{data.ties}</StatsTableTd>
			<StatsTableTd modifiers={[data.cellModifier]}>{data.ot}</StatsTableTd>
			<StatsTableTd modifiers={[data.cellModifier]}>{data.shotsAgainst}</StatsTableTd>
			<StatsTableTd modifiers={[data.cellModifier]}>{data.goalsAgainst}</StatsTableTd>
			<StatsTableTd modifiers={[data.cellModifier]}>{data.goalAgainstAverage}</StatsTableTd>
			<StatsTableTd modifiers={[data.cellModifier]}>{data.saves}</StatsTableTd>
			<StatsTableTd modifiers={[data.cellModifier]}>{data.savePercentage}</StatsTableTd>
			<StatsTableTd modifiers={[data.cellModifier]}>{data.shutouts}</StatsTableTd>
			<StatsTableTd modifiers={[data.cellModifier]}>{data.timeOnIce}</StatsTableTd>
		</StatsTableRow>
	);
}

function PlayerDetailGoalieStats(props) {
	const { statsBySeason } = props;

	if (!statsBySeason.length) {
		return (
			<ErrorMessage errorMsg="No stats available." />
		)
	}

	return (
		<StatsTableContainer key="player-detail-goalie-stats">
			<StatsTable>
				<thead>
					<StatsTableRow>
						<StatsTableTh modifiers={[ALIGN_LEFT]}>Season</StatsTableTh>
						<StatsTableTh modifiers={[ALIGN_LEFT]}>Team</StatsTableTh>
						<StatsTableTh><Tooltip>GP <TooltipContent>Games Played</TooltipContent></Tooltip></StatsTableTh>
						<StatsTableTh><Tooltip>GS <TooltipContent>Games Started</TooltipContent></Tooltip></StatsTableTh>
						<StatsTableTh><Tooltip>W <TooltipContent>Wins</TooltipContent></Tooltip></StatsTableTh>
						<StatsTableTh><Tooltip>L <TooltipContent>Losses</TooltipContent></Tooltip></StatsTableTh>
						<StatsTableTh><Tooltip>T <TooltipContent>Ties</TooltipContent></Tooltip></StatsTableTh>
						<StatsTableTh><Tooltip>OT <TooltipContent>Overtime Losses</TooltipContent></Tooltip></StatsTableTh>
						<StatsTableTh><Tooltip>SA <TooltipContent>Shots Against</TooltipContent></Tooltip></StatsTableTh>
						<StatsTableTh><Tooltip>GA <TooltipContent>Goals Against</TooltipContent></Tooltip></StatsTableTh>
						<StatsTableTh><Tooltip>GAA <TooltipContent>Goals Against Average</TooltipContent></Tooltip></StatsTableTh>
						<StatsTableTh><Tooltip>SV <TooltipContent>Saves</TooltipContent></Tooltip></StatsTableTh>
						<StatsTableTh><Tooltip>SV% <TooltipContent>Save Percentage</TooltipContent></Tooltip></StatsTableTh>
						<StatsTableTh><Tooltip>SO <TooltipContent>Shutouts</TooltipContent></Tooltip></StatsTableTh>
						<StatsTableTh><Tooltip>MIN <TooltipContent>Minutes</TooltipContent></Tooltip></StatsTableTh>
					</StatsTableRow>
				</thead>
				<tbody>
				{
					statsBySeason.map((season, i) => {
						return (renderGoalieStats(season, i))
					})
				}
				</tbody>
			</StatsTable>
		</StatsTableContainer>
	)
}

PlayerDetailGoalieStats.propTypes = {
	statsBySeason: PropTypes.arrayOf(PropTypes.shape({
		cellModifier: PropTypes.string,
		evenSaves: PropTypes.number,
		evenShots: PropTypes.number,
		evenStrengthSavePercentage: PropTypes.number,
		games: PropTypes.number,
		gamesStarted: PropTypes.number,
		goalAgainstAverage: PropTypes.number,
		goalsAgainst: PropTypes.number,
		losses: PropTypes.number,
		ot: PropTypes.number,
		powerPlaySavePercentage: PropTypes.number,
		powerPlaySaves: PropTypes.number,
		powerPlayShots: PropTypes.number,
		savePercentage: PropTypes.number,
		saves: PropTypes.number,
		season: PropTypes.string,
		shortHandedSavePercentage: PropTypes.number,
		shortHandedSaves: PropTypes.number,
		shortHandedShots: PropTypes.number,
		shotsAgainst: PropTypes.number,
		shutouts: PropTypes.number,
		team: PropTypes.string,
		ties: PropTypes.number,
		timeOnIce: PropTypes.string,
		wins: PropTypes.number,
	})),
}

export default PlayerDetailGoalieStats;
