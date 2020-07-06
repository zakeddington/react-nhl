import styled from 'styled-components/macro';
import { Spacing, ContainerSize } from '../../../config/Grid';

const Container = styled.div`
	margin: 0 auto;
	max-width: ${ContainerSize.width.wide};
	padding-left: ${Spacing.horiz};
	padding-right: ${Spacing.horiz};
	position: relative;
	width: 100%;
`;

export default Container;
