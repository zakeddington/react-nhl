
const Config = {
	assetPath: {
		images: '/assets/images',
		fonts: '/assets/fonts',
	},
	anim: {
		speed: {
			fast: '150ms',
			default: '300ms',
			slow: '500ms',
		},
		ease: {
			default: 'ease-out',
		},
	},
	breakpoint: {
		mobile: {
			max: '767px',
		},
		tablet: {
			min: '768px',
			max: '1023px',
		},
		desktop: {
			min: '1024px',
			wide: '1260px',
		},
	},
	spacing: {
		horiz: '2rem',
		vert: '2rem',
	},
	containerSize: {
		width: {
			mobile: '360px',
			tablet: '750px',
			desktop: '970px',
			wide: '1260px',
		},
	},
	zIndex: {
		default: 1,
		header: 2,
		skipLink: 3,
		drawerOverlay: 4,
		drawer: 5,
		modalOverlay: 6,
		modalWindow: 7,
	}
}

export default Config;
