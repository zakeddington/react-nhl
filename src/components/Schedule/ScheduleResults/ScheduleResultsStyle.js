import styled from 'styled-components/macro';
import { rgba } from 'polished';
import { Link } from 'react-router-dom';
import { AnimSpeed, AnimEase, FadeInSlideDown } from '../../../config/Animation';
import { MobileBreakpoint, TabletBreakpoint, DesktopBreakpoint } from '../../../config/Breakpoints';
import { SvgLogo } from '../../Shared/Icon/IconStyle';

export const ScheduleGames = styled.ul`
	display: flex;
	flex-wrap: wrap;
	margin-bottom: 3em;
`;

export const Game = styled.li`
	animation: ${FadeInSlideDown} ${AnimSpeed.default} forwards ${AnimEase.default};
	display: flex;
	flex-direction: column;
	margin: 0;
	padding: 0 10px 10px 0;

	@media (min-width: ${DesktopBreakpoint.min}) {
		flex-basis: 33.3%;

		&:nth-child(3n+3) {
			padding-right: 0;
		}
	}

	@media (min-width: ${TabletBreakpoint.min}) and (max-width: ${TabletBreakpoint.max}) {
		flex-basis: 50%;

		&:nth-child(even) {
			padding-right: 0;
		}
	}

	@media (max-width: ${MobileBreakpoint.max}) {
		flex-basis: 100%;
		padding-right: 0;
	}

	&.is-away-winner {
		.home {
			color: ${props => props.theme.color.greyMedDark};
		}

		.away {
			font-weight: 700;
		}
	}

	&.is-home-winner {
		.home {
			font-weight: 700;
		}

		.away {
			color: ${props => props.theme.color.greyMedDark};
		}
	}
`;

export const GameLink = styled(Link)`
	background: ${props => rgba(props.theme.color.white, 0.5)};
	border: ${props => `1px solid ${rgba(props.theme.color.grey, 0.2)}`};
	color: ${props => props.theme.color.greyDark};
	height: 100%;
	padding: 0.5em 1em;
	text-decoration: none;
	transition: all ${AnimSpeed.default} ${AnimEase.default};

	&:hover,
	&:focus {
		background: ${props => props.theme.color.white};
		box-shadow: ${props => `0 3px 10px 0 ${rgba(props.theme.color.black, 0.2)}`};
		color: ${props => props.theme.color.greyDark};
	}
`;

export const Header = styled.div`
	border-bottom: 1px solid ${props => props.theme.color.greyMed};
	display: flex;
	font-size: 0.75rem;
	justify-content: space-between;
`;

export const HeaderStatus = styled.span`
	display: block;
`;

export const HeaderBroadcasts = styled.span`
	color: ${props => props.theme.color.greyMedDark};
	font-size: 0.5rem;
`;

export const Team = styled.div`
	align-items: center;
	display: flex;
	padding-top: 0.5em;

	${SvgLogo} {
		height: 2em;
		margin-right: 1em;
		width: 2em;
	}
`;

export const TeamName = styled.span`
	flex: 6;
	line-height: 1.2;
`;

export const TeamRecord = styled.span`
	clear: both;
	display: block;
	font-size: 0.75rem;
	font-weight: normal;
	line-height: 1;
	margin: 0.5em 0;
`;

export const TeamScore = styled.span`
	flex: 1;
	font-size: 1.5rem;
	font-weight: normal;
	text-align: right;

	.is-preview & {
		display: none;
	}
`;
