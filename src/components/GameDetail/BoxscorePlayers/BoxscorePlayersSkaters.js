import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../../Shared/Modal/Modal';
import PlayerDetail from '../../../containers/PlayerDetail';
import {
	StatsTableContainer,
	StatsTable,
	StatsTableRow,
	StatsTableTh,
	StatsTableTd,
} from '../../../globalStyles/Tables/StatsTable';
import {
	PINNED,
	PLAYER_JERSEY,
	PLAYER_NAME,
	SPACER_WIDE,
} from '../../../globalStyles/Tables/StatsTableModifiers';
import { ALIGN_LEFT } from '../../../globalStyles/Utilities/Modifiers';
import { Tooltip, TooltipContent } from '../../../globalStyles/Tooltip/Tooltip';
import { Offscreen } from '../../../globalStyles/Utilities/Utilities';

function renderBoxscoreSkaterRow(data) {
	return (
		<StatsTableRow key={data.id}>
			<StatsTableTd modifiers={[PINNED, PLAYER_JERSEY]}>{data.number}</StatsTableTd>
			<StatsTableTd modifiers={[PINNED, PLAYER_NAME]} className="text-left">
				<Modal content={<PlayerDetail playerId={data.id} />} modalClass="player-detail">
					{data.name}
					<Offscreen>Open player details for {data.name} in modal window</Offscreen>
				</Modal>, {data.pos}</StatsTableTd>
			<StatsTableTd modifiers={[SPACER_WIDE]}>{data.goals}</StatsTableTd>
			<StatsTableTd>{data.assists}</StatsTableTd>
			<StatsTableTd>{data.goals + data.assists}</StatsTableTd>
			<StatsTableTd>{data.plusMinus}</StatsTableTd>
			<StatsTableTd>{data.penaltyMinutes}</StatsTableTd>
			<StatsTableTd>{data.shots}</StatsTableTd>
			<StatsTableTd>{data.hits}</StatsTableTd>
			<StatsTableTd>{data.blocked}</StatsTableTd>
			<StatsTableTd>{data.giveaways}</StatsTableTd>
			<StatsTableTd>{data.takeaways}</StatsTableTd>
			<StatsTableTd>{data.faceOffWins}</StatsTableTd>
			<StatsTableTd>{data.faceoffTaken}</StatsTableTd>
			<StatsTableTd>{data.faceOffPercent}</StatsTableTd>
			<StatsTableTd>{data.timeOnIce}</StatsTableTd>
			<StatsTableTd>{data.powerPlayTimeOnIce}</StatsTableTd>
		</StatsTableRow>
	);
}

function BoxscorePlayersSkaters(props) {
	const {
		position,
		boxscorePlayers,
	} = props;

	return (
		<StatsTableContainer>
			<StatsTable>
				<thead>
				<StatsTableRow>
					<StatsTableTh modifiers={[PINNED, PLAYER_JERSEY]}>&nbsp;</StatsTableTh>
					<StatsTableTh modifiers={[PINNED, PLAYER_NAME, ALIGN_LEFT]}>{position}</StatsTableTh>
					<StatsTableTh modifiers={[SPACER_WIDE]}><Tooltip>G <TooltipContent>Goals</TooltipContent></Tooltip></StatsTableTh>
					<StatsTableTh><Tooltip>A <TooltipContent>Assists</TooltipContent></Tooltip></StatsTableTh>
					<StatsTableTh><Tooltip>P <TooltipContent>Points</TooltipContent></Tooltip></StatsTableTh>
					<StatsTableTh><Tooltip>+/- <TooltipContent>Plus / Minus</TooltipContent></Tooltip></StatsTableTh>
					<StatsTableTh><Tooltip>PIM <TooltipContent>Penalty Minutes</TooltipContent></Tooltip></StatsTableTh>
					<StatsTableTh><Tooltip>SOG <TooltipContent>Shots on Goal</TooltipContent></Tooltip></StatsTableTh>
					<StatsTableTh><Tooltip>HT <TooltipContent>Hits</TooltipContent></Tooltip></StatsTableTh>
					<StatsTableTh><Tooltip>BS <TooltipContent>Blocked Shots</TooltipContent></Tooltip></StatsTableTh>
					<StatsTableTh><Tooltip>GV <TooltipContent>Giveaways</TooltipContent></Tooltip></StatsTableTh>
					<StatsTableTh><Tooltip>TK <TooltipContent>Takeaways</TooltipContent></Tooltip></StatsTableTh>
					<StatsTableTh><Tooltip>FW <TooltipContent>Faceoff Win</TooltipContent></Tooltip></StatsTableTh>
					<StatsTableTh><Tooltip>FL <TooltipContent>Faceoff Loss</TooltipContent></Tooltip></StatsTableTh>
					<StatsTableTh><Tooltip>FO% <TooltipContent>Faceoff Win Percentage</TooltipContent></Tooltip></StatsTableTh>
					<StatsTableTh><Tooltip>TOI <TooltipContent>Total On Ice Time</TooltipContent></Tooltip></StatsTableTh>
					<StatsTableTh><Tooltip>PP TOI <TooltipContent>Power Play Total On Ice Time</TooltipContent></Tooltip></StatsTableTh>
				</StatsTableRow>
				</thead>
				<tbody>
				{
					boxscorePlayers.map((player) => {
						return (renderBoxscoreSkaterRow(player))
					})
				}
				</tbody>
			</StatsTable>
		</StatsTableContainer>
	)
}

BoxscorePlayersSkaters.propTypes = {
	position: PropTypes.string,
	boxscorePlayers: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
		number: PropTypes.string,
		pos: PropTypes.string,
		assists: PropTypes.number,
		blocked: PropTypes.number,
		evenTimeOnIce: PropTypes.string,
		faceOffPercent: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number,
		]),
		faceOffWins: PropTypes.number,
		faceoffTaken: PropTypes.number,
		giveaways: PropTypes.number,
		goals: PropTypes.number,
		hits: PropTypes.number,
		penaltyMinutes: PropTypes.number,
		plusMinus: PropTypes.number,
		powerPlayAssists: PropTypes.number,
		powerPlayGoals: PropTypes.number,
		powerPlayTimeOnIce: PropTypes.string,
		shortHandedAssists: PropTypes.number,
		shortHandedGoals: PropTypes.number,
		shortHandedTimeOnIce: PropTypes.string,
		shots: PropTypes.number,
		takeaways: PropTypes.number,
		timeOnIce: PropTypes.string,
	})),
}

export default BoxscorePlayersSkaters;
