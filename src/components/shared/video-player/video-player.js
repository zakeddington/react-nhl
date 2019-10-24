import React, { Component } from 'react';
import Icon from '../icon/icon';
import './video-player.scss';

class VideoPlayer extends Component {

	state = {
		showVideo: this.props.showVideo
	}

	onClick() {
		this.setState({showVideo: true});
	}

	renderPoster() {
		return(
			<button className="video-trigger" onClick={() => this.onClick()}>
				<img src={this.props.poster} alt={this.props.altText} />
				<Icon iconId="play-circle-filled" iconClass="video-play-icon" />
			</button>
		)
	}

	renderVideo() {
		return(
			<video src={this.props.video} poster={this.props.poster} controls autoPlay="true" />
		)
	}

	render() {
		if (this.state.showVideo) {
			return this.renderVideo();
		}

		return this.renderPoster();
	}
}

export default VideoPlayer;
