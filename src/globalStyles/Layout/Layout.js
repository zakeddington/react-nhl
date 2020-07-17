import styled from 'styled-components/macro';
import { Spacing, ContainerSize } from '../../config/Grid';

export const Container = styled.div`
	margin: 0 auto;
	max-width: ${ContainerSize.width.wide};
	padding-left: ${Spacing.horiz};
	padding-right: ${Spacing.horiz};
	position: relative;
	width: 100%;
`;

export const SiteContent = styled(Container)`
	min-height: 50vh;
	padding-bottom: 50px;
	padding-top: 20px;
`
