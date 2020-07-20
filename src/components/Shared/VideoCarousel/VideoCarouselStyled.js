import styled, { css } from 'styled-components/macro';
import { AnimSpeed, AnimEase } from '../../../config/Animation';
import { MobileBreakpoint } from '../../../config/Breakpoints';
import {
	VideoPlayerVideo,
	VideoPlayerTrigger,
	VideoPlayerTriggerIcon,
	VideoPlayerPosterImg,
	VideoPlayerTitle,
} from '../VideoPlayer/VideoPlayerStyled';
import ZIndex from '../../../config/ZIndex';

export const VideoCarouselPlayer = styled.div`
	background: ${props => props.theme.color.videoPlayerBackground};
	display: block;
	height: 0;
	overflow: hidden;
	padding-top: 56.25%;
	position: relative;
	width: 100%;

	${VideoPlayerVideo},
	${VideoPlayerTrigger} {
		background: ${props => props.theme.color.videoPlayerBackground};
		border: 1px solid ${props => props.theme.color.border};
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
	background: ${props => props.theme.color.videoCarouselThumbBackground};
	border: 1px solid ${props => props.theme.color.border};
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
		border: 1px solid ${props => props.theme.color.border};
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
		color: ${props => props.theme.color.videoCarouselThumbText};
		font-size: 0.75rem;
		padding: 0.25rem 0;
		position: relative;
		z-index: auto;
	}

	${props => props.$isActive && css`
		background: ${props => props.theme.color.videoCarouselThumbBackgroundActive};
		border-left: ${props => `1px solid ${props.theme.color.videoCarouselBorder}`};
		border-right: ${props => `1px solid ${props.theme.color.videoCarouselBorder}`};
		cursor: default;

		&:before {
			border-bottom: 15px solid ${props => props.theme.color.videoCarouselBorderActive};
			border-left: 20px solid transparent;
			border-right: 20px solid transparent;
			content: '';
			height: 0;
			left: 50%;
			position: absolute;
			top: 0;
			transform: translate(-50%, 0);
			width: 0;
			z-index: ${ZIndex.default};
		}

		&:first-child {
			border-left: none;
		}

		&:last-child {
			border-right: none;
		}

		${VideoPlayerTrigger} {
			color: ${props => props.theme.color.videoCarouselThumbTextActive};
			cursor: default;
			text-decoration: none;
		}

		${VideoPlayerPosterImg} {
			border-color: ${props => props.theme.color.videoCarouselBorderActive};
			filter: brightness(1);
			outline: 3px solid ${props => props.theme.color.videoCarouselBorderActive};
		}

		${VideoPlayerTriggerIcon} {
			display: none;
		}

		${VideoPlayerTitle} {
			color: ${props => props.theme.color.videoCarouselThumbTextActive};

			&:hover,
			&:focus {
				color: ${props => props.theme.color.videoCarouselThumbTextActive};
			}
		}
	`}
`;
