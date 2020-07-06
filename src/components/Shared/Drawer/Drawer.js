import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CONSTANTS from '../../../config/Constants';
import Icon from '../Icon/Icon';
// import './Drawer.scss';
import { StyledDrawer, DrawerTrigger, DrawerClose, DrawerOverlay, DrawerContainer, DrawerContent } from './DrawerStyle';
import { Offscreen } from '../../../globalStyles/utilities/Utilities';

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
			<DrawerOverlay onClick={() => this.onCloseClick()}>
				<DrawerContainer className={containerClass} onClick={(e) => this.onContentClick(e)} ref={this.drawerContainer}>
					<DrawerClose onClick={() => this.onCloseClick()}>
						<Icon iconId="close" />
						<Offscreen>close drawer</Offscreen>
					</DrawerClose>
					<DrawerContent>
						{content}
					</DrawerContent>
				</DrawerContainer>
			</DrawerOverlay>
		)
	}

	render() {
		const { iconId, label } = this.props;
		const { isDisabled } = this.state;
		return (
			<StyledDrawer>
				<DrawerTrigger onClick={() => this.onTriggerClick()} disabled={isDisabled}>
					{label}
					{
						iconId &&
						<Icon iconId={iconId} />
					}
				</DrawerTrigger>
				{this.state.drawer}
			</StyledDrawer>
		);
	}
}

Drawer.propTypes = {
	content: PropTypes.element,
	iconId: PropTypes.string,
	label: PropTypes.string,
}

export default Drawer;
