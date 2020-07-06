import { createGlobalStyle } from 'styled-components/macro';
import { Spacing } from '../../config/Grid';

const Classes = createGlobalStyle`
	.pull-left {
		float: left;
	}

	.pull-right {
		float: right;
	}

	.nowrap {
		white-space: nowrap;
	}

	.clear {
		clear: both;
	}

	.accelerate {
		backface-visibility: hidden;
		perspective: 1000px;
		transform: translate3d(0, 0, 0);
	}

	.center-block {
		display: block;
		margin-left: auto;
		margin-right: auto;
	}

	.clearfix {
		&::after {
			clear: both;
			content: '';
			display: table;
		}
	}

	.offscreen {
		height: 1px;
		margin: -1px;
		overflow: hidden;
		position: fixed;
		width: 1px;
	}

	.show {
		display: block;
		visibility: visible;
	}

	.hide {
		display: none !important;
		visibility: hidden !important;
	}

	.text-hide {
		overflow: hidden;
		text-indent: 200%;
		white-space: nowrap;
	}

	.text-left {
		text-align: left;
	}

	.text-right {
		text-align: right;
	}

	.text-center {
		text-align: center;
	}

	.bg-white {
		background-color: #fff;
	}

	.content-padding {
		padding: ${Spacing.vert} ${Spacing.horiz};
	}

`;

export default Classes;
