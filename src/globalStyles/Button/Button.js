import styled from 'styled-components/macro';
import { AnimSpeed, AnimEase } from '../../config/Animation'

export const Button = styled.button`
	background: ${props => props.theme.color.buttonBackground};
	border: none;
	color: ${props => props.theme.color.buttonText};
	cursor: pointer;
	display: inline-block;
	font-family: ${props => props.theme.font.family.primary};
	font-size: 1rem;
	font-weight: 600;
	margin: 0 auto 0.5rem;
	padding: 0.5rem 1rem;
	position: relative;
	text-decoration: none;
	transition: all ${AnimSpeed.default} ${AnimEase.in};

	&:hover,
	&:focus {
		background: ${props => props.theme.color.buttonBackgroundHover};
		color: ${props => props.theme.color.buttonTextHover};
		text-decoration: none;
	}
`;

export const TextButton = styled(Button)`
	background: ${props => props.theme.color.textButtonBackground};
	color: ${props => props.theme.color.textButtonText};

	&:hover,
	&:focus {
		background: ${props => props.theme.color.textButtonBackgroundHover};
		color: ${props => props.theme.color.textButtonTextHover};
		text-decoration: underline;
	}
`;

export const TextButtonWithIcon = styled(TextButton)`
	align-items: center;
	display: flex;
	margin: 0;
	padding: 0;
`;
