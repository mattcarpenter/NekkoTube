import axios from 'axios';

export const FETCH_VIDEO = 'FETCH_VIDEO';
export const FETCH_VIDEO_SUCCESS = 'FETCH_VIDEO_SUCCESS';
export const FETCH_VIDEO_FAILURE = 'FETCH_VIDEO_FAILURE';

export function fetchVideo(videoId) {
	const request = axios({
		method: 'get',
		url: '/video?videoId=' + videoId,
		headers: []
	});

	return {
		type: FETCH_VIDEO,
		payload: request
	};
}

export function fetchVideoSuccess(video) {
	console.log('fetch success');
	return {
		type: FETCH_VIDEO_SUCCESS,
		payload: video
	};
}

export function fetchVideoFailure(error) {
	console.log('fetch fail');
	return {
		type: FETCH_VIDEO_FAILURE,
		payload: error
	};
}
