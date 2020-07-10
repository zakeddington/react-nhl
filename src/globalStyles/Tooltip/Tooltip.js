import styled from 'styled-components/macro';
import { rgba } from 'polished';
import { AnimSpeed, AnimEase } from '../../config/Animation';
import { TabletBreakpoint, MobileBreakpoint } from '../../config/Breakpoints';
import ZIndex from '../../config/ZIndex';

export const TooltipContent = styled.span`
	background: ${props => rgba(props.theme.color.black, 0.8)};
	border-radius: 3px;
	color: ${props => props.theme.color.white};
	font-size: 0.625rem;
	font-weight: 500;
	left: 50%;
	opacity: 0;
	padding: 0.25em 0.5em;
	position: absolute;
	top: 90%;
	transform: translateX(-50%);
	transition: all ${AnimSpeed.default} ${AnimEase.default};
	visibility: hidden;
	white-space: nowrap;
	z-index: ${ZIndex.default};
`;

export const Tooltip = styled.span`
	cursor: default;

	@media (min-width: ${TabletBreakpoint.min}) {
		position: relative;
	}

	&:hover,
	&:focus {
		@media (max-width: ${MobileBreakpoint.max}) {
			position: relative; // prevent overlapping pinned headers on stat tables
		}

		${TooltipContent} {
			opacity: 1;
			visibility: visible;
		}
	}
`;
