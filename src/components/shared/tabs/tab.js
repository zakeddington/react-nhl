import {Component} from 'react';

class Tab extends Component {
	render() {
		if (this.props.children) {
			return (
				this.props.children
			)
		}
		return null;
	}
}

export default Tab;
