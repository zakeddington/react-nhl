import styled from 'styled-components/macro';
import { Bounce, AnimEase } from '../../../config/Animation';

export const LoaderStyled = styled.div`
	margin: auto;
	padding: 2rem 0;
	text-align: center;
	width: 5em;
`;

export const LoaderCircle1 = styled.div`
	animation: ${Bounce} 1.4s infinite ${AnimEase.inOut} both;
	background-color: ${props => props.theme.color.greyDark};
	border-radius: 100%;
	display: inline-block;
	height: 1em;
	margin: 0.2em;
	width: 1em;
`;

export const LoaderCircle2 = styled(LoaderCircle1)`
	animation-delay: 0.2s;
`;

export const LoaderCircle3 = styled(LoaderCircle1)`
	animation-delay: 0.4s;
`;
