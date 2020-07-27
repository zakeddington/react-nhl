import { createContext } from 'react';
import PropTypes from 'prop-types';
import { DefaultTeam } from '../../config/ThemeConfig';

export const InitialContext = {
	selectedThemeId: DefaultTeam.id,
	selectedThemeName: DefaultTeam.teamName,
	selectedThemeClass: `team-${DefaultTeam.id}`,
	updateTheme: () => {},
}
export const ThemeContext = createContext(InitialContext);

ThemeContext.Provider.propTypes = {
	value: PropTypes.shape({
		selectedThemeId: PropTypes.number,
		selectedThemeName: PropTypes.string,
		selectedThemeClass: PropTypes.string,
		updateTheme: PropTypes.func,
	}),
};
