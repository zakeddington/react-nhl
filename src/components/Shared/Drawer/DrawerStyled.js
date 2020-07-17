import styled, { css } from 'styled-components/macro';
import { AnimSpeed, AnimEase } from '../../../config/Animation';
import { TabletBreakpoint, DesktopBreakpoint } from '../../../config/Breakpoints';
import { Spacing } from '../../../config/Grid';
import ZIndex from '../../../config/ZIndex';
import { Button, TextButtonWithIcon } from '../../../globalStyles/Button/Button';
import { SvgIcon } from '../Icon/IconStyled';

export const DrawerStyled = styled.div`
	display: inline;
`;

export const DrawerTrigger = styled(TextButtonWithIcon)`
	margin: 0;
	padding: 0;

	${SvgIcon} {
		margin-left: 0.5rem;
	}
`;

export const DrawerClose = styled(Button)`
	background: ${props => props.theme.color.drawerCloseBackground};
	color: ${props => props.theme.color.drawerCloseText};
	border-bottom-left-radius: 50%;
	border-top-left-radius: 50%;
	height: 2.5rem;
	left: 0.5rem;
	padding: 0 0 0 0.4rem;
	position: absolute;
	top: 1rem;
	width: 2.5rem;

	${SvgIcon} {
		fill: ${props => props.theme.color.drawerCloseText};
		height: 50%;
		margin: auto;
		width: 50%;
	}

	&:hover,
	&:focus {
		background: ${props => props.theme.color.drawerCloseBackground};
		color: ${props => props.theme.color.drawerCloseTextHover};

		${SvgIcon} {
			fill: ${props => props.theme.color.drawerCloseTextHover};
		}
	}
`;

export const DrawerOverlay = styled.div`
	align-items: center;
	background: none;
	display: flex;
	flex-direction: column;
	height: 100vh;
	justify-content: center;
	left: 0;
	position: fixed;
	top: 0;
	width: 100vw;
	z-index: ${ZIndex.drawerOverlay};
`;

export const DrawerContainer = styled.div`
	background: none;
	display: block;
	height: 100vh;
	overflow-y: auto;
	padding: 0 0 0 3rem;
	position: fixed;
	right: -100%;
	top: 0;
	transition: all ${AnimSpeed.slow} ${AnimEase.default}; // update drawer setTimout if changing AnimSpeed
	width: calc(100vw - 1rem);
	z-index: ${ZIndex.drawer};

	@media (min-width: ${TabletBreakpoint.min}) {
		width: 60vw;
	}

	@media (min-width: ${DesktopBreakpoint.min}) {
		max-width: 500px;
		width: 50vw;
	}

	${props => props.$isActive && css`
		right: 0;
	`}
`;

export const DrawerContent = styled.div`
	background: ${props => props.theme.color.drawerBackground};
	box-shadow: ${props => `0 0 1rem ${props.theme.color.shadow}`};
	display: block;
	height: 100%;
	max-height: 100%;
	overflow-y: auto;
	padding: ${Spacing.horiz};
`;
