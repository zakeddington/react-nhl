/**
 * BreakpointChange
 * @description  Create pseudo 'breakpointChange' event
 */

import Constants from 'scripts/config/Constants';
import Events from 'scripts/config/Events';

const BreakpointChange = function() {

	let $elIndicator = $('<div></div>',{
		'id': 'breakpoint-indicator'
	}).appendTo($('body'));

	let zIndex = $elIndicator.css('z-index');

	let updateConstants = function() {
		Constants.currentBreakpoint = Constants.breakpoints[zIndex];
		Constants.isMobileView = Constants.currentBreakpoint === 'mobile' ? true : false;
		Constants.isTabletView = Constants.currentBreakpoint === 'tablet' ? true : false;
		Constants.isDesktopView = Constants.currentBreakpoint === 'desktop' ? true : false;
	};
	updateConstants();

	$(window).on('resize', function(event) {
		let newZI = $elIndicator.css('z-index');
		if (newZI !== zIndex) {
			zIndex = newZI;
			updateConstants();

			$.event.trigger(Events.BREAKPOINT_CHANGE, {
				breakpoint: Constants.breakpoints[zIndex],
				mobile: Constants.isMobileView,
				tablet: Constants.isTabletView,
				desktop: Constants.isDesktopView
			});
		}
	});
};

export default BreakpointChange;
