import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AnimSpeed } from '../../../config/Animation';
import { IconType } from '../../../config/ImageIconConfig';
import Icon from '../Icon/Icon';
import {
	DrawerStyled,
	DrawerTrigger,
	DrawerTriggerLabel,
	DrawerClose,
	DrawerOverlay,
	DrawerContainer,
	DrawerContent,
} from './DrawerStyled';
import { Offscreen } from '../../../globalStyles/Utilities/Utilities';

class Drawer extends Component {

	state = {
		isOpen: false,
		isAnimating: false,
		isActive: false,
	};

	onCloseClick() {
		if (this.state.isOpen && !this.state.isAnimating) {

			this.setState({
				isAnimating: true,
				isActive: false,
			})

			// wait for css transition to complete
			setTimeout(() => {
				this.setState({
					isOpen: false,
					isAnimating: false,
				})
			}, AnimSpeed.slowInt);
		}
	}

	onContentClick(e) {
		e.stopPropagation();
	}

	async onTriggerClick() {
		if (!this.state.isOpen && !this.state.isAnimating) {
			this.setState({
				isOpen: true,
				isAnimating: true,
			}, () => {
				this.animateDrawer()
			})
		}
	}

	animateDrawer() {
		this.setState({
			isActive: true,
		})

		// wait for css transition to complete
		setTimeout(() => {
			this.setState({
				isAnimating: false,
			})
		}, AnimSpeed.slowInt);
	}

	renderDrawer() {
		const { content } = this.props;
		const { isActive, isOpen } = this.state;

		if (isOpen) {
			return (
				<DrawerOverlay onClick={() => this.onCloseClick()}>
					<DrawerContainer $isActive={isActive} onClick={(e) => this.onContentClick(e)}>
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

		return null;
	}

	render() {
		const { iconId, label, iconType = IconType.icon } = this.props;
		const { isOpen } = this.state;

		return (
			<DrawerStyled>
				<DrawerTrigger onClick={() => this.onTriggerClick()} disabled={isOpen}>
					<DrawerTriggerLabel>{label}</DrawerTriggerLabel>
					{
						iconId &&
						<Icon iconType={iconType} iconId={iconId} />
					}
				</DrawerTrigger>
				{this.renderDrawer()}
			</DrawerStyled>
		);
	}
}

Drawer.propTypes = {
	content: PropTypes.element,
	iconId: PropTypes.string,
	iconType: PropTypes.string,
	label: PropTypes.string,
}

export default Drawer;
