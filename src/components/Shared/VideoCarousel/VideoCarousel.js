import React, {Component} from 'react';
import Loader from '../Loader/Loader';
import Icon from '../Icon/Icon';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import './VideoCarousel.scss';

class VideoCarousel extends Component {

	state = {
		maxVideoIndex: this.props.videos.length - 1,
		selectedVideoIndex: 1,
		videos: this.props.videos,
		selectedVideo: {},
	};

	componentDidMount() {
		this.setCurrentVideo(this.state.selectedVideoIndex);
	}

	setCurrentVideo(index, showVideoPlayer = false) {
		let curVideo = Object.assign({}, this.state.videos[index]);
		curVideo.showVideoPlayer = showVideoPlayer;

		this.setState({
			selectedVideoIndex: index,
			selectedVideo: curVideo,
		})
	}

	onVideoPlayerCallback(e) {
		if (e.type === 'ended') {
			this.onVideoEnd();
		}
	}

	onVideoEnd() {
		const {selectedVideoIndex, maxVideoIndex} = this.state;
		const nextIndex = selectedVideoIndex + 1;

		if (selectedVideoIndex < maxVideoIndex) {
			this.setCurrentVideo(nextIndex);
		}
	}

	renderLoading() {
		return (
			<Loader/>
		);
	}

	renderContent() {
		const {videos, selectedVideo, selectedVideoIndex} = this.state;

		let thumbs = videos.map((video, i) => {
			let activeClass = i === selectedVideoIndex ? 'is-active' : '';

			if (!video.url) {
				return null;
			}

			return (
				<div key={video.url} className={`video-carousel--thumbs-item ${activeClass}`}>
					<button className="video-carousel--thumbs-trigger" onClick={() => this.setCurrentVideo(i, true)}>
						<div className="video-carousel--thumbs-poster">
							<img src={video.thumb} alt={video.posterAltText}/>
							<Icon iconClass="video-play-icon" iconId="play-circle-filled"/>
						</div>
						<div className="video-carousel--thumbs-title">
							{video.title}
							<span className="video-carousel--thumbs-duration">[{video.duration}]</span>
						</div>
					</button>
				</div>
			)
		});

		return (
			<div className="video-carousel">
				<div className="video-carousel--player">
					<VideoPlayer key={selectedVideo.url} showVideo={selectedVideo.showVideoPlayer} isAutoPlay={true}
						video={selectedVideo.url}
						poster={selectedVideo.poster} altText={selectedVideo.posterAltText}
						title={selectedVideo.title} duration={selectedVideo.duration}
						onVideoEvent={(e) => this.onVideoPlayerCallback(e)}
					/>
				</div>
				<div className="video-carousel--thumbs">
					{thumbs}
				</div>
			</div>
		);
	}

	render() {
		const {videos} = this.props;

		if (videos.length || Object.keys(videos).length) {
			if (videos.error) {
				return null;
			}
			return this.renderContent();
		}

		return this.renderLoading();
	}
}

export default VideoCarousel;
