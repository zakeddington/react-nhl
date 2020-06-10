import React from 'react';
import PropTypes from 'prop-types';
import './ErrorMessage.scss';

function ErrorMessage(props) {
	const msg = props.errorMsg ? props.errorMsg : 'No content available.';

	return (
		<h2 className="error-msg">{msg}</h2>
	);
}

ErrorMessage.propTypes = {
	errorMsg: PropTypes.string,
}

export default ErrorMessage;
