/**
 * ResizeEndEvent
 * @description  Broadcasts a pseudo 'resizeEnd' event
 */

import Events from 'scripts/config/Events';

const ResizeEndEvent = function() {
	let resizeTimer;
	let delay = 100;

	$(window).on('resize', function(event) {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function() {
			$.event.trigger(Events.WINDOW_RESIZE_END);
		}, delay);
	});
};

export default ResizeEndEvent;
