import { keyframes } from 'styled-components';

export const AnimSpeed = {
	fast: '150ms',
	fastInt: 150,
	default: '300ms',
	defaultInt: 300,
	slow: '500ms',
	slowInt: 500,
};

export const AnimEase = {
	default: 'ease-out',
	in: 'ease-in',
};

export const FadeIn = keyframes`
	0% { opacity: 0; }
	100% { opacity: 1; }
`;

export const FadeInSlideDown = keyframes`
	0% {
		opacity: 0;
		transform: translateY(-30px);
	}
	100% {
		opacity: 1;
		transform: translateY(0px);
	}
`;
