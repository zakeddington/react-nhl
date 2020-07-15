import { css } from 'styled-components/macro';

export const ALIGN_CENTER = 'alignCenter';
export const ALIGN_LEFT = 'alignLeft';

export default {
	alignCenter: () => css`
		text-align: center;
	`,
	alignLeft: () => css`
		text-align: left;
	`,
};
