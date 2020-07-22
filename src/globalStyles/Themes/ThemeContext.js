import React from 'react';
import DefaultTheme from './Default/DefaultTheme';

export default React.createContext({
	theme: DefaultTheme,
	themeId: 0,
	themes: {},
	updateTheme: () => {},
});
