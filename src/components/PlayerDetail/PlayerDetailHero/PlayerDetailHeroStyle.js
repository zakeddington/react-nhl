import styled from 'styled-components/macro';
import { MobileBreakpoint } from '../../../config/Breakpoints';
import { StyledPlayerPhoto } from '../../Shared/PlayerPhoto/PlayerPhotoStyle';

export const StyledPlayerDetailHero = styled.div`
	background: center center no-repeat;
	background-size: cover;
	display: block;
	height: 0;
	padding-top: 33.3%;
	position: relative;
	width: 100%;
`;

export const PlayerDetailBio = styled.div`
	background: ${props => props.theme.color.greyMed};
	border-bottom: 4px solid ${props => props.theme.color.white};
	border-top: 4px solid ${props => props.theme.color.white};
	display: flex;
	font-weight: 400;
	padding: 1rem;
	position: relative;
	text-align: left;

	@media (max-width: ${MobileBreakpoint.max}) {
		flex-direction: column;
	}

	${StyledPlayerPhoto} {
		border-width: 5px;
		height: 12rem;
		margin: -3rem 2rem 0 1rem;
		width: 12rem;

		@media (max-width: ${MobileBreakpoint.max}) {
			border-width: 3px;
			height: 4rem;
			width: 4rem;
		}

		&:hover,
		&:focus {
			border-color: ${props => props.theme.color.greyMed};
		}
	}
`;

export const BioContent = styled.div`
	flex: 1;
`;

export const BioRow = styled.div``;

export const BioName = styled.div`
	font-size: 2rem;
	font-weight: 700;

	@media (max-width: ${MobileBreakpoint.max}) {
		font-size: 1.5rem;
	}
`;

export const BioStat = styled.span`
	display: inline-block;
	margin: 0 1rem 0.25rem 0;
`;

export const BioLabel = styled.span`
	font-weight: 600;
`;
