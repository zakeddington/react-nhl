import React from 'react';
import PropTypes from 'prop-types';
import Loader from '../../Shared/Loader/Loader';
import PlayerPhoto from '../../Shared/PlayerPhoto/PlayerPhoto';
import Modal from '../../Shared/Modal/Modal';
import ModalPlayerDetailContent from '../../Shared/Modal/ModalPlayerDetailContent';
import './Stars.scss';

function renderContent(data) {
	if (data.isPreview || !data.stars) {
		return null;
	}

	let stars = data.stars.map((star) => {
		return (
			<div key={Math.random()} className="stars-player">
				<Modal content={<ModalPlayerDetailContent contentId={star.id}/>} modalClass="player-detail">
					<PlayerPhoto playerId={star.id}/>
					<span className="offscreen">Open player details for {star.name} in modal window</span>
				</Modal>
				<span className="stars-name">
						<Modal content={<ModalPlayerDetailContent contentId={star.id}/>} modalClass="player-detail">
							{star.name}
						</Modal>
						<span className="stars-team-name">{star.teamName}</span>
					</span>
				<span className="stars-stat">{star.stat1}</span>
				<span className="stars-stat">{star.stat2}</span>
			</div>
		)
	});

	return (
		<div className="stars">
			<h3 className="header-title">Stars of the Game</h3>
			<div className="stars-content">
				{stars}
			</div>
		</div>
	);
}

function Stars(props) {
	const data = props.gameDetail;
	let content;

	if (data) {
		if (data.showNoResults || data.isPreview) {
			content = '';
		} else {
			content = renderContent(data);
		}
	} else {
		content = <Loader/>;
	}

	return(
		<>
			{content}
		</>
	)
}

Stars.propTypes = {
	data: PropTypes.object,
}

export default Stars;
