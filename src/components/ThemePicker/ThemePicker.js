import React from 'react';
import Icon from '../Shared/Icon/Icon';
import { IconType } from '../../config/ImageIconConfig';
import { ThemeContext } from '../../config/ThemeContext';
import { TeamMap } from '../../config/TeamMap';
import './ThemePicker.scss';

function RenderThemeButtons(contextState) {
	const { selectedThemeId, updateTheme } = contextState;
	const teamButtons = [];

	TeamMap.forEach((team) => {
		const { id, teamName, teamClass } = team;
		const isActive = id === selectedThemeId;
		const activeClass = isActive ? 'is-active' : '';

		teamButtons.push(
			<button
				key={id}
				className={`text-button flex-button theme-picker--item ${activeClass} ${teamClass}`}
				onClick={() => updateTheme(id)}
			>
				<Icon iconId={`${id}`} iconType={IconType.logo} />
				{teamName}
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
