import styled from 'styled-components/macro';
import { applyStyleModifiers } from 'styled-components-modifiers';
import { H2 } from '../../../globalStyles/Typography/Typography';
import Modifiers from '../../../globalStyles/Utilities/Modifiers';

export const StyledErrorMessage = styled(H2)`
	margin: 0;
	padding: 2rem;

	& + & {
		padding-top: 0;
	}

	${applyStyleModifiers(Modifiers)};
`;
