import React from 'react';
import './error-message.scss';

function ErrorMessage(props) {
	const msg = props.errorMsg ? props.errorMsg : 'No content available.';

	return (
		<h2 className="error-msg">{msg}</h2>
	);
}

export default ErrorMessage;
