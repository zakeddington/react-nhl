import styled from 'styled-components/macro';
import { Spacing } from '../../../config/Grid';

export const StyledGameIntro = styled.div`
	background: ${props => props.theme.color.white};
	padding: ${Spacing.vert} ${Spacing.horiz};
`;
