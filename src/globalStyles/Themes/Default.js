import { rgba, darken, lighten } from 'polished';

const Palette = {
	white: '#fff',
	grey100: '#efefef',
	grey300: '#ddd',
	grey500: '#666',
	grey700: '#333',
	grey900: '#222',
	black: '#000',
	blue: '#5cc1ef',
};

const ColorTokens = {
	primary: Palette.grey700,
	secondary: Palette.grey500,
	tertiary: Palette.grey100,
	quaternary: Palette.grey300,
	// primary: '#0076B6',
	// secondary: '#B0B7BC',
	// tertiary: Palette.grey100,
	// quaternary: Palette.grey300,
	accent: Palette.blue,
	content: Palette.grey700,
	body: Palette.grey100,
	black: Palette.black,
	white: Palette.white,
};

const UtilityTokens = {
	backgroundPage: ColorTokens.body,
	backgroundContent: ColorTokens.white,

	backgroundPrimary: ColorTokens.primary,
	backgroundPrimaryText: ColorTokens.white,

	backgroundSecondary: ColorTokens.secondary,
	backgroundSecondaryText: ColorTokens.white,

	backgroundTertiary: ColorTokens.tertiary,
	backgroundTertiaryText: ColorTokens.content,

	backgroundQuaternary: ColorTokens.quaternary,
	backgroundQuaternaryText: ColorTokens.white,

	border: ColorTokens.quaternary,
	borderHover: ColorTokens.primary,

	shadow: rgba(ColorTokens.black, 0.5),
	shadowLight: rgba(ColorTokens.black, 0.2),
};

const ComponentTokens = {
	text: ColorTokens.content,
	textLight: lighten(0.2, ColorTokens.content),

	link: ColorTokens.accent,
	linkHover: darken(0.2, ColorTokens.accent),

	buttonBackground: ColorTokens.accent,
	buttonText: ColorTokens.white,
	buttonBackgroundHover: darken(0.2, ColorTokens.accent),
	buttonTextHover: ColorTokens.white,

	textButtonBackground: 'transparent',
	textButtonText: ColorTokens.content,
	textButtonBackgroundHover: 'transparent',
	textButtonTextHover: ColorTokens.content,

	drawerBackground: ColorTokens.tertiary,
	drawerCloseBackground: ColorTokens.tertiary,
	drawerCloseText: ColorTokens.content,
	drawerCloseTextHover: ColorTokens.secondary,

	overlay: rgba(ColorTokens.black, 0.8),

	modalBackground: ColorTokens.white,
	modalCloseText: ColorTokens.white,
	modalCloseTextHover: ColorTokens.accent,

	tableBackground: ColorTokens.white,
	tableCellBackground: ColorTokens.white,
	tableCellBackgroundHover: ColorTokens.tertiary,
	tableHeaderBackground: ColorTokens.quaternary,

	tabButtonBackground: UtilityTokens.backgroundPrimary,
	tabButtonText: UtilityTokens.backgroundPrimaryText,
	tabButtonBackgroundHover: rgba(UtilityTokens.backgroundPrimaryText, 0.5),
	tabButtonTextHover: UtilityTokens.backgroundPrimaryText,
	tabButtonBackgroundActive: UtilityTokens.backgroundSecondary,
	tabButtonTextActive: UtilityTokens.backgroundSecondaryText,

	tooltipBackground: rgba(ColorTokens.black, 0.8),
	tooltipText: ColorTokens.white,

	videoPlayerBackground: ColorTokens.black,
	videoPlayerButtonBackground: rgba(ColorTokens.black, 0.5),
	videoPlayerButtonIcon: ColorTokens.white,
	videoPlayerTitleBackground: rgba(ColorTokens.black, 0.5),
	videoPlayerTitle: ColorTokens.white,

	videoCarouselBorder: darken(0.1, ColorTokens.quaternary),
	videoCarouselBorderActive: ColorTokens.white,
	videoCarouselThumbBackground: UtilityTokens.backgroundTertiary,
	videoCarouselThumbBackgroundActive: UtilityTokens.backgroundSecondary,
	videoCarouselThumbText: UtilityTokens.backgroundTertiaryText,
	videoCarouselThumbTextActive: UtilityTokens.backgroundSecondaryText,
};

export default {
	color: {
		palette: {...Palette},
		...ColorTokens,
		...UtilityTokens,
		...ComponentTokens,
	},
	font: {
		family: {
			primary: `'Montserrat', Helvetica, Arial, sans-serif`,
		},
	},
};
