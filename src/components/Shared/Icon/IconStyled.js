import styled from 'styled-components/macro';
import { AnimSpeed, AnimEase } from '../../../config/Animation';

export const SvgIcon = styled.svg`
	display: inline-block;
	fill: ${props => props.theme.color.text};
	height: 1rem;
	line-height: 1rem;
	transition: all ${AnimSpeed.default} ${AnimEase.default};
	vertical-align: middle;
	width: 1rem;
`;

export const SvgLogo = styled(SvgIcon)`
	display: block;
	height: 50px;
	width: 50px;
`;
