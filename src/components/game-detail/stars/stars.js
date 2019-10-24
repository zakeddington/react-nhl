import React, { Component } from 'react';
import Loader from '../../shared/loader/loader';
import PlayerPhoto from '../../shared/player-photo/player-photo';
import './stars.scss';

class Stars extends Component {

	renderLoading() {
		return (
			<Loader />
		);
	}

	renderContent(data) {
		if (data.isPreview || !data.stars) {
			return null;
		}

		let stars = data.stars.map((star) => {
			return (
				<div key={Math.random()} className="stars-player">
					<PlayerPhoto playerId={star.id} />
					<span className="stars-name">
						{star.name}
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

	render() {
		let data = this.props.gameDetail;

		if (data.length || Object.keys(data).length) {
			return this.renderContent(data);
		}

		return this.renderLoading();
	}
}

export default Stars;
