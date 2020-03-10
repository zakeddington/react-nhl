import React, {Component} from 'react';
import Icon from '../icon/icon';
import './video-player.scss';

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
		const {video, poster, isAutoPlay, onVideoEvent} = this.props;

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

export default VideoPlayer;
