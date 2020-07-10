import styled from 'styled-components/macro';
import { AnimSpeed, AnimEase } from '../../config/Animation'

export const Button = styled.button`
	background: none;
	border: none;
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
		text-decoration: none;

		//.svg-icon {
		//	fill: $color-link-hover;
		//}
	}
`;

export const ButtonWithIcon = styled(Button)`
	align-items: center;
	display: flex;
	margin: 0;
	padding: 0;

	//.svg-icon {
	//	fill: $color-grey-dark;
	//	height: 1.5rem;
	//	width: 1.5rem;
	//}

	&:hover,
	&:focus {
		color: ${props => props.theme.colorUsage.linkHover};
		text-decoration: none;

		//.svg-icon {
		//	fill: $color-link-hover;
		//}
	}
`;
