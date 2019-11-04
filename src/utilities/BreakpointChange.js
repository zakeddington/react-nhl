/**
 * BreakpointChange
 * @description  Create pseudo 'breakpointChange' event
 */

import CONSTANTS from '../config/Constants';
import EVENTS from '../config/Events';

const BreakpointChange = function() {

	let elIndicator = document.createElement('div');
	elIndicator.setAttribute('id', 'breakpoint-indicator');
	document.body.appendChild(elIndicator);

	let zIndex = getComputedStyle(elIndicator).zIndex;

	let updateConstants = () => {
		CONSTANTS.currentBreakpoint = CONSTANTS.breakpoints[zIndex];
		CONSTANTS.isMobileView = CONSTANTS.currentBreakpoint === 'mobile';
		CONSTANTS.isTabletView = CONSTANTS.currentBreakpoint === 'tablet';
		CONSTANTS.isDesktopView = CONSTANTS.currentBreakpoint === 'desktop';
	};
	updateConstants();

	window.addEventListener('resize', () => {
		let newZI = getComputedStyle(elIndicator).zIndex;

		if (newZI !== zIndex) {
			zIndex = newZI;
			updateConstants();

			let evt = new Event(EVENTS.BREAKPOINT_CHANGE, {
				breakpoint: CONSTANTS.breakpoints[zIndex],
				mobile: CONSTANTS.isMobileView,
				tablet: CONSTANTS.isTabletView,
				desktop: CONSTANTS.isDesktopView
			});
			window.dispatchEvent(evt);
		}
	});
};

export default BreakpointChange;
