import styled from 'styled-components/macro';
import { DesktopBreakpoint, MobileBreakpoint } from '../../../config/Breakpoints';
import { Spacing } from '../../../config/Grid';
import { PlayerPhotoStyled } from '../../Shared/PlayerPhoto/PlayerPhotoStyled';

export const StarsStyled = styled.div`
	background: ${props => props.theme.color.backgroundContent};
	border-bottom: 1px solid ${props => props.theme.color.border};
	display: flex;
	flex-direction: column;
	margin-bottom: ${Spacing.vert};
	width: 100%;

	@media (min-width: ${DesktopBreakpoint.min}) {
		margin-bottom: 0;
		margin-right: ${Spacing.horiz};
		width: calc(60% - ${Spacing.horiz});
	}
`;

export const StarsContent = styled.div`
	display: flex;
	flex-direction: row;
	padding: 1em;
	width: 100%;

	@media (max-width: ${MobileBreakpoint.max}) {
		padding-left: 0.5em;
		padding-right: 0.5em;
	}
`;

export const StarsPlayer = styled.div`
	align-items: center;
	display: flex;
	flex: 1;
	flex-direction: column;
	text-align: center;

	${PlayerPhotoStyled} {
		margin-bottom: 0.5em;

		@media (max-width: ${MobileBreakpoint.max}) {
			display: block;
		}
	}
`;

export const StarsPlayerName = styled.div`
	font-weight: 700;
	width: 100%;

	@media (max-width: ${MobileBreakpoint.max}) {
		line-height: 1.2;
	}
`;

export const StarsPlayerTeam = styled.div`
	display: inline;
	font-weight: normal;
	padding-left: 0.5em;

	@media (max-width: ${MobileBreakpoint.max}) {
		display: block;
		line-height: 1.5;
		padding-left: 0;
	}
`;

export const StarsPlayerStat = styled.div`
	font-size: 0.75rem;
`;
