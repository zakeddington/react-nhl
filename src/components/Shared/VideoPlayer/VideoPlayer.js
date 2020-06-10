import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon/Icon';
import './VideoPlayer.scss';

class VideoPlayer extends Component {

	state = {
		showVideo: this.props.showVideo
	};

	onPosterClick() {
		this.setState({showVideo: true});
	}

	renderPoster() {
		return (
			<button className="video-trigger" onClick={() => this.onPosterClick()}>
				<img src={this.props.poster} alt={this.props.altText}/>
				<Icon iconId="play-circle-filled" iconClass="video-play-icon"/>
				<span className="video-title">
					{this.props.title}<span> [{this.props.duration}]</span>
				</span>
			</button>
		)
	}

	renderVideo() {
		const { video, poster, isAutoPlay, onVideoEvent } = this.props;

		return (
			<video src={video} poster={poster} muted controls autoPlay={isAutoPlay}
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
}

export default VideoPlayer;
