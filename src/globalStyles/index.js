import { createGlobalStyle } from 'styled-components/macro';
import Reset from './Utilities/Reset';
import Base from './Utilities/Base';
import Classes from './Utilities/Classes';

const GlobalStyles = createGlobalStyle`
	${Reset}
	${Base}
	${Classes}
`;

export default GlobalStyles;
