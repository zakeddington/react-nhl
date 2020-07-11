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

function renderSkaterStats(data, i) {
	return (
		<StatsTableRow key={`player-detail-skater-stats-${i}`}>
			<StatsTableTd modifiers={[ALIGN_LEFT, data.cellModifier]}>{data.season}</StatsTableTd>
			<StatsTableTd modifiers={[ALIGN_LEFT, data.cellModifier]}>{data.team}</StatsTableTd>
			<StatsTableTd modifiers={[data.cellModifier]}>{data.games}</StatsTableTd>
			<StatsTableTd modifiers={[data.cellModifier]}>{data.goals}</StatsTableTd>
			<StatsTableTd modifiers={[data.cellModifier]}>{data.assists}</StatsTableTd>
			<StatsTableTd modifiers={[data.cellModifier]}>{data.points}</StatsTableTd>
			<StatsTableTd modifiers={[data.cellModifier]}>{data.plusMinus}</StatsTableTd>
			<StatsTableTd modifiers={[data.cellModifier]}>{data.penaltyMinutes}</StatsTableTd>
			<StatsTableTd modifiers={[data.cellModifier]}>{data.powerPlayGoals}</StatsTableTd>
			<StatsTableTd modifiers={[data.cellModifier]}>{data.powerPlayPoints}</StatsTableTd>
			<StatsTableTd modifiers={[data.cellModifier]}>{data.shortHandedGoals}</StatsTableTd>
			<StatsTableTd modifiers={[data.cellModifier]}>{data.shortHandedPoints}</StatsTableTd>
			<StatsTableTd modifiers={[data.cellModifier]}>{data.gameWinningGoals}</StatsTableTd>
			<StatsTableTd modifiers={[data.cellModifier]}>{data.overTimeGoals}</StatsTableTd>
			<StatsTableTd modifiers={[data.cellModifier]}>{data.shots}</StatsTableTd>
			<StatsTableTd modifiers={[data.cellModifier]}>{data.shotPct}</StatsTableTd>
			<StatsTableTd modifiers={[data.cellModifier]}>{data.hits}</StatsTableTd>
			<StatsTableTd modifiers={[data.cellModifier]}>{data.blocked}</StatsTableTd>
			<StatsTableTd modifiers={[data.cellModifier]}>{data.faceOffPct}</StatsTableTd>
		</StatsTableRow>
	);
}

function PlayerDetailSkaterStats(props) {
	const { statsBySeason } = props;

	if (!statsBySeason.length) {
		return (
			<ErrorMessage errorMsg="No stats available." />
		)
	}

	return (
		<StatsTableContainer key="player-detail-skater-stats">
			<StatsTable>
				<thead>
					<StatsTableRow>
						<StatsTableTh modifiers={[ALIGN_LEFT]}>Season</StatsTableTh>
						<StatsTableTh modifiers={[ALIGN_LEFT]}>Team</StatsTableTh>
						<StatsTableTh><Tooltip>GP <TooltipContent>Games Played</TooltipContent></Tooltip></StatsTableTh>
						<StatsTableTh><Tooltip>G <TooltipContent>Goals</TooltipContent></Tooltip></StatsTableTh>
						<StatsTableTh><Tooltip>A <TooltipContent>Assists</TooltipContent></Tooltip></StatsTableTh>
						<StatsTableTh><Tooltip>P <TooltipContent>Points</TooltipContent></Tooltip></StatsTableTh>
						<StatsTableTh><Tooltip>+/- <TooltipContent>Plus / Minus</TooltipContent></Tooltip></StatsTableTh>
						<StatsTableTh><Tooltip>PIM <TooltipContent>Penalty Minutes</TooltipContent></Tooltip></StatsTableTh>
						<StatsTableTh><Tooltip>PPG <TooltipContent>Power Play Goals</TooltipContent></Tooltip></StatsTableTh>
						<StatsTableTh><Tooltip>PPP <TooltipContent>Power Play Points</TooltipContent></Tooltip></StatsTableTh>
						<StatsTableTh><Tooltip>SHG <TooltipContent>ShorStatsTableThanded Goals</TooltipContent></Tooltip></StatsTableTh>
						<StatsTableTh><Tooltip>SHP <TooltipContent>ShorStatsTableThanded Points</TooltipContent></Tooltip></StatsTableTh>
						<StatsTableTh><Tooltip>GWG <TooltipContent>Game Winning Goals</TooltipContent></Tooltip></StatsTableTh>
						<StatsTableTh><Tooltip>OTG <TooltipContent>Overtime Goals</TooltipContent></Tooltip></StatsTableTh>
						<StatsTableTh><Tooltip>SOG <TooltipContent>Shots on Goal</TooltipContent></Tooltip></StatsTableTh>
						<StatsTableTh><Tooltip>S% <TooltipContent>Shooting Percentage</TooltipContent></Tooltip></StatsTableTh>
						<StatsTableTh><Tooltip>HT <TooltipContent>Hits</TooltipContent></Tooltip></StatsTableTh>
						<StatsTableTh><Tooltip>BS <TooltipContent>Blocked Shots</TooltipContent></Tooltip></StatsTableTh>
						<StatsTableTh><Tooltip>FO% <TooltipContent>Faceoff Win Percentage</TooltipContent></Tooltip></StatsTableTh>
					</StatsTableRow>
				</thead>
				<tbody>
				{
					statsBySeason.map((season, i) => {
						return (renderSkaterStats(season, i))
					})
				}
				</tbody>
			</StatsTable>
		</StatsTableContainer>
	)
}

PlayerDetailSkaterStats.propTypes = {
	statsBySeason: PropTypes.arrayOf(PropTypes.shape({
		assists: PropTypes.number,
		blocked: PropTypes.number,
		cellModifier: PropTypes.string,
		evenTimeOnIce: PropTypes.string,
		faceOffPct: PropTypes.number,
		gameWinningGoals: PropTypes.number,
		games: PropTypes.number,
		goals: PropTypes.number,
		hits: PropTypes.number,
		overTimeGoals: PropTypes.number,
		penaltyMinutes: PropTypes.string,
		pim: PropTypes.number,
		plusMinus: PropTypes.number,
		points: PropTypes.number,
		powerPlayGoals: PropTypes.number,
		powerPlayPoints: PropTypes.number,
		powerPlayTimeOnIce: PropTypes.string,
		season: PropTypes.string,
		shifts: PropTypes.number,
		shortHandedGoals: PropTypes.number,
		shortHandedPoints: PropTypes.number,
		shortHandedTimeOnIce: PropTypes.string,
		shotPct: PropTypes.number,
		shots: PropTypes.number,
		team: PropTypes.string,
		timeOnIce: PropTypes.string,
	})),
}

export default PlayerDetailSkaterStats;
