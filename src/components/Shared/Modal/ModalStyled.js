import styled from 'styled-components/macro';
import { TextButton } from '../../../globalStyles/Button/Button';
import { ContainerSize, Spacing } from '../../../config/Grid';
import ZIndex from '../../../config/ZIndex';
import { SvgIcon } from '../Icon/IconStyled';

export const ModalStyled = styled.div`
	display: inline;
`;

export const ModalTrigger = styled(TextButton)`
	font-size: inherit;
	font-weight: inherit;
	margin: 0;
	padding: 0;
`;

export const ModalOverlay = styled.div`
	align-items: center;
	background: ${props => props.theme.color.overlay};
	display: flex;
	flex-direction: column;
	height: 100vh;
	justify-content: center;
	left: 0;
	position: fixed;
	top: 0;
	width: 100vw;
	z-index: ${ZIndex.modalOverlay};
`;

export const ModalContainer = styled.div`
	background: none;
	display: flex;
	flex-direction: column;
	height: auto;
	max-height: 90vh;
	max-width: ${ContainerSize.width.wide};
	min-height: 400px;
	overflow-y: auto;
	padding: 0;
	position: relative;
	width: 90%;
	z-index: ${ZIndex.modalWindow};
`;

export const ModalClose = styled(TextButton)`
	align-self: flex-end;
	height: 2rem;
	margin: 0 0 0.5rem;
	padding: 0.25rem;
	width: 2rem;

	${SvgIcon} {
		fill: ${props => props.theme.color.modalCloseText};
		height: 100%;
		width: 100%;
	}

	&:hover,
	&:focus {
		${SvgIcon} {
			 fill: ${props => props.theme.color.modalCloseTextHover};
		}
	}
`;

export const ModalContent = styled.div`
	background: ${props => props.theme.color.modalBackground};
	display: block;
	max-height: 100%;
	overflow-y: auto;
	padding: ${Spacing.vert} ${Spacing.horiz};
`;
