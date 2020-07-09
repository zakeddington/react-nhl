import styled, { css } from 'styled-components/macro';
import { AnimSpeed, AnimEase, FadeIn } from '../../../config/Animation';
import { TabletBreakpoint } from '../../../config/Breakpoints';

export const StyledTabs = styled.div`
	// modifier class as a prop
	${props => props.modifier === 'small' && css`
		${TabsNavLink} {
			font-size: 0.875rem;
			padding: 0.5rem 0.75rem;
		}

		${TabsNav} {
			margin-bottom: 1rem;
		}
	`}
`;

export const TabsNav = styled.ol`
	background: ${props => props.theme.color.greyDark};
	color: ${props => props.theme.color.white};
	display: flex;
	font-size: 1rem;
	justify-content: center;
	margin-bottom: 0;
	padding: 0;
	width: 100%;
`;

export const TabsNavItem = styled.li`
	margin: 0;
	padding: 0;
`;

export const TabsNavLink = styled.button`
	background: none;
	border: none;
	color: ${props => props.theme.color.white};
	font-size: 1rem;
	font-weight: 700;
	margin: 0;
	padding: 1rem;
	transition: all ${AnimSpeed.default} ${AnimEase.in};

	&:hover,
	&:focus {
		background: ${props => props.theme.color.greyMedDark};
		outline: none;
	}

	${props => props.$isActive && css`
		background: ${props => props.theme.color.grey};
	`}
`;

export const TabsContent = styled.div`
	display: none;
	overflow-x: hidden;

	@media (max-width: ${TabletBreakpoint.max}) {
		overflow-x: auto;
	}

	${props => props.$isActive && css`
		animation: ${FadeIn} ${AnimSpeed.default} forwards ${AnimEase.default};
		display: block;
		opacity: 0;
	`}
`;
