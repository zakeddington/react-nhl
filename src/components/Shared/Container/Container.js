import styled from 'styled-components/macro';
import Config from '../../../globalStyles/Config';

const Container = styled.div`
	margin: 0 auto;
	max-width: ${Config.containerSize.width.wide};
	padding-left: ${Config.spacing.horiz};
	padding-right: ${Config.spacing.horiz};
	position: relative;
	width: 100%;
`;

export default Container;
