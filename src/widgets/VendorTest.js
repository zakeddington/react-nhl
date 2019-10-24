/**
 * VendorTest
 *
 * @description This is to test including vendor files from node_modules that aren't an npm package.
 */

class VendorTest {
	constructor() {
		this.initialize();
	}

	initialize() {
		console.log('VendorTest initialize');

		Draggable.create("#draggable", {
			onClick:function() {
				console.log("clicked");
			},
			onDragEnd:function() {
				console.log("drag ended");
			}
		});
	}
}

export default VendorTest;
