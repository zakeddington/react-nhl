import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components/macro';
import Default from './globalStyles/Themes/Default/DefaultTheme';
import GlobalStyles from './globalStyles';
import App from './App';
// import * as serviceWorker from './serviceWorker';

ReactDOM.render(
	<BrowserRouter>
		<ThemeProvider theme={Default}>
			<GlobalStyles />
			<App/>
		</ThemeProvider>
	</BrowserRouter>,
	document.getElementById('app')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
