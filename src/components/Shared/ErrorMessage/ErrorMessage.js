import React from 'react';
import PropTypes from 'prop-types';
import { StyledErrorMessage } from './ErrorMessageStyle';

function ErrorMessage(props) {
	const { errorMsg, modifiers } = props;
	const msg = errorMsg ? errorMsg : 'No content available.';

	return (
		<StyledErrorMessage modifiers={modifiers}>{msg}</StyledErrorMessage>
	);
}

ErrorMessage.propTypes = {
	errorMsg: PropTypes.string,
	modifiers: PropTypes.arrayOf(PropTypes.string),
}

export default ErrorMessage;
