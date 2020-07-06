import styled from 'styled-components/macro';
import { AnimSpeed, AnimEase } from '../../../config/Animation';
import { TabletBreakpoint, DesktopBreakpoint } from '../../../config/Breakpoints';
import { Spacing } from '../../../config/Grid';
import ZIndex from '../../../config/ZIndex';
import { ButtonWithIcon } from '../../../globalStyles/Button/Button';
import { SvgIcon } from '../Icon/IconStyle';

export const StyledDrawer = styled.div`
	display: inline;
`;

export const DrawerTrigger = styled(ButtonWithIcon)`
	margin: 0;
	padding: 0;

	&:hover,
	&:focus {
		text-decoration: underline;
	}

	${SvgIcon} {
		margin-left: 0.5rem;
	}
`;

export const DrawerClose = styled(ButtonWithIcon)`
	background: ${props => props.theme.color.greyMed};
	border: none;
	border-bottom-left-radius: 50%;
	border-top-left-radius: 50%;
	height: 2.5rem;
	left: 0.5rem;
	padding: 0 0 0 0.4rem;
	position: absolute;
	top: 1rem;
	width: 2.5rem;

	${SvgIcon} {
		fill: ${props => props.theme.color.greyDark};
		height: 50%;
		margin: auto;
		width: 50%;
	}

	&:hover,
	&:focus {
		${SvgIcon} {
			fill: ${props => props.theme.colorUsage.linkHover};
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
	// update drawer setTimout if changing $anim-speed-slow
	transition: all ${AnimSpeed.slow} ${AnimEase.default};
	width: calc(100vw - 1rem);
	z-index: ${ZIndex.drawer};

	@media (min-width: ${TabletBreakpoint.min}) {
		width: 60vw;
	}

	@media (min-width: ${DesktopBreakpoint.min}) {
		max-width: 500px;
		width: 50vw;
	}

	&.is-active {
		right: 0;
	}
`;

export const DrawerContent = styled.div`
	background: ${props => props.theme.color.greyMed};
	box-shadow: ${`0 0 1rem rgba(${props => props.theme.color.black}, 0.5)`};
	display: block;
	height: 100%;
	max-height: 100%;
	overflow-y: auto;
	padding: ${Spacing.horiz};
`;
