import React, { Component } from 'react';
import CONSTANTS from '../../../config/Constants';
import Icon from '../../shared/icon/icon';
import './drawer.scss';

class Drawer extends Component {

	constructor(props) {
		super(props);
		this.drawerContainer = React.createRef();
		this.activeClass = 'is-active';
	}

	state = {
		drawer: null,
		activeClass: '',
	};

	async onTriggerClick() {
		this.renderDrawer();
	}

	onCloseClick() {
		this.drawerContainer.current.classList.remove(this.activeClass);
		setTimeout(() => {
			this.setState({
				drawer: null,
			})
		}, CONSTANTS.anim.speed.fast);

	}

	onContentClick(e) {
		e.stopPropagation();
	}

	animateDrawer() {
		setTimeout(() => {
			this.drawerContainer.current.classList.add(this.activeClass);
		}, CONSTANTS.anim.speed.fast);
	}

	renderDrawer() {
		const { content } = this.props;
		const drawerClass = this.props.drawerClass ? this.props.drawerClass : '';

		const drawer =
			<div className="drawer--overlay" onClick={() => this.onCloseClick()}>
				<div className={`drawer--container ${drawerClass}`} onClick={(e) => this.onContentClick(e)} ref={this.drawerContainer}>
					<button className="drawer--close" onClick={() => this.onCloseClick()}>
						<Icon iconId="close"/>
						<span className="offscreen">close drawer</span>
					</button>
					{content}
				</div>
			</div>;

		this.setState({
			drawer: drawer,
			// activeClass: 'is-active',
		}, () => {
			this.animateDrawer()
		})
	}

	render() {
		return (
			<div className="drawer">
				<button className="drawer--trigger" onClick={() => this.onTriggerClick()}>
					{this.props.label}
				</button>
				{this.state.drawer}
			</div>
		);
	}
}

export default Drawer;
