import { css } from 'styled-components/macro';
import { TabsNav, TabsNavLink } from './TabsStyle';
import { SvgLogo } from '../Icon/IconStyle';
import { MobileBreakpoint } from '../../../config/Breakpoints';

export default {
	small: () => css`
		${TabsNav} {
			margin-bottom: 1rem;
		}

		${TabsNavLink} {
			font-size: 0.875rem;
			padding: 0.5rem 0.75rem;
		}
	`,
	teamLogos: ({ theme }) => css`
		${SvgLogo} {
			background: ${theme.color.white};
			border-radius: 50%;
			display: inline-block;
			margin-right: 0.5rem;
			padding: 5px;

			@media (max-width: ${MobileBreakpoint.max}) {
				display: none;
			}
		}
	`,
};
