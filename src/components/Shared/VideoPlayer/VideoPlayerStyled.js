import styled from 'styled-components/macro';
import { AnimSpeed, AnimEase } from '../../../config/Animation';
import { MobileBreakpoint } from '../../../config/Breakpoints';
import ZIndex from '../../../config/ZIndex';
import Icon from '../Icon/Icon';
import { TextButton } from '../../../globalStyles/Button/Button';

export const VideoPlayerVideo = styled.video`
	display: block;
`;

export const VideoPlayerPosterImg = styled.img`
	filter: brightness(0.9);
	height: auto;
	left: 0;
	position: absolute;
	top: 0;
	transition: filter ${AnimSpeed.default} ${AnimEase.default};
	width: 100%;
`;

export const VideoPlayerTriggerIcon = styled(Icon)`
	border-radius: 50%;
	display: block;
	fill: ${props => props.theme.color.videoPlayerButtonIcon};
	filter: drop-shadow(0 0 1rem ${props => props.theme.color.shadow});
	height: 8rem;
	left: 50%;
	opacity: 0.9;
	position: absolute;
	top: 50%;
	transform: translate(-50%, -50%);
	width: 8rem;

	@media (max-width: ${MobileBreakpoint.max}) {
		filter: drop-shadow(0 0 0.25rem ${props => props.theme.color.shadow});
		height: 5rem;
		width: 5rem;
	}
`;

export const VideoPlayerTrigger = styled(TextButton)`
	display: block;
	overflow: hidden;
	padding: 56.25% 0 0;
	width: 100%;

	&:hover,
	&:focus {
		${VideoPlayerPosterImg} {
			filter: brightness(1);
		}

		${VideoPlayerTriggerIcon} {
			background: ${props => props.theme.color.videoPlayerButtonBackground};
			opacity: 1;
		}
	}
`;

export const VideoPlayerTitle = styled.span`
	background: ${props => props.theme.color.videoPlayerTitleBackground};
	color: ${props => props.theme.color.videoPlayerTitle};
	display: block;
	font-size: 1rem;
	font-weight: 600;
	left: 0;
	padding: 1rem;
	position: absolute;
	text-align: left;
	top: 0;
	white-space: normal;
	width: 100%;
	z-index: ${ZIndex.default};
`;
