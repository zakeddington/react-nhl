import styled, { css } from 'styled-components/macro';
import {
	StatsTableContainer,
	StatsTable,
	StatsTableRow,
	StatsTableTh,
	StatsTableTd,
} from '../../../globalStyles/Tables/StatsTable';
import { DesktopBreakpoint, TabletBreakpoint, MobileBreakpoint } from '../../../config/Breakpoints';
import { SvgLogo } from '../../Shared/Icon/IconStyle';

export const StyledBoxscoreTeams = styled(StatsTableContainer)`
	margin-bottom: 0;
`;

export const BoxscoreTeamsTable = styled(StatsTable)`
	text-align: center;
`;

export const BoxscoreTeamsRow = styled(StatsTableRow)``;

const BoxscoreTeamsCell = css`
	@media (max-width: ${MobileBreakpoint.max}) {
		height: 40px;
		min-width: 50px;
		padding: 5px;
		width: 50px;

		&:first-child {
			height: 39px;
			min-width: 60px;
			width: 60px;
		}

		&.stats-table--spacer {
			padding-left: 65px;
		}
	}
`;

export const BoxscoreTeamsTh = styled(StatsTableTh)`
	${BoxscoreTeamsCell};
	font-weight: 400;

	@media (max-width: ${MobileBreakpoint.max}) {
		height: 30px;
	}
`;

export const BoxscoreTeamsTd = styled(StatsTableTd)`
	${BoxscoreTeamsCell};
	font-weight: 600;

	@media (min-width: ${TabletBreakpoint.min}) {
		font-size: 1.5rem;
	}
`;

export const BoxscoreTeamsTdName = styled(BoxscoreTeamsTd)`
	white-space: nowrap;

	@media (min-width: ${DesktopBreakpoint.min}) {
		padding-left: 1.5rem;
		text-align: left;
		width: 20%;
	}

	${SvgLogo} {
		display: inline-block;
		vertical-align: middle;

		@media (max-width: ${MobileBreakpoint.max}) {
			height: 30px;
			width: 30px;
		}
	}
`;

export const BoxscoreTeamName = styled.span`
	display: inline-block;
	padding-left: 0.5em;
	vertical-align: middle;

	@media (max-width: ${TabletBreakpoint.max}) {
		display: none;
	}
`;
