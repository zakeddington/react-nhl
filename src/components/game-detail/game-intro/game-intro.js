import React from 'react';
import Loader from '../../shared/loader/loader';
import VideoCarousel from '../../shared/video-carousel/video-carousel';
import './game-intro.scss';

function GameIntro(props) {
	const data = props.gameContent;
	let content;

	if (data.length || Object.keys(data).length) {
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

export default GameIntro;
