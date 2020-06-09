
function GetVideoData(data) {
	const title = data.title;
	const playbacks = data.playbacks;
	const duration = data.duration;
	const thumb = data.image.cuts['640x360'].src;
	const poster = data.image.cuts['1136x640'].src;
	const posterAltText = data.image.altText;
	const mp4s = [];
	let url = '';

	playbacks.forEach((video) => {
		if (video.url.includes('.mp4')) {
			mp4s.push(video.url);
		}

		if (video.name.includes('1800K')) {
			url = video.url;
		}
	});

	if (!url && mp4s.length) {
		url = mp4s[mp4s.length - 1];
	}

	return {
		title,
		duration,
		url,
		poster,
		thumb,
		posterAltText,
		showVideoPlayer: false,
	};
}

export default GetVideoData;
