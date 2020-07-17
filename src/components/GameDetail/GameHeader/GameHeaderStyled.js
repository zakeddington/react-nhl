import styled from 'styled-components/macro';
import { MobileBreakpoint, TabletBreakpoint } from '../../../config/Breakpoints';
import { Spacing } from '../../../config/Grid';
import { SvgLogo } from '../../Shared/Icon/IconStyled';

export const GameHeaderStyled = styled.div`
	align-items: center;
	background: ${props => props.theme.color.backgroundContent};
	border-bottom: 1px solid ${props => props.theme.color.border};
	display: flex;
	flex-wrap: wrap;
	padding: ${Spacing.vert} 0;

	@media (max-width: ${MobileBreakpoint.max}) {
		padding: 1em 0;
	}

	${SvgLogo} {
		@media (min-width: ${TabletBreakpoint.min}) {
			height: 5em;
			width: 5em;
		}

		@media (max-width: ${MobileBreakpoint.max}) {
			padding-right: 0.5em;
		}
	}
`;

export const GameHeaderCol = styled.div`
	align-items: center;
	display: flex;
	flex: 2;
	flex-direction: row;
	line-height: 2;
	padding: 0 1rem;

	@media (min-width: ${TabletBreakpoint.min}) and (max-width: ${TabletBreakpoint.max}) {
		padding: 0 2rem;
	}
`;

export const	DateColumn = styled(GameHeaderCol)`
	flex: 1;
	flex-direction: column;
	justify-content: center;
	line-height: 1.5;
	order: 2;
	white-space: nowrap;

	@media (max-width: ${TabletBreakpoint.max}) {
		flex-basis: 100%;
		order: 1;
	}

	.game-header-time {
		font-weight: 700;
	}
`;

export const AwayTeamColumn = styled(GameHeaderCol)`
	order: 1;

	@media (min-width: ${TabletBreakpoint.min}) {
		justify-content: flex-end;
		text-align: right;
	}

	@media (max-width: ${TabletBreakpoint.max}) {
		order: 2;
	}
`;

export const HomeTeamColumn = styled(GameHeaderCol)`
	order: 3;
	text-align: left;

	@media (min-width: ${TabletBreakpoint.min}) {
		flex-direction: row-reverse;
		justify-content: flex-end;
	}
`;

export const TeamInfo = styled.div`
	display: flex;
	flex-direction: column;
	line-height: 1;
	padding: 0 ${Spacing.horiz};

	@media (max-width: ${MobileBreakpoint.max}) {
		flex: 1;
		line-height: 1.2;
		padding: 0 1em;
	}
`;

export const TeamInfoCity = styled.div`
	text-transform: uppercase;

	@media (max-width: ${MobileBreakpoint.max}) {
		font-size: 0.875rem;
		text-align: left;
	}
`;

export const TeamInfoName = styled.div`
	font-size: 2rem;
	font-weight: 700;

	@media (max-width: ${MobileBreakpoint.max}) {
		font-size: 1.5rem;
	}
`;

export const TeamScore = styled.div`
	font-size: 3rem;
	line-height: 1;

	@media (max-width: ${MobileBreakpoint.max}) {
		flex-basis: 15%;
		text-align: center;
	}
`;

