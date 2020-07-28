import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon/Icon';
import './Modal.scss';

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
			<div className="modal--overlay" onClick={() => this.onCloseClick()}>
				<div className={`modal--container ${modalClass}`} onClick={(e) => this.onContentClick(e)}>
					<button className="modal--close text-button" onClick={() => this.onCloseClick()}>
						<Icon iconId="close"/>
						<span className="offscreen">close modal</span>
					</button>
					<div className="modal--content">
						{content}
					</div>
				</div>
			</div>;

		this.setState({
			modal: modal,
		})
	}

	render() {
		return (
			<div className="modal">
				<button className="modal--trigger text-button" onClick={() => this.onTriggerClick()}>
					{this.props.children}
				</button>
				{this.state.modal}
			</div>
		);
	}
}

Modal.propTypes = {
	children: PropTypes.node,
	content: PropTypes.element,
	modalClass: PropTypes.string,
}

export default Modal;
