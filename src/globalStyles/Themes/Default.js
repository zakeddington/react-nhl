import { rgba } from 'polished';

const Palette = {
	black: '#000',
	blue: '#5cc1ef',
	blueDark: '#2eafea',
	grey: '#666',
	greyDark: '#333',
	greyLight: '#efefef',
	greyMed: '#ddd',
	greyMedDark: '#999',
	white: '#fff',
};

const ColorTokens = {
	primary: Palette.greyDark,
	secondary: Palette.grey,
	tertiary: Palette.greyLight,
	quaternary: Palette.greyMed,
	black: Palette.black,
	white: Palette.white,
};

const UtilityTokens = {
	backgroundPage: ColorTokens.tertiary,
	backgroundContent: Palette.white,

	backgroundPrimary: ColorTokens.primary,
	backgroundPrimaryText: Palette.white,

	backgroundSecondary: ColorTokens.secondary,
	backgroundSecondaryText: ColorTokens.white,

	backgroundTertiary: ColorTokens.tertiary,
	backgroundTertiaryText: ColorTokens.primary,

	backgroundQuaternary: ColorTokens.quaternary,
	backgroundQuaternaryText: Palette.white,

	border: ColorTokens.quaternary,
	borderHover: ColorTokens.primary,

	shadow: rgba(Palette.black, 0.5),
	shadowMinimal: rgba(Palette.black, 0.2),
};

const ComponentTokens = {
	text: ColorTokens.primary,

	link: Palette.blue,
	linkHover: Palette.blueDark,

	buttonBackground: Palette.blue,
	buttonText: Palette.white,
	buttonBackgroundHover: Palette.blueDark,
	buttonTextHover: Palette.white,

	textButtonBackground: 'transparent',
	textButtonText: ColorTokens.primary,
	textButtonBackgroundHover: 'transparent',
	textButtonTextHover: ColorTokens.primary,

	drawerBackground: ColorTokens.tertiary,
	drawerCloseBackground: ColorTokens.tertiary,
	drawerCloseText: ColorTokens.primary,
	drawerCloseTextHover: ColorTokens.secondary,

	overlay: rgba(Palette.black, 0.8),

	modalBackground: Palette.white,
	modalCloseText: Palette.white,
	modalCloseTextHover: rgba(Palette.white, 0.5),

	tableBackground: Palette.white,
	tableCellBackground: Palette.white,
	tableCellBackgroundHover: ColorTokens.tertiary,
	tableHeaderBackground: ColorTokens.quaternary,

	tabButtonBackground: UtilityTokens.backgroundPrimary,
	tabButtonText: UtilityTokens.backgroundPrimaryText,
	tabButtonBackgroundHover: rgba(UtilityTokens.backgroundPrimaryText, 0.5),
	tabButtonTextHover: UtilityTokens.backgroundPrimaryText,
	tabButtonBackgroundActive: UtilityTokens.backgroundSecondary,
	tabButtonTextActive: UtilityTokens.backgroundSecondaryText,

	tooltipBackground: rgba(Palette.black, 0.8),
	tooltipText: Palette.white,

	videoPlayerBackground: Palette.black,
	videoPlayerButtonBackground: rgba(Palette.black, 0.5),
	videoPlayerButtonIcon: Palette.white,
	videoPlayerTitleBackground: rgba(Palette.black, 0.5),
	videoPlayerTitle: Palette.white,

	videoCarouselBorder: rgba(Palette.black, 0.1),
	videoCarouselBorderActive: Palette.white,
	videoCarouselThumbBackground: ColorTokens.tertiary,
	videoCarouselThumbBackgroundActive: ColorTokens.quaternary,
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
