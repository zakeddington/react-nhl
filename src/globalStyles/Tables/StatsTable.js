import styled, { css } from 'styled-components/macro';
import { applyStyleModifiers } from 'styled-components-modifiers';
import { MobileBreakpoint } from '../../config/Breakpoints';
import StatsTableModifiers from './StatsTableModifiers';
import Modifiers from '../Utilities/Modifiers';

const CombinedModifiers = {
	...StatsTableModifiers,
	...Modifiers,
}

export const StatsTableContainer = styled.div`
	width: 100%;

	@media (max-width: ${MobileBreakpoint.max}) {
		overflow-x: auto;
	}
`;

export const StatsTable = styled.table`
	background: ${props => props.theme.color.white};
	font-size: 0.875rem;
	margin: 0;
	text-align: right;
	width: 100%;
`;

export const StatsTableRow = styled.tr`
	border-bottom: 1px solid ${props => props.theme.color.greyMed};
	position: relative;

	${applyStyleModifiers(CombinedModifiers)};
`;

const StatsTableCell = css`
	background: ${props => props.theme.color.white};
	font-weight: 500;
	min-width: 2rem;
	padding: 5px;
	vertical-align: middle;
	white-space: nowrap;
`;

export const StatsTableTh = styled.th`
	${StatsTableCell};
	background: ${props => props.theme.color.greyMed};
	font-weight: 600;

	${applyStyleModifiers(CombinedModifiers)};
`;

export const StatsTableTd = styled.td`
	${StatsTableCell};

	${StatsTableRow}:hover & {
		background: ${props => props.theme.color.greyLight};
		${applyStyleModifiers(CombinedModifiers)};
	}

	${applyStyleModifiers(CombinedModifiers)};
`;
