import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CONSTANTS from '../../../config/Constants';
import Icon from '../Icon/Icon';
import './Drawer.scss';

class Drawer extends Component {

	constructor(props) {
		super(props);
		this.drawerContainer = React.createRef();
		this.activeClass = 'is-active';
	}

	state = {
		drawer: null,
		isDisabled: false,
		isOpen: false,
		isAnimating: false,
	};

	onCloseClick() {
		if (this.state.isOpen && !this.state.isAnimating) {
			this.drawerContainer.current.classList.remove(this.activeClass);

			// wait for css transition to complete ($anim-speed-slow)
			setTimeout(() => {
				this.setState({
					drawer: null,
					isDisabled: false,
					isOpen: false,
				})
			}, CONSTANTS.anim.speed.slow);
		}
	}

	onContentClick(e) {
		e.stopPropagation();
	}

	async onTriggerClick() {
		if (!this.state.isOpen && !this.state.isAnimating) {
			this.setState({
				isDisabled: true,
				isAnimating: true,
				drawer: this.renderDrawer()
			}, () => {
				this.animateDrawer()
			})
		}
	}

	animateDrawer() {
		this.drawerContainer.current.classList.add(this.activeClass);

		// wait for css transition to complete ($anim-speed-slow)
		setTimeout(() => {
			this.setState({
				isOpen: true,
				isAnimating: false,
			})
		}, CONSTANTS.anim.speed.slow);
	}

	renderDrawer() {
		const { content, drawerClass } = this.props;
		const containerClass = drawerClass ? drawerClass : '';

		return (
			<div className="drawer--overlay" onClick={() => this.onCloseClick()}>
				<div className={`drawer--container ${containerClass}`} onClick={(e) => this.onContentClick(e)} ref={this.drawerContainer}>
					<button className="drawer--close" onClick={() => this.onCloseClick()}>
						<Icon iconId="close" iconClass="drawer--close-icon" />
						<span className="offscreen">close drawer</span>
					</button>
					<div className="drawer--content">
						{content}
					</div>
				</div>
			</div>
		)
	}

	render() {
		const { iconId, label } = this.props;
		const { isDisabled } = this.state;
		return (
			<div className="drawer">
				<button className="drawer--trigger button button--icon-right" onClick={() => this.onTriggerClick()} disabled={isDisabled}>
					{label}
					{
						iconId &&
						<Icon iconId={iconId} />
					}
				</button>
				{this.state.drawer}
			</div>
		);
	}
}

Drawer.propTypes = {
	content: PropTypes.element,
	iconId: PropTypes.string,
	label: PropTypes.string,
}

export default Drawer;
