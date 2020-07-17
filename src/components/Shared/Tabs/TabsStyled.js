import styled, { css } from 'styled-components/macro';
import { applyStyleModifiers } from 'styled-components-modifiers';
import { AnimSpeed, AnimEase, FadeIn } from '../../../config/Animation';
import { TabletBreakpoint } from '../../../config/Breakpoints';
import { Button } from '../../../globalStyles/Button/Button';
import TabsModifiers from './TabsModifiers';
import Modifiers from '../../../globalStyles/Utilities/Modifiers';

const CombinedModifiers = {
	...TabsModifiers,
	...Modifiers,
}

export const TabsStyled = styled.div`
	${applyStyleModifiers(CombinedModifiers)};
`;

export const TabsNav = styled.ol`
	background: ${props => props.theme.color.tabButtonBackground};
	color: ${props => props.theme.color.tabButtonText};
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

export const TabsNavLink = styled(Button)`
	background: ${props => props.theme.color.tabButtonBackground};
	color: ${props => props.theme.color.tabButtonText};
	font-weight: 700;
	margin: 0;
	padding: 1rem;

	&:hover,
	&:focus {
		background: ${props => props.theme.color.tabButtonBackgroundHover};
		color: ${props => props.theme.color.tabButtonTextHover};
		outline: none;
	}

	${props => props.$isActive && css`
		background: ${props => props.theme.color.tabButtonBackgroundActive};
		color: ${props => props.theme.color.tabButtonTextActive};

		&:hover,
		&:focus {
			background: ${props => props.theme.color.tabButtonBackgroundActive};
			color: ${props => props.theme.color.tabButtonTextActive};
			cursor: default;
		}
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
