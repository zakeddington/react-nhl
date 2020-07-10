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
	JERSEY,
	NAME,
	SPACER_WIDE,
	ALIGN_LEFT,
} from '../../../globalStyles/Tables/StatsTableModifiers';
import { Tooltip, TooltipContent } from '../../../globalStyles/Tooltip/Tooltip';
import { Offscreen } from '../../../globalStyles/Utilities/Utilities';

function renderBoxscoreGoalieRow(data) {
	return (
		<StatsTableRow key={data.id}>
			<StatsTableTd modifiers={[PINNED, JERSEY]}>{data.number}</StatsTableTd>
			<StatsTableTd modifiers={[PINNED, NAME, ALIGN_LEFT]}>
				<Modal content={<PlayerDetail playerId={data.id} />} modalClass="player-detail">
					{data.name}
					<Offscreen>Open player details for {data.name} in modal window</Offscreen>
				</Modal>, {data.pos}</StatsTableTd>
			<StatsTableTd modifiers={[SPACER_WIDE]}>{data.shots - data.saves}</StatsTableTd>
			<StatsTableTd>{data.shots}</StatsTableTd>
			<StatsTableTd>{data.saves}</StatsTableTd>
			<StatsTableTd>{data.savePercent}</StatsTableTd>
			<StatsTableTd>{data.evenSaves} - {data.evenShotsAgainst}</StatsTableTd>
			<StatsTableTd>{data.powerPlaySaves} - {data.powerPlayShotsAgainst}</StatsTableTd>
			<StatsTableTd>{data.shortHandedSaves} - {data.shortHandedShotsAgainst}</StatsTableTd>
			<StatsTableTd>{data.pim}</StatsTableTd>
			<StatsTableTd>{data.timeOnIce}</StatsTableTd>
		</StatsTableRow>
	);
}

function BoxscorePlayersGoalies(props) {
	const {
		position,
		boxscorePlayers,
	} = props;

	return (
		<StatsTableContainer>
			<StatsTable>
				<thead>
					<StatsTableRow>
						<StatsTableTh modifiers={[PINNED, JERSEY]}>&nbsp;</StatsTableTh>
						<StatsTableTh modifiers={[PINNED, NAME, ALIGN_LEFT]}>{position}</StatsTableTh>
						<StatsTableTh modifiers={[SPACER_WIDE]}><Tooltip>GA <TooltipContent>Goals Against</TooltipContent></Tooltip></StatsTableTh>
						<StatsTableTh><Tooltip>SA <TooltipContent>Shots Against</TooltipContent></Tooltip></StatsTableTh>
						<StatsTableTh><Tooltip>SV <TooltipContent>Saves</TooltipContent></Tooltip></StatsTableTh>
						<StatsTableTh><Tooltip>SV% <TooltipContent>Save Percentage</TooltipContent></Tooltip></StatsTableTh>
						<StatsTableTh><Tooltip>EV <TooltipContent>Even StrengStatsTableTh Saves-Shots</TooltipContent></Tooltip></StatsTableTh>
						<StatsTableTh><Tooltip>PP <TooltipContent>Power Play Saves-Shots</TooltipContent></Tooltip></StatsTableTh>
						<StatsTableTh><Tooltip>SH <TooltipContent>ShorStatsTableThanded Saves-Shots</TooltipContent></Tooltip></StatsTableTh>
						<StatsTableTh><Tooltip>PIM <TooltipContent>Penalty Minutes</TooltipContent></Tooltip></StatsTableTh>
						<StatsTableTh><Tooltip>TOI <TooltipContent>Total On Ice Time</TooltipContent></Tooltip></StatsTableTh>
					</StatsTableRow>
				</thead>
				<tbody>
				{
					boxscorePlayers.map((player) => {
						return (renderBoxscoreGoalieRow(player))
					})
				}
				</tbody>
			</StatsTable>
		</StatsTableContainer>
	)
}

BoxscorePlayersGoalies.propTypes = {
	position: PropTypes.string,
	boxscorePlayers: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
		number: PropTypes.string,
		pos: PropTypes.string,
		shots: PropTypes.number,
		saves: PropTypes.number,
		savePercent: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number,
		]),
		evenSaves: PropTypes.number,
		evenShotsAgainst: PropTypes.number,
		powerPlaySaves: PropTypes.number,
		powerPlayShotsAgainst: PropTypes.number,
		shortHandedSaves: PropTypes.number,
		shortHandedShotsAgainst: PropTypes.number,
		pim: PropTypes.number,
		timeOnIce: PropTypes.string,
	})),
}

export default BoxscorePlayersGoalies;
