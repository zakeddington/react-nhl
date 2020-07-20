/**
 * BreakpointChange
 * @description  Create pseudo 'breakpointChange' event
 */

import {
	Breakpoints,
	CurrentBreakpoint,
	isMobileBreakpoint,
	isTabletBreakpoint,
	isDesktopBreakpoint,
	setCurrentBreakpoint,
	setIsMobileBreakpoint,
	setIsTabletBreakpoint,
	setIsDesktopBreakpoint,
} from '../config/Breakpoints';
import EVENTS from '../config/Events';

const BreakpointChange = function() {

	let elIndicator = document.createElement('div');
	elIndicator.setAttribute('id', 'breakpoint-indicator');
	document.body.appendChild(elIndicator);

	let zIndex = getComputedStyle(elIndicator).zIndex;

	let updateConstants = () => {
		setCurrentBreakpoint(Breakpoints[zIndex]);
		setIsMobileBreakpoint(CurrentBreakpoint === 'mobile');
		setIsTabletBreakpoint(CurrentBreakpoint === 'tablet');
		setIsDesktopBreakpoint(CurrentBreakpoint === 'desktop');
	};
	updateConstants();

	window.addEventListener('resize', () => {
		let newZI = getComputedStyle(elIndicator).zIndex;

		if (newZI !== zIndex) {
			zIndex = newZI;
			updateConstants();

			let evt = new Event(EVENTS.BREAKPOINT_CHANGE, {
				breakpoint: Breakpoints[zIndex],
				mobile: isMobileBreakpoint,
				tablet: isTabletBreakpoint,
				desktop: isDesktopBreakpoint
			});
			window.dispatchEvent(evt);
		}
	});
};

export default BreakpointChange;
