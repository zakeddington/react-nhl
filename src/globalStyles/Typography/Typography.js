import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import { AnimSpeed, AnimEase } from '../../config/Animation';

export const Anchor = styled(Link)`
	color: ${props => props.theme.color.link};
	font-family: ${props => props.theme.font.family.primary};
	text-decoration: none;
	transition: color ${AnimSpeed.default} ${AnimEase.in};

	&:focus,
	&:hover {
		color: ${props => props.theme.color.linkHover};
		text-decoration: underline;
	}
`;

export const P = styled.p`
	color: ${props => props.theme.color.text};
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
	color: ${props => props.theme.color.text};
	font-size: 2.375rem;
	font-weight: 800;
	line-height: 1.2;
	margin-bottom: 0.5em;
`;

export const H2 = styled.h2`
	color: ${props => props.theme.color.text};
	font-size: 1.5rem;
	font-weight: 700;
	line-height: 1.2;
	margin-bottom: 0.5em;
`;

export const H3 = styled.h3`
	color: ${props => props.theme.color.text};
	font-weight: 700;
	line-height: 1.2;
	margin-bottom: 0.5em;
`;

export const H4 = styled.h4`
	color: ${props => props.theme.color.text};
	font-weight: 700;
	line-height: 1.2;
	margin-bottom: 0.5em;
`;

export const H5 = styled.h5`
	color: ${props => props.theme.color.text};
	font-weight: 700;
	line-height: 1.2;
	margin-bottom: 0.5em;
`;

export const H6 = styled.h6`
	color: ${props => props.theme.color.text};
	font-weight: 700;
	line-height: 1.2;
	margin-bottom: 0.5em;
`;

export const HeaderTitle = styled(H3)`
	background: ${props => props.theme.color.backgroundPrimary};
	color: ${props => props.theme.color.backgroundPrimaryText};
	font-size: 1rem;
	margin-bottom: 0;
	padding: 1em;
	width: 100%;
`;
