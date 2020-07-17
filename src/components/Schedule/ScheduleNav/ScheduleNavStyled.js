import styled, { css } from 'styled-components/macro';
import { rgba } from 'polished';
import { Link } from 'react-router-dom';
import { SvgIcon } from '../../Shared/Icon/IconStyled';
import { AnimSpeed, AnimEase } from '../../../config/Animation';
import { Button } from '../../../globalStyles/Button/Button';

export const ScheduleNavStyled = styled.div`
	align-items: center;
	background: ${props => props.theme.color.backgroundPrimary};
	border: 1px solid ${props => props.theme.color.backgroundPrimary};
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
		fill: ${props => props.theme.color.backgroundPrimaryText};
		height: 1.5rem;
		width: 1.5rem;
	}
`;

export const ScheduleNavLink = styled(Link)`
	background: ${props => props.theme.color.backgroundPrimary};
	border: none;
	color: ${props => props.theme.color.backgroundPrimaryText};
	display: block;
	font-size: 0.875rem;
	padding: 0;
	text-decoration: none;
	transition: all ${AnimSpeed.default} ${AnimEase.default};
	width: 100%;

	&:hover,
	&:focus {
		background: ${props => rgba(props.theme.color.backgroundPrimaryText, 0.85)};
		color: ${props => props.theme.color.backgroundPrimary};
		outline: none;

		${SvgIcon} {
			fill: ${props => props.theme.color.backgroundPrimary};
		}
	}

	${props => props.$isActive && css`
		background: ${props => props.theme.color.backgroundPrimaryText};
		color: ${props => props.theme.color.backgroundPrimary};
		cursor: default;

		&:hover,
		&:focus {
			background: ${props => props.theme.color.backgroundPrimaryText};
		}
	`}
`;

export const DatepickerTrigger = styled(Button)`
	align-items: center;
	background: ${props => props.theme.color.backgroundPrimary};
	border: none;
	color: ${props => props.theme.color.backgroundPrimaryText};
	display: flex;
	font-weight: 700;
	height: 100%;
	margin: 0;
	min-height: 2rem;
	padding: 0 0.25rem;
	text-transform: uppercase;
	transition: all ${AnimSpeed.default} ${AnimEase.default};

	${SvgIcon} {
		fill: ${props => props.theme.color.backgroundPrimaryText};
		height: 1.5rem;
		width: 1.5rem;
	}

	&:hover,
	&:focus {
		background: ${props => rgba(props.theme.color.backgroundPrimaryText, 0.85)};
		color: ${props => props.theme.color.backgroundPrimary};
		outline: none;

		${SvgIcon} {
			fill: ${props => props.theme.color.backgroundPrimary};
		}
	}
`;
