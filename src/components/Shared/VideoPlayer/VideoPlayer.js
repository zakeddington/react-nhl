import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon/Icon';
import './VideoPlayer.scss';

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
			<button className="video-trigger button button-text-button" onClick={() => this.onPosterClick()}>
				<img className="video-poster" src={poster} alt={altText}/>
				<Icon iconId="play-circle-filled" iconClass="video-play-icon"/>
				<span className="video-title">
					{title}<span> [{duration}]</span>
				</span>
			</button>
		)
	}

	renderVideo() {
		const { video, poster, isAutoPlay, onVideoEvent } = this.props;

		return (
			<video className="video" src={video} poster={poster} muted controls autoPlay={isAutoPlay}
				onPlay={(e) => onVideoEvent(e)} onEnded={(e) => onVideoEvent(e)}/>
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
