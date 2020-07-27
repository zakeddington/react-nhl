import React from 'react';
import Icon from '../Shared/Icon/Icon';
import { IconType } from '../../config/ImageIconConfig';
import { ThemeConfig } from '../../config/ThemeConfig';
import { ThemeContext } from './ThemeContext';
import './ThemePicker.scss';

function RenderThemeButtons(contextState) {
	const { selectedThemeId, updateTheme } = contextState;
	const teamButtons = [];

	ThemeConfig.forEach((team) => {
		const id = team.id;
		const isActive = id === selectedThemeId;
		const activeClass = isActive ? 'is-active' : '';
		const themeClass = `team-${id}`;

		teamButtons.push(
			<button
				key={id}
				className={`button button-text-button button-with-icon theme-picker--item ${activeClass} ${themeClass}`}
				onClick={() => updateTheme(id)}
			>
				<Icon iconId={`${id}`} iconType={IconType.logo} />
				{team.teamName}
			</button>
		)
	})

	return teamButtons;
}

function ThemePicker() {
	return (
		<ThemeContext.Consumer>
			{
				(contextState) => (
					<>
						<h2>Select a theme</h2>
						{RenderThemeButtons(contextState)}
					</>
				)
			}
		</ThemeContext.Consumer>
	);
}

export default ThemePicker;
