import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loader from '../Loader/Loader';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import {
	VideoCarouselPlayer,
	VideoCarouselThumbs,
	VideoCarouselThumbsItem,
} from './VideoCarouselStyled';

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
		const { selectedVideoIndex, maxVideoIndex } = this.state;
		const nextIndex = selectedVideoIndex + 1;

		if (selectedVideoIndex < maxVideoIndex) {
			this.setCurrentVideo(nextIndex);
		}
	}

	renderLoading() {
		return (
			<Loader />
		);
	}

	renderContent() {
		const { videos, selectedVideo, selectedVideoIndex } = this.state;

		let thumbs = videos.map((video, i) => {
			let isActive = i === selectedVideoIndex;

			if (!video.url) {
				return null;
			}

			return (
				<VideoCarouselThumbsItem key={video.url} $isActive={isActive}>
					<VideoPlayer key={video.url}
						showVideo={false}
						isAutoPlay={false}
						video={null}
						poster={video.poster}
						altText={video.posterAltText}
						title={video.title}
						duration={video.duration}
						onPosterClick={() => this.setCurrentVideo(i, true)}
						onVideoEvent={null}
					/>
				</VideoCarouselThumbsItem>
			)
		});

		return (
			<>
				<VideoCarouselPlayer>
					<VideoPlayer key={selectedVideo.url}
						showVideo={selectedVideo.showVideoPlayer}
						isAutoPlay={true}
						video={selectedVideo.url}
						poster={selectedVideo.poster}
						altText={selectedVideo.posterAltText}
						title={selectedVideo.title}
						duration={selectedVideo.duration}
						onVideoEvent={(e) => this.onVideoPlayerCallback(e)}
					/>
				</VideoCarouselPlayer>
				<VideoCarouselThumbs>
					{thumbs}
				</VideoCarouselThumbs>
			</>
		);
	}

	render() {
		const { videos } = this.props;

		if (videos.length || Object.keys(videos).length) {
			if (videos.error) {
				return null;
			}
			return this.renderContent();
		}

		return this.renderLoading();
	}
}

VideoCarousel.propTypes = {
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

export default VideoCarousel;
