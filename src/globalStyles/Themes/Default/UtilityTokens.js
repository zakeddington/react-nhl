import { rgba } from 'polished';

export default (ColorTokens) => {
	return {
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
	}
};
