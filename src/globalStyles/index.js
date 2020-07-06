import { createGlobalStyle } from 'styled-components/macro';
import Reset from './Reset';
import Config from './Config';
import UtilityClasses from './UtilityClasses';

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
		@media (min-width: ${Config.breakpoint.tablet.min}) and (max-width: ${Config.breakpoint.tablet.max}) {
		font-size: 87.5%; //14px
		}

		// Desktop +
		@media (min-width: ${Config.breakpoint.desktop.min}) {
			font-size: 100%; //16px
		}
	}

	body {
		background: ${props => props.theme.color.greyLight};
		min-width: ${Config.containerSize.width.wide};
	}

	${UtilityClasses}

	#svg-defs {
		height: 1px;
		margin: -1px;
		overflow: hidden;
		position: fixed;
		width: 1px;
	}
`;

export default GlobalStyles;
