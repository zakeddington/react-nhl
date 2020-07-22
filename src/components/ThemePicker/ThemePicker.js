import React from 'react';
import Icon from '../Shared/Icon/Icon';
import { IconType } from '../../config/ImageIconConfig';
import TeamBrands from '../../globalStyles/Themes/TeamBrands/TeamBrands';
import {
	ThemePickerStyled,
	ThemePickerTitle,
	ThemePickerItem,
} from './ThemePickerStyled';

function ThemePicker(props) {
	const { onClickCallback, themeId } = props;
	const teamButtons = [];

	TeamBrands.forEach((team) => {
		const id = team.id;
		const isActive = id === themeId;
		teamButtons.push(
			<ThemePickerItem $isActive={isActive} key={id} to="" onClick={() => onClickCallback(id)}>
				<Icon iconId={`${id}`} iconType={IconType.logo} />
				{team.teamName}
			</ThemePickerItem>
		)
	})

	return (
		<ThemePickerStyled>
			<ThemePickerTitle>Select a theme</ThemePickerTitle>
			{teamButtons}
		</ThemePickerStyled>
	);
}

export default ThemePicker;
