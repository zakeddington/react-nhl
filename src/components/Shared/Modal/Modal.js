import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon/Icon';
import { Offscreen } from '../../../globalStyles/Utilities/Utilities';
import {
	ModalStyled,
	ModalTrigger,
	ModalOverlay,
	ModalContainer,
	ModalContent,
	ModalClose,
} from './ModalStyled';

class Modal extends Component {

	state = {
		modal: null,
	};

	async onTriggerClick() {
		this.renderModal();
	}

	onCloseClick() {
		this.setState({
			modal: null,
		})
	}

	onContentClick(e) {
		e.stopPropagation();
	}

	renderModal() {
		const { content, modalClass } = this.props;

		const modal =
			<ModalOverlay onClick={() => this.onCloseClick()}>
				<ModalContainer className={modalClass} onClick={(e) => this.onContentClick(e)}>
					<ModalClose onClick={() => this.onCloseClick()}>
						<Icon iconId="close" />
						<Offscreen>close modal</Offscreen>
					</ModalClose>
					<ModalContent>
						{content}
					</ModalContent>
				</ModalContainer>
			</ModalOverlay>;

		this.setState({
			modal: modal,
		})
	}

	render() {
		return (
			<ModalStyled>
				<ModalTrigger onClick={() => this.onTriggerClick()}>
					{this.props.children}
				</ModalTrigger>
				{this.state.modal}
			</ModalStyled>
		);
	}
}

Modal.propTypes = {
	children: PropTypes.node,
	content: PropTypes.element,
	modalClass: PropTypes.string,
}

export default Modal;
