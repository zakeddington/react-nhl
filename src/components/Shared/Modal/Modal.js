import React, { Component } from 'react';
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
		const { content } = this.props;
		const modalClass = this.props.modalClass ? this.props.modalClass : '';

		const modal =
			<div className="modal--overlay" onClick={() => this.onCloseClick()}>
				<div className={`modal--container ${modalClass}`} onClick={(e) => this.onContentClick(e)}>
					<button className="modal--close" onClick={() => this.onCloseClick()}>
						<Icon iconId="close"/>
						<span className="offscreen">close modal</span>
					</button>
					{content}
				</div>
			</div>;

		this.setState({
			modal: modal,
		})
	}

	render() {
		return (
			<div className="modal">
				<button className="modal--trigger" onClick={() => this.onTriggerClick()}>
					{this.props.children}
				</button>
				{this.state.modal}
			</div>
		);
	}
}

export default Modal;
