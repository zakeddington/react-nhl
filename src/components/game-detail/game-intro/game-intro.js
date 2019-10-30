import React, { Component } from 'react';
import Loader from '../../shared/loader/loader';
import VideoCarousel from '../../shared/video-carousel/video-carousel';
import './game-intro.scss';

class GameIntro extends Component {

	renderContent(data) {
		return (
			<div className="game-intro">
				<h2>{data.title}</h2>
				<p>{data.desc}</p>
				<div className="game-intro-media">
					{
						data.videos.length ? (
              <VideoCarousel data={data} />
						) : (
							<img src={data.poster} alt={data.posterAltText} />
						)
					}
				</div>
			</div>
		);
	}

	renderNoContent() {
		return null;
	}

	renderLoading() {
		return (
			<Loader />
		);
	}

	render() {
		let data = this.props.gameContent;

		if (data.length || Object.keys(data).length) {
			if (data.showNoResults) {
				return this.renderNoContent();
			}
			return this.renderContent(data);
		}

		return this.renderLoading();
	}
}

export default GameIntro;
