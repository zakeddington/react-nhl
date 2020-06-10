import PropTypes from 'prop-types';

function Tab(props) {
	return (
		props.children
	)
}

Tab.propTypes = {
	children: PropTypes.node,
}

export default Tab;
