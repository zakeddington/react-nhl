import React from 'react';
import PropTypes from 'prop-types';
import { ErrorMessageStyled } from './ErrorMessageStyled';

function ErrorMessage(props) {
	const { errorMsg, modifiers } = props;
	const msg = errorMsg ? errorMsg : 'No content available.';

	return (
		<ErrorMessageStyled modifiers={modifiers}>{msg}</ErrorMessageStyled>
	);
}

ErrorMessage.propTypes = {
	errorMsg: PropTypes.string,
	modifiers: PropTypes.arrayOf(PropTypes.string),
}

export default ErrorMessage;
