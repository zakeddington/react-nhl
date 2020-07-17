import styled from 'styled-components/macro';
import { Spacing } from '../../../config/Grid';

export const GameIntroStyled = styled.div`
	background: ${props => props.theme.color.backgroundContent};
	padding: ${Spacing.vert} ${Spacing.horiz};
`;
