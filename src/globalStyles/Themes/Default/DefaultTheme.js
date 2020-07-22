import Palette from './Palette';
import ColorTokens from './ColorTokens';
import UtilityTokens from './UtilityTokens';
import ComponentTokens from './ComponentTokens';

const colorTokens = ColorTokens(Palette);
const utilityTokens = UtilityTokens(colorTokens);
const componentTokens = ComponentTokens(colorTokens, utilityTokens);

export default {
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
};
