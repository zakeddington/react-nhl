
export let CurrentBreakpoint = null;
export let isMobileBreakpoint = false;
export let isTabletBreakpoint = false;
export let isDesktopBreakpoint = false;

export function setCurrentBreakpoint(value) {
	CurrentBreakpoint = value;
}

export function setIsMobileBreakpoint(value) {
	isMobileBreakpoint = value;
}

export function setIsTabletBreakpoint(value) {
	isTabletBreakpoint = value;
}

export function setIsDesktopBreakpoint(value) {
	isDesktopBreakpoint = value;
}

export const Breakpoints = {
	1: 'mobile',
	2: 'tablet',
	3: 'desktop',
};

export const MobileBreakpoint = {
	max: '767px',
};

export const TabletBreakpoint = {
	min: '768px',
	max: '1023px',
};

export const DesktopBreakpoint = {
	min: '1024px',
	wide: '1260px',
};
