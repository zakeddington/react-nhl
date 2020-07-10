import { css } from 'styled-components/macro';
import { MobileBreakpoint } from '../../config/Breakpoints';

export const PINNED = 'pinned';
export const PLAYER_JERSEY = 'playerJersey';
export const PLAYER_NAME = 'playerName';
export const SPACER = 'spacer';
export const SPACER_WIDE = 'spacerWide';
export const ALIGN_LEFT = 'alignLeft';
export const TEAM_NAME = 'teamName';

export default {
	pinned: ({ theme }) => css`
		@media (max-width: ${MobileBreakpoint.max}) {
			border-right: 1px solid ${theme.color.greyMed};
			position: absolute;
			min-width: 7rem;
			width: 7rem;
		}
  `,
	playerJersey: () => css`
		@media (min-width: ${MobileBreakpoint.min}) {
			border-right: none;
			min-width: 2.5rem;
			width: 2.5rem;
		}

		@media (max-width: ${MobileBreakpoint.max}) {
			left: 20px;
		}
	`,
	playerName: () => css`
		@media (min-width: ${MobileBreakpoint.min}) {
			min-width: 14rem;
			width: 14rem;
		}

		@media (max-width: ${MobileBreakpoint.max}) {
			left: calc(2.5rem + 20px);
			min-width: 14rem;
			width: 14rem;
		}
	`,
	spacer: () => css`
		@media (max-width: ${MobileBreakpoint.max}) {
			padding-left: 8rem;
		}
	`,
	spacerWide: () => css`
		@media (max-width: ${MobileBreakpoint.max}) {
			padding-left: calc(16.5rem + 5px);
		}
	`,
	alignLeft: () => css`
		text-align: left;
	`,
	teamName: () => css`
		width: 12.5rem;
	`,
};
