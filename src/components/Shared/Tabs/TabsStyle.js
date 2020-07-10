import styled, { css } from 'styled-components/macro';
import { applyStyleModifiers } from 'styled-components-modifiers';
import { AnimSpeed, AnimEase, FadeIn } from '../../../config/Animation';
import { TabletBreakpoint } from '../../../config/Breakpoints';
import { Button } from '../../../globalStyles/Button/Button';
import TabsModifiers from './TabsModifiers';

export const StyledTabs = styled.div`
	${applyStyleModifiers(TabsModifiers)};
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

export const TabsNavLink = styled(Button)`
	color: ${props => props.theme.color.white};
	font-weight: 700;
	margin: 0;
	padding: 1rem;

	&:hover,
	&:focus {
		background: ${props => props.theme.color.greyMedDark};
		color: ${props => props.theme.color.white};
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
