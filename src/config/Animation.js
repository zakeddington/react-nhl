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
	inOut: 'ease-in-out',
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

export const Bounce = keyframes`
	0%,
	80%,
	100% {
		transform: scale(0);
	}

	40% {
		transform: scale(1);
	}
`;
