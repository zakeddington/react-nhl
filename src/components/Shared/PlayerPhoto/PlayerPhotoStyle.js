import styled from 'styled-components/macro';
import { AnimSpeed, AnimEase } from '../../../config/Animation';
import { DesktopBreakpoint, MobileBreakpoint } from '../../../config/Breakpoints';
import { ImageBasePath, PlayerImagePath } from '../../../config/ImageIconConfig';
import { ModalTrigger } from '../Modal/ModalStyle';

export const StyledPlayerPhoto = styled.div`
	background: url(${ImageBasePath}${PlayerImagePath.headshotFallback}) center center no-repeat;
	background-size: contain;
	border: 1px solid ${props => props.theme.color.greyMed};
	border-radius: 50%;
	display: block;
	height: 60px;
	margin: 0 auto;
	overflow: hidden;
	transition: all ${AnimSpeed.default} ${AnimEase.default};
	width: 60px;

	@media (min-width: ${DesktopBreakpoint.min}) {
		height: 100px;
		width: 100px;
	}

	@media (max-width: ${MobileBreakpoint.max}) {
		display: none;
	}

	${ModalTrigger}:hover &,
	${ModalTrigger}:focus & {
		border-color: ${props => props.theme.color.greyDark};
	}
`;

export const PlayerPhotoImage = styled.div`
	background-position: center;
	background-repeat: no-repeat;
	background-size: contain;
	display: block;
	height: 100%;
	width: 100%;
`;
