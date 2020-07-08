import styled from 'styled-components/macro';
import { DesktopBreakpoint, MobileBreakpoint } from '../../../config/Breakpoints';
import { Spacing } from '../../../config/Grid';
import { SvgLogo } from '../../Shared/Icon/IconStyle';

export const ScoreBoardStarsContainer = styled.div`
	margin: ${Spacing.vert} auto;

	@media (min-width: ${DesktopBreakpoint.min}) {
		display: flex;
		flex-direction: row-reverse;
	}
`;

export const StyledScoreBoard = styled.div`
	background: ${props => props.theme.color.white};
	border-bottom: 1px solid ${props => props.theme.color.greyMed};
	display: flex;
	flex-direction: column;
	margin: 0 auto ${Spacing.vert};
	width: 100%;

	@media (min-width: ${DesktopBreakpoint.min}) {
		margin-bottom: 0;
		width: 40%;
	}
`;

export const ScoreBoardResults = styled.div`
	display: flex;
	flex-direction: row;
	font-size: 1.125rem;
	padding: 0.5em 1em;
	width: 100%;

	> :last-child {
		font-weight: 700;
	}
`;

export const ScoreBoardTeams = styled.div`
	flex: 3;
	font-weight: 600;
`;

export const ScoreBoardItem = styled.div`
	border-bottom: 1px solid ${props => props.theme.color.greyMed};
	height: 50px;
	line-height: 30px;
	padding: 10px 0;
	white-space: nowrap;

	${SvgLogo} {
		display: inline-block;
		height: 30px;
		margin-right: 0.5em;
		vertical-align: middle;
		width: 30px;
	}

	&:first-child {
		color: ${props => props.theme.color.grey};
		font-size: 0.875rem;
		line-height: 1.2;

		@media (max-width: ${MobileBreakpoint.max}) {
			height: auto;
		}
	}

	&:last-child {
		border-bottom: none;
	}
`;

export const ScoreBoardItemText = styled.span`
	display: inline-block;
	vertical-align: middle;
`;

export const ScoreBoardPeriods = styled.div`
	flex: 1;

	${ScoreBoardItem} {
		text-align: center;
	}
`;
