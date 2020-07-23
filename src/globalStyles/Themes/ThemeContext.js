import { createContext } from 'react';
import PropTypes from 'prop-types';
import DefaultTheme from './Default/DefaultTheme';

export const InitialContext = {
	selectedTheme: DefaultTheme,
	selectedThemeId: 0,
	themes: {},
	updateTheme: () => {},
}
export const ThemeContext = createContext(InitialContext);

ThemeContext.Provider.propTypes = {
	value: PropTypes.shape({
		selectedTheme: PropTypes.object,
		selectedThemeId: PropTypes.number,
		themes: PropTypes.objectOf(PropTypes.object),
		updateTheme: PropTypes.func,
	}),
};
