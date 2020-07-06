import styled from 'styled-components/macro';
import Config from '../../../globalStyles/Config';

export const SvgIcon = styled.svg`
	display: inline-block;
	fill: ${props => props.theme.color.greyDark};
	height: 1rem;
	line-height: 1rem;
	transition: all ${Config.anim.speed.default} ${Config.anim.ease.default};
	vertical-align: middle;
	width: 1rem;
`;

export const SvgLogo = styled(SvgIcon)`
	display: block;
	height: 50px;
	width: 50px;
`;
