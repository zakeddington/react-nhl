import styled, { css } from 'styled-components/macro';
import {
	StatsTableContainer,
	StatsTable,
	StatsTableRow,
	StatsTableTh,
	StatsTableTd,
} from '../../globalStyles/Tables/StatsTable';
import { H2 } from '../../globalStyles/Typography/Typography';
import { SvgLogo } from '../Shared/Icon/IconStyle';

export const StyledStandingsTable = styled.div`
	margin-bottom: 2rem;
`;

export const StandingsTableTitle = styled(H2)`
	font-size: 1.25rem;
`;

export const StandingsTableContainer = styled(StatsTableContainer)`
	overflow-x: visible;

	${props => props.$isWildcard && css`
		${StandingsTableRow}:nth-child(2) {
			border-color: ${props => props.theme.color.greyDark};
		}
	`}
`;

export const StandingsTable = styled(StatsTable)`
	font-size: 0.75rem;
`;

export const StandingsTableRow = styled(StatsTableRow)``;

const StandingsTableCell = css`
	min-width: 1.5rem;
	padding: 0.25rem;

	&:first-child {
		padding-left: 0.5rem;
	}

	&:last-child {
		padding-right: 1rem;
	}
`;

export const StandingsTableTh = styled(StatsTableTh)`
	${StandingsTableCell};
	background: ${props => props.theme.color.greyDark};
	color: ${props => props.theme.color.white};
`;

export const StandingsTableTd = styled(StatsTableTd)`
	${StandingsTableCell};

	${SvgLogo} {
		display: inline-block;
		height: 25px;
		vertical-align: middle;
		width: 25px;
	}
`;

export const StandingsTableTeamName = styled.span`
	display: inline-block;
	padding-left: 0.5em;
	vertical-align: middle;
`;
