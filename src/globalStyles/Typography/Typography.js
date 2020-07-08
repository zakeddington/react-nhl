import styled from 'styled-components/macro';
import { AnimSpeed, AnimEase } from '../../config/Animation';

export const A = styled.a`
	color: ${props => props.theme.colorUsage.link};
	font-family: ${props => props.theme.font.family.primary};
	transition: color ${AnimSpeed.default} ${AnimEase.in};

	&:focus,
	&:hover {
		color: ${props => props.theme.colorUsage.linkHover};
	}
`;

export const Button = styled.button`
	cursor: pointer;
	font-family: ${props => props.theme.font.family.primary};
	font-size: 1rem;
`;

export const P = styled.p`
	color: ${props => props.theme.colorUsage.text};
	font-family: ${props => props.theme.font.family.primary};
	margin-bottom: 1.5em;
`;

export const UL = styled.ul`
	margin-bottom: 1.5em;
`;

export const OL = styled.ol`
	margin-bottom: 1.5em;
`;

export const LI = styled.li`
	margin-bottom: 1.5em;
`;

export const H1 = styled.h1`
	color: ${props => props.theme.colorUsage.text};
	font-size: 2.375rem;
	font-weight: 800;
	line-height: 1.2;
	margin-bottom: 0.5em;
`;

export const H2 = styled.h2`
	color: ${props => props.theme.colorUsage.text};
	font-size: 1.5rem;
	font-weight: 700;
	line-height: 1.2;
	margin-bottom: 0.5em;
`;

export const H3 = styled.h3`
	color: ${props => props.theme.colorUsage.text};
	font-weight: 700;
	line-height: 1.2;
	margin-bottom: 0.5em;
`;

export const H4 = styled.h4`
	color: ${props => props.theme.colorUsage.text};
	font-weight: 700;
	line-height: 1.2;
	margin-bottom: 0.5em;
`;

export const H5 = styled.h5`
	color: ${props => props.theme.colorUsage.text};
	font-weight: 700;
	line-height: 1.2;
	margin-bottom: 0.5em;
`;

export const H6 = styled.h6`
	color: ${props => props.theme.colorUsage.text};
	font-weight: 700;
	line-height: 1.2;
	margin-bottom: 0.5em;
`;

export const HeaderTitle = styled(H3)`
	background: ${props => props.theme.color.greyDark};
	color: ${props => props.theme.color.white};
	font-size: 1rem;
	margin-bottom: 0;
	padding: 1em;
	width: 100%;
`;
