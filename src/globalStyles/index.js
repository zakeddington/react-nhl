import { createGlobalStyle } from 'styled-components/macro';
import { TabletBreakpoint, DesktopBreakpoint } from '../config/Breakpoints';
import { ContainerSize } from '../config/Grid';
import Reset from './Utilities/Reset';
import Classes from './Utilities/Classes';

const GlobalStyles = createGlobalStyle`
	${Reset}

	html {
		color: ${props => props.theme.colorUsage.text};
		font-family: ${props => props.theme.font.family.primary};
		// uncomment appropriate line to set default type size
		// font-size: 100%; //16px
		// font-size: 87.5%; //14px
		font-size: 75%; //12px
		// font-size: 62.5%; //10px
		line-height: 1.5; //24px
		overflow-x: hidden;

		// Tablet
		@media (min-width: ${TabletBreakpoint.min}) and (max-width: ${TabletBreakpoint.max}) {
		font-size: 87.5%; //14px
		}

		// Desktop +
		@media (min-width: ${DesktopBreakpoint.min}) {
			font-size: 100%; //16px
		}
	}

	body {
		background: ${props => props.theme.color.greyLight};
		min-width: ${ContainerSize.width.wide};
	}

	// Breakpoint Indicator
	// -----------------------------------------------------------------+
	// An element that changes z-index when a breakpoint is crossed
	// Used in conjunction with /scripts/Utilities/BreakpointChange.js

	#breakpoint-indicator {
		height: 1px;
		left: -1px;
		position: absolute;
		top: -1px;
		width: 1px;
		z-index: 1;

		// Tablet+
		@media (min-width: ${TabletBreakpoint.min}) {
			z-index: 2;
		}

		// Desktop+
		@media (min-width: ${DesktopBreakpoint.min}) {
			z-index: 3;
		}
	}

	#svg-defs {
		height: 1px;
		margin: -1px;
		overflow: hidden;
		position: fixed;
		width: 1px;
	}

	${Classes}
`;

export default GlobalStyles;
