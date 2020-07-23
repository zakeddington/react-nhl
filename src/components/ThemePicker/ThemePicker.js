import React from 'react';
import { ThemeProvider } from 'styled-components/macro';
import Icon from '../Shared/Icon/Icon';
import { IconType } from '../../config/ImageIconConfig';
import TeamBrands from '../../globalStyles/Themes/TeamBrands/TeamBrands';
import { ThemeContext } from '../../globalStyles/Themes/ThemeContext';
import {
	ThemePickerStyled,
	ThemePickerTitle,
	ThemePickerItem,
} from './ThemePickerStyled';

function RenderThemeButtons(contextState) {
	const { selectedThemeId, themes, updateTheme } = contextState;
	const teamButtons = [];

	TeamBrands.forEach((team) => {
		const id = team.id;
		const isActive = id === selectedThemeId;
		const teamTheme = themes[id];

		teamButtons.push(
			<ThemeProvider key={id} theme={teamTheme}>
				<ThemePickerItem $isActive={isActive} to="" onClick={() => updateTheme(id)}>
					<Icon iconId={`${id}`} iconType={IconType.logo} />
					{team.teamName}
				</ThemePickerItem>
			</ThemeProvider>
		)
	})

	return teamButtons;
}

function ThemePicker() {
	return (
		<ThemeContext.Consumer>
			{
				(contextState) => (
					<ThemePickerStyled>
						<ThemePickerTitle>Select a theme</ThemePickerTitle>
						{RenderThemeButtons(contextState)}
					</ThemePickerStyled>
				)
			}
		</ThemeContext.Consumer>
	);
}

export default ThemePicker;
