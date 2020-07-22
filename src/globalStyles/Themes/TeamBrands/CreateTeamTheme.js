import Palette from '../Default/Palette';
import UtilityTokens from '../Default/UtilityTokens';
import ComponentTokens from '../Default/ComponentTokens';
import TeamBrands from './TeamBrands';
import DefaultTheme from '../Default/DefaultTheme';

function CreateTeamTheme(teamId) {
	console.log('CreateTeamTheme', teamId);
	if (!teamId) {
		return DefaultTheme;
	}

	let teamStyles = {};

	TeamBrands.forEach((team) => {
		if (team.id === teamId) {
			teamStyles = team;
		}
	})

	const colorTokens = {
		primary: teamStyles.primary,
		secondary: teamStyles.secondary,
		tertiary: Palette.grey100,
		quaternary: Palette.grey300,
		interactive1: teamStyles.primary,
		interactive2: teamStyles.secondary,
		content: Palette.grey700,
		body: Palette.grey100,
		black: Palette.black,
		white: Palette.white,
	};

	const utilityTokens = UtilityTokens(colorTokens);
	const componentTokens = ComponentTokens(colorTokens, utilityTokens);

	return {
		color: {
			palette: {...Palette},
			...colorTokens,
			...utilityTokens,
			...componentTokens,
		},
		font: {
			family: {
				primary: `'Montserrat', Helvetica, Arial, sans-serif`,
			},
		},
	}
};

export default CreateTeamTheme;
