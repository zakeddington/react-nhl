import styled, { css } from 'styled-components/macro';
import { H2 } from '../../globalStyles/Typography/Typography';
import { TextButtonWithIcon } from '../../globalStyles/Button/Button';
import { SvgLogo } from '../Shared/Icon/IconStyled';

export const ThemePickerStyled = styled.div`

`;

export const ThemePickerTitle = styled(H2)`

`;

export const ThemePickerDefaultLogo = styled.img`
	display: inline-block;
	height: 2em;
	margin: 0 1em 0 0;
	width: 2em;
`;

export const ThemePickerItem = styled(TextButtonWithIcon)`
	font-size: 0.875rem;
	padding: 0.25em;
	text-align: left;
	width: 100%;

	${SvgLogo} {
		height: 2em;
		margin-right: 1em;
		width: 2em;
	}

	${props => props.$isActive && css`
		background: ${props => props.theme.color.themePickerActiveBackground};

		&:hover,
		&:focus {
			background: ${props => props.theme.color.themePickerActiveBackground};
		}
	`}
`;
