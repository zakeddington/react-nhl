import React from 'react';
import PropTypes from 'prop-types';
import Loader from '../../Shared/Loader/Loader';
import PlayerPhoto from '../../Shared/PlayerPhoto/PlayerPhoto';
import Modal from '../../Shared/Modal/Modal';
import ModalPlayerDetailContent from '../../Shared/Modal/ModalPlayerDetailContent';
import './Stars.scss';

function renderContent(starsArray) {

	let stars = starsArray.map((star) => {
		const { id, name, stat1, stat2, teamName } = star;

		return (
			<div key={Math.random()} className="stars-player">
				<Modal content={<ModalPlayerDetailContent contentId={id}/>} modalClass="player-detail">
					<PlayerPhoto playerId={id}/>
					<span className="offscreen">Open player details for {name} in modal window</span>
				</Modal>
				<span className="stars-name">
						<Modal content={<ModalPlayerDetailContent contentId={id}/>} modalClass="player-detail">
							{name}
						</Modal>
						<span className="stars-team-name">{teamName}</span>
					</span>
				<span className="stars-stat">{stat1}</span>
				<span className="stars-stat">{stat2}</span>
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
	const {
		showLoader,
		showNoResults,
		isPreview,
		stars,
	} = props;
	let content;

	if (showLoader) {
		content = <Loader/>;
	} else {
		if (showNoResults || isPreview) {
			content = '';
		} else {
			content = renderContent(stars);
		}
	}

	return(
		<>
			{content}
		</>
	)
}

Stars.propTypes = {
	showLoader: PropTypes.bool,
	showNoResults: PropTypes.bool,
	isPreview: PropTypes.bool,
	stars: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
		stat1: PropTypes.string,
		stat2: PropTypes.string,
		teamName: PropTypes.string,
	})),
}

export default Stars;
