import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	VideoPlayerVideo,
	VideoPlayerTrigger,
	VideoPlayerPosterImg,
	VideoPlayerTitle,
	VideoPlayerTriggerIcon
} from './VideoPlayerStyle';

class VideoPlayer extends Component {

	state = {
		showVideo: this.props.showVideo
	};

	onPosterClick() {
		const { onPosterClick } = this.props;

		if (typeof onPosterClick === 'function') {
			onPosterClick();
		} else {
			this.setState({showVideo: true});
		}
	}

	renderPoster() {
		const { poster, altText, title, duration } = this.props;

		return (
			<VideoPlayerTrigger onClick={() => this.onPosterClick()}>
				<VideoPlayerPosterImg src={poster} alt={altText} />
				<VideoPlayerTriggerIcon iconId="play-circle-filled" />
				<VideoPlayerTitle>
					{title} [{duration}]
				</VideoPlayerTitle>
			</VideoPlayerTrigger>
		)
	}

	renderVideo() {
		const { video, poster, isAutoPlay, onVideoEvent } = this.props;

		return (
			<VideoPlayerVideo src={video} poster={poster} muted controls autoPlay={isAutoPlay}
				onPlay={(e) => onVideoEvent(e)} onEnded={(e) => onVideoEvent(e)} />
		)
	}

	render() {
		if (this.state.showVideo) {
			return this.renderVideo();
		}

		return this.renderPoster();
	}
}

VideoPlayer.propTypes = {
	altText: PropTypes.string,
	duration: PropTypes.string,
	isAutoPlay: PropTypes.bool,
	onVideoEvent: PropTypes.func,
	poster: PropTypes.string,
	showVideo: PropTypes.bool,
	title: PropTypes.string,
	video: PropTypes.string,
	onPosterClick: PropTypes.func,
}

export default VideoPlayer;
