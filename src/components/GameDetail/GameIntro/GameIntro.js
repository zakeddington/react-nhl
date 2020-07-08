import React from 'react';
import PropTypes from 'prop-types';
import Loader from '../../Shared/Loader/Loader';
import VideoCarousel from '../../Shared/VideoCarousel/VideoCarousel';
import { StyledGameIntro } from './GameIntroStyle';
import { H2, P } from '../../../globalStyles/Typography/Typography';

function GameIntro(props) {
	const {
		showLoader,
		showNoResults,
		intro,
		videos,
	} = props;
	let content;

	if (showLoader) {
		content = <Loader />;
	} else {
		if (showNoResults) {
			content = '';
		} else {
			content =
				<StyledGameIntro>
					<H2>{intro.title}</H2>
					<P>{intro.desc}</P>
					{
						videos.length ? (
							<VideoCarousel videos={videos} />
						) : (
							<img src={intro.poster} alt={intro.posterAltText} />
						)
					}
				</StyledGameIntro>;
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
