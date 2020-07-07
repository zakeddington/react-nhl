import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import { Container } from '../../globalStyles/Layout/Layout';
import { ButtonWithIcon } from '../../globalStyles/Button/Button';
import { DrawerTrigger } from '../Shared/Drawer/DrawerStyle';
import { SvgIcon } from '../Shared/Icon/IconStyle';

export const StyledHeader = styled.div`
	background: ${props => props.theme.color.greyDark};
	border-bottom: ${props => `4px solid ${props.theme.color.white}`};
	height: 5rem;

	${DrawerTrigger} {
		color: ${props => props.theme.color.white};
		font-size: 0.875rem;

		${SvgIcon} {
			fill: ${props => props.theme.color.greyMed};
			height: 1.5rem;
			width: 1.5rem;
		}

		&:hover,
		&:focus {
			color: ${props => props.theme.color.white};
			text-decoration: underline;

			${SvgIcon} {
				fill: ${props => props.theme.color.white};
			}
		}
	}
`;

export const StyledContainer = styled(Container)`
	align-items: center;
	display: flex;
	height: 100%;
	justify-content: space-between;
`;

export const HomeLink = styled(Link)`
	display: block;
	height: 3.5rem;
	left: 50%;
	margin: 0;
	position: absolute;
	text-decoration: none;
	top: 50%;
	transform: translate(-50%, -50%);
	width: 3.5rem;
`;

export const HomeLinkImg = styled.img`
	display: block;
	height: 100%;
`;

export const BackButton = styled(ButtonWithIcon)`
	color: ${props => props.theme.color.white};
	font-size: 0.875rem;

	${SvgIcon} {
		fill: ${props => props.theme.color.greyMed};
		height: 1.5rem;
		width: 1.5rem;
	}

	&:hover,
	&:focus {
		color: ${props => props.theme.color.white};
		text-decoration: underline;

		${SvgIcon} {
			fill: ${props => props.theme.color.white};
		}
	}
`
