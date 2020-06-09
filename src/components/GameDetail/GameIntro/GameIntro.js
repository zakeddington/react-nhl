import React from 'react';
import PropTypes from 'prop-types';
import Loader from '../../Shared/Loader/Loader';
import VideoCarousel from '../../Shared/VideoCarousel/VideoCarousel';
import './GameIntro.scss';

function GameIntro(props) {
	const {
		showLoader,
		showNoResults,
		intro,
		videos,
	} = props;
	let content;

	if (showLoader) {
		content = <Loader/>;
	} else {
		if (showNoResults) {
			content = '';
		} else {
			content =
				<div className="game-intro">
					<h2>{intro.title}</h2>
					<p>{intro.desc}</p>
					<div className="game-intro-media">
						{
							videos.length ? (
								<VideoCarousel videos={videos}/>
							) : (
								<img src={intro.poster} alt={intro.posterAltText}/>
							)
						}
					</div>
				</div>;
		}
	}

	return (
		<>
			{content}
		</>
	)
}

GameIntro.propTypes = {
	showLoader: PropTypes.bool,
	showNoResults: PropTypes.bool,
	intro: PropTypes.shape({
		title: PropTypes.string,
		desc: PropTypes.string,
		poster: PropTypes.string,
		posterAltText: PropTypes.string,
	}),
	videos: PropTypes.arrayOf(PropTypes.shape({
		title: PropTypes.string,
		duration: PropTypes.string,
		url: PropTypes.string,
		poster: PropTypes.string,
		thumb: PropTypes.string,
		posterAltText: PropTypes.string,
		showVideoPlayer: PropTypes.bool,
	})),
}

export default GameIntro;
