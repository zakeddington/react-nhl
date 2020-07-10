import styled from 'styled-components/macro';
import { MobileBreakpoint } from '../../../config/Breakpoints';
import { Spacing } from '../../../config/Grid';
import { HeaderTitle } from '../../../globalStyles/Typography/Typography';

export const StyledPeriodSummary = styled.div`
	margin: 0 auto ${Spacing.vert};
	width: 100%;
`;

export const Period = styled.div`
	background: ${props => props.theme.color.white};
	margin-bottom: ${Spacing.vert};

	&:last-child {
		border-bottom: 1px solid ${props => props.theme.color.greyMed};
	}
`;

export const PeriodTitle = styled(HeaderTitle)`
	background: ${props => props.theme.color.grey};
	padding: 0.5em 1em;
`;

export const PeriodSubtitle = styled.div`
	background: ${props => props.theme.color.greyLight};
	font-size: 1.125rem;
	font-weight: 700;
	margin: 0;
	padding: 0.5em 1em;
	text-transform: uppercase;
`;

export const PeriodEmpty = styled.div`
	padding: 1em 0;
`;

export const PeriodItem = styled.div`
	align-items: center;
	border-bottom: 1px solid ${props => props.theme.color.greyMed};
	display: flex;
	flex-direction: row;
	font-size: 1.125rem;
	padding: calc(${Spacing.vert} / 2) ${Spacing.horiz};

	@media (max-width: ${MobileBreakpoint.max}) {
		padding: 1em 0.5em;
	}

	&:last-child {
		border-bottom: none;
	}
`;

export const PeriodItemDiv = styled.div`
	padding-left: 0.5em;
	padding-right: 0.5em;
`;

export const TeamLogoColumn = styled(PeriodItemDiv)`
	padding: 0;

	@media (max-width: ${MobileBreakpoint.max}) {
		display: none;
	}
`;

export const TimeColumn = styled(PeriodItemDiv)`
	text-align: center;
	width: 10%;
`;

export const PlayerPhotoColumn = styled(PeriodItemDiv)``;

export const PlayDetailsColumn = styled(PeriodItemDiv)`
	flex: 3;
`;

export const DetailsRow = styled(PeriodItemDiv)`
	display: block;
`;

export const PlayerName = styled.span`
	font-weight: 700;
`;

export const PlayerShotType = styled.span`
	font-size: 1rem;
	margin-left: 0.5em;

	@media (max-width: ${MobileBreakpoint.max}) {
		display: block;
	}
`;

export const PlayerGoalType = styled.span`
	background: ${props => props.theme.color.greyDark};
	border-radius: 3px;
	color: ${props => props.theme.color.white};
	font-size: 0.875rem;
	font-weight: 600;
	margin-left: 0.5em;
	padding: 0 0.4em;
`;

export const SecondaryDetails = styled.span`
	font-size: 0.875rem;
`;

export const StatusColumn = styled.div`
	text-align: center;
	width: 10rem;

	@media (max-width: ${MobileBreakpoint.max}) {
		width: 6rem;
	}
`;

export const GameStatus = styled.span`
	border: 1px solid;
	border-radius: 3px;
	display: flex;
	font-size: 0.875rem;
	font-weight: 600;
	white-space: nowrap;

	@media (max-width: ${MobileBreakpoint.max}) {
		flex-direction: column;
	}
`;

export const TeamScore = styled.span`
	width: 50%;

	@media (max-width: ${MobileBreakpoint.max}) {
		width: 100%;
	}
`;

export const ShootoutStatus = styled(GameStatus)`
	border: none;
`;

export const ShotResult = styled.span`
	width: 100%;
`;
