import React from 'react';
import PropTypes from 'prop-types';
import Loader from '../../Shared/Loader/Loader';
import VideoCarousel from '../../Shared/VideoCarousel/VideoCarousel';
import './GameIntro.scss';

function GameIntro(props) {
	const data = props.gameContent;
	let content;

	if (data) {
		if (data.showNoResults) {
			content = '';
		} else {
			content =
				<div className="game-intro">
					<h2>{data.title}</h2>
					<p>{data.desc}</p>
					<div className="game-intro-media">
						{
							data.videos.length ? (
								<VideoCarousel data={data}/>
							) : (
								<img src={data.poster} alt={data.posterAltText}/>
							)
						}
					</div>
				</div>
		}
	} else {
		content = <Loader/>;
	}

	return (
		<>
			{content}
		</>
	)
}

GameIntro.propTypes = {
	data: PropTypes.object,
}

export default GameIntro;
