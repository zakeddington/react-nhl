import styled, { css } from 'styled-components/macro';
import { Link } from 'react-router-dom';
import { SvgIcon } from '../../Shared/Icon/IconStyle';
import { AnimSpeed, AnimEase } from '../../../config/Animation';
import { Button } from '../../../globalStyles/Button/Button';

export const StyledScheduleNav = styled.div`
	align-items: center;
	background: ${props => props.theme.color.greyDark};
	border: 1px solid ${props => props.theme.color.greyDark};
	display: flex;
	flex-wrap: wrap;
	line-height: 2rem;
	margin-bottom: 3em;
`;

export const ScheduleNavItems = styled.ul`
	display: flex;
	flex-grow: 1;
	flex-wrap: wrap;
	font-weight: 700;
	margin-bottom: 0;
	text-align: center;
	text-transform: uppercase;
`;

export const ScheduleNavItem = styled.li`
	display: flex;
	flex: 1;
	margin: 0;
`;

export const ScheduleNavPrevNext = styled(ScheduleNavItem)`
	max-width: 2rem;

	${SvgIcon} {
		fill: ${props => props.theme.color.white};
		height: 1.5rem;
		width: 1.5rem;
	}
`;

export const ScheduleNavLink = styled(Link)`
	background: ${props => props.theme.color.greyDark};
	border: none;
	color: ${props => props.theme.color.white};
	display: block;
	font-size: 0.875rem;
	padding: 0;
	text-decoration: none;
	transition: all ${AnimSpeed.default} ${AnimEase.default};
	width: 100%;

	&:hover,
	&:focus {
		background: ${props => props.theme.color.greyLight};
		color: ${props => props.theme.color.greyDark};
		outline: none;

		${SvgIcon} {
			fill: ${props => props.theme.color.greyDark};
		}
	}

	${props => props.$isActive && css`
		background: ${props => props.theme.color.white};
		color: ${props => props.theme.color.greyDark};
		cursor: default;
	`}
`;

export const StyledDatepickerTrigger = styled(Button)`
	align-items: center;
	background: ${props => props.theme.color.greyDark};
	border: none;
	color: ${props => props.theme.color.white};
	display: flex;
	font-weight: 700;
	height: 100%;
	min-height: 2rem;
	text-transform: uppercase;
	transition: all ${AnimSpeed.default} ${AnimEase.default};

	${SvgIcon} {
		fill: ${props => props.theme.color.white};
		height: 1.5rem;
		width: 1.5rem;
	}

	&:hover,
	&:focus {
		background: ${props => props.theme.color.greyLight};
		color: ${props => props.theme.color.greyDark};
		outline: none;

		${SvgIcon} {
			fill: ${props => props.theme.color.greyDark};
		}
	}
`;
