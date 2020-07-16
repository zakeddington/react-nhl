import styled, { css } from 'styled-components/macro';
import { rgba } from 'polished';
import { AnimSpeed, AnimEase } from '../../../config/Animation';
import { MobileBreakpoint } from '../../../config/Breakpoints';
import {
	VideoPlayerVideo,
	VideoPlayerTrigger,
	VideoPlayerTriggerIcon,
	VideoPlayerPosterImg,
	VideoPlayerTitle,
} from '../VideoPlayer/VideoPlayerStyle';

export const VideoCarouselPlayer = styled.div`
	background: ${props => props.theme.color.greyDark};
	display: block;
	height: 0;
	overflow: hidden;
	padding-top: 56.25%;
	position: relative;
	width: 100%;

	${VideoPlayerVideo},
	${VideoPlayerTrigger} {
		background: ${props => props.theme.color.greyDark};
		border: 1px solid ${props => props.theme.color.greyMed};
		display: block;
		height: 100%;
		left: 0;
		position: absolute;
		top: 0;
		width: 100%;
	}

	${VideoPlayerPosterImg} {
		display: block;
		transition: all ${AnimSpeed.fast} ${AnimEase.default};
	}
`;

export const VideoCarouselThumbs = styled.div`
	background: ${props => props.theme.color.greyLight};
	border: 1px solid ${props => props.theme.color.greyMed};
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	overflow-x: auto;
	white-space: nowrap;
	width: 100%;
`;

export const VideoCarouselThumbsItem = styled.div`
	min-width: 24%;
	position: relative;
	width: 24%;

	@media (max-width: ${MobileBreakpoint.max}) {
		min-width: 45%;
		width: 45%;
	}

	${VideoPlayerTrigger} {
		padding: 1rem 1rem 0.5rem;
		position: relative;
	}

	${VideoPlayerPosterImg} {
		border: 1px solid ${props => props.theme.color.greyMed};
		position: relative;
	}

	${VideoPlayerTriggerIcon} {
		height: 4rem;
		transform: translate(-50%, calc(-50% - 0.5rem));
		width: 4rem;

		@media (max-width: ${MobileBreakpoint.max}) {
			height: 3rem;
			width: 3rem;
		}
	}

	${VideoPlayerTitle} {
		background: none;
		color: ${props => props.theme.colorUsage.text};
		font-size: 0.75rem;
		padding: 0.25rem 0;
		position: relative;
		z-index: auto;
	}

	${props => props.$isActive && css`
		background: ${props => props.theme.color.greyMed};
		border-left: ${props => `1px solid ${rgba(props.theme.color.black, 0.1)}`};
		border-right: ${props => `1px solid ${rgba(props.theme.color.black, 0.1)}`};
		cursor: default;

		&:before {
			border-bottom: 15px solid ${props => props.theme.color.white};
			border-left: 20px solid transparent;
			border-right: 20px solid transparent;
			content: '';
			height: 0;
			left: 50%;
			position: absolute;
			top: 0;
			transform: translate(-50%, 0);
			width: 0;
		}

		&:first-child {
			border-left: none;
		}

		&:last-child {
			border-right: none;
		}

		${VideoPlayerTrigger} {
			cursor: default;
		}

		${VideoPlayerPosterImg} {
			border-color: ${props => props.theme.color.white};
			filter: brightness(1);
			outline: 3px solid ${props => props.theme.color.white};
		}

		${VideoPlayerTriggerIcon} {
			display: none;
		}
	`}
`;
