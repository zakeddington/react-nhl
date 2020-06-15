import React from 'react';
import PropTypes from 'prop-types';
import './ErrorMessage.scss';

function ErrorMessage(props) {
	const msg = props.errorMsg ? props.errorMsg : 'No content available.';

	return (
		<h2 className={`error-msg ${props.errorClass}`}>{msg}</h2>
	);
}

ErrorMessage.propTypes = {
	errorMsg: PropTypes.string,
	errorClass: PropTypes.string,
}

export default ErrorMessage;
