import { darken, lighten, rgba } from 'polished';

export default (ColorTokens, UtilityTokens) => {
	return {
		text: ColorTokens.content,
		textLight: lighten(0.2, ColorTokens.content),

		link: ColorTokens.interactive1,
		linkHover: darken(0.2, ColorTokens.interactive1),

		buttonBackground: ColorTokens.interactive2,
		buttonText: ColorTokens.white,
		buttonBackgroundHover: darken(0.2, ColorTokens.interactive2),
		buttonTextHover: ColorTokens.white,

		textButtonBackground: 'transparent',
		textButtonText: ColorTokens.interactive1,
		textButtonBackgroundHover: 'transparent',
		textButtonTextHover: ColorTokens.interactive1,

		drawerBackground: ColorTokens.tertiary,
		drawerCloseBackground: ColorTokens.tertiary,
		drawerCloseText: ColorTokens.interactive1,
		drawerCloseTextHover: ColorTokens.secondary,

		overlay: rgba(ColorTokens.black, 0.8),

		modalBackground: ColorTokens.white,
		modalCloseText: ColorTokens.white,
		modalCloseTextHover: ColorTokens.interactive1,

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

		themePickerActiveBackground: ColorTokens.white,

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
	}
};
